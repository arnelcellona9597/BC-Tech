<?php
declare(strict_types=1);

/** Shared helpers for the contact and booking endpoints. */

const API_ROOT = __DIR__ . '/..';

function config(): array
{
    static $cfg = null;
    if ($cfg === null) {
        $file = is_file(API_ROOT . '/config.php') ? API_ROOT . '/config.php' : API_ROOT . '/config.example.php';
        $cfg = require $file;
    }
    return $cfg;
}

function wants_json(): bool
{
    return stripos($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json') !== false;
}

/** Sends the reply and stops the script. */
function respond(bool $ok, string $message, int $code = 200): void
{
    http_response_code($code);
    header('X-Content-Type-Options: nosniff');
    header('Cache-Control: no-store');
    if (wants_json()) {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($ok ? ['ok' => true, 'message' => $message] : ['ok' => false, 'error' => $message], JSON_UNESCAPED_UNICODE);
        exit;
    }
    // Plain page for visitors without JavaScript
    header('Content-Type: text/html; charset=utf-8');
    $m = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');
    $t = $ok ? 'Thank you' : 'Something went wrong';
    echo "<!doctype html><html lang=\"en-PH\"><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><meta name=\"robots\" content=\"noindex\">"
       . "<title>{$t} | BC Tech</title><body style=\"font-family:system-ui,sans-serif;background:#0B0B0C;color:#fff;display:grid;place-items:center;min-height:100vh;margin:0;padding:1.5rem;text-align:center\">"
       . "<main><h1 style=\"font-weight:600\">{$t}</h1><p style=\"max-width:36ch;margin:1rem auto;line-height:1.6\">{$m}</p>"
       . "<p><a href=\"/\" style=\"color:#FF5A6E\">Back to the BC Tech website</a></p></main></body></html>";
    exit;
}

function require_post(): void
{
    if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
        header('Allow: POST');
        respond(false, 'Please use the form on our website.', 405);
    }
}

/** Only accept submissions that come from our own website. */
function check_origin(): void
{
    $allowed = config()['site']['allowed_hosts'];
    foreach (['HTTP_ORIGIN', 'HTTP_REFERER'] as $h) {
        if (!empty($_SERVER[$h])) {
            $host = parse_url((string) $_SERVER[$h], PHP_URL_HOST);
            if (!$host || !in_array(strtolower($host), $allowed, true)) {
                respond(false, 'This request was not allowed.', 403);
            }
            return;
        }
    }
}

function client_ip(): string
{
    return preg_replace('/[^0-9a-fA-F:.]/', '', (string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown')) ?: 'unknown';
}

/** Simple per-visitor limit using a small file in the temp folder. */
function rate_limit(): void
{
    $max = (int) config()['limits']['per_ip_per_hour'];
    $file = sys_get_temp_dir() . '/bctech_rl_' . hash('sha256', client_ip());
    $now = time();
    $hits = [];
    if (is_file($file)) {
        $hits = array_values(array_filter((array) json_decode((string) file_get_contents($file), true), fn ($t) => is_int($t) && $t > $now - 3600));
    }
    if (count($hits) >= $max) {
        respond(false, 'You have sent a few messages already. Please try again later or email us directly.', 429);
    }
    $hits[] = $now;
    @file_put_contents($file, json_encode($hits), LOCK_EX);
}

/** Bot checks. Bots that fill the hidden field get a fake success so they do not retry. */
function check_bots(): void
{
    if (!empty($_POST['website'])) {
        respond(true, 'Thank you! We got your message and will reply soon.');
    }
    $t = $_POST['_t'] ?? '';
    if ($t !== '' && ctype_digit((string) $t)) {
        $age = (int) (microtime(true) - ((int) $t) / 1000);
        if ($age < (int) config()['limits']['min_seconds']) {
            respond(false, 'Please take a moment to fill in the form, then send it again.', 400);
        }
    }
}

/** Trim, strip control characters (blocks email header injection) and limit the length. */
function clean(?string $v, int $max): string
{
    $v = trim((string) $v);
    $v = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $v) ?? '';
    return mb_substr($v, 0, $max);
}

function clean_line(?string $v, int $max): string
{
    return trim(preg_replace('/[\r\n\t]+/', ' ', clean($v, $max)) ?? '');
}

function e(string $v): string
{
    return htmlspecialchars($v, ENT_QUOTES, 'UTF-8');
}

/** Folder for the saved copies of messages (blocked from the web by .htaccess). */
function storage_dir(): string
{
    $dir = API_ROOT . '/storage';
    if (!is_dir($dir)) {
        @mkdir($dir, 0750, true);
        @file_put_contents($dir . '/.htaccess', "Require all denied\n");
    }
    return $dir;
}

/** A short reference the visitor sees and we get in the email, e.g. BC-241115-7K3QX. */
function new_reference(): string
{
    return 'BC-' . date('ymd') . '-' . strtoupper(substr(bin2hex(random_bytes(4)), 0, 5));
}

/**
 * Keep a copy of every message on the server BEFORE trying to send the email,
 * so nothing is lost even if the mail server is down. One JSON object per line.
 */
function save_submission(string $ref, string $type, array $data): void
{
    $line = json_encode([
        'ref' => $ref,
        'type' => $type,
        'time' => date('c'),
        'ip' => hash('sha256', client_ip()),
        'data' => $data,
        'status' => 'received',
    ], JSON_UNESCAPED_UNICODE) . "\n";
    @file_put_contents(storage_dir() . '/inquiries.jsonl', $line, FILE_APPEND | LOCK_EX);
}

/** Record whether the email went out ("emailed" or "email_failed"). */
function mark_submission(string $ref, string $status): void
{
    $line = json_encode(['ref' => $ref, 'time' => date('c'), 'status' => $status]) . "\n";
    @file_put_contents(storage_dir() . '/inquiries.jsonl', $line, FILE_APPEND | LOCK_EX);
    if ($status !== 'emailed') {
        error_log("BC Tech: message {$ref} was saved but the email could not be sent ({$status}).");
    }
}

/** Validate the fields every form shares. Returns [fields, errors]. */
function read_contact_fields(): array
{
    $f = [
        'name'  => clean_line($_POST['name'] ?? '', 100),
        'email' => clean_line($_POST['email'] ?? '', 150),
        'phone' => clean_line($_POST['phone'] ?? '', 40),
    ];
    $errors = [];
    if (mb_strlen($f['name']) < 2) $errors[] = 'Please enter your name.';
    if (!filter_var($f['email'], FILTER_VALIDATE_EMAIL)) $errors[] = 'Please enter a valid email address.';
    if ($f['phone'] !== '' && !preg_match('/^[0-9+()\-.\s]{5,40}$/', $f['phone'])) $errors[] = 'Please check your phone number.';
    return [$f, $errors];
}

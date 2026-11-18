<?php
declare(strict_types=1);

use PHPMailer\PHPMailer\Exception as MailException;
use PHPMailer\PHPMailer\PHPMailer;

// Only load this file from contact.php / booking.php, never directly
if (!function_exists('config')) {
    http_response_code(403);
    exit;
}

require_once __DIR__ . '/PHPMailer/Exception.php';
require_once __DIR__ . '/PHPMailer/PHPMailer.php';
require_once __DIR__ . '/PHPMailer/SMTP.php';

/**
 * People who are copied (Cc) on every team notification: the customer's inquiry or call request.
 * Set 'cc' in config.php to change the list (an array or a comma-separated string). These defaults apply if it is missing.
 */
function team_cc(): array
{
    $raw = config()['mail']['cc'] ?? ['elibertbustamante@gmail.com', 'arnelcellona9597@gmail.com'];
    if (is_string($raw)) $raw = explode(',', $raw);
    $out = [];
    foreach ((array) $raw as $a) {
        $a = strtolower(trim((string) $a));
        if ($a !== '' && filter_var($a, FILTER_VALIDATE_EMAIL) && !in_array($a, $out, true)) $out[] = $a;
    }
    return $out;
}

/** Cc list without the main recipient (avoids sending the same person two copies). */
function cc_without(array $cc, string $to): array
{
    return array_values(array_filter($cc, fn ($a) => strcasecmp($a, $to) !== 0));
}

/**
 * Send one email. Returns true on success.
 * driver "log"  -> appends the email to api/storage/mail.log (testing, no server needed)
 * driver "smtp" -> sends through your hosting's SMTP server
 */
function send_mail(string $to, string $subject, string $html, string $text, ?string $replyTo = null, ?string $replyName = null, string $bcc = '', array $cc = []): bool
{
    $cfg = config()['mail'];
    $cc = cc_without($cc, $to);
    if ($bcc !== '' && in_array(strtolower(trim($bcc)), $cc, true)) $bcc = ''; // already copied

    if (($cfg['driver'] ?? 'log') !== 'smtp') {
        $dir = API_ROOT . '/storage';
        if (!is_dir($dir)) {
            @mkdir($dir, 0750, true);
            @file_put_contents($dir . '/.htaccess', "Require all denied\n");
        }
        $entry = sprintf("=== %s ===\nTo: %s\nCc: %s\nBcc: %s\nReply-To: %s\nSubject: %s\n\n%s\n\n", date('c'), $to, implode(', ', $cc), $bcc, (string) $replyTo, $subject, $text);
        return @file_put_contents($dir . '/mail.log', $entry, FILE_APPEND | LOCK_EX) !== false;
    }

    $m = new PHPMailer(true);
    try {
        $m->isSMTP();
        $m->Host       = $cfg['smtp']['host'];
        $m->Port       = (int) $cfg['smtp']['port'];
        $m->SMTPAuth   = true;
        $m->Username   = $cfg['smtp']['user'];
        $m->Password   = $cfg['smtp']['pass'];
        $m->SMTPSecure = $cfg['smtp']['secure'] === 'ssl' ? PHPMailer::ENCRYPTION_SMTPS : PHPMailer::ENCRYPTION_STARTTLS;
        $m->CharSet    = 'UTF-8';
        $m->Timeout    = 12;
        $m->setFrom($cfg['from_email'], $cfg['from_name']);
        $m->addAddress($to);
        foreach ($cc as $c) $m->addCC($c);
        if ($bcc !== '' && filter_var($bcc, FILTER_VALIDATE_EMAIL)) $m->addBCC($bcc);
        if ($replyTo !== null && filter_var($replyTo, FILTER_VALIDATE_EMAIL)) $m->addReplyTo($replyTo, (string) $replyName);
        $m->isHTML(true);
        $m->Subject = $subject;
        $m->Body    = $html;
        $m->AltBody = $text;
        $m->send();
        return true;
    } catch (MailException $e) {
        error_log('Davao Byte mail error: ' . $m->ErrorInfo);
        return false;
    }
}

/** Backup route: the web server's own mail() function (used only if SMTP fails). */
function native_mail(string $to, string $subject, string $html, string $text, ?string $replyTo = null, string $bcc = '', array $cc = []): bool
{
    $cfg = config()['mail'];
    $cc = cc_without($cc, $to);
    if ($bcc !== '' && in_array(strtolower(trim($bcc)), $cc, true)) $bcc = '';
    $clean = fn (string $v): string => trim(preg_replace('/[\r\n]+/', ' ', $v) ?? '');
    $boundary = 'bc' . bin2hex(random_bytes(8));
    $headers = [
        'MIME-Version: 1.0',
        'From: ' . $clean($cfg['from_name']) . ' <' . $clean($cfg['from_email']) . '>',
        'Content-Type: multipart/alternative; boundary="' . $boundary . '"',
    ];
    if ($replyTo !== null && filter_var($replyTo, FILTER_VALIDATE_EMAIL)) $headers[] = 'Reply-To: ' . $clean($replyTo);
    if ($cc) $headers[] = 'Cc: ' . $clean(implode(', ', $cc));
    if ($bcc !== '' && filter_var($bcc, FILTER_VALIDATE_EMAIL)) $headers[] = 'Bcc: ' . $clean($bcc);
    $body = "--{$boundary}\r\nContent-Type: text/plain; charset=UTF-8\r\n\r\n{$text}\r\n"
          . "--{$boundary}\r\nContent-Type: text/html; charset=UTF-8\r\n\r\n{$html}\r\n--{$boundary}--";
    return @mail($to, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, implode("\r\n", $headers));
}

/** Send through the main route, then try the backup route if that fails. */
function deliver_mail(string $to, string $subject, string $html, string $text, ?string $replyTo = null, ?string $replyName = null, string $bcc = '', array $cc = []): bool
{
    if (send_mail($to, $subject, $html, $text, $replyTo, $replyName, $bcc, $cc)) return true;
    if ((config()['mail']['driver'] ?? 'log') === 'smtp') {
        return native_mail($to, $subject, $html, $text, $replyTo, $bcc, $cc);
    }
    return false;
}

/** Branded HTML wrapper used for the emails we send. */
function email_html(string $heading, array $rows, string $footer = ''): string
{
    $trs = '';
    foreach ($rows as $label => $value) {
        $trs .= '<tr><td style="padding:8px 14px 8px 0;color:#6b6b73;font-size:13px;vertical-align:top;white-space:nowrap">' . e((string) $label)
              . '</td><td style="padding:8px 0;font-size:15px;color:#0B0B0C">' . nl2br(e((string) $value)) . '</td></tr>';
    }
    return '<div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;border:1px solid #e5e5e8;border-radius:12px;overflow:hidden">'
         . '<div style="background:#0B0B0C;color:#fff;padding:20px 24px;font-size:18px;letter-spacing:3px">DAVAO <span style="color:#C8102E">&#9670;</span> BYTE</div>'
         . '<div style="padding:24px"><h2 style="margin:0 0 14px;font-size:20px;color:#0B0B0C">' . e($heading) . '</h2><table style="border-collapse:collapse;width:100%">' . $trs . '</table>'
         . ($footer !== '' ? '<p style="margin:20px 0 0;color:#6b6b73;font-size:13px;line-height:1.5">' . e($footer) . '</p>' : '')
         . '</div></div>';
}

function email_text(string $heading, array $rows, string $footer = ''): string
{
    $out = $heading . "\n" . str_repeat('-', strlen($heading)) . "\n";
    foreach ($rows as $label => $value) {
        $out .= $label . ': ' . $value . "\n";
    }
    return $out . ($footer !== '' ? "\n" . $footer . "\n" : '');
}

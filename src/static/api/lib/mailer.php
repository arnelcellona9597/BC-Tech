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
 * Send one email. Returns true on success.
 * driver "log"  -> appends the email to api/storage/mail.log (testing, no server needed)
 * driver "smtp" -> sends through your hosting's SMTP server
 */
function send_mail(string $to, string $subject, string $html, string $text, ?string $replyTo = null, ?string $replyName = null, string $bcc = ''): bool
{
    $cfg = config()['mail'];

    if (($cfg['driver'] ?? 'log') !== 'smtp') {
        $dir = API_ROOT . '/storage';
        if (!is_dir($dir)) {
            @mkdir($dir, 0750, true);
            @file_put_contents($dir . '/.htaccess', "Require all denied\n");
        }
        $entry = sprintf("=== %s ===\nTo: %s\nBcc: %s\nReply-To: %s\nSubject: %s\n\n%s\n\n", date('c'), $to, $bcc, (string) $replyTo, $subject, $text);
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
        if ($bcc !== '' && filter_var($bcc, FILTER_VALIDATE_EMAIL)) $m->addBCC($bcc);
        if ($replyTo !== null && filter_var($replyTo, FILTER_VALIDATE_EMAIL)) $m->addReplyTo($replyTo, (string) $replyName);
        $m->isHTML(true);
        $m->Subject = $subject;
        $m->Body    = $html;
        $m->AltBody = $text;
        $m->send();
        return true;
    } catch (MailException $e) {
        error_log('BC Tech mail error: ' . $m->ErrorInfo);
        return false;
    }
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
         . '<div style="background:#0B0B0C;color:#fff;padding:20px 24px;font-size:18px;letter-spacing:3px">BC <span style="color:#C8102E">&#9670;</span> TECH</div>'
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

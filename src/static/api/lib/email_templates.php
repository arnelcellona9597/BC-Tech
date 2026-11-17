<?php
declare(strict_types=1);

/**
 * Confirmation emails sent to visitors after they use a form on the website.
 * Table based layout with inline styles so it looks right in Gmail, Outlook, Apple Mail and phones.
 *
 *   confirmation_inquiry($data, $cfg)  -> ['subject' => , 'html' => , 'text' => ]
 *   confirmation_booking($data, $cfg)  -> ['subject' => , 'html' => , 'text' => ]
 *
 * Preview without sending anything:  php scripts/email-preview.php
 */

if (!function_exists('e')) {
    function e(string $v): string
    {
        return htmlspecialchars($v, ENT_QUOTES, 'UTF-8');
    }
}

/** Contact details shown in the email. Values come from config.php, with safe defaults. */
function mail_brand(array $cfg): array
{
    $s = $cfg['site'] ?? [];
    return [
        'name'     => $s['name'] ?? 'Davao Byte',
        'url'      => rtrim($s['url'] ?? 'https://davaobyte.com', '/'),
        'email'    => $cfg['mail']['to'] ?? 'info@davaobyte.com',
        'phone'    => $s['phone'] ?? '+63 951 487 4304',
        'phone2'   => $s['phone2'] ?? '+63 916 312 3173',
        'landline' => $s['landline'] ?? '(082) 2929 822',
        'hours'    => $s['hours'] ?? 'Monday to Friday, 9:00 AM to 5:00 PM (Philippine Time)',
        'city'     => $s['city'] ?? 'Davao City, Philippines',
        'tagline'  => $s['tagline'] ?? 'Websites That Bring You Customers.',
    ];
}

const MAIL_RED = '#C8102E';
const MAIL_INK = '#0B0B0C';
const MAIL_SERIF = "Georgia,'Times New Roman',Times,serif";
const MAIL_SANS = "'Helvetica Neue',Helvetica,Arial,sans-serif";

function mail_button(string $label, string $href, bool $dark = true): string
{
    $bg = $dark ? MAIL_INK : MAIL_RED;
    return '<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0"><tr><td align="center" bgcolor="' . $bg . '" style="border-radius:999px;background:' . $bg . '">'
        . '<a href="' . e($href) . '" target="_blank" style="display:inline-block;padding:15px 30px;font-family:' . MAIL_SANS . ';font-size:14px;font-weight:700;letter-spacing:.04em;color:#ffffff;text-decoration:none;border-radius:999px">'
        . e($label) . ' &nbsp;<span style="color:#FF5A6E">&rarr;</span></a></td></tr></table>';
}

function mail_row(string $label, string $value, bool $last = false): string
{
    if ($value === '') return '';
    return '<tr><td style="padding:13px 0;' . ($last ? '' : 'border-bottom:1px solid #EAE6E1;') . 'font-family:' . MAIL_SANS . ';font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#8A8A92;width:38%;vertical-align:top">' . e($label) . '</td>'
        . '<td style="padding:13px 0;' . ($last ? '' : 'border-bottom:1px solid #EAE6E1;') . 'font-family:' . MAIL_SANS . ';font-size:15px;line-height:1.5;color:' . MAIL_INK . ';vertical-align:top">' . nl2br(e($value)) . '</td></tr>';
}

function mail_step(int $n, string $title, string $text, bool $last = false): string
{
    return '<tr><td width="44" valign="top" style="padding:0 0 ' . ($last ? '0' : '22px') . '"><table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td width="32" height="32" align="center" bgcolor="' . MAIL_INK . '" style="width:32px;height:32px;border-radius:50%;background:' . MAIL_INK . ';font-family:' . MAIL_SERIF . ';font-size:15px;font-weight:700;color:#ffffff;line-height:32px">' . $n . '</td></tr></table></td>'
        . '<td valign="top" style="padding:0 0 ' . ($last ? '0' : '22px') . ';font-family:' . MAIL_SANS . '"><p style="margin:0 0 3px;font-size:15px;font-weight:700;color:' . MAIL_INK . '">' . e($title) . '</p>'
        . '<p style="margin:0;font-size:14px;line-height:1.6;color:#55555D">' . e($text) . '</p></td></tr>';
}

/** The shared frame: header, dark hero, white body, contact strip, footer. */
function mail_shell(array $b, string $preheader, string $eyebrow, string $title, string $lead, string $content): string
{
    $logo = $b['url'] . '/assets/img/email/logo-white.png';
    $tel = preg_replace('/[^+\d]/', '', $b['phone']);
    $tel2 = preg_replace('/[^+\d]/', '', $b['landline']);
    $telb = preg_replace('/[^+\d]/', '', $b['phone2']);
    return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light only"><meta name="supported-color-schemes" content="light only"><title>' . e($title) . '</title></head>'
    . '<body style="margin:0;padding:0;background:#EFECE8;-webkit-text-size-adjust:100%">'
    . '<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:#EFECE8;font-size:1px;line-height:1px">' . e($preheader) . str_repeat('&#8199;&#847; ', 40) . '</div>'
    . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#EFECE8" style="background:#EFECE8"><tr><td align="center" style="padding:32px 14px">'
    . '<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;border-radius:22px;overflow:hidden;box-shadow:0 30px 60px -30px rgba(11,11,12,.45)">'

    // header
    . '<tr><td align="center" bgcolor="' . MAIL_INK . '" style="background:' . MAIL_INK . ';padding:34px 24px 26px"><a href="' . e($b['url']) . '" target="_blank"><img src="' . e($logo) . '" width="210" alt="' . e($b['name']) . '" style="display:block;border:0;outline:none;width:210px;max-width:70%;height:auto"></a></td></tr>'
    . '<tr><td height="3" bgcolor="' . MAIL_RED . '" style="height:3px;line-height:3px;font-size:0;background:linear-gradient(90deg,#0B0B0C,' . MAIL_RED . ' 30%,#FF5A6E 50%,' . MAIL_RED . ' 70%,#0B0B0C)">&nbsp;</td></tr>'

    // hero
    . '<tr><td align="center" bgcolor="' . MAIL_INK . '" style="background:' . MAIL_INK . ';padding:44px 36px 50px">'
    . '<p style="margin:0 0 16px;font-family:' . MAIL_SANS . ';font-size:11px;font-weight:700;letter-spacing:.32em;text-transform:uppercase;color:#FF5A6E">' . e($eyebrow) . '</p>'
    . '<h1 style="margin:0 0 16px;font-family:' . MAIL_SERIF . ';font-size:34px;line-height:1.2;font-weight:700;color:#ffffff">' . $title . '</h1>'
    . '<p style="margin:0 auto;max-width:440px;font-family:' . MAIL_SANS . ';font-size:15px;line-height:1.7;color:#C9C9CF">' . $lead . '</p>'
    . '</td></tr>'

    // body
    . '<tr><td bgcolor="#ffffff" style="background:#ffffff;padding:40px 40px 14px">' . $content . '</td></tr>'

    // contact strip
    . '<tr><td bgcolor="#ffffff" style="background:#ffffff;padding:6px 40px 40px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#F7F5F2" style="background:#F7F5F2;border-radius:16px"><tr><td style="padding:26px 28px">'
    . '<p style="margin:0 0 4px;font-family:' . MAIL_SERIF . ';font-size:19px;font-weight:700;color:' . MAIL_INK . '">Need us sooner?</p>'
    . '<p style="margin:0 0 16px;font-family:' . MAIL_SANS . ';font-size:13px;line-height:1.6;color:#6B6B73">Call or message us during office hours and a real person will answer.</p>'
    . '<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="font-family:' . MAIL_SANS . ';font-size:14px;line-height:1.5;color:' . MAIL_INK . '">'
    . '<tr><td style="padding:3px 14px 3px 0;color:#8A8A92;font-size:11px;letter-spacing:.14em;text-transform:uppercase">Mobile</td><td style="padding:3px 0"><a href="tel:' . e($tel) . '" style="color:' . MAIL_INK . ';text-decoration:none;font-weight:700">' . e($b['phone']) . '</a> <span style="color:#8A8A92">(Viber / WhatsApp)</span></td></tr>'
    . '<tr><td style="padding:3px 14px 3px 0;color:#8A8A92;font-size:11px;letter-spacing:.14em;text-transform:uppercase">Mobile 2</td><td style="padding:3px 0"><a href="tel:' . e($telb) . '" style="color:' . MAIL_INK . ';text-decoration:none;font-weight:700">' . e($b['phone2']) . '</a></td></tr>'
    . '<tr><td style="padding:3px 14px 3px 0;color:#8A8A92;font-size:11px;letter-spacing:.14em;text-transform:uppercase">Office</td><td style="padding:3px 0"><a href="tel:' . e($tel2) . '" style="color:' . MAIL_INK . ';text-decoration:none;font-weight:700">' . e($b['landline']) . '</a></td></tr>'
    . '<tr><td style="padding:3px 14px 3px 0;color:#8A8A92;font-size:11px;letter-spacing:.14em;text-transform:uppercase">Email</td><td style="padding:3px 0"><a href="mailto:' . e($b['email']) . '" style="color:' . MAIL_INK . ';text-decoration:none;font-weight:700">' . e($b['email']) . '</a></td></tr>'
    . '<tr><td style="padding:3px 14px 3px 0;color:#8A8A92;font-size:11px;letter-spacing:.14em;text-transform:uppercase;vertical-align:top">Hours</td><td style="padding:3px 0;color:#55555D">' . e($b['hours']) . '</td></tr>'
    . '</table></td></tr></table></td></tr>'

    // footer
    . '<tr><td align="center" bgcolor="' . MAIL_INK . '" style="background:' . MAIL_INK . ';padding:34px 30px 30px">'
    . '<p style="margin:0 0 6px;font-family:' . MAIL_SERIF . ';font-size:17px;font-style:italic;color:#ffffff">' . e($b['tagline']) . '</p>'
    . '<p style="margin:0 0 18px;font-family:' . MAIL_SANS . ';font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#8A8A92">' . e($b['name']) . ' &middot; ' . e($b['city']) . '</p>'
    . '<p style="margin:0 0 6px;font-family:' . MAIL_SANS . ';font-size:12px;line-height:1.7;color:#7C7C84">You are receiving this email because you sent a request through <a href="' . e($b['url']) . '" style="color:#C9C9CF;text-decoration:underline">' . e(preg_replace('#^https?://#', '', $b['url'])) . '</a>.<br>We only use your details to reply to you. <a href="' . e($b['url']) . '/privacy/" style="color:#C9C9CF;text-decoration:underline">Privacy</a></p>'
    . '</td></tr>'
    . '</table></td></tr></table></body></html>';
}

/** "Thank you" email for the home, hero, popup and contact page forms. */
function confirmation_inquiry(array $d, array $cfg): array
{
    $b = mail_brand($cfg);
    $first = explode(' ', trim((string) ($d['name'] ?? '')))[0] ?: 'there';
    $ref = (string) ($d['ref'] ?? '');
    $need = (string) ($d['need'] ?? '');
    $msg = trim((string) ($d['message'] ?? ''));
    if (mb_strlen($msg) > 260) $msg = rtrim(mb_substr($msg, 0, 260)) . '...';

    $ticket = '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #E6E1DB;border-radius:18px;background:#FDFCFB"><tr><td style="padding:26px 28px 8px">'
        . '<p style="margin:0 0 4px;font-family:' . MAIL_SANS . ';font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#8A8A92">Your reference</p>'
        . '<p style="margin:0 0 14px;font-family:\'Courier New\',Courier,monospace;font-size:26px;font-weight:700;letter-spacing:.06em;color:' . MAIL_RED . '">' . e($ref) . '</p>'
        . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px dashed #D9D3CC">'
        . mail_row('Name', (string) ($d['name'] ?? ''))
        . mail_row('Email', (string) ($d['email'] ?? ''))
        . mail_row('Phone', (string) ($d['phone'] ?? ''))
        . mail_row('You asked about', $need)
        . mail_row('Package', (string) ($d['package'] ?? ''))
        . mail_row('Your message', $msg, true)
        . '</table></td></tr><tr><td style="padding:0 28px 20px"></td></tr></table>';

    $steps = '<p style="margin:38px 0 20px;font-family:' . MAIL_SERIF . ';font-size:22px;font-weight:700;color:' . MAIL_INK . '">What happens next</p>'
        . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">'
        . mail_step(1, 'We read your message', 'A real person from our Davao City team goes through what you sent us.')
        . mail_step(2, 'We reply by email', 'You get honest advice and a clear starting price, with no tech talk.')
        . mail_step(3, 'We set up a free call', 'If it feels right, we pick a time together. There is never any pressure to buy.', true)
        . '</table>';

    $cta = '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:40px 0 30px"><tr><td>' . mail_button('See our packages', $b['url'] . '/pricing/') . '</td></tr></table>';

    $html = mail_shell(
        $b,
        'We got your message. Your reference is ' . $ref . '.',
        'Message received',
        'Thank you, ' . e($first) . '.',
        'We got your message and a member of our team will reply by email soon. Keep your reference number handy in case you need to follow up.',
        '<p style="margin:0 0 26px;font-family:' . MAIL_SANS . ';font-size:15px;line-height:1.75;color:#44444C">Hi ' . e($first) . ', thank you for reaching out to ' . e($b['name']) . '. Here is a copy of what we received.</p>' . $ticket . $steps . $cta
    );

    $text = "Thank you, {$first}.\n\nWe got your message and a member of our team will reply by email soon.\n\n"
        . "Your reference: {$ref}\n"
        . ($need !== '' ? "You asked about: {$need}\n" : '')
        . (!empty($d['package']) ? "Package: {$d['package']}\n" : '')
        . ($msg !== '' ? "Your message: {$msg}\n" : '')
        . "\nWhat happens next\n1. We read your message.\n2. We reply by email with honest advice and a clear starting price.\n3. If it feels right, we set up a free call. No pressure to buy.\n"
        . "\nNeed us sooner?\nMobile / Viber / WhatsApp: {$b['phone']}\nMobile: {$b['phone2']}\nOffice: {$b['landline']}\nEmail: {$b['email']}\nHours: {$b['hours']}\n"
        . "\n{$b['name']} - {$b['tagline']}\n{$b['url']}\n";

    return ['subject' => 'We received your message, ' . $first . ' (' . $ref . ')', 'html' => $html, 'text' => $text];
}

/** "Your call request" email, with the day and time shown like a calendar card. */
function confirmation_booking(array $d, array $cfg, DateTimeImmutable $when): array
{
    $b = mail_brand($cfg);
    $first = explode(' ', trim((string) ($d['name'] ?? '')))[0] ?: 'there';
    $ref = (string) ($d['ref'] ?? '');
    $nice = $when->format('l, F j, Y') . ' at ' . $when->format('g:i A') . ' (Philippine Time)';

    $utc = new DateTimeZone('UTC');
    $start = $when->setTimezone($utc)->format('Ymd\THis\Z');
    $end = $when->modify('+30 minutes')->setTimezone($utc)->format('Ymd\THis\Z');
    $gcal = 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=' . rawurlencode('Free call with ' . $b['name'])
        . '&dates=' . $start . '/' . $end
        . '&details=' . rawurlencode('Reference ' . $ref . '. We will confirm this time with you by email. ' . $b['url'])
        . '&ctz=Asia%2FManila';

    $tile = '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #E6E1DB;border-radius:20px;background:#FDFCFB;overflow:hidden"><tr>'
        . '<td width="132" align="center" valign="middle" bgcolor="' . MAIL_INK . '" style="width:132px;background:' . MAIL_INK . ';padding:26px 8px">'
        . '<p style="margin:0;font-family:' . MAIL_SANS . ';font-size:12px;font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:#FF5A6E">' . e(strtoupper($when->format('M'))) . '</p>'
        . '<p style="margin:2px 0 0;font-family:' . MAIL_SERIF . ';font-size:56px;line-height:1.05;font-weight:700;color:#ffffff">' . e($when->format('j')) . '</p>'
        . '<p style="margin:4px 0 0;font-family:' . MAIL_SANS . ';font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#9A9AA2">' . e($when->format('Y')) . '</p></td>'
        . '<td valign="middle" style="padding:24px 26px">'
        . '<p style="margin:0 0 3px;font-family:' . MAIL_SANS . ';font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#8A8A92">Requested time</p>'
        . '<p style="margin:0 0 2px;font-family:' . MAIL_SERIF . ';font-size:24px;font-weight:700;color:' . MAIL_INK . '">' . e($when->format('l')) . '</p>'
        . '<p style="margin:0 0 12px;font-family:' . MAIL_SANS . ';font-size:18px;font-weight:700;color:' . MAIL_RED . '">' . e($when->format('g:i A')) . ' <span style="font-size:12px;font-weight:400;color:#8A8A92">Philippine Time (GMT+8)</span></p>'
        . '<p style="margin:0;font-family:\'Courier New\',Courier,monospace;font-size:13px;letter-spacing:.06em;color:#55555D">Ref ' . e($ref) . '</p>'
        . '</td></tr></table>';

    $details = '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:22px">'
        . mail_row('Name', (string) ($d['name'] ?? ''))
        . mail_row('Email', (string) ($d['email'] ?? ''))
        . mail_row('Phone', (string) ($d['phone'] ?? ''))
        . mail_row('The call is about', (string) ($d['purpose'] ?? ''))
        . mail_row('Your notes', (string) ($d['notes'] ?? ''), true)
        . '</table>';

    $steps = '<p style="margin:38px 0 20px;font-family:' . MAIL_SERIF . ';font-size:22px;font-weight:700;color:' . MAIL_INK . '">What happens next</p>'
        . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">'
        . mail_step(1, 'We confirm your time', 'You get a short email from us to confirm this day and time, or to suggest the nearest one.')
        . mail_step(2, 'We prepare for you', 'We look at your business so the call is useful from the first minute.')
        . mail_step(3, 'We talk, with no pressure', 'You get honest advice and a clear price in writing. Nothing to sign on the call.', true)
        . '</table>';

    $cta = '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:38px 0 30px"><tr><td>' . mail_button('Add to Google Calendar', $gcal, false)
        . '</td></tr><tr><td style="padding-top:14px;font-family:' . MAIL_SANS . ';font-size:13px;color:#8A8A92">Need a different time? Just reply to this email.</td></tr></table>';

    $html = mail_shell(
        $b,
        'We got your call request for ' . $when->format('l, M j') . ' at ' . $when->format('g:i A') . '.',
        'Call request received',
        'You are on our calendar, ' . e($first) . '.',
        'We received your request for a free call. We will confirm the time with you by email shortly.',
        '<p style="margin:0 0 26px;font-family:' . MAIL_SANS . ';font-size:15px;line-height:1.75;color:#44444C">Hi ' . e($first) . ', thank you for choosing a time with ' . e($b['name']) . '. Here are the details of your request.</p>' . $tile . $details . $steps . $cta
    );

    $text = "You are on our calendar, {$first}.\n\nWe received your request for a free call. We will confirm the time with you by email shortly.\n\n"
        . "Requested time: {$nice}\nReference: {$ref}\n"
        . (!empty($d['purpose']) ? "About: {$d['purpose']}\n" : '')
        . (!empty($d['notes']) ? "Notes: {$d['notes']}\n" : '')
        . "\nAdd to Google Calendar: {$gcal}\n"
        . "\nWhat happens next\n1. We confirm your time by email.\n2. We prepare for your call.\n3. We talk. Honest advice and a clear price, no pressure.\n"
        . "\nNeed us sooner?\nMobile / Viber / WhatsApp: {$b['phone']}\nMobile: {$b['phone2']}\nOffice: {$b['landline']}\nEmail: {$b['email']}\nHours: {$b['hours']}\n"
        . "\n{$b['name']} - {$b['tagline']}\n{$b['url']}\n";

    return ['subject' => 'Your free call request: ' . $when->format('D, M j') . ' at ' . $when->format('g:i A') . ' (' . $ref . ')', 'html' => $html, 'text' => $text];
}

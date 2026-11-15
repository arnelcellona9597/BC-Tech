<?php
declare(strict_types=1);

require __DIR__ . '/lib/bootstrap.php';
require __DIR__ . '/lib/mailer.php';
require __DIR__ . '/lib/email_templates.php';

require_post();
check_origin();
check_bots();
rate_limit();

[$f, $errors] = read_contact_fields();
$source  = in_array($_POST['source'] ?? '', ['home', 'hero', 'popup', 'contact'], true) ? $_POST['source'] : 'contact';
$need    = clean_line($_POST['need'] ?? '', 80);
$package = clean_line($_POST['package'] ?? '', 80);
$message = clean($_POST['message'] ?? '', 3000);
// Only the full contact page form needs a message. The short forms have an optional one.
if ($source === 'contact' && mb_strlen($message) < 5) {
    $errors[] = 'Please tell us a little about what you need.';
}
if ($errors) {
    respond(false, $errors[0], 422);
}

$cfg  = config();
$site = $cfg['site']['name'];
$from = ['home' => 'Home page form', 'hero' => 'Home page top form', 'popup' => 'Marketing popup', 'contact' => 'Contact page form'][$source];

// 1) Keep a copy first, so the message is never lost
$ref = new_reference();
save_submission($ref, 'inquiry', $f + ['need' => $need, 'package' => $package, 'message' => $message, 'source' => $source]);

// 2) Email it to the team (SMTP, then the server's own mailer as a backup)
$rows = array_filter([
    'Reference' => $ref,
    'Name'      => $f['name'],
    'Email'     => $f['email'],
    'Phone'     => $f['phone'],
    'Needs'     => $need,
    'Package'   => $package,
    'Message'   => $message,
    'Sent from' => $from,
], fn ($v) => $v !== '');

$subject = '[' . $ref . '] New website inquiry: ' . ($need !== '' ? $need : 'general') . ' from ' . $f['name'];
$ok = deliver_mail(
    $cfg['mail']['to'],
    $subject,
    email_html('New inquiry from the website', $rows, 'Reply to this email to answer ' . $f['name'] . ' directly.'),
    email_text('New inquiry from the website', $rows),
    $f['email'],
    $f['name'],
    (string) ($cfg['mail']['bcc'] ?? '')
);
mark_submission($ref, $ok ? 'emailed' : 'email_failed');

// 3) Confirmation to the visitor (designed email, see lib/email_templates.php)
if ($ok && !empty($cfg['mail']['autoreply'])) {
    $c = confirmation_inquiry($f + ['ref' => $ref, 'need' => $need, 'package' => $package, 'message' => $message], $cfg);
    send_mail($f['email'], $c['subject'], $c['html'], $c['text']);
}

// The copy is saved either way, so the message has been received.
respond(true, 'Thank you! We received your message. Your reference is ' . $ref . '. We will reply by email soon.');

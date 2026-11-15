<?php
declare(strict_types=1);

require __DIR__ . '/lib/bootstrap.php';
require __DIR__ . '/lib/mailer.php';

require_post();
check_origin();
check_bots();
rate_limit();

[$f, $errors] = read_contact_fields();
$source  = in_array($_POST['source'] ?? '', ['home', 'contact'], true) ? $_POST['source'] : 'contact';
$need    = clean_line($_POST['need'] ?? '', 80);
$message = clean($_POST['message'] ?? '', 3000);
// The short form on the home page has no message box; the contact page form does.
if ($source === 'contact' && mb_strlen($message) < 5) {
    $errors[] = 'Please tell us a little about what you need.';
}
if ($errors) {
    respond(false, $errors[0], 422);
}

$cfg  = config();
$site = $cfg['site']['name'];
$rows = array_filter([
    'Name'    => $f['name'],
    'Email'   => $f['email'],
    'Phone'   => $f['phone'],
    'Needs'   => $need,
    'Message' => $message,
    'Sent from' => $source === 'home' ? 'Home page form' : 'Contact page form',
], fn ($v) => $v !== '');

$subject = 'New website inquiry: ' . ($need !== '' ? $need : 'general') . ' from ' . $f['name'];
$ok = send_mail(
    $cfg['mail']['to'],
    $subject,
    email_html('New inquiry from the website', $rows, 'Reply to this email to answer ' . $f['name'] . ' directly.'),
    email_text('New inquiry from the website', $rows),
    $f['email'],
    $f['name'],
    (string) ($cfg['mail']['bcc'] ?? '')
);
if (!$ok) {
    respond(false, 'Sorry, we could not send your message just now. Please email us at ' . $cfg['mail']['to'] . '.', 500);
}

if (!empty($cfg['mail']['autoreply'])) {
    $first = explode(' ', $f['name'])[0];
    $reply = ['What happens next' => 'Thank you for contacting ' . $site . '. We got your message and will get back to you soon.'];
    $title = 'Thanks, ' . $first . '!';
    send_mail(
        $f['email'],
        'We got your message | ' . $site,
        email_html($title, $reply, $site . ' · ' . $cfg['site']['url']),
        email_text($title, $reply, $site . ' - ' . $cfg['site']['url'])
    );
}

respond(true, 'Thank you! We got your message and will reply soon.');

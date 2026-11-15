<?php
declare(strict_types=1);

require __DIR__ . '/lib/bootstrap.php';
require __DIR__ . '/lib/mailer.php';

require_post();
check_origin();
check_bots();
rate_limit();

[$f, $errors] = read_contact_fields();
$purpose = clean_line($_POST['purpose'] ?? '', 80);
$notes   = clean($_POST['notes'] ?? '', 1500);

$cfg = config();
$b   = $cfg['booking'];
$tz  = new DateTimeZone($b['timezone']);
$now = new DateTimeImmutable('now', $tz);

// Check the requested day and time against the same rules the calendar uses
$date = (string) ($_POST['date'] ?? '');
$time = (string) ($_POST['time'] ?? '');
$when = null;
if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $date) || !preg_match('/^\d{2}:\d{2}$/', $time) || !in_array($time, $b['slots'], true)) {
    $errors[] = 'Please choose a day and time.';
} else {
    $when = DateTimeImmutable::createFromFormat('Y-m-d H:i', "$date $time", $tz);
    if (!$when || $when->format('Y-m-d') !== $date) {
        $errors[] = 'That day is not valid.';
    } elseif (!in_array((int) $when->format('w'), $b['days'], true)) {
        $errors[] = 'We take calls on weekdays. Please pick another day.';
    } elseif ($when < $now->modify('+' . (int) $b['lead_hours'] . ' hours')) {
        $errors[] = 'That time is too soon. Please pick a later time.';
    } elseif ($when > $now->modify('+' . (int) $b['window_days'] . ' days')) {
        $errors[] = 'That day is too far ahead. Please pick an earlier day.';
    }
}
if ($errors) {
    respond(false, $errors[0], 422);
}

$nice = $when->format('l, F j, Y') . ' at ' . $when->format('g:i A') . ' (Philippine Time)';
$rows = array_filter([
    'Requested time' => $nice,
    'Name'    => $f['name'],
    'Email'   => $f['email'],
    'Phone'   => $f['phone'],
    'About'   => $purpose,
    'Notes'   => $notes,
], fn ($v) => $v !== '');

$ok = send_mail(
    $cfg['mail']['to'],
    'Call request: ' . $when->format('D M j, g:i A') . ' - ' . $f['name'],
    email_html('New free call request', $rows, 'Please confirm this time with ' . $f['name'] . ' by replying to this email.'),
    email_text('New free call request', $rows),
    $f['email'],
    $f['name'],
    (string) ($cfg['mail']['bcc'] ?? '')
);
if (!$ok) {
    respond(false, 'Sorry, we could not send your request just now. Please email us at ' . $cfg['mail']['to'] . '.', 500);
}

if (!empty($cfg['mail']['autoreply'])) {
    $first = explode(' ', $f['name'])[0];
    $reply = ['Requested time' => $nice, 'What happens next' => 'We will confirm this time with you by email shortly.'];
    $title = 'Thanks, ' . $first . '! We got your call request.';
    send_mail(
        $f['email'],
        'We got your call request | ' . $cfg['site']['name'],
        email_html($title, $reply, $cfg['site']['name'] . ' · ' . $cfg['site']['url']),
        email_text($title, $reply, $cfg['site']['name'] . ' - ' . $cfg['site']['url'])
    );
}

respond(true, 'Request received. We will confirm ' . $when->format('l, M j') . ' at ' . $when->format('g:i A') . ' by email.');

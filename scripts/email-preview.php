<?php
declare(strict_types=1);
/**
 * Writes sample confirmation emails to docs/email-preview/ so you can open them in a browser.
 * Nothing is sent.  Run:  php scripts/email-preview.php
 */
const API_ROOT = __DIR__ . '/../src/static/api';
function config(): array { static $c = null; return $c ??= require API_ROOT . '/config.example.php'; }
require API_ROOT . '/lib/email_templates.php';

$out = __DIR__ . '/../docs/email-preview';
@mkdir($out, 0755, true);
$cfg = config();
// Preview shows the logo from the local files instead of the live domain
$local = fn (string $h): string => str_replace('https://bctech.com/assets/img/email/', '../../src/static/assets/img/email/', $h);

$a = confirmation_inquiry([
    'name' => 'Rica Dela Cruz', 'email' => 'rica@example.com', 'phone' => '0917 123 4567',
    'ref' => 'BC-261120-7K3QX', 'need' => 'An online store', 'package' => 'Online Store (from ₱70,000)',
    'message' => 'We sell handmade soaps in Davao and want to start selling online with GCash and courier delivery.',
], $cfg);
file_put_contents("$out/confirmation-inquiry.html", $local($a['html']));
file_put_contents("$out/confirmation-inquiry.txt", $a['subject'] . "\n\n" . $a['text']);

$when = new DateTimeImmutable('2026-11-19 09:00', new DateTimeZone('Asia/Manila'));
$b = confirmation_booking([
    'name' => 'Rica Dela Cruz', 'email' => 'rica@example.com', 'phone' => '0917 123 4567',
    'ref' => 'BC-261119-A27C0', 'purpose' => 'A new website', 'notes' => 'Please call after lunch if 9 AM is not available.',
], $cfg, $when);
file_put_contents("$out/confirmation-booking.html", $local($b['html']));
file_put_contents("$out/confirmation-booking.txt", $b['subject'] . "\n\n" . $b['text']);
echo "Wrote 4 files to docs/email-preview/\n";

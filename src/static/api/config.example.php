<?php
/**
 * BC Tech form settings.
 *
 * SETUP ON THE SERVER:
 *   1. Copy this file to  config.php  (same folder). config.php is never committed to git.
 *   2. Change 'driver' to 'smtp' and fill in the SMTP details from your hosting (cPanel > Email Accounts > Connect Devices).
 *   3. Keep the booking rules below in sync with src/data/site.mjs ("booking").
 *
 * Until config.php exists, emails are written to api/storage/mail.log instead of being sent (safe for testing).
 */
return [
    'mail' => [
        'driver'     => 'log',                         // 'log' (testing) or 'smtp' (real emails)
        'to'         => 'info@bctech.com',             // company inbox (forward it to Gmail in cPanel as well)
        'bcc'        => 'arnelcellona9597@gmail.com',  // extra copy of every inquiry. Leave '' to turn off.
        'from_email' => 'info@bctech.com',             // must be an address on your own domain (helps avoid spam folders)
        'from_name'  => 'BC Tech Website',
        'autoreply'  => true,                          // send visitors a short "we got your message" email
        'smtp' => [
            'host'   => 'mail.bctech.com',             // TODO: from your hosting provider
            'port'   => 587,                           // 587 with 'tls', or 465 with 'ssl'
            'secure' => 'tls',                         // 'tls' (STARTTLS) or 'ssl'
            'user'   => 'info@bctech.com',
            'pass'   => 'CHANGE_ME',
        ],
    ],
    'site' => [
        'name'          => 'BC Tech',
        'url'           => 'https://bctech.com',
        // Shown in the confirmation emails
        'phone'         => '+63 951 487 4304',
        'landline'      => '(082) 2929 822',
        'hours'         => 'Monday to Friday, 9:00 AM to 5:00 PM (Philippine Time)',
        'city'          => 'Davao City, Philippines',
        'tagline'       => 'Built to Bring You Business.',
        // Forms only accept submissions that come from these hosts
        'allowed_hosts' => ['bctech.com', 'www.bctech.com', 'localhost', '127.0.0.1'],
    ],
    'booking' => [
        'timezone'    => 'Asia/Manila',
        'days'        => [1, 2, 3, 4, 5],              // 0 = Sunday ... 6 = Saturday
        'slots'       => ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'],
        'window_days' => 45,                           // how far ahead people can book
        'lead_hours'  => 12,                           // earliest bookable time from now
    ],
    'limits' => [
        'per_ip_per_hour' => 8,                        // max form submissions per visitor per hour
        'min_seconds'     => 2,                        // forms sent faster than this are treated as bots
    ],
];

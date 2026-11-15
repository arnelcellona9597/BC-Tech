// Site-wide constants. Change the domain here and rebuild; everything else follows.
export const site = {
  name: 'BC Tech',
  legalName: 'BC Tech',
  tagline: 'Built to Bring You Business.',
  url: 'https://bctech.com',
  email: 'info@bctech.com',
  locale: 'en_PH',
  lang: 'en-PH',
  city: 'Davao City',
  region: 'Davao del Sur',
  country: 'PH',
  countryName: 'Philippines',
  // TODO(client): add real phone/Viber/WhatsApp number, e.g. '+63 9XX XXX XXXX'
  phone: '',
  // TODO(client): add the Facebook page URL (and other profiles). Used for schema "sameAs" and the footer.
  // Leave a link empty until the page exists. The icon shows as a plain (non-clickable) badge until a link is added.
  social: { facebook: '', messenger: '', linkedin: '', youtube: '', whatsapp: '', googleBusiness: '' },
  themeColor: '#0B0B0C',
  hours: 'Monday to Friday, 9:00 AM to 5:00 PM (Philippine Time)',
  openHours: { days: [1, 2, 3, 4, 5], start: 9, end: 17, timezone: 'Asia/Manila' },
  // Booking rules. Keep in sync with public/api/config.example.php ("booking").
  booking: {
    days: [1, 2, 3, 4, 5], // Mon-Fri (0 = Sunday)
    slots: ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'],
    windowDays: 45, // how far ahead people can book
    leadHours: 12, // earliest slot is this many hours from now
    timezone: 'Asia/Manila',
  },
  built: '2026-11-15',
};

export const nav = [
  { key: 'home', label: 'Home', href: '/', desc: 'Where your customers start' },
  { key: 'services', label: 'Services', href: '/services/', desc: 'What we build for you' },
  { key: 'pricing', label: 'Pricing', href: '/pricing/', desc: 'Clear prices in pesos' },
  { key: 'work', label: 'Our Work', href: '/work/', desc: 'Real results, real clients' },
  { key: 'about', label: 'About', href: '/about/', desc: 'The team behind BC Tech' },
];

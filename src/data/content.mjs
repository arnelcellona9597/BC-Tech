// All page copy that is reused across pages lives here (plain language, sales-first).
// Keep claims honest: BC Tech is new, so no invented stats, awards or testimonials.

export const services = [
  {
    id: 'systems',
    icon: 'code',
    title: 'Websites & Systems',
    blurb: 'The website itself, built to fit how your business works, from a simple company site to a full online store.',
    items: [
      'Websites you can edit yourself (CMS), no coding needed',
      'Online stores that take GCash, Maya and cards (e-commerce)',
      'Link your website to your other software (REST API integration)',
      'Connect to your inventory, accounting or ERP system',
      'Custom features built just for you (custom code)',
    ],
  },
  {
    id: 'brand',
    icon: 'brand',
    title: 'Brand & Look',
    blurb: 'A look that makes people trust you before they even call.',
    items: [
      'Logo design, color palette and a simple brand style guide',
      'Tagline and the right tone for how you talk to customers',
      'Social media covers, profile pictures and post templates',
      'Business cards, letterheads, invoice and quotation templates',
      'Icons, diagrams and illustrations for your website and print',
    ],
  },
  {
    id: 'words',
    icon: 'pen',
    title: 'Words That Sell',
    blurb: 'Clear, friendly writing that tells visitors why you are the right choice.',
    items: [
      'Homepage, About, Services and Contact page writing',
      'Pages written to be found on Google for the words customers search',
      'Blog posts and articles that keep bringing people in',
      'Product and service descriptions for your online store',
      'FAQs, page titles and descriptions',
    ],
  },
  {
    id: 'preview',
    icon: 'layout',
    title: 'See It Before We Build It',
    blurb: 'Approve how your website looks and works before any building starts.',
    items: [
      'Clickable previews of your website for your sign-off',
      'Different landing page versions so you can test what works best',
      'Pricing page and comparison table layouts',
      'Dashboard and admin screen concepts',
    ],
  },
  {
    id: 'tools',
    icon: 'tool',
    title: 'Tools That Win Customers',
    blurb: 'Small helpers on your website that turn visitors into inquiries and bookings.',
    items: [
      'Quote and price calculators',
      'Booking and inquiry forms that work the way you do',
      'An AI assistant that answers customer questions on your site, day and night',
      'Product pickers that help people choose',
    ],
  },
  {
    id: 'marketing',
    icon: 'megaphone',
    title: 'Marketing & Growth',
    blurb: 'Keep your name in front of customers after the website is live.',
    items: [
      'Email follow-ups: welcome emails, newsletters, abandoned cart reminders',
      'Social media content calendars and captions',
      'Ad writing for Facebook and Google Ads',
      'Competitor and market research summaries',
    ],
  },
  {
    id: 'seo',
    icon: 'search',
    title: 'Found on Google',
    blurb: 'Make it easy for Google, and for every visitor, to understand and use your site.',
    items: [
      'On-page SEO: titles, descriptions and page structure',
      'Search listing setup (schema markup) so you stand out in results',
      'Content and accessibility check-ups with a clear to-do list',
      'Fast loading on phones and computers',
    ],
  },
];

export const problems = [
  { icon: 'search', title: 'Customers cannot find you', text: 'You are not showing up when people search Google for what you sell.' },
  { icon: 'cursor', title: 'Visitors do not know what to do next', text: 'They look around, get confused, and leave without calling or booking.' },
  { icon: 'pencil', title: 'Every small change needs a programmer', text: 'Updating a price or a photo should take minutes, not weeks.' },
];

export const promises = [
  { icon: 'search', title: 'Found on Google', text: 'Every page is set up so search engines understand it and show it to the right people.' },
  { icon: 'cursor', title: 'One clear next step', text: 'Every page leads visitors to call you, book a visit, or ask for a quote.' },
  { icon: 'pencil', title: 'Easy to update', text: 'Change text, photos and products yourself, without calling a developer.' },
];

export const why = [
  { icon: 'pin', title: 'A local team', text: 'We are based in Davao City. You talk to the people who actually build your website.' },
  { icon: 'shield', title: '7+ years each', text: 'BC Tech is new, but every member of our team has at least 7 years in web design and development.' },
  { icon: 'code', title: 'Any platform you prefer', text: 'WordPress, Shopify, Laravel, React, Next.js or something else? Tell us. We can handle it :)' },
  { icon: 'bolt', title: 'Fast on every phone', text: 'Your site loads quickly and looks right on phones, tablets and computers.' },
  { icon: 'cursor', title: 'Built to sell', text: 'We design every page around one question: will this get the customer to contact you?' },
];

export const process = [
  { title: 'Talk', text: 'A free call. We learn about your business and what you want more of: calls, bookings or sales.' },
  { title: 'Preview', text: 'You see a clickable preview of your website and approve it before we build anything.' },
  { title: 'Build', text: 'We design and build your website with your logo, your words, and the tools you need.' },
  { title: 'Launch & grow', text: 'We go live, then keep your site updated and growing with a care plan or monthly support.' },
];

export const stacks = ['WordPress', 'WooCommerce', 'Shopify', 'Laravel', 'React', 'Next.js', 'Vue', 'Node.js', 'PHP', 'and more'];

export const marquee = [
  'Websites',
  'Online stores',
  'Booking pages',
  'Logos & branding',
  'Found on Google',
  'Connect your systems',
  'Easy to edit',
];

// Prices come from the "BC Tech - Pricing" Google Doc (PHP, estimates).
export const packages = [
  {
    id: 'cms-small',
    name: 'Starter Website',
    sub: 'CMS, 1 to 6 pages',
    from: 25000,
    to: 45000,
    forWho: 'Small businesses and personal brands that need a clear, good-looking home online.',
    items: [
      'Up to 6 pages',
      'Looks right on phones, tablets and computers',
      'Edit it yourself (WordPress CMS)',
      'Contact form',
      'Basic Google setup (on-page SEO)',
      '2 rounds of changes',
      '1 month of free support',
    ],
  },
  {
    id: 'cms-growing',
    name: 'Business Website',
    sub: 'CMS, 7 to 25 pages',
    from: 45000,
    to: 90000,
    forWho: 'Growing companies with several services, a team page or lots to say.',
    items: [
      'Up to 25 pages',
      'Training so your team can edit the site',
      'Blog or news section',
      'Google setup (on-page SEO)',
      'Inquiry and contact forms',
      '3 rounds of changes',
      '1 month of free support',
    ],
  },
  {
    id: 'store-small',
    name: 'Online Store',
    sub: 'E-commerce, up to 50 products',
    from: 70000,
    to: 130000,
    forWho: 'Shops that are ready to sell online with a small product range.',
    items: [
      'Store on WooCommerce or Shopify',
      'Up to 50 products uploaded for you',
      'Pay with GCash, Maya or card',
      'Shipping and tax setup',
      'Basic stock tracking',
      '3 rounds of changes',
      '1 month of free support',
    ],
  },
  {
    id: 'store-large',
    name: 'Online Store Plus',
    sub: 'E-commerce, 51 products and above',
    from: 130000,
    to: 250000,
    forWho: 'Bigger catalogs that need sizes, colors, stock control and courier links.',
    items: [
      'Bulk product upload (51 or more)',
      'Sizes, colors and advanced stock tracking',
      'Several payment options',
      'Courier and shipping connection',
      'Customer accounts and order tracking',
      '4 rounds of changes',
      '1 month of free support',
    ],
  },
  {
    id: 'promax',
    name: 'Pro Max',
    sub: 'Integrations, custom builds and more',
    from: 250000,
    to: 600000,
    open: true,
    forWho: 'When you need your website to talk to your other systems or do something unique.',
    items: [
      'Custom website features built for you',
      'Connect to CRM, ERP, booking and payment systems (API integration)',
      'Custom design for your brand',
      'Automations that save your team time',
      'A dedicated project manager',
      'Room to grow as you grow',
    ],
  },
];

export const addons = [
  {
    id: 'domain',
    icon: 'globe',
    name: 'Domain name',
    sub: 'Your web address, like yourbusiness.com',
    price: '₱298 – ₱2,918',
    unit: 'per year',
    text: 'A .com starts at ₱298 for the first year and renews at ₱888. A .ph address is ₱2,918 a year.',
  },
  {
    id: 'hosting',
    icon: 'server',
    name: 'Hosting',
    sub: 'The place your website lives online',
    price: '₱936 – ₱29,772',
    unit: 'per year',
    text: 'Small sites start at about ₱78 a month. Busy stores and bigger sites need stronger plans. Includes a security certificate (SSL).',
  },
  {
    id: 'care',
    icon: 'shield',
    name: 'Monthly care',
    sub: 'Keep your site safe and up to date',
    price: '₱1,500 – ₱5,000',
    unit: 'per month',
    text: 'Content updates, software and security updates, backups, uptime checks and small fixes.',
  },
  {
    id: 'retainer',
    icon: 'bolt',
    name: 'Growth retainer',
    sub: 'A team on call as you grow',
    price: '₱5,000 – ₱20,000',
    unit: 'per month',
    text: 'Ongoing improvements, priority support with same-day replies, and a monthly report.',
  },
];

export const faqs = {
  home: [
    { q: 'How much does a website cost?', a: 'A simple website of up to 6 pages starts at ₱25,000. Online stores start at ₱70,000. Bigger projects with custom features are quoted after a free call. See the <a href="/pricing/">pricing page</a> for every package.' },
    { q: 'Can I edit the website myself?', a: 'Yes. Our CMS websites let you change text, photos and products yourself, with no coding. We show you how.' },
    { q: 'I already use a certain platform. Can you work with it?', a: 'Yes. WordPress, Shopify, Laravel, React, Next.js and more. If you prefer a certain tool, tell us. We can handle it :)' },
    { q: 'Can you connect my website to my other software?', a: 'Yes. We can link your website to your accounting, inventory, payment or ERP system so your team stops typing the same thing twice.' },
    { q: 'Will people find my website on Google?', a: 'We set up every page so Google can understand it: clear titles and descriptions, fast loading and mobile-friendly design. No one can promise the number one spot, but you will start strong.' },
    { q: 'What do I pay for besides the website?', a: 'A domain name (your web address) and hosting (where your website lives). Monthly care and a growth plan are optional. All are listed on the <a href="/pricing/#extras">pricing page</a>.' },
  ],
  pricing: [
    { q: 'Why is there a price range?', a: 'The number of pages, products and special features changes the work. The range shows the typical start and finish. We confirm your exact price after a free call, before you pay anything.' },
    { q: 'Are the domain and hosting included?', a: 'No. They are paid to the provider each year, and we set them up for you. See the extras section on this page for typical prices.' },
    { q: 'What if I need something that is not listed?', a: 'Choose Pro Max. We build custom features and connect your website to other systems. Tell us what you need and we will quote it.' },
    { q: 'Do you offer ongoing help after the website is live?', a: 'Yes. Every package includes 1 month of free support. After that you can choose monthly care to keep your site safe and updated, or a growth retainer for ongoing improvements.' },
    { q: 'Are the prices in Philippine pesos?', a: 'Yes. All prices are in PHP and are starting estimates. They may change, and we always confirm the final price in writing.' },
  ],
  services: [
    { q: 'Do I have to buy everything?', a: 'No. Pick only what you need. Many clients start with a website and add branding, writing or marketing later.' },
    { q: 'Can you work with the logo and writing I already have?', a: 'Yes. We can build with what you have, or improve it. Just tell us on the free call.' },
    { q: 'What is an AI assistant for my website?', a: 'It is a chat box on your site that answers common customer questions, such as prices, opening hours and how to book, any time of day. It points people to you when they are ready to buy.' },
  ],
};

export const lyfd = {
  name: 'LYFD Stainless Fabrication and Services',
  short: 'LYFD',
  url: 'https://lyfdfab.com/',
  place: 'Davao City',
  does: 'Custom stainless steel kitchens, hoods, ducting, blowers, counters and metal works for restaurants, hotels, commissaries and homeowners.',
  features: [
    { icon: 'layout', title: 'Product pages that show the work', text: 'Kitchens, counters and sinks, cooking stations, and blowers and ducting, each with its own section.' },
    { icon: 'pen', title: 'A quote request form', text: 'Visitors say what they need, from kitchens to hoods to custom metal works, and send it in one tap.' },
    { icon: 'calendar', title: 'A book-a-visit calendar', text: 'Customers pick a date and time for a workshop visit, a site inspection or a quotation consultation.' },
    { icon: 'chat', title: 'Chat on Messenger', text: 'A floating chat button lets people reach the team the way they already talk every day.' },
  ],
};

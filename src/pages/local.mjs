import { icon, btn, slider, faqList, sectionHead, featureCard, ctaBand, mark, esc } from '../lib/components.mjs';
import { services } from '../data/content.mjs';
import { guides } from '../data/guides.mjs';
import { serviceUrl } from '../lib/service-url.mjs';

// Local landing pages. Plain, honest copy: Davao Byte is new, so no invented stats, awards or testimonials.
const byId = Object.fromEntries(services.map((s) => [s.id, s]));
const itemIcons = ['check', 'bolt', 'shield', 'globe', 'cursor'];

const pages = [
  {
    slug: 'web-design-davao-city',
    eyebrow: 'Web design in Davao City',
    title: 'Web Design in Davao City | Davao Byte',
    metaDesc: 'A Davao City web design and development team. Websites and online stores that bring you customers, with a free call first and a clear written price.',
    ogHeadline: 'Web design in Davao City',
    h1: 'Web design in <span class="accent">Davao City</span> that brings you customers',
    lead: 'We are a small web design and development team based in Davao City. We build websites that help people find you, trust you and contact you, and we explain everything in plain words.',
    whoTitle: 'Why a Davao team can help',
    who: [
      'We work in English, Tagalog and Visayan, so you can explain your business the way you normally talk about it.',
      'We know how people here pay and look for businesses: GCash, Maya, Google Maps and Facebook.',
      'You can reach us by phone, Messenger or email, and we reply during Philippine business hours.',
      'Every project starts with a free call, and the price is confirmed in writing before any work begins.',
    ],
    buildTitle: 'What we build for Davao businesses',
    build: [
      { t: 'Company websites', d: 'A clear site that shows what you offer, where you are and how to reach you, easy for you to edit later.' },
      { t: 'Online stores', d: 'Shops that take GCash, Maya and cards, with shipping and tax set up.' },
      { t: 'Booking and inquiry tools', d: 'Let customers book a call, request a quote or send an inquiry without messaging back and forth.' },
      { t: 'Google and Facebook setup', d: 'Your Google Business Profile, search basics and social pages, so your name shows up when people search.' },
    ],
    steps: [
      { t: 'Free call', d: 'Tell us about your business and what you want the website to do. No pressure to buy.' },
      { t: 'Clickable preview', d: 'You see and approve a preview before we build the full site.' },
      { t: 'Launch and support', d: 'We launch the site, set up Google, and stay available after launch.' },
    ],
    faq: [
      { q: 'Do you only work with businesses in Davao City?', a: 'We are based in Davao City and love working with local businesses, but we also help clients elsewhere in the Philippines.' },
      { q: 'How much does a website cost?', a: 'It depends on the pages and features. Our <a href="/pricing/">pricing page</a> shows typical ranges in pesos, and we confirm your exact price in writing after a free call.' },
      { q: 'Can I meet you in person?', a: 'Most clients start with a free call. If you would like to meet, tell us when you book and we will arrange it.' },
    ],
    related: ['systems', 'seo'],
    guides: ['website-cost-philippines'],
  },
  {
    slug: 'website-for-restaurants-davao',
    eyebrow: 'Websites for restaurants and cafes',
    title: 'Website for Restaurants and Cafes in Davao | Davao Byte',
    metaDesc: 'Websites for Davao restaurants, cafes and food businesses: menu with prices, branches on a map, opening hours and easy ways to order or reserve.',
    ogHeadline: 'Websites for restaurants in Davao',
    h1: 'A website for your <span class="accent">restaurant or cafe</span> in Davao',
    lead: 'Hungry customers search on their phones. We build fast, simple websites that show your menu, your location and your opening hours, and make it easy to call, order or reserve.',
    whoTitle: 'Made for food businesses',
    who: [
      'Restaurants, cafes, bakeries, food stalls and catering services.',
      'Owners who have a Facebook page but want a place that is easy to find on Google.',
      'Businesses with more than one branch that need each address and phone number clear.',
      'Franchise owners who want a section for franchise inquiries.',
    ],
    buildTitle: 'What your food website can include',
    build: [
      { t: 'Menu with prices', d: 'A clean, mobile-friendly menu that you can update yourself when prices or dishes change.' },
      { t: 'Branches and map', d: 'Each branch with address, phone, opening hours and a map link, so nobody gets lost.' },
      { t: 'Order and reserve', d: 'A reservation or inquiry form, or links to your ordering channels, in one clear place.' },
      { t: 'Photos that load fast', d: 'Your best food photos, prepared so the page stays quick on mobile data.' },
    ],
    steps: [
      { t: 'Free call', d: 'Tell us about your menu, branches and how customers order today.' },
      { t: 'Clickable preview', d: 'You approve a preview with your real menu before we build the full site.' },
      { t: 'Launch and Google setup', d: 'We launch, then set up your Google Business Profile so your opening hours and photos show on Maps.' },
    ],
    faq: [
      { q: 'I already have a Facebook page. Do I still need a website?', a: 'A Facebook page is a good start, but a website shows up in Google searches, loads your full menu and branches clearly, and belongs to you. Read our guide on <a href="/guides/facebook-page-or-website/">Facebook page or website</a>.' },
      { q: 'Can I update the menu myself?', a: 'Yes. We build it so you can edit text and prices yourself without coding, and we show you how.' },
      { q: 'Can customers order online?', a: 'We can add an inquiry or reservation form, or connect to the ordering channels you already use. If you want a full online store, ask about an online store on a <a href="/contact/#book">free call</a>.' },
    ],
    related: ['systems', 'tools'],
    guides: ['website-cost-philippines'],
  },
  {
    slug: 'online-store-developer-davao',
    eyebrow: 'Online store developer in Davao',
    title: 'Online Store Developer in Davao | Davao Byte',
    metaDesc: 'Davao Byte builds online stores on WooCommerce or Shopify with GCash, Maya and card payments, shipping and tax setup, and product upload.',
    ogHeadline: 'Online store developer in Davao',
    h1: 'An <span class="accent">online store</span> built by a Davao developer',
    lead: 'We build online stores that take GCash, Maya and cards, on WooCommerce or Shopify, whichever fits how you sell. We set up the checkout, shipping and tax so you can start taking orders.',
    whoTitle: 'Who our online stores are for',
    who: [
      'Shops that sell products in person or on social media and want their own online store.',
      'Businesses with a small to medium product range that need clear categories and simple checkout.',
      'Owners who want to manage products and orders themselves.',
      'Businesses that need the store to connect to inventory or accounting software.',
    ],
    buildTitle: 'What your online store includes',
    build: [
      { t: 'Store on WooCommerce or Shopify', d: 'We recommend the one that fits you honestly, even if it is not our favorite tool.' },
      { t: 'GCash, Maya or card', d: 'Payment options your customers already use, tested before launch.' },
      { t: 'Shipping and tax setup', d: 'Delivery options and tax set up correctly so checkout is clear.' },
      { t: 'Products uploaded for you', d: 'We upload your first products with photos and descriptions so the store is ready to go.' },
    ],
    steps: [
      { t: 'Free call', d: 'Tell us what you sell and how orders reach you today.' },
      { t: 'Clickable preview', d: 'You approve how the store looks and works before we build it fully.' },
      { t: 'Launch and support', d: 'We launch, test an order with you, and support you after launch.' },
    ],
    faq: [
      { q: 'Shopify or WooCommerce?', a: 'Both work well. Shopify is simpler and managed for you; WooCommerce gives more control. Our guide <a href="/guides/shopify-vs-woocommerce/">Shopify or WooCommerce</a> explains the difference, and we will recommend honestly on a free call.' },
      { q: 'Can the store take GCash and Maya?', a: 'Yes. Both platforms can be set up with GCash, Maya and cards. We check the exact options with you during planning.' },
      { q: 'How much does an online store cost?', a: 'It depends on your products and features. See typical ranges on our <a href="/pricing/">pricing page</a>; your exact price is confirmed in writing after a free call.' },
    ],
    related: ['systems', 'integrations'],
    guides: ['shopify-vs-woocommerce'],
  },
  {
    slug: "website-for-salons-davao",
    eyebrow: "Websites for salons and spas",
    title: "Website for Salons and Spas in Davao | Davao Byte",
    metaDesc: "Websites for Davao salons, barbershops and spas: services and prices, photo gallery, branches on a map and easy online appointment requests.",
    ogHeadline: "Websites for salons and spas in Davao",
    h1: "A website for your <span class=\"accent\">salon or spa</span> in Davao",
    lead: "Customers look at photos and prices before they book. We build a clean, fast website that shows your services, your work and your branches, and makes booking simple.",
    whoTitle: "Made for beauty businesses",
    who: [
      "Hair salons, barbershops, nail studios, spas and aesthetic clinics.",
      "Owners who rely on Facebook messages and want fewer back-and-forth chats about prices.",
      "Businesses with more than one branch that need each address and phone number clear.",
      "Stylists who want a gallery that shows their best work.",
    ],
    buildTitle: "What your salon website can include",
    build: [
      { t: "Services and price menu", d: "A clear list of services with prices, easy to update when something changes." },
      { t: "Photo gallery", d: "Your best before-and-after photos, prepared so the page stays fast on mobile data." },
      { t: "Appointment requests", d: "A booking or inquiry form so customers can request a time without messaging back and forth." },
      { t: "Branches and map", d: "Each branch with address, hours and a map link." },
    ],
    steps: [
      { t: 'Free call', d: 'Tell us about your business and what you want the website to do. No pressure to buy.' },
      { t: 'Clickable preview', d: 'You approve a preview with your real details before we build the full site.' },
      { t: 'Launch and Google setup', d: 'We launch, then set up your Google Business Profile so your hours, photos and map pin show on Google.' },
    ],
    faq: [
      { q: "Can customers book online?", a: "We can add an appointment request form, or connect to the booking channels you already use. The details are set on a free call." },
      { q: "I post my work on Facebook already. Is that enough?", a: "Facebook is great for showing your work. A website adds clear prices, hours and booking in one place, and it can appear on Google searches. See <a href=\"/guides/facebook-page-or-website/\">Facebook page or website</a>." },
      { q: "Can I change prices myself?", a: "Yes. We build it so you can edit text and prices without coding." },
    ],
    related: ["systems", "tools"],
    guides: ["facebook-page-or-website"],
    footer: false,
  },
  {
    slug: "website-for-auto-repair-shops-davao",
    eyebrow: "Websites for auto repair shops",
    title: "Website for Auto Repair Shops in Davao | Davao Byte",
    metaDesc: "Websites for Davao auto repair shops and car care centers: services, location on a map, opening hours and a simple way to request a booking or quote.",
    ogHeadline: "Websites for auto repair shops in Davao",
    h1: "A website for your <span class=\"accent\">auto repair shop</span> in Davao",
    lead: "When a car breaks down, people search on their phone. We build a simple website that shows what you repair, where you are and how to reach you, so more drivers find and call you.",
    whoTitle: "Made for auto and car care shops",
    who: [
      "Auto repair shops, aircon and electrical specialists, car wash and detailing.",
      "Garages that get most customers by word of mouth and want to be found on Google Maps.",
      "Shops that want customers to request a quote or booking before they arrive.",
      "Owners who want clear opening hours, directions and a phone number that is easy to tap.",
    ],
    buildTitle: "What your auto shop website can include",
    build: [
      { t: "Services list", d: "What you repair and service, in plain words customers understand." },
      { t: "Location and hours", d: "A map link, directions and opening hours that match your Google listing." },
      { t: "Quote and booking form", d: "Customers send their car details and preferred time in one message." },
      { t: "Photos and reviews", d: "Real photos of your shop and work, with room for customer reviews." },
    ],
    steps: [
      { t: 'Free call', d: 'Tell us about your business and what you want the website to do. No pressure to buy.' },
      { t: 'Clickable preview', d: 'You approve a preview with your real details before we build the full site.' },
      { t: 'Launch and Google setup', d: 'We launch, then set up your Google Business Profile so your hours, photos and map pin show on Google.' },
    ],
    faq: [
      { q: "Will a website help me show on Google Maps?", a: "Your Google Business Profile is what appears on Maps. A website supports it with details and trust, and we help set up both. See <a href=\"/guides/get-your-business-on-google-maps/\">how to get on Google Maps</a>." },
      { q: "Can customers send photos of the problem?", a: "We can add a form where customers describe the problem and share their contact details. File uploads can be added if you want them." },
      { q: "How much does it cost?", a: "It depends on the pages and features. See typical ranges on our <a href=\"/pricing/\">pricing page</a>; your exact price is confirmed in writing after a free call." },
    ],
    related: ["systems", "seo"],
    guides: ["get-your-business-on-google-maps"],
    footer: false,
  },
  {
    slug: "website-for-hardware-and-construction-supply-davao",
    eyebrow: "Websites for hardware and construction suppliers",
    title: "Website for Hardware Suppliers in Davao | Davao Byte",
    metaDesc: "Websites for Davao hardware stores and construction suppliers: product categories, brands, price-list requests, branch locations and contractor quote forms.",
    ogHeadline: "Websites for hardware suppliers in Davao",
    h1: "A website for your <span class=\"accent\">hardware or construction supply</span> business",
    lead: "Contractors and homeowners want to know what you stock before they drive over. We build a simple catalog website with your categories, brands and a quick way to ask for prices.",
    whoTitle: "Made for suppliers and traders",
    who: [
      "Hardware stores, construction supply, paint, electrical and plumbing suppliers.",
      "Businesses that answer the same price and stock questions by phone every day.",
      "Suppliers who want contractors to send a bill-of-materials for a quote.",
      "Owners with more than one branch or a warehouse and a showroom.",
    ],
    buildTitle: "What your supplier website can include",
    build: [
      { t: "Product categories and brands", d: "A clear catalog of what you carry, so customers know before they call." },
      { t: "Price-list and quote requests", d: "A form where contractors list what they need and receive a quote." },
      { t: "Branches and directions", d: "Addresses, hours and map links for each store or warehouse." },
      { t: "Connect to your inventory", d: "If you keep stock in software, we can connect it so the website matches, as described in our <a href=\"/guides/what-is-erp-integration/\">ERP integration guide</a>." },
    ],
    steps: [
      { t: 'Free call', d: 'Tell us about your business and what you want the website to do. No pressure to buy.' },
      { t: 'Clickable preview', d: 'You approve a preview with your real details before we build the full site.' },
      { t: 'Launch and Google setup', d: 'We launch, then set up your Google Business Profile so your hours, photos and map pin show on Google.' },
    ],
    faq: [
      { q: "Do I have to put every product online?", a: "No. Start with your main categories and best-selling items, and add more over time." },
      { q: "Can the website show live stock?", a: "It can, if your inventory software has a way to connect. We check this on a free call, and a simple catalog works well without it." },
      { q: "Can I show prices?", a: "You choose. Some suppliers show prices, others ask customers to request a quote." },
    ],
    related: ["systems", "integrations"],
    guides: ["what-is-erp-integration"],
    footer: false,
  },
  {
    slug: "website-for-bakeries-and-cake-shops-davao",
    eyebrow: "Websites for bakeries and cake shops",
    title: "Website for Bakeries and Cake Shops in Davao | Davao Byte",
    metaDesc: "Websites for Davao bakeries and cake shops: menu with prices, custom cake order form, gallery, branches and delivery or pickup information.",
    ogHeadline: "Websites for bakeries and cake shops in Davao",
    h1: "A website for your <span class=\"accent\">bakery or cake shop</span> in Davao",
    lead: "People choose cakes with their eyes. We build a mouth-watering, fast website with your menu, a gallery of your cakes and a simple form for custom orders.",
    whoTitle: "Made for bakeries and sweet shops",
    who: [
      "Bakeries, cake shops, pastry makers and home bakers who are growing.",
      "Owners who take orders by message and want one clear place for flavors, sizes and prices.",
      "Shops that want customers to order custom cakes with date and delivery details.",
      "Businesses that want to be found when people search for cakes nearby.",
    ],
    buildTitle: "What your bakery website can include",
    build: [
      { t: "Menu with prices", d: "Breads, pastries and cakes with sizes and prices, easy for you to update." },
      { t: "Cake gallery", d: "Photos of your best work, prepared so the page loads fast on a phone." },
      { t: "Custom order form", d: "Customers choose size, flavor, date and delivery or pickup in one message." },
      { t: "Delivery and pickup info", d: "Your areas, cut-off times and how to pay, shown clearly." },
    ],
    steps: [
      { t: 'Free call', d: 'Tell us about your business and what you want the website to do. No pressure to buy.' },
      { t: 'Clickable preview', d: 'You approve a preview with your real details before we build the full site.' },
      { t: 'Launch and Google setup', d: 'We launch, then set up your Google Business Profile so your hours, photos and map pin show on Google.' },
    ],
    faq: [
      { q: "Can customers pay online?", a: "We can connect payment options such as GCash, Maya or cards if you want online payment, or keep payment on delivery or pickup. We decide this together on a free call." },
      { q: "I take orders on Facebook. Why add a website?", a: "A website lets people find you on Google, see your full menu and send complete order details, which saves you many messages. See <a href=\"/guides/facebook-page-or-website/\">Facebook page or website</a>." },
      { q: "Can I update the menu myself?", a: "Yes. We build it so you can edit text and prices without coding." },
    ],
    related: ["systems", "tools"],
    guides: ["facebook-page-or-website"],
    footer: false,
  },
];

function build(p) {
  const path = `/${p.slug}/`;
  const meta = {
    key: `local-${p.slug}`,
    navKey: 'services',
    path,
    file: `${p.slug}/index.html`,
    crumbs: [[p.eyebrow, path]],
    title: p.title,
    description: p.metaDesc,
    ogImage: `/assets/img/og/local-${p.slug}.png`,
    ogHeadline: p.ogHeadline,
    priority: '0.8',
    schema: 'service',
    service: { title: p.eyebrow },
    area: 'Davao City',
    faq: p.faq,
  };
  const body = () => `
<section class="page-head" aria-labelledby="page-title">
  <div class="hero-bg" aria-hidden="true"><div class="hero-lines"></div><div class="glow glow-a"></div><div class="hero-mark-wrap">${mark('hero-mark')}</div></div>
  <div class="wrap">
    <ol class="crumbs" aria-label="Breadcrumb"><li><a href="/">Home</a></li><li aria-current="page">${esc(p.eyebrow)}</li></ol>
    <p class="eyebrow">${esc(p.eyebrow)}</p>
    <h1 id="page-title">${p.h1}</h1>
    <p class="lead">${esc(p.lead)}</p>
    <div class="btn-row" style="margin-top:1.8rem">${btn('Book a free call', '/contact/#book')}${btn('See our prices', '/pricing/', { kind: 'ghost' })}</div>
  </div>
</section>

<section class="sec deep cv" aria-labelledby="who-title">
  <div class="wrap split">
    <div class="reveal">
      <p class="eyebrow">${esc(p.whoTitle)}</p>
      <h2 id="who-title">${esc(p.whoTitle)}</h2>
    </div>
    <ul class="ticks sv-who reveal" style="--d:.1s">${p.who.map((w) => `<li>${icon('check', 'ic ic-tick')}<span>${esc(w)}</span></li>`).join('')}</ul>
  </div>
</section>

<section class="sec cv" aria-labelledby="build-title">
  <div class="wrap">
    ${sectionHead({ eyebrow: 'What we build', title: esc(p.buildTitle), id: 'build-title' })}
    <div class="stagger">${slider('local-build', 'Browse: ' + p.buildTitle, p.build.map((i, n) => featureCard({ icon: itemIcons[n % itemIcons.length], title: i.t, text: esc(i.d) })), { cols: 2 })}</div>
  </div>
</section>

<section class="sec light cv" aria-labelledby="how-title">
  <div class="wrap">
    ${sectionHead({ eyebrow: 'How it works', title: 'Three simple steps', id: 'how-title', center: true })}
    <ol class="sv-steps reveal">${p.steps.map((st) => `<li><h3>${esc(st.t)}</h3><p>${esc(st.d)}</p></li>`).join('')}</ol>
  </div>
</section>

<section class="sec deep cv" aria-labelledby="faq-title">
  <div class="wrap">
    ${sectionHead({ eyebrow: 'Questions', title: 'Quick answers', id: 'faq-title', center: true })}
    <div class="reveal">${faqList(p.faq)}</div>
  </div>
</section>

${p.slug === 'web-design-davao-city' ? `<section class="sec cv" aria-labelledby="ind-title">
  <div class="wrap">
    ${sectionHead({ eyebrow: 'By business type', title: 'Websites for the kind of business you run', id: 'ind-title' })}
    <ul class="rel-grid reveal">${industryPages.map((x) => `<li><a href="${x.href}"><span class="rel-k">Industry</span><span class="rel-t">${esc(x.label)}</span>${icon('arrow', 'ic ic-arrow')}</a></li>`).join('')}</ul>
  </div>
</section>` : ''}

<section class="sec cv" aria-labelledby="rel-title">
  <div class="wrap">
    ${sectionHead({ eyebrow: 'Keep exploring', title: 'Related services and guides', id: 'rel-title' })}
    <ul class="rel-grid reveal">
      ${p.related.map((id) => `<li><a href="${serviceUrl(id)}"><span class="rel-k">Service</span><span class="rel-t">${esc(byId[id].title)}</span><span class="rel-d">${esc(byId[id].blurb)}</span>${icon('arrow', 'ic ic-arrow')}</a></li>`).join('')}
      ${p.guides.map((slug) => { const g = guides.find((x) => x.slug === slug); return `<li><a href="/guides/${g.slug}/"><span class="rel-k">Guide</span><span class="rel-t">${esc(g.title)}</span><span class="rel-d">${esc(g.summary)}</span>${icon('arrow', 'ic ic-arrow')}</a></li>`; }).join('')}
    </ul>
  </div>
</section>

${ctaBand({ title: 'Ready to talk about your website?', lead: 'Book a free call. We will listen, give honest advice and tell you what it would cost.' })}`;
  return { meta, body };
}

export const entries = pages.map(build);
export const localPages = pages.filter((p) => p.footer !== false).map((p) => ({ href: `/${p.slug}/`, label: p.eyebrow }));
export const industryPages = pages.filter((p) => p.footer === false).map((p) => ({ href: `/${p.slug}/`, label: p.eyebrow }));

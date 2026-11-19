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
    title: 'Online Store Developer in Davao | WooCommerce and Shopify | Davao Byte',
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
export const localPages = pages.map((p) => ({ href: `/${p.slug}/`, label: p.eyebrow }));

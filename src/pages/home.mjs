import { mark, icon, btn, slider, faqList, sectionHead, featureCard, journeyPath, statement, chatThread, browserMock, leadForm, heroForm, pricingCard, picture, preloadImage, peso, esc } from '../lib/components.mjs';
import { statCard, marketChart, exampleChart } from '../lib/charts.mjs';
import { services, problems, promises, why, conversation, journey, packages, faqs, lyfd, industries, market } from '../data/content.mjs';
import { site } from '../data/site.mjs';

export const meta = {
  key: 'home',
  path: '/',
  file: 'index.html',
  title: 'BC Tech | Web Design & Development in Davao City',
  description: 'Websites and online stores that bring you customers. BC Tech is a Davao City web design and development team. See our prices and book a free call.',
  ogImage: '/assets/img/og/home.png',
  ogAlt: 'BC Tech. Built to Bring You Business.',
  ogHeadline: 'Built to Bring You Business.',
  priority: '1.0',
  usesPeso: true,
  scripts: ['forms', 'charts'],
  preloadImg: preloadImage('home-hero', '(min-width:1100px) 100vw, calc(100vw - 2.5rem)'),
};

const industryCard = (it) => `<article class="ind tilt">
  ${picture(it.img, { alt: it.alt, sizes: '(min-width:1100px) 380px, (min-width:700px) 46vw, 86vw', pos: it.pos })}
  <div class="ind-cap"><h3>${esc(it.name)}</h3><p>${esc(it.line)}</p></div>
  <span class="card-sheen" aria-hidden="true"></span>
</article>`;

const svcCard = (s) =>
  featureCard({
    icon: s.icon,
    title: s.title,
    text: s.blurb,
    tag: 'article',
  }).replace('</article>', `<a class="link" href="/services/#${s.id}">What is included ${icon('arrow')}</a></article>`);

export function body() {
  const teaser = packages.filter((p) => ['cms-small', 'store-small', 'promax'].includes(p.id));
  return `
<section class="hero has-form" aria-labelledby="hero-title">
  <div class="hero-bg" aria-hidden="true">
    <div class="hero-lines"></div>
    <div class="glow glow-a"></div>
    <div class="glow glow-b"></div>
  </div>
  <div class="hero-visual">${picture('home-hero', { alt: 'Laptop and phone showing an elegant website, lit with red light', sizes: '(min-width:1100px) 100vw, calc(100vw - 2.5rem)', eager: true, cls: 'hero-pic' })}</div>
  <div class="wrap">
    <div class="hero-in">
      <p class="eyebrow">Web design &amp; development · ${site.city}</p>
      <h1 class="display" id="hero-title">A website that <span class="accent">brings you customers.</span></h1>
      <p class="lead">We design and build websites that help people find you, trust you and contact you, so your phone rings and your calendar fills up.</p>
      <div class="btn-row">
        ${btn('Book a free call', '/contact/#book')}
        ${btn('See our prices', '/pricing/', { kind: 'ghost' })}
      </div>
      <ul class="chips" aria-label="Why choose us">
        <li class="chip">${icon('pin')}Based in ${site.city}</li>
        <li class="chip">${icon('shield')}7+ years of experience each</li>
        <li class="chip">${icon('code')}Any platform you prefer</li>
      </ul>
    </div>
    ${heroForm(packages)}
  </div>
</section>

<section class="sec deep journey" aria-labelledby="journey-title">
  <div class="wrap">
    ${sectionHead({ eyebrow: 'What a good website does', title: 'From stranger to <span class="accent">customer</span>, even while you sleep', lead: 'Every page we build is planned around this path.', id: 'journey-title', center: true })}
    <div class="reveal">${journeyPath(journey)}</div>
  </div>
</section>

<section class="sec cv" aria-labelledby="problem-title">
  <div class="wrap">
    ${sectionHead({ eyebrow: 'Sound familiar?', title: 'Most business websites look nice and <span class="accent">do nothing.</span>', lead: 'A website should work like your best salesperson: always on, always polite, always pointing customers to the next step.', id: 'problem-title' })}
    <div class="reveal">${slider('before-after', 'Without a plan and with BC Tech', [
      `<div class="pair-col bad">
        <h3>Without a plan</h3>
        <ul class="pair-list">
          ${problems.map((p) => `<li><span class="card-icon">${icon(p.icon)}</span><div><strong>${esc(p.title)}</strong><span>${esc(p.text)}</span></div></li>`).join('')}
        </ul>
      </div>`,
      `<div class="pair-col good">
        <h3>With BC Tech</h3>
        <ul class="pair-list">
          ${promises.map((p) => `<li><span class="card-icon">${icon(p.icon)}</span><div><strong>${esc(p.title)}</strong><span>${esc(p.text)}</span></div></li>`).join('')}
        </ul>
      </div>`,
    ], { cols: 2 })}</div>
  </div>
</section>

<section class="sec light cv" aria-labelledby="market-title">
  <div class="wrap">
    ${sectionHead({ eyebrow: 'The numbers', title: 'Your customers are <span class="accent">already online</span>', lead: 'Filipinos search, pay and book online every day. A good website is how they find you.', id: 'market-title' })}
    <div class="market">
      <div class="reveal">${marketChart(market)}</div>
      <div class="stagger">${slider('market-stats', 'Key numbers about going online', market.stats.map(statCard), { cols: 1 })}</div>
    </div>
  </div>
</section>

<section class="sec deep cv" aria-labelledby="services-title">
  <div class="wrap">
    ${sectionHead({ eyebrow: 'What we do', title: 'Everything you need to <span class="accent">get found and get customers</span>', lead: 'Pick one thing or the whole package. We build the website and the tools around it.', id: 'services-title' })}
    <div class="stagger">${slider('home-services', 'Our services', services.map(svcCard), { cols: 3, always: true })}</div>
    <p class="center-cta reveal" style="margin-top:2.2rem">${btn('See every service', '/services/', { kind: 'ghost' })}</p>
  </div>
</section>

<section class="sec statement" aria-label="Our promise">
  <div class="wrap">
    ${statement(['We do not build websites to look at.', { hi: 'We build them to bring you customers.' }])}
  </div>
</section>

<section class="sec deep cv" aria-labelledby="industries-title">
  <div class="wrap">
    ${sectionHead({ eyebrow: 'Who we help', title: 'Websites for <span class="accent">every kind of business</span>', lead: 'Whatever you sell, the goal is the same: more people finding you, trusting you and getting in touch.', id: 'industries-title' })}
    <div class="stagger">${slider('industries', 'Kinds of business we build websites for', industries.map(industryCard), { cols: 3, always: true })}</div>  </div>
</section>

<section class="sec light cv" aria-labelledby="why-title">
  <div class="wrap">
    ${sectionHead({ eyebrow: 'Why BC Tech', title: 'Premium results, <span class="accent">plain talk</span>', lead: 'No confusing tech words. We explain what we do and why it helps your sales.', id: 'why-title', center: true })}
    <div class="stagger">${slider('home-why', 'Why choose BC Tech', why.map((w) => featureCard({ icon: w.icon, title: w.title, text: esc(w.text) })), { cols: 3, always: true })}</div>
  </div>
</section>

<section class="sec deep cv" aria-labelledby="process-title">
  <div class="wrap split chat-split">
    <div class="reveal">
      <p class="eyebrow">How it works</p>
      <h2 id="process-title">Working with us feels like <span class="accent">a good conversation</span></h2>
      <p class="lead" style="margin-top:1.1rem">No tech talk. You tell us what you want, you see it before we build it, and you approve every step.</p>
      <ul class="ticks chat-points">
        <li>${icon('check', 'ic ic-tick')}<span>A free call to start, with no pressure to buy</span></li>
        <li>${icon('check', 'ic ic-tick')}<span>A clickable preview you approve before building</span></li>
        <li>${icon('check', 'ic ic-tick')}<span>Support after launch, so your site keeps growing</span></li>
      </ul>
      <p style="margin-top:1.8rem">${btn('Start the conversation', '/contact/#book')}</p>
    </div>
    ${chatThread(conversation)}
  </div>
</section>

<section class="sec cv" aria-labelledby="case-title">
  <div class="wrap split">
    <div class="reveal">
      <p class="eyebrow">Our first client</p>
      <h2 id="case-title">${esc(lyfd.short)}: a stainless steel maker that now takes <span class="accent">quotes and bookings online</span></h2>
      <p class="lead" style="margin-top:1.1rem">${lyfd.place} restaurants, hotels and homeowners can now see the work, ask for a quote and book a visit from their phone.</p>
      <ul class="chips">
        <li class="chip">${icon('pen')}Quote form</li>
        <li class="chip">${icon('calendar')}Book-a-visit calendar</li>
        <li class="chip">${icon('layout')}Product pages</li>
        <li class="chip">${icon('chat')}Messenger chat</li>
      </ul>
      <p style="margin-top:1.8rem">${btn('Read the case study', '/work/')}</p>
    </div>
    <div class="reveal" style="--d:.12s">${browserMock({ url: 'lyfdfab.com', variant: 'a', label: 'Illustration of the LYFD website on a computer screen' })}</div>
  </div>
</section>

<section class="sec deep cv" aria-labelledby="example-title">
  <div class="wrap split">
    <div class="reveal">
      <p class="eyebrow">What could change</p>
      <h2 id="example-title">A website can turn quiet months into <span class="accent">busy ones</span></h2>
      <p class="lead" style="margin-top:1.1rem">Here is the idea in one picture: fewer lost customers, and more people getting in touch, month after month. Want to see what it could mean for your business? Try your own numbers.</p>
      <p style="margin-top:1.8rem">${btn('Try the payback calculator', '/pricing/#calc')}</p>
    </div>
    <div class="reveal" style="--d:.12s">${exampleChart()}</div>
  </div>
</section>

<section class="sec lux cv" aria-labelledby="price-title">
  <div class="wrap">
    ${sectionHead({ eyebrow: 'Clear prices', title: 'Know the cost <span class="accent">before you call</span>', lead: 'Starting prices in pesos. Your exact quote is confirmed on a free call.', id: 'price-title' })}
    <div class="stagger pc-grid">${slider('home-price', 'Starting prices', teaser.map(pricingCard), { cols: 3 })}</div>
    <p class="reveal" style="margin-top:2.4rem">${btn('See all packages and extras', '/pricing/')}</p>
  </div>
</section>

<section class="sec deep cv" aria-labelledby="faq-title">
  <div class="wrap">
    ${sectionHead({ eyebrow: 'Questions', title: 'Quick answers', id: 'faq-title', center: true })}
    <div class="reveal">${faqList(faqs.home)}</div>
  </div>
</section>

<section class="cta" aria-labelledby="cta-title">
  <div class="wrap cta-in">
    <div class="reveal">
      <p class="eyebrow">Ready when you are</p>
      <h2 id="cta-title">Ready for a website that works as hard as you do?</h2>
      <p class="lead">Tell us what you need. We will call you for a free chat, no pressure and no tech talk.</p>
      <p>${btn('Pick a time to talk', '/contact/#book', { kind: 'ghost' })}</p>
    </div>
    <div class="cta-card reveal" style="--d:.12s">
      ${leadForm({ source: 'home' })}
    </div>
  </div>
</section>`;
}

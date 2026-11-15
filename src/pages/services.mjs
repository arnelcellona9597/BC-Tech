import { icon, slider, faqList, sectionHead, featureCard, ctaBand, mark, esc } from '../lib/components.mjs';
import { services, stacks, faqs, serviceJumps } from '../data/content.mjs';

export const meta = {
  key: 'services',
  path: '/services/',
  file: 'services/index.html',
  crumb: 'Services',
  title: 'Web Design, Online Stores & More | BC Tech Services',
  description: 'Websites, online stores, branding, writing, booking tools, marketing and Google setup. Everything your business needs to get found and get customers.',
  ogImage: '/assets/img/og/services.png',
  ogHeadline: 'Everything you need to get found and get customers.',
  priority: '0.9',
};

export function body() {
  return `
<section class="page-head" aria-labelledby="page-title">
  <div class="hero-bg" aria-hidden="true"><div class="hero-lines"></div><div class="glow glow-a"></div><div class="hero-mark-wrap">${mark('hero-mark')}</div></div>
  <div class="wrap">
    <ol class="crumbs" aria-label="Breadcrumb"><li><a href="/">Home</a></li><li aria-current="page">Services</li></ol>
    <p class="eyebrow">What we do</p>
    <h1 id="page-title">Everything you need to <span class="accent">get found and get customers</span></h1>
    <p class="lead">One team for your website, your look, your words and your marketing. Choose what you need now and add more as you grow.</p>
  </div>
</section>

<nav class="jump" aria-label="Jump to a service">
  <div class="wrap"><ul>${serviceJumps.map(([id, label]) => `<li><a href="#${id}">${esc(label)}</a></li>`).join('')}</ul></div>
</nav>

<section class="sec cv" aria-labelledby="svc-title">
  <div class="wrap">
    ${sectionHead({ eyebrow: 'Our services', title: 'Seven ways we help your business', lead: 'Each one explained in plain words. Technical names are shown in brackets in case you are comparing quotes.', id: 'svc-title' })}
    <div class="stagger">${slider('svc-grid', 'Our services', services.map((s) => featureCard({ icon: s.icon, title: s.title, text: esc(s.blurb), items: s.items, id: s.id })), { cols: 3, cls: 'svc' })}</div>
  </div>
</section>

<section class="sec light cv" aria-labelledby="stack-title">
  <div class="wrap split">
    <div class="reveal">
      <p class="eyebrow">Your platform, your choice</p>
      <h2 id="stack-title">Prefer a certain tool? <span class="accent">We can handle it :)</span></h2>
      <p class="lead" style="margin-top:1.1rem">Already on WordPress or Shopify? Have a developer who loves Laravel or React? Tell us what you prefer. Our team has more than 7 years of experience each, so we can work with the platform you already know and trust.</p>
    </div>
    <ul class="stack-list reveal" style="--d:.1s" aria-label="Platforms we work with">
      ${stacks.map((s) => `<li>${esc(s)}</li>`).join('')}
    </ul>
  </div>
</section>

<section class="sec deep cv" aria-labelledby="faq-title">
  <div class="wrap">
    ${sectionHead({ eyebrow: 'Questions', title: 'Good to know', id: 'faq-title', center: true })}
    <div class="reveal">${faqList(faqs.services)}</div>
  </div>
</section>

${ctaBand()}`;
}

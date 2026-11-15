import { icon, slider, faqList, sectionHead, ctaBand, mark, peso, esc } from '../lib/components.mjs';
import { funnel, calculator } from '../lib/charts.mjs';
import { packages, addons, faqs } from '../data/content.mjs';

export const meta = {
  key: 'pricing',
  path: '/pricing/',
  file: 'pricing/index.html',
  crumb: 'Pricing',
  title: 'Website Prices in the Philippines | BC Tech',
  description: 'Clear starting prices in pesos: websites from ₱25,000, online stores from ₱70,000, custom builds quoted free. Domain, hosting and care plans explained.',
  ogImage: '/assets/img/og/pricing.png',
  ogHeadline: 'Clear prices. No surprises.',
  priority: '0.9',
  usesPeso: true,
  scripts: ['charts'],
};

const pkgCard = (p) => `<article class="price-card tilt${p.open ? ' featured' : ''}" id="${p.id}">
  ${p.open ? '<span class="badge">Custom quote</span>' : ''}
  <p class="price-sub">${esc(p.sub)}</p>
  <h3 class="price-name">${esc(p.name)}</h3>
  <p class="price-for">${esc(p.forWho)}</p>
  <div class="price-from">
    <small>${p.open ? 'Starting from' : 'Starting from'}</small>
    <span class="price-amount">${peso(p.from)}</span>
    <span class="price-range">${p.open ? 'Final price depends on what you need' : `Typical range ${peso(p.from)} to ${peso(p.to)}`}</span>
  </div>
  <ul class="ticks">${p.items.map((i) => `<li>${icon('check', 'ic ic-tick')}<span>${esc(i)}</span></li>`).join('')}</ul>
  <a class="btn ${p.open ? 'btn-primary' : 'btn-ghost'}" href="/contact/?package=${encodeURIComponent(p.name)}#message"><span>Get a quote</span>${icon('arrow', 'ic ic-arrow')}</a>
  <span class="card-sheen" aria-hidden="true"></span>
</article>`;

const addonCard = (a) => `<article class="addon tilt">
  <span class="card-icon">${icon(a.icon)}</span>
  <h3>${esc(a.name)}</h3>
  <p class="sub">${esc(a.sub)}</p>
  <p class="amt">${a.price}<small>${esc(a.unit)}</small></p>
  <p>${esc(a.text)}</p>
  <span class="card-sheen" aria-hidden="true"></span>
</article>`;

export function body() {
  return `
<section class="page-head" aria-labelledby="page-title">
  <div class="hero-bg" aria-hidden="true"><div class="hero-lines"></div><div class="glow glow-a"></div><div class="hero-mark-wrap">${mark('hero-mark')}</div></div>
  <div class="wrap">
    <ol class="crumbs" aria-label="Breadcrumb"><li><a href="/">Home</a></li><li aria-current="page">Pricing</li></ol>
    <p class="eyebrow">Pricing</p>
    <h1 id="page-title">Clear prices. <span class="accent">No surprises.</span></h1>
    <p class="lead">Starting prices in Philippine pesos. Your final quote depends on what you need, and we confirm it on a free call before you pay anything.</p>
  </div>
</section>

<section class="sec light cv" aria-labelledby="pkg-title">
  <div class="wrap">
    ${sectionHead({ eyebrow: 'Website packages', title: 'Pick the one that fits <span class="accent">where you are now</span>', lead: 'Not sure which one? Book a free call and we will tell you honestly.', id: 'pkg-title' })}
    <div class="stagger">${slider('packages', 'Website packages', packages.map(pkgCard), { cols: 3, always: true })}</div>
    <p class="note reveal">These are one-time prices for designing and building your website. Domain, hosting and ongoing care are listed below.</p>
  </div>
</section>

<section class="sec deep cv" id="extras" aria-labelledby="extras-title">
  <div class="wrap">
    ${sectionHead({ eyebrow: 'Extras', title: 'What else you may <span class="accent">pay for</span>', lead: 'Every website needs a web address and a place to live online. Care and growth plans are optional.', id: 'extras-title' })}
    <div class="stagger">${slider('addons', 'Extras and ongoing costs', addons.map(addonCard), { cols: 4 })}</div>
    <p class="note reveal">All prices are starting estimates in PHP and may change. Domain and hosting prices come from our hosting provider. Your final quote is always confirmed in writing.</p>
  </div>
</section>

<section class="sec light cv" id="calc-section" aria-labelledby="calc-title">
  <div class="wrap">
    ${sectionHead({ eyebrow: 'Think about the return', title: 'How fast could a website <span class="accent">pay for itself?</span>', lead: 'A website works when it brings in customers. Enter your own numbers and see how long it could take to earn back the price.', id: 'calc-title' })}
    <div class="split calc-split">
      <div class="reveal">${funnel()}</div>
      <div class="reveal" style="--d:.12s">${calculator(packages)}</div>
    </div>
  </div>
</section>

<section class="sec cv" aria-labelledby="faq-title">
  <div class="wrap">
    ${sectionHead({ eyebrow: 'Questions', title: 'About our prices', id: 'faq-title', center: true })}
    <div class="reveal">${faqList(faqs.pricing)}</div>
  </div>
</section>

${ctaBand({ title: 'Want an exact price for your project?', lead: 'Tell us what you need on a free call. You get a clear quote, with no pressure to buy.' })}`;
}

import { icon, sectionHead, ctaBand, browserMock, picture, esc } from '../lib/components.mjs';
import { lyfd, mangjose, clients } from '../data/content.mjs';

export const meta = {
  key: 'work',
  path: '/work/',
  file: 'work/index.html',
  crumb: 'Our Work',
  title: 'Our Work: LYFD and Mang Jose Websites | Davao Byte',
  description: 'See the live websites Davao Byte built for Davao City businesses: LYFD Stainless Fabrication and Mang Jose Fried Chicken Corner.',
  ogImage: '/assets/img/og/work.png',
  ogHeadline: 'Live websites for Davao City businesses.',
  priority: '0.8',
  schema: 'portfolio',
};

const ext = (c, label) => `<a class="btn btn-ghost" href="${c.url}" target="_blank" rel="noopener"><span class="ext">${label} ${icon('external')}</span></a><span class="sr-only">(opens in a new tab)</span>`;

export function clientCard(c, { more = true } = {}) {
  return `<article class="cl-card">
    ${browserMock({ url: c.host, shot: { src: c.shot, alt: c.alt } })}
    <div class="cl-body">
      <p class="cl-kind">${esc(c.kind)}</p>
      <h3>${esc(c.name)}</h3>
      <p>${esc(c.text)}</p>
      <ul class="chips">${c.chips.map((x) => `<li class="chip">${esc(x)}</li>`).join('')}</ul>
      <p class="cl-links"><a class="btn btn-primary btn-sm" href="${c.url}" target="_blank" rel="noopener"><span>Visit ${esc(c.host)}</span>${icon('external')}</a><span class="sr-only">(opens in a new tab)</span>${more ? `<a class="link" href="/work/#${c.caseId}">Read the case study ${icon('arrow')}</a>` : ''}</p>
    </div>
  </article>`;
}

export function body() {
  const L = clients[0], M = clients[1];
  return `
<section class="page-head" aria-labelledby="page-title">
  <div class="hero-bg" aria-hidden="true"><div class="hero-lines"></div><div class="glow glow-a"></div></div>
  <div class="head-visual">${picture('work-head', { alt: 'Wall of screens showing charts and dashboards', sizes: '(min-width:960px) 52vw, 100vw', eager: true })}</div>
  <div class="wrap">
    <ol class="crumbs" aria-label="Breadcrumb"><li><a href="/">Home</a></li><li aria-current="page">Our Work</li></ol>
    <p class="eyebrow">Our work</p>
    <h1 id="page-title">Live websites for <span class="accent">Davao City businesses</span></h1>
    <p class="lead">These are real websites we built and launched. Open them, click around and see how a good website helps people find, trust and contact a business.</p>
    <ul class="chips">
      <li class="chip">${icon('pin')}Davao City, Philippines</li>
      <li class="chip">${icon('globe')}2 websites live</li>
      <li class="chip">${icon('check')}Built for phones and computers</li>
    </ul>
  </div>
</section>

<section class="sec cv" aria-labelledby="clients-title">
  <div class="wrap">
    ${sectionHead({ eyebrow: 'Our clients', title: 'Two businesses, <span class="accent">two live websites</span>', id: 'clients-title' })}
    <div class="cl-grid reveal">${clientCard(L)}${clientCard(M)}</div>
  </div>
</section>

<section class="sec deep cv" id="lyfd" aria-labelledby="lyfd-title">
  <div class="wrap split">
    <div class="reveal">
      <p class="eyebrow">Case study 1 · ${esc(lyfd.short)}</p>
      <h2 id="lyfd-title">${esc(lyfd.name)}: <span class="accent">now open for quotes online</span></h2>
      <p class="lead" style="margin-top:1.1rem">${esc(lyfd.name)} in ${lyfd.place} makes ${lyfd.does.charAt(0).toLowerCase() + lyfd.does.slice(1)}</p>
      <p class="lead" style="margin-top:1rem">The customers are busy restaurant owners, hotel managers, commissaries and homeowners. They want to see real work, get a price and set a time to talk. So we built a website that shows the products with confidence, then gives every visitor two easy ways to take the next step: ask for a quote, or book a visit.</p>
      <p style="margin-top:1.6rem">${ext(L, 'Visit lyfdfab.com')}</p>
    </div>
    <div class="reveal" style="--d:.12s">${browserMock({ url: 'lyfdfab.com', shot: { src: '/assets/img/work/lyfd-about.webp', alt: 'The LYFD website company profile section, showing a stainless steel kitchen with griddle and hood' } })}</div>
  </div>
</section>

<section class="sec light cv" aria-labelledby="built-title">
  <div class="wrap">
    ${sectionHead({ eyebrow: 'What we built for LYFD', title: 'A website that works like a <span class="accent">sales assistant</span>', id: 'built-title' })}
    <ul class="cs-list reveal">
      ${lyfd.features.map((f) => `<li><span class="card-icon">${icon(f.icon)}</span><div><strong>${esc(f.title)}</strong><span>${esc(f.text)}</span></div></li>`).join('')}
    </ul>
    <p class="note reveal" style="margin-top:1.6rem">Customers can see the work, ask for a quote and book a visit in a few taps, with no searching for a phone number and no waiting for a catalog.</p>
  </div>
</section>

<section class="sec cv" id="mangjose" aria-labelledby="mj-title">
  <div class="wrap split">
    <div class="reveal">
      <p class="eyebrow">Case study 2 · ${esc(mangjose.short)}</p>
      <h2 id="mj-title">${esc(mangjose.name)}: <span class="accent">a menu, a map and a franchise</span></h2>
      <p class="lead" style="margin-top:1.1rem">${esc(mangjose.name)} in ${mangjose.place} serves ${mangjose.does.charAt(0).toLowerCase() + mangjose.does.slice(1)}</p>
      <p class="lead" style="margin-top:1rem">The goal was a website as appetizing as the chicken: show the menu and prices, help people find the nearest branch, and make it easy for someone who wants to own a Mang Jose corner to get in touch.</p>
      <p style="margin-top:1.6rem">${ext(M, 'Visit mangjosecorner.com')}</p>
    </div>
    <div class="reveal" style="--d:.12s">${browserMock({ url: 'mangjosecorner.com', shot: { src: '/assets/img/work/mangjose-home.webp', alt: 'The Mang Jose Fried Chicken Corner homepage with golden fried chicken and a menu button' } })}</div>
  </div>
</section>

<section class="sec light cv" aria-labelledby="mj-built-title">
  <div class="wrap">
    ${sectionHead({ eyebrow: 'What we built for Mang Jose', title: 'A website that makes people <span class="accent">hungry and curious</span>', id: 'mj-built-title' })}
    <ul class="cs-list reveal">
      ${mangjose.features.map((f) => `<li><span class="card-icon">${icon(f.icon)}</span><div><strong>${esc(f.title)}</strong><span>${esc(f.text)}</span></div></li>`).join('')}
    </ul>
    <p class="note reveal" style="margin-top:1.6rem">More projects are on the way. We will add them here as they go live.</p>
  </div>
</section>

${ctaBand({ title: 'Your business could be our next story.', lead: 'Tell us what you sell and who you want to reach. We will show you what your website could do.' })}`;
}

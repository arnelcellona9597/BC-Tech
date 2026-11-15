import { icon, sectionHead, ctaBand, browserMock, mark, esc } from '../lib/components.mjs';
import { lyfd } from '../data/content.mjs';

export const meta = {
  key: 'work',
  path: '/work/',
  file: 'work/index.html',
  crumb: 'Our Work',
  title: 'Case Study: LYFD Stainless Fabrication | BC Tech',
  description: 'How BC Tech built a website for LYFD, a Davao City stainless steel fabricator, with product pages, quote requests and a book-a-visit calendar.',
  ogImage: '/assets/img/og/work.png',
  ogType: 'article',
  ogHeadline: 'Case study: LYFD Stainless Fabrication.',
  priority: '0.8',
};

export function body() {
  return `
<section class="page-head" aria-labelledby="page-title">
  <div class="hero-bg" aria-hidden="true"><div class="hero-lines"></div><div class="glow glow-a"></div><div class="hero-mark-wrap">${mark('hero-mark')}</div></div>
  <div class="wrap">
    <ol class="crumbs" aria-label="Breadcrumb"><li><a href="/">Home</a></li><li aria-current="page">Our Work</li></ol>
    <p class="eyebrow">Case study · Our first client</p>
    <h1 id="page-title">${esc(lyfd.short)} Stainless Fabrication, <span class="accent">now open for quotes online</span></h1>
    <p class="lead">${esc(lyfd.name)} in ${lyfd.place} makes ${lyfd.does.charAt(0).toLowerCase() + lyfd.does.slice(1)}</p>
    <ul class="chips">
      <li class="chip">${icon('pin')}${lyfd.place}, Philippines</li>
      <li class="chip">${icon('code')}Custom WordPress website</li>
      <li class="chip">${icon('calendar')}Quote and booking forms</li>
    </ul>
  </div>
</section>

<section class="sec cv" aria-labelledby="goal-title">
  <div class="wrap split">
    <div class="reveal">
      <p class="eyebrow">The goal</p>
      <h2 id="goal-title">Make it easy to say <span class="accent">“yes, I need this”</span></h2>
      <p class="lead" style="margin-top:1.1rem">LYFD's customers are busy restaurant owners, hotel managers, commissaries and homeowners. They want to see real work, get a price, and set a time to talk, ideally without a long phone tag.</p>
      <p class="lead" style="margin-top:1rem">So we built a website that shows the products with confidence, then gives every visitor two easy ways to take the next step: ask for a quote, or book a visit.</p>
    </div>
    <div class="reveal" style="--d:.12s">${browserMock({ url: 'lyfdfab.com', variant: 'a', label: 'Illustration of the LYFD homepage on a computer screen' })}</div>
  </div>
</section>

<section class="sec light cv" aria-labelledby="built-title">
  <div class="wrap">
    ${sectionHead({ eyebrow: 'What we built', title: 'A website that works like a <span class="accent">sales assistant</span>', id: 'built-title' })}
    <div class="split">
      <ul class="cs-list reveal">
        ${lyfd.features.map((f) => `<li><span class="card-icon">${icon(f.icon)}</span><div><strong>${esc(f.title)}</strong><span>${esc(f.text)}</span></div></li>`).join('')}
      </ul>
      <div class="reveal" style="--d:.12s">${browserMock({ url: 'lyfdfab.com/products', variant: 'b', label: 'Illustration of the LYFD products page' })}</div>
    </div>
  </div>
</section>

<section class="sec cv" aria-labelledby="result-title">
  <div class="wrap">
    ${sectionHead({ eyebrow: 'What it means for LYFD', title: 'Customers can <span class="accent">see, ask and book</span> in a few taps', lead: 'No searching for a phone number. No waiting for a catalog. From the first look at the products to a booked site visit, everything happens in one place.', id: 'result-title' })}
    <p class="reveal">
      <a class="btn btn-ghost" href="${lyfd.url}" target="_blank" rel="noopener"><span class="ext">Visit lyfdfab.com ${icon('external')}</span></a>
      <span class="sr-only">(opens in a new tab)</span>
    </p>
    <p class="note reveal">More projects are on the way. We are working with other clients now and will add them here as they go live.</p>
  </div>
</section>

${ctaBand({ title: 'Your business could be our next story.', lead: 'Tell us what you sell and who you want to reach. We will show you what your website could do.' })}`;
}

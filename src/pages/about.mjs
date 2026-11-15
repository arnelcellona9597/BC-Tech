import { icon, sectionHead, ctaBand, featureCard, mark, slider, esc } from '../lib/components.mjs';
import { stacks } from '../data/content.mjs';
import { site } from '../data/site.mjs';

export const meta = {
  key: 'about',
  path: '/about/',
  file: 'about/index.html',
  crumb: 'About',
  title: 'About BC Tech | Web Design Team in Davao City',
  description: 'Meet BC Tech: a Davao City web design and development team with 7+ years of experience each. We work with any platform you prefer.',
  ogImage: '/assets/img/og/about.png',
  ogHeadline: 'A small team that cares about your sales.',
  priority: '0.7',
};

const values = [
  { icon: 'chat', title: 'Plain talk', text: 'We explain things in words you use every day. If we use a tech term, we tell you what it means and why it matters to you.' },
  { icon: 'cursor', title: 'Built to sell', text: 'A beautiful website is not enough. Every page we make has a job: to bring you a call, a booking or an order.' },
  { icon: 'shield', title: 'Careful craft', text: 'We sweat the details: fast loading, easy on phones, easy to read, and safe for your customers.' },
  { icon: 'code', title: 'Your platform, your call', text: 'WordPress, Shopify, Laravel, React or something else. We fit your preference, not the other way around.' },
];

export function body() {
  return `
<section class="page-head" aria-labelledby="page-title">
  <div class="hero-bg" aria-hidden="true"><div class="hero-lines"></div><div class="glow glow-a"></div><div class="hero-mark-wrap">${mark('hero-mark')}</div></div>
  <div class="wrap">
    <ol class="crumbs" aria-label="Breadcrumb"><li><a href="/">Home</a></li><li aria-current="page">About</li></ol>
    <p class="eyebrow">About BC Tech</p>
    <h1 id="page-title">A small team that cares about <span class="accent">your sales</span></h1>
    <p class="lead">BC Tech is a new company, but our team is not new. Each of us has more than 7 years of experience in web design and development, and we are based right here in ${site.city}.</p>
  </div>
</section>

<section class="sec cv" aria-labelledby="story-title">
  <div class="wrap split">
    <div class="reveal">
      <p class="eyebrow">Our story</p>
      <h2 id="story-title">We started BC Tech to make websites that <span class="accent">pay for themselves</span></h2>
    </div>
    <div class="prose reveal" style="--d:.1s">
      <p>After years of building websites for many kinds of businesses, we saw the same problem again and again: a good-looking website that did not bring in customers.</p>
      <p>So we built a company around a simple idea. Start with what you want more of, whether that is calls, bookings or online orders, and design everything to get you there.</p>
      <p>Our first client, LYFD Stainless Fabrication in ${site.city}, gave us the chance to prove it. <a href="/work/">See how it went.</a></p>
    </div>
  </div>
</section>

<section class="sec light cv" aria-labelledby="values-title">
  <div class="wrap">
    ${sectionHead({ eyebrow: 'How we work', title: 'Four promises', id: 'values-title', center: true })}
    <div class="stagger">${slider('values', 'How we work', values.map((v) => featureCard({ icon: v.icon, title: v.title, text: esc(v.text) })), { cols: 4 })}</div>
  </div>
</section>

<section class="sec deep cv" aria-labelledby="stack-title">
  <div class="wrap split">
    <div class="reveal">
      <p class="eyebrow">Any stack</p>
      <h2 id="stack-title">Prefer a certain platform? <span class="accent">We can handle it :)</span></h2>
      <p class="lead" style="margin-top:1.1rem">We are not tied to one tool. We pick what suits your business, or we use the one you already like.</p>
    </div>
    <ul class="stack-list reveal" style="--d:.1s" aria-label="Platforms we work with">
      ${stacks.map((s) => `<li>${esc(s)}</li>`).join('')}
    </ul>
  </div>
</section>

${ctaBand({ title: 'Let us talk about your business.', lead: 'A free call is the easiest way to see if we are a good fit.' })}`;
}

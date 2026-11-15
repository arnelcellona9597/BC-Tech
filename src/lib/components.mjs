import { readFileSync } from 'node:fs';
import { icon } from './icons.mjs';
import { site } from '../data/site.mjs';

const markSvg = readFileSync(new URL('../img/mark.svg', import.meta.url), 'utf8').trim();

export const mark = (cls = '') => markSvg.replace('class="mark"', `class="mark ${cls}"`.trim());
export { icon };

export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const peso = (n) => '₱' + n.toLocaleString('en-US');

/** Primary / secondary button. */
export function btn(label, href, { kind = 'primary', arrow = true, cls = '' } = {}) {
  return `<a class="btn btn-${kind} ${cls}" href="${href}"><span>${label}</span>${arrow ? icon('arrow', 'ic ic-arrow') : ''}</a>`;
}

/**
 * Slider: a grid on desktop, a swipeable scroll-snap slider on mobile.
 * `items` are HTML strings. JS adds the arrows and dots (progressive enhancement).
 */
export function slider(id, label, items, { cols = 3, cls = '' } = {}) {
  return `<div class="slider ${cls}" data-slider data-cols="${cols}" role="region" aria-roledescription="carousel" aria-label="${esc(label)}">
  <div class="slider-track" id="${id}">
${items.map((it, i) => `    <div class="slide" role="group" aria-roledescription="slide" aria-label="${i + 1} of ${items.length}">${it}</div>`).join('\n')}
  </div>
</div>`;
}

/** FAQ list using native <details> (works without JavaScript, keyboard friendly). */
export function faqList(items) {
  return `<div class="faq">
${items.map((f) => `  <details class="faq-item"><summary>${esc(f.q)}${icon('arrow', 'ic ic-faq')}</summary><div class="faq-a"><p>${f.a}</p></div></details>`).join('\n')}
</div>`;
}

export function sectionHead({ eyebrow, title, lead, center = false, id = '' }) {
  return `<header class="sec-head${center ? ' center' : ''} reveal">
  ${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ''}
  <h2${id ? ` id="${id}"` : ''}>${title}</h2>
  ${lead ? `<p class="lead">${lead}</p>` : ''}
</header>`;
}

/** Tilt-on-hover card with an icon. */
export function featureCard({ icon: ic, title, text, items, tag = 'article', id = '' }) {
  return `<${tag} class="card tilt"${id ? ` id="${id}"` : ''}>
    <span class="card-icon">${icon(ic)}</span>
    <h3>${esc(title)}</h3>
    ${text ? `<p>${text}</p>` : ''}
    ${items ? `<ul class="ticks">${items.map((i) => `<li>${icon('check', 'ic ic-tick')}<span>${i}</span></li>`).join('')}</ul>` : ''}
    <span class="card-sheen" aria-hidden="true"></span>
  </${tag}>`;
}

/** Looping words strip (decorative; duplicated content is aria-hidden). */
export function marqueeStrip(words, { outline = false } = {}) {
  const row = words.map((w) => `<span>${esc(w)}</span><i aria-hidden="true"></i>`).join('');
  return `<div class="marquee${outline ? ' marquee-outline' : ''}" aria-hidden="true"><div class="marquee-in">${row}${row}</div></div>`;
}

/** A drawn browser window used for the case study placeholder (swap for a screenshot later). */
export function browserMock({ url = '', variant = 'a', label = '' }) {
  return `<figure class="device tilt" role="img" aria-label="${esc(label)}">
  <div class="device-bar"><span></span><span></span><span></span><em>${esc(url)}</em></div>
  <!-- TODO(client): replace .device-screen with <img src="/assets/img/work/..." width height alt> when screenshots arrive -->
  <div class="device-screen mock-${variant}" aria-hidden="true">
    <div class="m-nav"><b></b><i></i><i></i><i></i><u></u></div>
    <div class="m-hero"><div class="m-h1"></div><div class="m-h2"></div><div class="m-btns"><u></u><s></s></div></div>
    <div class="m-grid"><div></div><div></div><div></div><div></div></div>
  </div>
  <span class="card-sheen" aria-hidden="true"></span>
</figure>`;
}

/** Lead capture form used on the home page CTA band and elsewhere. */
export function leadForm({ source = 'home', id = 'lead' } = {}) {
  return `<form class="form form-lead js-form" id="${id}" action="/api/contact.php" method="post" novalidate>
  <input type="hidden" name="source" value="${source}">
  <input type="hidden" name="_t" value="">
  <div class="hp" aria-hidden="true"><label>Leave this empty<input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>
  <div class="field"><label for="${id}-name">Your name</label><input id="${id}-name" name="name" type="text" autocomplete="name" required></div>
  <div class="field"><label for="${id}-email">Email</label><input id="${id}-email" name="email" type="email" autocomplete="email" required></div>
  <div class="field"><label for="${id}-need">What do you need?</label>
    <select id="${id}-need" name="need">
      <option>A new website</option><option>An online store</option><option>Fix or redesign my website</option>
      <option>Connect my website to my systems</option><option>Logo and branding</option><option>Something else</option>
    </select></div>
  <button class="btn btn-primary" type="submit"><span>Get my free call</span>${icon('arrow', 'ic ic-arrow')}</button>
  <p class="form-note">No spam. We only use your details to reply to you. <a href="/privacy/">Privacy</a></p>
  <p class="form-status" role="status" aria-live="polite"></p>
</form>`;
}

/** Closing call-to-action band for inner pages. */
export function ctaBand({ title = 'Ready for a website that works as hard as you do?', lead = 'Book a free call. We will listen, give honest advice, and tell you what it would cost.', id = 'cta-title' } = {}) {
  return `<section class="cta" aria-labelledby="${id}">
  <div class="wrap cta-solo reveal">
    <p class="eyebrow">Ready when you are</p>
    <h2 id="${id}">${title}</h2>
    <p class="lead">${lead}</p>
    <div class="btn-row">${btn('Book a free call', '/contact/#book')}${btn('Send us a message', '/contact/#message', { kind: 'ghost', arrow: false })}</div>
  </div>
</section>`;
}

export const contactEmail = () => `<a href="mailto:${site.email}">${site.email}</a>`;

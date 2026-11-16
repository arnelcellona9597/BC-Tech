import { btn, mark, icon } from '../lib/components.mjs';
import { nav } from '../data/site.mjs';

export const meta = {
  key: 'notfound',
  path: '/404.html',
  file: '404.html',
  title: 'Page Not Found | Davao Byte',
  description: 'That page could not be found. Use the links to find what you need, or book a free call with Davao Byte.',
  ogImage: '/assets/img/og/home.png',
  noindex: true,
  skipSitemap: true,
  scripts: ['particles'],
};

/** A "4" built from stacked copies of the glyph, so it has real depth when it turns. */
const layers = 13;
const digit = (ch) => `<span class="nf-d">${Array.from({ length: layers }, (_, i) => `<span class="nf-l" style="--i:${layers - i}"></span>`).join('')}<span class="nf-front">${ch}</span></span>`;
const ring = () => `<span class="nf-o">${Array.from({ length: layers }, (_, i) => `<span class="nf-ol" style="--i:${layers - i}"></span>`).join('')}<span class="nf-ofront"></span><span class="nf-mark">${mark()}</span></span>`;

const links = [
  ...nav.filter((n) => n.key !== 'home').map((n) => ({ href: n.href, label: n.label, desc: n.desc })),
  { href: '/contact/', label: 'Contact', desc: 'Book a free call' },
];

export function body() {
  return `
<section class="nf" aria-labelledby="page-title">
  <div class="nf-bg" aria-hidden="true">
    <span class="nf-glow"></span><span class="nf-floor"></span>
    <canvas class="nf-fx" data-particles="lite"></canvas>
  </div>
  <div class="wrap nf-grid">
    <div class="nf-copy">
      <p class="eyebrow">Error 404</p>
      <h1 class="display" id="page-title">This page <span class="accent">could not be found.</span></h1>
      <p class="lead">The link may be old, or the address may have a typo. Nothing is wrong with your device. Choose a page below, or go back to the start.</p>
      <div class="btn-row">${btn('Go to the homepage', '/')}${btn('Book a free call', '/contact/#book', { kind: 'ghost' })}</div>
    </div>
    <div class="nf-stage" aria-hidden="true">
      <span class="nf-orbit"><i></i></span>
      <div class="nf-sway"><div class="nf-scene">${digit('4')}${ring()}${digit('4')}</div></div>
    </div>
  </div>
  <div class="wrap nf-links">
    <h2>Where would you like to go?</h2>
    <ul class="nf-list">
      ${links.map((l) => `<li><a href="${l.href}"><span class="nf-l-t">${l.label}</span><span class="nf-l-d">${l.desc}</span>${icon('arrow', 'ic ic-arrow')}</a></li>`).join('')}
    </ul>
  </div>
</section>`;
}

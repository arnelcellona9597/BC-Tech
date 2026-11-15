import { btn, mark } from '../lib/components.mjs';

export const meta = {
  key: 'notfound',
  path: '/404.html',
  file: '404.html',
  title: 'Page Not Found | BC Tech',
  description: 'That page could not be found. Head back to the BC Tech homepage or book a free call.',
  ogImage: '/assets/img/og/home.png',
  noindex: true,
  skipSitemap: true,
};

export function body() {
  return `
<section class="hero" aria-labelledby="page-title">
  <div class="hero-bg" aria-hidden="true"><div class="hero-lines"></div><div class="glow glow-a"></div><div class="hero-mark-wrap">${mark('hero-mark')}</div></div>
  <div class="wrap">
    <div class="hero-in">
      <p class="eyebrow">Error 404</p>
      <h1 class="display" id="page-title">This page <span class="accent">wandered off.</span></h1>
      <p class="lead">The page you are looking for is not here. Let us get you back on track.</p>
      <div class="btn-row">${btn('Go to the homepage', '/')}${btn('Book a free call', '/contact/#book', { kind: 'ghost' })}</div>
    </div>
  </div>
</section>`;
}

import { site, nav } from '../data/site.mjs';
import { faqs } from '../data/content.mjs';
import { mark, icon, esc } from './components.mjs';
import { jsonLd } from './schema.mjs';

const abs = (p) => site.url + p;

function head({ meta, css, assets }) {
  const url = abs(meta.path);
  const og = abs(meta.ogImage);
  const t = esc(meta.title);
  const d = esc(meta.description);
  return `<!doctype html>
<html lang="${site.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${t}</title>
<meta name="description" content="${d}">
<link rel="canonical" href="${url}">
<meta name="robots" content="${meta.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}">
<meta name="theme-color" content="${site.themeColor}">
<meta name="color-scheme" content="dark light">
<meta property="og:site_name" content="${site.name}">
<meta property="og:locale" content="${site.locale}">
<meta property="og:type" content="${meta.ogType || 'website'}">
<meta property="og:title" content="${t}">
<meta property="og:description" content="${d}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${og}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(meta.ogAlt || meta.title)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${t}">
<meta name="twitter:description" content="${d}">
<meta name="twitter:image" content="${og}">
<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon-32.png" type="image/png" sizes="32x32">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="preload" href="${assets.fonts.cinzel}" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${assets.fonts.montserrat}" as="font" type="font/woff2" crossorigin>
${meta.usesPeso ? `<link rel="preload" href="${assets.fonts.peso}" as="font" type="font/woff2" crossorigin>` : ''}
${meta.preloadImg || ''}
<style>${css}</style>
${jsonLd(meta)}
</head>`;
}

function header(meta) {
  const cur = (k) => (meta.key === k ? ' aria-current="page"' : '');
  return `<body class="page-${meta.key}">
<a class="skip" href="#main">Skip to content</a>
<div class="progress" aria-hidden="true"><i></i></div>
<header class="site-header" id="top">
  <div class="wrap bar">
    <a class="brand" href="/" aria-label="BC TECH home page">${mark('brand-mark')}<span class="brand-text">BC <i></i>TECH</span></a>
    <nav class="nav" id="site-nav" aria-label="Main">
      <ul>
${nav.map((n) => `        <li><a href="${n.href}"${cur(n.key)}>${n.label}</a></li>`).join('\n')}
        <li class="nav-cta"><a class="btn btn-primary btn-sm" href="/contact/#book"><span>Book a free call</span></a></li>
      </ul>
    </nav>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Open menu">${icon('menu', 'ic ic-open')}${icon('close', 'ic ic-close')}</button>
  </div>
</header>
<main id="main">`;
}

function footer(meta) {
  return `</main>
<footer class="site-footer">
  <div class="wrap">
    <div class="foot-top">
      <div class="foot-brand">
        <a class="brand" href="/" aria-label="BC TECH home page">${mark('brand-mark')}<span class="brand-text">BC <i></i>TECH</span></a>
        <p class="foot-tag">${site.tagline}</p>
        <p class="foot-small">Web design and web development, based in ${site.city}, ${site.countryName}.</p>
      </div>
      <nav aria-label="Footer">
        <h2 class="foot-h">Explore</h2>
        <ul>${nav.map((n) => `<li><a href="${n.href}">${n.label}</a></li>`).join('')}<li><a href="/contact/">Contact</a></li></ul>
      </nav>
      <div>
        <h2 class="foot-h">Talk to us</h2>
        <ul class="foot-contact">
          <li>${icon('mail', 'ic')}<a href="mailto:${site.email}">${site.email}</a></li>
          ${site.phone ? `<li>${icon('phone', 'ic')}<a href="tel:${site.phone.replace(/[^+\d]/g, '')}">${site.phone}</a></li>` : ''}
          <li>${icon('pin', 'ic')}<span>${site.city}, ${site.countryName}</span></li>
          <li>${icon('clock', 'ic')}<span>${site.hours}</span></li>
        </ul>
        <a class="btn btn-primary btn-sm" href="/contact/#book"><span>Book a free call</span>${icon('arrow', 'ic ic-arrow')}</a>
      </div>
    </div>
    <div class="foot-bottom">
      <p>&copy; ${new Date(site.built).getFullYear()} ${site.legalName}. All rights reserved.</p>
      <p>Some images on this site are AI-generated illustrations. <a href="/privacy/">Privacy</a></p>
    </div>
  </div>
</footer>
${meta.key === 'contact' || meta.key === 'notfound' ? '' : `<aside class="float-wrap" aria-label="Quick action"><a class="float-cta" href="/contact/#book">${icon('calendar', 'ic')}<span>Book a free call</span></a></aside>`}`;
}

export function renderPage({ meta, body, css, assets }) {
  const scripts = ['main', ...(meta.scripts || [])].map((s) => `<script src="${assets.js[s]}" defer></script>`).join('\n');
  return `${head({ meta, css, assets })}
${header(meta)}
${body}
${footer(meta)}
${scripts}
</body>
</html>
`;
}

export { faqs };

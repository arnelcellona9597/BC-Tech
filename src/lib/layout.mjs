import { site, nav } from '../data/site.mjs';
import { faqs, services } from '../data/content.mjs';
import { socialIcons, messengerHref } from './social.mjs';
import { mark, icon, esc, picture } from './components.mjs';
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
<link rel="preload" href="${assets.fonts.playfair}" as="font" type="font/woff2" crossorigin>
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
${nav.filter((n) => n.key !== 'home').map((n) => `        <li><a href="${n.href}"${cur(n.key)}>${n.label}</a></li>`).join('\n')}
        <li class="nav-cta"><a class="btn btn-primary btn-sm" href="/contact/#book"><span>Book a free call</span></a></li>
      </ul>
    </nav>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" aria-label="Open menu"><span class="burger" aria-hidden="true"><i></i><i></i><i></i></span></button>
  </div>
</header>
<div class="menu" id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu" inert>
  <span class="menu-orb menu-orb-a" aria-hidden="true"></span><span class="menu-orb menu-orb-b" aria-hidden="true"></span>
  <span class="menu-mark" aria-hidden="true">${mark('menu-mark-svg')}</span>
  <div class="menu-in">
    <p class="menu-eyebrow">Menu</p>
    <ul class="menu-links">
${nav.map((n, i) => `      <li style="--i:${i}"><a href="${n.href}"${cur(n.key)}><b>0${i + 1}</b><span><strong>${n.label}</strong><small>${n.desc}</small></span>${icon('arrow', 'ic menu-arrow')}</a></li>`).join('\n')}
    </ul>
    <div class="menu-foot" style="--i:${nav.length}">
      <a class="btn btn-primary" href="/contact/#book"><span>Book a free call</span>${icon('arrow', 'ic ic-arrow')}</a>
      <a class="menu-mail" href="mailto:${site.email}">${site.email}</a>
      <a class="menu-mail" href="tel:${site.phone.replace(/[^+\d]/g, '')}">${site.phone}</a>
      <p class="menu-time"><span class="live-dot" aria-hidden="true"></span><span data-davao-clock>${site.city}</span></p>
      ${socialIcons('social-menu')}
    </div>
  </div>
</div>
<main id="main">`;
}

function footer(meta) {
  const oh = site.openHours;
  return `</main>
<footer class="site-footer">
  <span class="foot-line" aria-hidden="true"></span>
  <span class="foot-glow" aria-hidden="true"></span>
  <div class="wrap">
    <div class="foot-cta">
      <div>
        <p class="eyebrow">Ready when you are</p>
        <p class="foot-big">Let us build something that <span class="accent">brings you customers.</span></p>
      </div>
      <a class="btn btn-primary" href="/contact/#book"><span>Book a free call</span>${icon('arrow', 'ic ic-arrow')}</a>
    </div>
    <div class="foot-top">
      <div class="foot-brand">
        <a class="brand" href="/" aria-label="BC TECH home page">${mark('brand-mark')}<span class="brand-text">BC <i></i>TECH</span></a>
        <p class="foot-tag">${site.tagline}</p>
        <p class="foot-small">Web design and web development, based in ${site.city}, ${site.countryName}.</p>
        ${socialIcons('social-foot')}
      </div>
      <nav aria-label="Footer">
        <h2 class="foot-h">Explore</h2>
        <ul>${nav.map((n) => `<li><a href="${n.href}">${n.label}</a></li>`).join('')}<li><a href="/contact/">Contact</a></li></ul>
      </nav>
      <nav aria-label="Our services">
        <h2 class="foot-h">What we do</h2>
        <ul>${services.map((x) => `<li><a href="/services/#${x.id}">${esc(x.title)}</a></li>`).join('')}</ul>
      </nav>
      <div>
        <h2 class="foot-h">Talk to us</h2>
        <ul class="foot-contact">
          <li><span class="foot-ic">${icon('mail', 'ic')}</span><a href="mailto:${site.email}">${site.email}</a></li>
          <li><span class="foot-ic">${icon('phone', 'ic')}</span><a href="tel:${site.phone.replace(/[^+\d]/g, '')}">${site.phone}</a></li>
          <li><span class="foot-ic">${icon('phone', 'ic')}</span><a href="tel:${site.landline.replace(/[^+\d]/g, '')}">${site.landline}</a></li>
          <li><span class="foot-ic">${icon('pin', 'ic')}</span><span>${site.city}, ${site.countryName}</span></li>
          <li><span class="foot-ic">${icon('clock', 'ic')}</span><span>${site.hours}</span></li>
        </ul>
        <p class="open-pill" data-open data-days="${oh.days.join(',')}" data-start="${oh.start}" data-end="${oh.end}" data-tz="${oh.timezone}"><span class="live-dot" aria-hidden="true"></span><span data-open-text>${site.city} time</span></p>
      </div>
    </div>
    <div class="foot-bottom">
      <p>&copy; ${new Date(site.built).getFullYear()} ${site.legalName}. All rights reserved.</p>
      <p><a href="/privacy/">Privacy</a></p>
    </div>
  </div>
  <p class="foot-mark" aria-hidden="true">BC TECH</p>
  <button class="to-top" type="button" aria-label="Back to top"><svg viewBox="0 0 48 48" aria-hidden="true"><circle class="tt-track" cx="24" cy="24" r="21"/><circle class="tt-bar" cx="24" cy="24" r="21"/></svg>${icon('arrow', 'ic tt-arrow')}</button>
</footer>
<aside class="chat-wrap" aria-label="Chat with us"><a class="chat" href="${messengerHref()}"${site.social.messenger ? ' target="_blank" rel="noopener noreferrer"' : ''} aria-label="Chat with us${site.social.messenger ? ' on Messenger (opens in a new tab)' : ''}">
  <span class="chat-card" aria-hidden="true">
    <span class="cc-av">${mark('cc-av-mark')}<i></i></span>
    <span class="cc-body"><b>BC Tech <em>Live chat</em></b><span class="cc-msg-t" data-chat-text>Hi! Need a quote?</span></span>
  </span>
  <span class="chat-orb" aria-hidden="true">
    <span class="co-halo"></span><span class="co-ring"></span><span class="co-orbit"><i></i></span>
    <span class="co-sphere"><span class="co-gloss"></span>
      <svg class="co-ico" viewBox="0 0 24 24"><path d="M12 3C6.9 3 3 6.8 3 11.5c0 2.5 1.1 4.7 3 6.2V21l3.2-1.8c.9.3 1.8.4 2.8.4 5.1 0 9-3.8 9-8.1S17.1 3 12 3Z" fill="currentColor"/></svg>
      <span class="chat-dots"><i></i><i></i><i></i></span>
    </span>
    <span class="chat-on"></span>
  </span>
</a></aside>
${meta.key === 'contact' || meta.key === 'notfound' ? '' : `<aside class="float-wrap" aria-label="Quick action"><a class="float-cta" href="/contact/#book">${icon('calendar', 'ic')}<span>Book a free call</span></a></aside>`}`;
}


function promo(meta) {
  if (['contact', 'notfound', 'privacy'].includes(meta.key)) return '';
  return `<div class="pop" id="promo" role="dialog" aria-modal="true" aria-labelledby="pop-title" hidden>
  <div class="pop-bd" data-pop-close></div>
  <div class="pop-card">
    <span class="pop-ring" aria-hidden="true"></span>
    <button type="button" class="pop-x" data-pop-close aria-label="Close">${icon('close')}</button>
    <div class="pop-media">
      ${picture('pricing-head', { alt: 'Glowing red bar chart rising on a dark glass floor', sizes: '(min-width:800px) 440px, 100vw' })}
      <canvas data-particles="lite" aria-hidden="true"></canvas>
      <ul class="pop-chips" aria-hidden="true"><li>${icon('check', 'ic')}Free call</li><li>${icon('check', 'ic')}No pressure</li><li>${icon('check', 'ic')}Clear price in writing</li></ul>
    </div>
    <div class="pop-body">
      <p class="eyebrow">Free for your business</p>
      <h2 id="pop-title">See what a website could do for <span class="accent">your sales.</span></h2>
      <p class="pop-lead">Tell us where to reach you. We will call you for a free chat, show you what would bring you more customers and give you a clear price. No tech talk.</p>
      <form class="form js-form pop-form" action="/api/contact.php" method="post" novalidate>
        <input type="hidden" name="source" value="popup">
        <input type="hidden" name="_t" value="">
        <input type="hidden" name="need" value="Free call (from popup)">
        <div class="hp" aria-hidden="true"><label>Leave this empty<input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>
        <div class="field"><label for="pp-name">Your name</label><input id="pp-name" name="name" type="text" autocomplete="name" required></div>
        <div class="field"><label for="pp-email">Email</label><input id="pp-email" name="email" type="email" autocomplete="email" required></div>
        <button class="btn btn-primary" type="submit"><span>Book my free call</span>${icon('arrow', 'ic ic-arrow')}</button>
        <p class="form-status" role="status" aria-live="polite" tabindex="-1"></p>
      </form>
      <p class="pop-alt"><a href="/#book" data-pop-close>Prefer to pick a time? See the calendar</a></p>
      <button type="button" class="pop-no" data-pop-close>No thanks, maybe later</button>
    </div>
  </div>
</div>`;
}

export function renderPage({ meta, body, css, assets }) {
  const popJs = ['contact', 'notfound', 'privacy'].includes(meta.key) ? [] : ['popup', 'particles', 'forms'];
  const scripts = [...new Set(['main', 'shell', ...popJs, ...(meta.scripts || [])])].map((s) => `<script src="${assets.js[s]}" defer></script>`).join('\n');
  return `${head({ meta, css, assets })}
${header(meta)}
${body}
${footer(meta)}
${promo(meta)}
${scripts}
</body>
</html>
`;
}

export { faqs };

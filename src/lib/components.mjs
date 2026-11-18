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
export function slider(id, label, items, { cols = 3, cls = '', always = false, autoplay = false, trackCls = '' } = {}) {
  return `<div class="slider ${cls}${always ? ' is-carousel' : ''}"${autoplay ? ' data-autoplay' : ''} data-slider data-cols="${cols}" role="region" aria-roledescription="carousel" aria-label="${esc(label)}">
  <div class="slider-track${trackCls ? ' ' + trackCls : ''}" id="${id}">
${items.map((it, i) => `    <div class="slide${always ? ' reveal' : ''}" role="group" aria-roledescription="slide" aria-label="${i + 1} of ${items.length}">${it}</div>`).join('\n')}
  </div>
</div>`;
}

const imageManifest = JSON.parse(readFileSync(new URL('../data/images.json', import.meta.url), 'utf8'));

/**
 * Responsive picture: AVIF with WebP fallback, several widths, real width/height so nothing jumps.
 * `eager` is for the one image at the top of a page; everything else is lazy.
 */
export function picture(name, { alt, sizes = '100vw', eager = false, cls = '', pos = '' } = {}) {
  const m = imageManifest[name];
  if (!m) throw new Error(`Unknown image: ${name} (run npm run images)`);
  const vs = m.variants;
  const big = vs[vs.length - 1];
  const mid = vs[Math.min(1, vs.length - 1)];
  const set = (ext) => vs.map((v) => `/assets/img/ai/${name}-${v.w}.${ext} ${v.w}w`).join(', ');
  return `<picture class="pic ${cls}"><source type="image/avif" srcset="${set('avif')}" sizes="${sizes}"><source type="image/webp" srcset="${set('webp')}" sizes="${sizes}"><img src="/assets/img/ai/${name}-${mid.w}.webp" width="${big.w}" height="${big.h}" alt="${esc(alt)}"${pos ? ` style="object-position:${pos}"` : ''} ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"></picture>`;
}

/** Preload hint for the top-of-page image (helps the largest paint). */
export function preloadImage(name, sizes) {
  const m = imageManifest[name];
  const set = m.variants.map((v) => `/assets/img/ai/${name}-${v.w}.avif ${v.w}w`).join(', ');
  return `<link rel="preload" as="image" type="image/avif" imagesrcset="${set}" imagesizes="${sizes}" fetchpriority="high">`;
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

/**
 * "Stranger to customer" path: five steps joined by a red line that draws itself
 * when the section scrolls into view (see main.js). Real ordered list for screen readers.
 */
export function journeyPath(steps) {
  return `<ol class="path" data-path>
${steps.map((s, i) => `    <li class="node${i === steps.length - 1 ? ' goal' : ''}" style="--i:${i}">
      <span class="node-dot">${icon(s.icon)}</span>
      <div><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></div>
    </li>`).join('\n')}
  </ol>`;
}

/**
 * A project told as a chat inside a phone. Messages pop in one by one when it scrolls into view.
 * Real list markup, with hidden "who said it" labels for screen readers.
 */
export function chatThread(stages) {
  let n = 0;
  return `<div class="phone reveal" data-seq>
  <div class="phone-screen">
    <div class="phone-bar" aria-hidden="true">${mark('')}<div><b>DAVAO BYTE</b><small>Your project chat</small></div></div>
    <ol class="convo" aria-label="How a project goes, told as a conversation">
${stages.map((s) => `      <li class="stage">
        <h3 class="stage-tag">${esc(s.stage)}</h3>
        <ul class="msgs">
${s.msgs.map((m) => `          <li class="msg ${m.who}" style="--n:${n++}"><span class="sr-only">${m.who === 'you' ? 'You: ' : 'Davao Byte: '}</span>${esc(m.text)}</li>`).join('\n')}
        </ul>
      </li>`).join('\n')}
    </ol>
  </div>
</div>`;
}

/**
 * Large statement whose words light up as you scroll past it.
 * `parts` is an array of strings; wrap a phrase as { hi: 'text' } to color it red once lit.
 */
export function statement(parts) {
  const words = parts.flatMap((p) => (typeof p === 'string' ? p : p.hi).split(' ').filter(Boolean).map((w) => ({ w, hi: typeof p !== 'string' })));
  return `<p class="statement-text" data-lit>${words.map((x) => `<span class="w${x.hi ? ' hi' : ''}">${esc(x.w)}</span>`).join(' ')}</p>`;
}

/** A drawn browser window used for the case study placeholder (swap for a screenshot later). */
// TODO(client): replace .device-screen with an <img src="/assets/img/work/..." width height alt> when the real LYFD screenshots arrive.
export function browserMock({ url = '', variant = 'a', label = '', shot = null }) {
  if (shot) {
    return `<figure class="device tilt">
  <div class="device-bar"><span></span><span></span><span></span><em>${esc(url)}</em></div>
  <div class="device-screen has-shot"><img class="device-shot" src="${shot.src}" width="1280" height="800" alt="${esc(shot.alt)}" loading="lazy" decoding="async"></div>
  <span class="card-sheen" aria-hidden="true"></span>
</figure>`;
  }
  return `<figure class="device tilt" role="img" aria-label="${esc(label)}">
  <div class="device-bar"><span></span><span></span><span></span><em>${esc(url)}</em></div>
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
      <option>API, ERP or automation</option><option>Logo and branding</option><option>Something else</option>
    </select></div>
  <button class="btn btn-primary" type="submit"><span>Get my free call</span>${icon('arrow', 'ic ic-arrow')}</button>
  <p class="form-note">No spam. We only use your details to reply to you. <a href="/privacy/">Privacy</a></p>
  <p class="form-status" role="status" aria-live="polite"></p>
</form>`;
}

/**
 * Glass inquiry form that sits over the home page hero.
 * Sends the service and package the visitor is interested in, so we know what they want.
 */
export function heroForm(packages) {
  const pk = packages.map((p) => `<option value="${esc(p.name)}">${esc(p.name)} (from ${peso(p.from)})</option>`).join('');
  return `<div class="hero-form-wrap"><span class="hero-orbit" aria-hidden="true"></span><aside class="hero-form-card" aria-labelledby="hf-title">
  <span class="hf-glow" aria-hidden="true"></span>
  <p class="eyebrow">Free quote</p>
  <h2 id="hf-title">Tell us what you need</h2>
  <p class="hf-sub">We reply by email. No pressure to buy.</p>
  <form class="form js-form" id="hero-form" action="/api/contact.php" method="post" novalidate>
    <input type="hidden" name="source" value="hero">
    <input type="hidden" name="_t" value="">
    <div class="hp" aria-hidden="true"><label>Leave this empty<input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>
    <div class="field"><label for="hf-name">Your name</label><input id="hf-name" name="name" type="text" autocomplete="name" required></div>
    <div class="row2">
      <div class="field"><label for="hf-email">Email</label><input id="hf-email" name="email" type="email" autocomplete="email" required></div>
      <div class="field"><label for="hf-phone">Phone or Viber <span class="opt">(optional)</span></label><input id="hf-phone" name="phone" type="tel" autocomplete="tel"></div>
    </div>
    <div class="field"><label for="hf-need">What do you need?</label>
      <select id="hf-need" name="need">
        <option>A new website</option><option>An online store</option><option>Fix or redesign my website</option>
        <option>API, ERP or automation</option><option>Logo and branding</option><option>Writing and content</option>
        <option>Google visibility (SEO) and marketing</option><option>Something else</option>
      </select></div>
    <div class="field"><label for="hf-pkg">Package you are looking at</label>
      <select id="hf-pkg" name="package"><option value="">Not sure yet</option>${pk}</select></div>
    <div class="field"><label for="hf-msg">Anything else? <span class="opt">(optional)</span></label><textarea id="hf-msg" name="message" rows="2"></textarea></div>
    <button class="btn btn-primary" type="submit"><span>Send my inquiry</span>${icon('arrow', 'ic ic-arrow')}</button>
    <p class="form-note">You get a reference number right away. <a href="/privacy/">Privacy</a></p>
    <p class="form-status" role="status" aria-live="polite" tabindex="-1"></p>
  </form>
</aside></div>`;
}

/** Luxury pricing card: layered for 3D tilt, with an animated price. */
export function pricingCard(p) {
  const range = p.open ? 'Final price depends on what you need' : `Typical range ${peso(p.from)} to ${peso(p.to)}`;
  return `<article class="pc tilt${p.open ? ' is-custom' : ''}" id="${p.id}">
  <span class="pc-ring" aria-hidden="true"></span>
  ${p.open ? '<span class="pc-badge">Custom quote</span>' : p.tag ? `<span class="pc-badge">${esc(p.tag)}</span>` : ''}
  ${p.tag && !p.open ? '' : `<p class="pc-sub">${esc(p.sub)}</p>`}
  <h3 class="pc-name">${esc(p.name)}</h3>
  <p class="pc-for">${esc(p.forWho)}</p>
  <div class="pc-price">
    <small>Starting from</small>
    <span class="pc-amount" data-count="${p.from}" data-prefix="₱">${peso(p.from)}</span>
    <span class="pc-range">${range}</span>
  </div>
  <ul class="pc-list">${p.items.map((i) => `<li>${icon('check', 'ic ic-tick')}<span>${esc(i)}</span></li>`).join('')}</ul>
  <a class="btn ${p.open ? 'btn-primary' : 'btn-ghost'} pc-cta" href="/contact/?package=${encodeURIComponent(p.name)}#message"><span>Get a quote</span>${icon('arrow', 'ic ic-arrow')}</a>
  <span class="card-sheen" aria-hidden="true"></span>
</article>`;
}

/**
 * The package stage. Without JavaScript (or with reduced motion) it is a plain grid.
 * Otherwise the cards sit in a 3D "cover flow": one centered, the others angled behind it.
 * The starting positions are written here so the first paint is already correct.
 */
export function pricingFlow(packages, start = 2) {
  const arrow = (d) => `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${d < 0 ? 'm15 6-6 6 6 6' : 'm9 6 6 6-6 6'}"/></svg>`;
  return `<div class="flow" data-flow role="region" aria-roledescription="carousel" aria-label="Website packages">
  <div class="flow-chooser" role="group" aria-label="What do you need? Pick one to bring up the right package">
    <span class="flow-q">I need</span>
    ${packages.map((p, i) => `<button type="button" class="flow-chip" data-i="${i}" aria-pressed="false">${esc(p.chip)}</button>`).join('')}
  </div>
  <div class="flow-stage">
    <div class="flow-track">
${packages.map((p, i) => {
    const o = i - start;
    return `      <div class="flow-item${o === 0 ? ' is-current' : ''}" role="group" aria-roledescription="slide" aria-label="${i + 1} of ${packages.length}" data-i="${i}" style="--o:${o};--a:${Math.abs(o)}"${Math.abs(o) > 2 ? ' data-far' : ''}>${pricingCard(p)}</div>`;
  }).join('\n')}
    </div>
  </div>
  <div class="flow-ui">
    <button type="button" class="flow-btn flow-prev" aria-label="Previous package">${arrow(-1)}</button>
    <div class="flow-dots"></div>
    <button type="button" class="flow-btn flow-next" aria-label="Next package">${arrow(1)}</button>
  </div>
</div>`;
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

/** Full-width autoplay slider with rotating transition effects. Works without JavaScript (first slide shows). */
export function heroSlider(id, label, items) {
  const fx = ['fade', 'wipe', 'slide'];
  const slides = items.map((it, i) => `<div class="hs-slide${i === 0 ? ' is-active' : ''}" id="${id}-${i}" role="group" aria-roledescription="slide" aria-label="${i + 1} of ${items.length}">
    <div class="hs-media">${picture(it.img, { alt: it.alt, sizes: '100vw', eager: i === 0 })}</div>
    <div class="hs-cap wrap"><p class="hs-count" aria-hidden="true"><b>0${i + 1}</b> / 0${items.length}</p><h3>${esc(it.name)}</h3><p>${esc(it.line)}</p></div>
  </div>`).join('');
  const dots = items.map((it, i) => `<button type="button" class="hs-dot${i === 0 ? ' is-active' : ''}" aria-label="Show ${esc(it.name)}" aria-controls="${id}-${i}"></button>`).join('');
  return `<div class="hs" id="${id}" role="region" aria-roledescription="carousel" aria-label="${esc(label)}" data-fx="${fx.join(',')}">
  <div class="hs-track">${slides}</div>
  <div class="hs-ui wrap">
    <div class="hs-dots">${dots}</div>
    <div class="hs-btns">
      <button type="button" class="hs-btn hs-prev" aria-label="Previous slide">${icon('arrow')}</button>
      <button type="button" class="hs-btn hs-play" aria-label="Pause slideshow" aria-pressed="false"><span class="hs-ico-pause" aria-hidden="true"></span></button>
      <button type="button" class="hs-btn hs-next" aria-label="Next slide">${icon('arrow')}</button>
    </div>
  </div>
  <span class="hs-bar" aria-hidden="true"><i></i></span>
</div>`;
}

/** The luxury package stage. Used on the home page and /pricing/ so both always look identical. */
export function pricingSection(packages, { id = 'pkg-title', cv = false } = {}) {
  return `<section class="sec lux${cv ? ' cv' : ''}" aria-labelledby="${id}">
  <div class="lux-fx" aria-hidden="true"><span class="lux-beam lb-1"></span><span class="lux-beam lb-2"></span><span class="lux-sweep"></span><canvas data-particles="lite"></canvas></div>
  <div class="wrap">
    ${sectionHead({ eyebrow: 'Website packages', title: 'Pick the one that fits <span class="accent">where you are now</span>', lead: 'Tell us what you need and the right package comes to the front. Not sure? Book a free call and we will tell you honestly.', id, center: true })}
    ${pricingFlow(packages)}
    <p class="note reveal" style="margin-inline:auto;margin-top:2.6rem;text-align:left">These are one-time prices for designing and building your website. Domain, hosting and ongoing care are listed on the pricing page.</p>
    <p class="center-cta reveal" style="margin-top:1.6rem;text-align:center">${btn('See all packages and extras', '/pricing/', { kind: 'ghost' })}</p>
  </div>
</section>`;
}

/** The booking calendar + details form (booking.js looks for #booking). Used on the home and contact pages. */
export function bookingPanel({ titleTag = 'h2' } = {}) {
  const b = site.booking;
  return `<div class="panel cc-panel" id="booking" data-days="${b.days.join(',')}" data-slots="${b.slots.join(',')}" data-window="${b.windowDays}" data-lead="${b.leadHours}">
      <${titleTag} id="book-title">Choose a day and time</${titleTag}>
      <p>Our hours: ${esc(site.hours)}. We will confirm your time by email.</p>
      <ol class="b-steps cc-steps" aria-label="Booking steps"><li class="now">1 · Day</li><li>2 · Time</li><li>3 · Your details</li></ol>
      <noscript><p class="note">Booking needs JavaScript. Please use the message form below, or email <a href="mailto:${site.email}">${site.email}</a>.</p></noscript>
      <div class="b-cols">
        <div role="group" aria-labelledby="cal-title">
          <div class="cal-head">
            <h3 class="cal-title" id="cal-title" aria-live="polite">&nbsp;</h3>
            <div class="cal-nav">
              <button type="button" id="cal-prev" aria-label="Previous month">${icon('left')}</button>
              <button type="button" id="cal-next" aria-label="Next month">${icon('right')}</button>
            </div>
          </div>
          <div class="cal-grid" aria-hidden="true">${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => `<span class="cal-dow">${d}</span>`).join('')}</div>
          <div class="cal-grid" id="cal-grid"></div>
        </div>
        <div>
          <h3 class="sub-h">Available times</h3>
          <p class="slots-empty" id="slot-help">Choose a day to see the times we are free.</p>
          <div class="slots" id="slots" role="group" aria-label="Available times"></div>
        </div>
      </div>
      <div id="book-details" hidden>
        <p class="b-summary" id="book-summary">${icon('calendar')}<span></span></p>
        <form class="form js-form" id="book-form" action="/api/booking.php" method="post" data-booking novalidate>
          <input type="hidden" name="_t" value="">
          <div class="hp" aria-hidden="true"><label>Leave this empty<input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>
          <div class="row2">
            <div class="field fl"><label for="b-name">Your name</label><input placeholder=" " id="b-name" name="name" type="text" autocomplete="name" required></div>
            <div class="field fl"><label for="b-email">Email</label><input placeholder=" " id="b-email" name="email" type="email" autocomplete="email" required></div>
          </div>
          <div class="row2">
            <div class="field fl"><label for="b-phone">Phone (optional)</label><input placeholder=" " id="b-phone" name="phone" type="tel" autocomplete="tel"></div>
            <div class="field"><label for="b-purpose">What is the call about?</label>
              <select id="b-purpose" name="purpose">
                <option>A new website</option><option>An online store</option><option>Fix or redesign my website</option>
                <option>API, ERP or automation</option><option>Logo and branding</option><option>Something else</option>
              </select></div>
          </div>
          <div class="field fl"><label for="b-notes">Anything we should know? (optional)</label><textarea placeholder=" " id="b-notes" name="notes" rows="3"></textarea></div>
          <button class="btn btn-primary" type="submit"><span>Request this time</span>${icon('arrow', 'ic ic-arrow')}</button>
          <p class="form-note">We will confirm your time by email. We only use your details to reply to you. <a href="/privacy/">Privacy</a></p>
          <p class="form-status" role="status" aria-live="polite" tabindex="-1"></p>
        </form>
      </div>
    </div>`;
}

/** Decorative 3D stage behind the booking and contact panels: particles, glass shapes, floor grid, beams. */
export function conciergeFx() {
  const face = (t) => `<i style="transform:${t}"></i>`;
  return `<div class="cc-fx" aria-hidden="true">
  <span class="cc-spot"></span>
  <span class="cc-floor"></span>
  <span class="cc-beam cb-1"></span><span class="cc-beam cb-2"></span>
  <canvas data-particles="full"></canvas>
  <span class="cc-3d c3-ring" data-depth="26"><b></b><b></b></span>
  <span class="cc-3d c3-cube" data-depth="40"><span class="cube">${face('rotateY(0deg) translateZ(2.2rem)')}${face('rotateY(90deg) translateZ(2.2rem)')}${face('rotateY(180deg) translateZ(2.2rem)')}${face('rotateY(-90deg) translateZ(2.2rem)')}${face('rotateX(90deg) translateZ(2.2rem)')}${face('rotateX(-90deg) translateZ(2.2rem)')}</span></span>
  <span class="cc-3d c3-orb" data-depth="60"></span>
  <span class="cc-3d cc-disc d1" data-depth="48">${icon('calendar')}</span>
  <span class="cc-3d cc-disc d2" data-depth="34">${icon('clock')}</span>
  <span class="cc-3d cc-disc d3" data-depth="54">${icon('check')}</span>
  <span class="cc-3d cc-disc d4" data-depth="30">${icon('chat')}</span>
</div>`;
}


/**
 * Home hero 3D scene: a laptop and a phone built from CSS, tilted in perspective, with floating notification cards.
 * Purely decorative (aria-hidden). The Davao Byte site is "shown" on the screens with tiny HTML mock-ups.
 */
export function heroScene() {
  const nav = `<div class="ls-nav"><span class="ls-logo">${mark('ls-mark')}<b>DAVAO BYTE</b></span><i></i><i></i><i></i><u></u></div>`;
  const card = '<div class="ls-card"><i></i><b></b><b></b></div>';
  return `<div class="hs3d" aria-hidden="true">
  <div class="hs3d-rig"><div class="hs3d-float">
    <span class="hs3d-shadow"></span>
    <div class="hl">
      <div class="hl-lid"><div class="hl-screen">
        ${nav}
        <div class="ls-hero"><span class="ls-eb"></span><span class="ls-h"></span><span class="ls-h r"></span><span class="ls-line"></span><span class="ls-line s"></span><div class="ls-btns"><u></u><s></s></div></div>
        <div class="ls-cards">${card}${card}${card}</div>
        <span class="ls-glare"></span>
      </div></div>
      <div class="hl-deck"><span class="hl-keys"></span><span class="hl-pad"></span></div>
    </div>
    <div class="ph"><div class="ph-screen">
      <span class="ph-notch"></span>
      <div class="ph-bar">${mark('ls-mark')}<i></i></div>
      <span class="ls-h p"></span><span class="ls-h r p"></span><span class="ls-line"></span><span class="ls-line s"></span>
      <u class="ph-btn"></u>
      <div class="ph-chat"><span></span><span class="me"></span></div>
    </div></div>
  </div></div>
  <div class="hs3d-chips">
    <span class="hc hc1">${icon('mail', 'ic')}<b>New inquiry</b></span>
    <span class="hc hc2">${icon('calendar', 'ic')}<b>Booking confirmed</b></span>
    <span class="hc hc3">${icon('check', 'ic')}<b>Quote requested</b></span>
  </div>
</div>`;
}


/** The monogram built from stacked layers, so it has real depth when it turns (home "promise" section, decorative). */
export function stMark3d() {
  const inner = markSvg.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '').replace(/ class="mark-slash"/g, '').replace(/fill="#C8102E"/g, 'fill="currentColor"');
  const n = 14;
  const layers = Array.from({ length: n }, (_, i) => `<span class="st3d-l" style="--i:${n - i}"><svg viewBox="0 0 200 200"><use href="#st3d-sym"/></svg></span>`).join('');
  return `<span class="st3d" aria-hidden="true">
    <svg class="st3d-defs" width="0" height="0" focusable="false"><symbol id="st3d-sym" viewBox="0 0 200 200">${inner}</symbol></svg>
    <span class="st3d-rig">${layers}<span class="st3d-front">${mark('st3d-mark')}</span></span>
  </span>`;
}

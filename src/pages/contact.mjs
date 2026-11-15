import { icon, picture, esc } from '../lib/components.mjs';
import { site } from '../data/site.mjs';

export const meta = {
  key: 'contact',
  path: '/contact/',
  file: 'contact/index.html',
  crumb: 'Contact',
  title: 'Book a Free Call or Contact BC Tech | Davao City',
  description: 'Book a free call or send us a message. Tell us about your business and we will show you how a website can bring you more customers.',
  ogImage: '/assets/img/og/contact.png',
  ogHeadline: 'Book a free call.',
  scripts: ['forms', 'booking'],
  priority: '0.9',
};

export function body() {
  const b = site.booking;
  return `
<section class="page-head" aria-labelledby="page-title">
  <div class="hero-bg" aria-hidden="true"><div class="hero-lines"></div><div class="glow glow-a"></div></div>
  <div class="head-visual">${picture('contact-head', { alt: 'AI-generated illustration of a friendly professional on a video call at a desk', sizes: '(min-width:960px) 52vw, 100vw', eager: true })}</div>
  <div class="wrap">
    <ol class="crumbs" aria-label="Breadcrumb"><li><a href="/">Home</a></li><li aria-current="page">Contact</li></ol>
    <p class="eyebrow">Let's talk</p>
    <h1 id="page-title">Book a <span class="accent">free call</span></h1>
    <p class="lead">Pick a day and time that suits you. We will listen, give honest advice, and tell you what it would cost. No pressure to buy.</p>
  </div>
</section>

<section class="sec light" id="book" aria-labelledby="book-title">
  <div class="wrap book-grid">
    <div class="panel" id="booking" data-days="${b.days.join(',')}" data-slots="${b.slots.join(',')}" data-window="${b.windowDays}" data-lead="${b.leadHours}">
      <h2 id="book-title">Choose a day and time</h2>
      <p>Our hours: ${esc(site.hours)}. We will confirm your time by email.</p>
      <ol class="b-steps" aria-label="Booking steps"><li class="now">1 · Day</li><li>2 · Time</li><li>3 · Your details</li></ol>
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
            <div class="field"><label for="b-name">Your name</label><input id="b-name" name="name" type="text" autocomplete="name" required></div>
            <div class="field"><label for="b-email">Email</label><input id="b-email" name="email" type="email" autocomplete="email" required></div>
          </div>
          <div class="row2">
            <div class="field"><label for="b-phone">Phone, Viber or WhatsApp (optional)</label><input id="b-phone" name="phone" type="tel" autocomplete="tel"></div>
            <div class="field"><label for="b-purpose">What is the call about?</label>
              <select id="b-purpose" name="purpose">
                <option>A new website</option><option>An online store</option><option>Fix or redesign my website</option>
                <option>Connect my website to my systems</option><option>Logo and branding</option><option>Something else</option>
              </select></div>
          </div>
          <div class="field"><label for="b-notes">Anything we should know? (optional)</label><textarea id="b-notes" name="notes" rows="3"></textarea></div>
          <button class="btn btn-primary" type="submit"><span>Request this time</span>${icon('arrow', 'ic ic-arrow')}</button>
          <p class="form-note">We will confirm your time by email. We only use your details to reply to you. <a href="/privacy/">Privacy</a></p>
          <p class="form-status" role="status" aria-live="polite" tabindex="-1"></p>
        </form>
      </div>
    </div>

    <aside aria-label="Other ways to reach us" class="reveal">
      <div class="panel">
        <h2 style="font-size:1.5rem">Prefer to write?</h2>
        <p>Email us anytime, or use the message form below.</p>
        <ul class="contact-list">
          <li><span class="card-icon">${icon('mail')}</span><div><strong>Email</strong><a href="mailto:${site.email}">${site.email}</a></div></li>
          ${site.phone ? `<li><span class="card-icon">${icon('phone')}</span><div><strong>Phone, Viber or WhatsApp</strong><a href="tel:${site.phone.replace(/[^+\d]/g, '')}">${esc(site.phone)}</a></div></li>` : ''}
          <li><span class="card-icon">${icon('pin')}</span><div><strong>Where we are</strong><span>${site.city}, ${site.countryName}</span></div></li>
          <li><span class="card-icon">${icon('clock')}</span><div><strong>Hours</strong><span>${esc(site.hours)}</span></div></li>
        </ul>
      </div>
    </aside>
  </div>
</section>

<section class="sec deep" id="message" aria-labelledby="msg-title">
  <div class="wrap">
    <div class="panel" style="max-width:820px;margin-inline:auto">
      <h2 id="msg-title" style="font-size:clamp(1.6rem,3vw,2.2rem)">Send us a message</h2>
      <p>Tell us a little about your business and what you need. We will reply by email.</p>
      <form class="form js-form" id="message-form" action="/api/contact.php" method="post" novalidate>
        <input type="hidden" name="source" value="contact">
        <input type="hidden" name="_t" value="">
        <div class="hp" aria-hidden="true"><label>Leave this empty<input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>
        <div class="row2">
          <div class="field"><label for="m-name">Your name</label><input id="m-name" name="name" type="text" autocomplete="name" required></div>
          <div class="field"><label for="m-email">Email</label><input id="m-email" name="email" type="email" autocomplete="email" required></div>
        </div>
        <div class="row2">
          <div class="field"><label for="m-phone">Phone, Viber or WhatsApp (optional)</label><input id="m-phone" name="phone" type="tel" autocomplete="tel"></div>
          <div class="field"><label for="m-need">What do you need?</label>
            <select id="m-need" name="need">
              <option>A new website</option><option>An online store</option><option>Fix or redesign my website</option>
              <option>Connect my website to my systems</option><option>Logo and branding</option><option>Something else</option>
            </select></div>
        </div>
        <div class="field"><label for="m-message">Your message</label><textarea id="m-message" name="message" rows="5" required></textarea></div>
        <button class="btn btn-primary" type="submit"><span>Send message</span>${icon('arrow', 'ic ic-arrow')}</button>
        <p class="form-note">We only use your details to reply to you. <a href="/privacy/">Privacy</a></p>
        <p class="form-status" role="status" aria-live="polite"></p>
      </form>
    </div>
  </div>
</section>`;
}

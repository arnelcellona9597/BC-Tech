import { icon, picture, esc, bookingPanel, conciergeFx } from '../lib/components.mjs';
import { socialIcons } from '../lib/social.mjs';
import { site } from '../data/site.mjs';

export const meta = {
  key: 'contact',
  path: '/contact/',
  file: 'contact/index.html',
  crumb: 'Contact',
  title: 'Book a Free Call or Contact Davao Byte | Davao City',
  description: 'Book a free call or send us a message. Tell us about your business and we will show you how a website can bring you more customers.',
  ogImage: '/assets/img/og/contact.png',
  ogHeadline: 'Book a free call.',
  scripts: ['forms', 'booking', 'particles'],
  priority: '0.9',
};

export function body() {
  return `
<section class="page-head" aria-labelledby="page-title">
  <div class="hero-bg" aria-hidden="true"><div class="hero-lines"></div><div class="glow glow-a"></div></div>
  <div class="head-visual">${picture('contact-head', { alt: 'Elegant desk with a phone showing messages and a calendar next to an open laptop', sizes: '(min-width:960px) 52vw, 100vw', eager: true })}</div>
  <div class="wrap">
    <ol class="crumbs" aria-label="Breadcrumb"><li><a href="/">Home</a></li><li aria-current="page">Contact</li></ol>
    <p class="eyebrow">Let's talk</p>
    <h1 id="page-title">Book a <span class="accent">free call</span></h1>
    <p class="lead">Pick a day and time that suits you. We will listen, give honest advice, and tell you what it would cost. No pressure to buy.</p>
  </div>
</section>

<section class="sec concierge" id="book" aria-labelledby="book-title">
  <span class="cc-orb cc-orb-a" aria-hidden="true"></span><span class="cc-orb cc-orb-b" aria-hidden="true"></span>
  ${conciergeFx()}
  <div class="wrap">
  <div class="book-grid">
    ${bookingPanel()}
    <div class="panel cc-panel cc-msg" id="message">
      <h2 id="msg-title">Send us a message</h2>
      <p>Tell us a little about your business and what you need. We will reply by email.</p>
      <form class="form js-form" id="message-form" action="/api/contact.php" method="post" novalidate>
        <input type="hidden" name="source" value="contact">
        <input type="hidden" name="_t" value="">
        <div class="hp" aria-hidden="true"><label>Leave this empty<input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>
        <div class="row2">
          <div class="field fl"><label for="m-name">Your name</label><input placeholder=" " id="m-name" name="name" type="text" autocomplete="name" required></div>
          <div class="field fl"><label for="m-email">Email</label><input placeholder=" " id="m-email" name="email" type="email" autocomplete="email" required></div>
        </div>
        <div class="row2">
          <div class="field fl"><label for="m-phone">Phone (optional)</label><input placeholder=" " id="m-phone" name="phone" type="tel" autocomplete="tel"></div>
          <div class="field fl fl-s"><label for="m-need">What do you need?</label>
            <select id="m-need" name="need">
              <option>A new website</option><option>An online store</option><option>Fix or redesign my website</option>
              <option>API, ERP or automation</option><option>Logo and branding</option><option>Something else</option>
            </select></div>
        </div>
        <div class="field fl"><label for="m-message">Your message</label><textarea placeholder=" " id="m-message" name="message" rows="5" required></textarea></div>
        <button class="btn btn-primary" type="submit"><span>Send message</span>${icon('arrow', 'ic ic-arrow')}</button>
        <p class="form-note">We only use your details to reply to you. <a href="/privacy/">Privacy</a></p>
        <p class="form-status" role="status" aria-live="polite"></p>
      </form>
    </div>
  </div>
  <div class="cc-info">
    <ul class="contact-list">
      <li><span class="card-icon">${icon('mail')}</span><div><strong>Email</strong><a href="mailto:${site.email}">${site.email}</a></div></li>
      <li><span class="card-icon">${icon('phone')}</span><div><strong>Mobile or WhatsApp</strong><a href="tel:${site.phone.replace(/[^+\d]/g, '')}">${esc(site.phone)}</a></div></li>
      <li><span class="card-icon">${icon('phone')}</span><div><strong>Second mobile</strong><a href="tel:${site.phone2.replace(/[^+\d]/g, '')}">${esc(site.phone2)}</a></div></li>
      <li><span class="card-icon">${icon('phone')}</span><div><strong>Office landline</strong><a href="tel:${site.landline.replace(/[^+\d]/g, '')}">${esc(site.landline)}</a></div></li>
      <li><span class="card-icon">${icon('pin')}</span><div><strong>Where we are</strong><span>${site.city}, ${site.countryName}</span></div></li>
      <li><span class="card-icon">${icon('clock')}</span><div><strong>Hours</strong><span>${esc(site.hours)}</span></div></li>
    </ul>
    <div class="cc-social"><p>Find us online</p>${socialIcons('social-contact')}</div>
  </div>
  </div>
</section>`;
}

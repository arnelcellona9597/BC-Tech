import { mark } from '../lib/components.mjs';
import { site } from '../data/site.mjs';

export const meta = {
  key: 'privacy',
  path: '/privacy/',
  file: 'privacy/index.html',
  crumb: 'Privacy',
  title: 'Privacy Policy | BC Tech',
  description: 'How BC Tech collects, uses and protects the details you send through our contact and booking forms.',
  ogImage: '/assets/img/og/privacy.png',
  ogHeadline: 'Privacy Policy.',
  priority: '0.3',
};

export function body() {
  return `
<section class="page-head" aria-labelledby="page-title">
  <div class="hero-bg" aria-hidden="true"><div class="hero-lines"></div><div class="hero-mark-wrap">${mark('hero-mark')}</div></div>
  <div class="wrap">
    <ol class="crumbs" aria-label="Breadcrumb"><li><a href="/">Home</a></li><li aria-current="page">Privacy</li></ol>
    <h1 id="page-title">Privacy Policy</h1>
    <p class="lead">Last updated ${new Date(site.built).toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
  </div>
</section>
<section class="sec" aria-label="Policy details">
  <div class="wrap">
    <div class="prose">
      <p>${site.name} respects your privacy and follows the Philippine Data Privacy Act of 2012. This page explains what we collect through this website and what we do with it, in plain words.</p>
      <h2>What we collect</h2>
      <p>Only what you type into our contact form, message form or booking form: your name, email address, phone number (if you give one), the day and time you pick, and your message.</p>
      <h2>Why we collect it</h2>
      <ul>
        <li>To reply to your message or booking request.</li>
        <li>To prepare for our call with you.</li>
      </ul>
      <p>We do not sell your details and we do not send marketing emails unless you ask for them.</p>
      <h2>Who can see it</h2>
      <p>Your message is sent by email to our team at ${site.email}. A copy is also kept on our website server so that no message gets lost. Our email and website hosting providers handle it on our behalf.</p>
      <h2>How long we keep it</h2>
      <p>We keep your message only as long as we need it to talk with you and do the work you ask for, or as the law requires.</p>
      <h2>Cookies and tracking</h2>
      <p>This website does not use advertising or tracking cookies.</p>
      <h2>Your rights</h2>
      <p>You may ask to see, correct or delete the details we hold about you. Email us at <a href="mailto:${site.email}">${site.email}</a> and we will help.</p>
      <h2>Contact</h2>
      <p>${site.name}, ${site.city}, ${site.countryName}. <a href="mailto:${site.email}">${site.email}</a></p>
    </div>
  </div>
</section>`;
}

import { icon, btn, slider, faqList, sectionHead, featureCard, ctaBand, mark, esc } from '../lib/components.mjs';
import { services } from '../data/content.mjs';
import { servicePages } from '../data/service-pages.mjs';
import { guides } from '../data/guides.mjs';
import { serviceUrl } from '../lib/service-url.mjs';

const byId = Object.fromEntries(services.map((s) => [s.id, s]));
const itemIcons = ['check', 'bolt', 'shield', 'globe', 'cursor'];

function build(s) {
  const p = servicePages[s.id];
  const meta = {
    key: `service-${s.id}`,
    navKey: 'services',
    path: serviceUrl(s.id),
    file: `services/${p.slug}/index.html`,
    crumbs: [['Services', '/services/'], [s.title, serviceUrl(s.id)]],
    title: p.seoTitle,
    description: p.metaDesc,
    ogImage: `/assets/img/og/svc-${p.slug}.png`,
    ogHeadline: p.ogHeadline,
    priority: '0.8',
    schema: 'service',
    service: s,
    faq: p.faq,
  };
  const body = () => `
<section class="page-head" aria-labelledby="page-title">
  <div class="hero-bg" aria-hidden="true"><div class="hero-lines"></div><div class="glow glow-a"></div><div class="hero-mark-wrap">${mark('hero-mark')}</div></div>
  <div class="wrap">
    <ol class="crumbs" aria-label="Breadcrumb"><li><a href="/">Home</a></li><li><a href="/services/">Services</a></li><li aria-current="page">${esc(s.title)}</li></ol>
    <p class="eyebrow">${esc(s.title)}</p>
    <h1 id="page-title">${p.h1}</h1>
    <p class="lead">${p.lead}</p>
    <div class="btn-row" style="margin-top:1.8rem">${btn('Book a free call', '/contact/#book')}${btn('See all services', '/services/', { kind: 'ghost' })}</div>
  </div>
</section>

<section class="sec deep cv" aria-labelledby="who-title">
  <div class="wrap split">
    <div class="reveal">
      <p class="eyebrow">Who it is for</p>
      <h2 id="who-title">${esc(s.title)} is for you <span class="accent">if you are</span></h2>
      <p class="lead" style="margin-top:1.1rem">${esc(s.blurb)}</p>
    </div>
    <ul class="ticks sv-who reveal" style="--d:.1s">${p.who.map((w) => `<li>${icon('check', 'ic ic-tick')}<span>${esc(w)}</span></li>`).join('')}</ul>
  </div>
</section>

<section class="sec cv" aria-labelledby="inc-title">
  <div class="wrap">
    ${sectionHead({ eyebrow: 'What is included', title: 'What you get with <span class="accent">' + esc(s.title) + '</span>', id: 'inc-title' })}
    <div class="stagger">${slider('sv-included', 'What is included', p.included.map((i, n) => featureCard({ icon: itemIcons[n % itemIcons.length], title: i.t, text: esc(i.d) })), { cols: 3, always: true })}</div>
  </div>
</section>

<section class="sec light cv" aria-labelledby="how-title">
  <div class="wrap">
    ${sectionHead({ eyebrow: 'How it works', title: 'Three simple steps', id: 'how-title', center: true })}
    <ol class="sv-steps reveal">${p.steps.map((st) => `<li><h3>${esc(st.t)}</h3><p>${esc(st.d)}</p></li>`).join('')}</ol>
  </div>
</section>

<section class="sec deep cv" aria-labelledby="faq-title">
  <div class="wrap">
    ${sectionHead({ eyebrow: 'Questions', title: 'Quick answers', id: 'faq-title', center: true })}
    <div class="reveal">${faqList(p.faq)}</div>
  </div>
</section>

<section class="sec cv" aria-labelledby="rel-title">
  <div class="wrap">
    ${sectionHead({ eyebrow: 'Keep exploring', title: 'Related services and guides', id: 'rel-title' })}
    <ul class="rel-grid reveal">
      ${p.related.map((id) => `<li><a href="${serviceUrl(id)}"><span class="rel-k">Service</span><span class="rel-t">${esc(byId[id].title)}</span><span class="rel-d">${esc(byId[id].blurb)}</span>${icon('arrow', 'ic ic-arrow')}</a></li>`).join('')}
      ${p.guides.map((slug) => { const g = guides.find((x) => x.slug === slug); return `<li><a href="/guides/${g.slug}/"><span class="rel-k">Guide</span><span class="rel-t">${esc(g.title)}</span><span class="rel-d">${esc(g.summary)}</span>${icon('arrow', 'ic ic-arrow')}</a></li>`; }).join('')}
    </ul>
  </div>
</section>

${ctaBand({ title: `Want help with ${esc(s.title.toLowerCase())}?`, lead: 'Book a free call. We will listen, give honest advice and tell you what it would cost.' })}`;
  return { meta, body };
}

export const entries = services.filter((s) => servicePages[s.id]).map(build);

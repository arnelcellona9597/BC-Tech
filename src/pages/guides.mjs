import { icon, btn, faqList, sectionHead, ctaBand, mark, esc, peso } from '../lib/components.mjs';
import { services, packages } from '../data/content.mjs';
import { guides } from '../data/guides.mjs';
import { site } from '../data/site.mjs';
import { serviceUrl } from '../lib/service-url.mjs';

const slugify = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const nice = (d) => new Date(d).toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' });

const indexMeta = {
  key: 'guides',
  path: '/guides/',
  file: 'guides/index.html',
  crumbs: [['Guides', '/guides/']],
  title: 'Guides: Websites, Online Stores & Integrations | Davao Byte',
  description: 'Plain-language guides on website costs, online stores and ERP integration for business owners in the Philippines.',
  ogImage: '/assets/img/og/guides.png',
  ogHeadline: 'Plain-language guides for business owners.',
  priority: '0.7',
  schema: 'guides',
};

const indexBody = () => `
<section class="page-head" aria-labelledby="page-title">
  <div class="hero-bg" aria-hidden="true"><div class="hero-lines"></div><div class="glow glow-a"></div><div class="hero-mark-wrap">${mark('hero-mark')}</div></div>
  <div class="wrap">
    <ol class="crumbs" aria-label="Breadcrumb"><li><a href="/">Home</a></li><li aria-current="page">Guides</li></ol>
    <p class="eyebrow">Helpful guides</p>
    <h1 id="page-title">Plain-language guides for <span class="accent">business owners</span></h1>
    <p class="lead">Straight answers to the questions we hear most, with no tech words and no sales pressure.</p>
  </div>
</section>
<section class="sec" aria-label="All guides">
  <div class="wrap">
    <ul class="guide-list">
      ${guides.map((g) => `<li><a class="guide-card tilt" href="/guides/${g.slug}/"><span class="rel-k">${g.mins} min read</span><span class="rel-t">${esc(g.title)}</span><span class="rel-d">${esc(g.summary)}</span><span class="rel-more">Read the guide ${icon('arrow', 'ic ic-arrow')}</span></a></li>`).join('')}
    </ul>
  </div>
</section>
${ctaBand({ title: 'Have a question the guides do not answer?', lead: 'Book a free call and ask us anything. We will give you honest advice.' })}`;

const table = () => `<div class="g-table-wrap" tabindex="0" role="region" aria-label="Website package prices"><table class="g-table"><caption>Davao Byte website packages and typical price ranges</caption><thead><tr><th scope="col">Package</th><th scope="col">Good for</th><th scope="col">Typical range</th></tr></thead><tbody>${packages.map((p) => `<tr><th scope="row">${esc(p.name)}<small>${esc(p.sub)}</small></th><td>${esc(p.forWho)}</td><td>${p.open ? `${peso(p.from)} and up` : `${peso(p.from)} to ${peso(p.to)}`}</td></tr>`).join('')}</tbody></table></div>`;

const block = (b) => {
  if (b.h2) return `<h2 id="${slugify(b.h2)}">${esc(b.h2)}</h2>`;
  if (b.h3) return `<h3>${esc(b.h3)}</h3>`;
  if (b.p) return `<p>${esc(b.p)}</p>`;
  if (b.ul) return `<ul>${b.ul.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`;
  if (b.packages) return table();
  if (b.cta) return `<aside class="g-callout"><p>${esc(b.cta.text)}</p><p>${btn(b.cta.label, b.cta.href)}</p></aside>`;
  return '';
};

function article(g) {
  const meta = {
    key: `guide-${g.slug}`,
    navKey: 'guides',
    path: `/guides/${g.slug}/`,
    file: `guides/${g.slug}/index.html`,
    crumbs: [['Guides', '/guides/'], [g.title, `/guides/${g.slug}/`]],
    title: g.seoTitle,
    description: g.description,
    ogImage: `/assets/img/og/guide-${g.slug}.png`,
    ogHeadline: g.ogHeadline,
    priority: '0.7',
    schema: 'article',
    guide: g,
    faq: g.faq,
  };
  const toc = g.blocks.filter((b) => b.h2);
  const body = () => `
<section class="page-head" aria-labelledby="page-title">
  <div class="hero-bg" aria-hidden="true"><div class="hero-lines"></div><div class="glow glow-a"></div><div class="hero-mark-wrap">${mark('hero-mark')}</div></div>
  <div class="wrap">
    <ol class="crumbs" aria-label="Breadcrumb"><li><a href="/">Home</a></li><li><a href="/guides/">Guides</a></li><li aria-current="page">Guide</li></ol>
    <p class="eyebrow">Guide · ${g.mins} min read</p>
    <h1 id="page-title">${esc(g.title)}</h1>
    <p class="lead">${esc(g.description)}</p>
    <p class="g-meta">By ${site.name} · Updated <time datetime="${site.built}">${nice(site.built)}</time></p>
  </div>
</section>
<section class="sec" aria-label="Guide">
  <div class="wrap g-layout">
    <nav class="g-toc" aria-label="In this guide"><p class="g-toc-t">In this guide</p><ol>${toc.map((b) => `<li><a href="#${slugify(b.h2)}">${esc(b.h2)}</a></li>`).join('')}<li><a href="#faq-title">Quick answers</a></li></ol></nav>
    <article class="prose guide">${g.blocks.map(block).join('\n')}</article>
  </div>
</section>
<section class="sec deep cv" aria-labelledby="faq-title">
  <div class="wrap">
    ${sectionHead({ eyebrow: 'Questions', title: 'Quick answers', id: 'faq-title', center: true })}
    <div class="reveal">${faqList(g.faq)}</div>
  </div>
</section>
<section class="sec cv" aria-labelledby="rel-title">
  <div class="wrap">
    ${sectionHead({ eyebrow: 'Keep exploring', title: 'Services that can help', id: 'rel-title' })}
    <ul class="rel-grid reveal">
      ${g.services.map((id) => { const s = services.find((x) => x.id === id); return `<li><a href="${serviceUrl(id)}"><span class="rel-k">Service</span><span class="rel-t">${esc(s.title)}</span><span class="rel-d">${esc(s.blurb)}</span>${icon('arrow', 'ic ic-arrow')}</a></li>`; }).join('')}
    </ul>
  </div>
</section>
${ctaBand({ title: 'Want advice for your own business?', lead: 'Book a free call. We will listen, give honest advice and tell you what it would cost.' })}`;
  return { meta, body };
}

export const entries = [{ meta: indexMeta, body: indexBody }, ...guides.map(article)];

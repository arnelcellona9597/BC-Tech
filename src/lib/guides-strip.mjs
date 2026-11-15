// "Helpful guides" strip used on the home, services and pricing pages (internal links that help visitors and Google).
import { icon, sectionHead, esc } from './components.mjs';
import { guides } from '../data/guides.mjs';

export function guidesStrip({ id = 'guides-title', deep = false } = {}) {
  return `<section class="sec${deep ? ' deep' : ''} cv" aria-labelledby="${id}">
  <div class="wrap">
    ${sectionHead({ eyebrow: 'Helpful guides', title: 'Straight answers, <span class="accent">no tech words</span>', lead: 'Short guides on the questions business owners ask us most.', id })}
    <ul class="guide-list reveal">
      ${guides.map((g) => `<li><a class="guide-card tilt" href="/guides/${g.slug}/"><span class="rel-k">${g.mins} min read</span><span class="rel-t">${esc(g.title)}</span><span class="rel-d">${esc(g.summary)}</span><span class="rel-more">Read the guide ${icon('arrow', 'ic ic-arrow')}</span></a></li>`).join('')}
    </ul>
  </div>
</section>`;
}

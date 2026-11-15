// Charts, diagrams and the calculator. Everything is plain HTML/CSS/SVG (no chart library),
// animated by the `.go` class that main.js adds when a [data-seq] block scrolls into view.
import { esc, peso, icon } from './components.mjs';

/** Count-up stat card with a visible source link. The final value is real text, so it also works without JavaScript. */
export function statCard({ value, prefix = '', suffix = '', label, cite, url }) {
  return `<article class="stat tilt">
    <p class="stat-num"><span data-count="${value}" data-prefix="${esc(prefix)}" data-suffix="${esc(suffix)}">${esc(prefix)}${value}${esc(suffix)}</span></p>
    <p class="stat-label">${esc(label)}</p>
    <p class="stat-cite">Source: <a href="${url}" target="_blank" rel="noopener">${esc(cite)}<span class="sr-only"> (opens in a new tab)</span></a></p>
    <span class="card-sheen" aria-hidden="true"></span>
  </article>`;
}

/** Grouped bar chart: total digital economy vs e-commerce, in US$ billions. */
export function marketChart({ bars, source }) {
  const max = Math.max(...bars.map((b) => b.total));
  const col = (b, i) => {
    const th = Math.round((b.total / max) * 100);
    const eh = Math.round((b.ecom / max) * 100);
    return `<div class="mc-group" style="--i:${i}">
      <div class="mc-bars">
        <div class="mc-bar total" style="--h:${th}%"><i class="mc-fill"></i><span class="mc-val">$${b.total}B</span></div>
        <div class="mc-bar ecom" style="--h:${eh}%"><i class="mc-fill"></i><span class="mc-val">$${b.ecom}B</span></div>
      </div>
      <p class="mc-year">${b.year}${b.estimate ? '<small> (estimate)</small>' : ''}</p>
    </div>`;
  };
  const rows = bars.map((b) => `<tr><th scope="row">${b.year}${b.estimate ? ' (estimate)' : ''}</th><td>US$${b.total} billion</td><td>US$${b.ecom} billion</td></tr>`).join('');
  return `<figure class="mc" data-seq>
    <figcaption class="mc-title">Philippine digital economy, US$ billions</figcaption>
    <div class="mc-plot" aria-hidden="true">${bars.map(col).join('')}</div>
    <ul class="mc-legend" aria-hidden="true"><li><i class="total"></i>Whole digital economy</li><li><i class="ecom"></i>Of which e-commerce</li></ul>
    <div class="sr-only"><table><caption>Philippine digital economy and e-commerce, US$ billions</caption><thead><tr><th>Year</th><th>Digital economy</th><th>E-commerce</th></tr></thead><tbody>${rows}</tbody></table></div>
    <p class="mc-source">Source: <a href="${source.url}" target="_blank" rel="noopener">${esc(source.label)}<span class="sr-only"> (opens in a new tab)</span></a>. Figures are rounded. 2025 is an estimate.</p>
  </figure>`;
}

/**
 * "Example only" line chart: monthly inquiries before and after a website launch.
 * These numbers are invented to illustrate the idea and are labeled that way inside the chart.
 */
export function exampleChart() {
  const w = 640, h = 340, l = 54, r = 20, t = 36, b = 56;
  const withSite = [4, 5, 4, 9, 14, 19, 25, 30, 34, 39, 42, 46];
  const without = [4, 5, 4, 5, 4, 5, 5, 4, 5, 5, 4, 5];
  const max = 50;
  const x = (i) => l + (i * (w - l - r)) / 11;
  const y = (v) => t + (1 - v / max) * (h - t - b);
  const line = (a) => a.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join('');
  const area = `${line(withSite)}L${x(11).toFixed(1)} ${y(0)}L${x(0)} ${y(0)}Z`;
  const grid = [0, 10, 20, 30, 40, 50].map((v) => `<line x1="${l}" x2="${w - r}" y1="${y(v)}" y2="${y(v)}" class="eg-grid"/><text x="${l - 10}" y="${y(v) + 4}" text-anchor="end" class="eg-tick">${v}</text>`).join('');
  const months = [1, 4, 7, 10, 12].map((m) => `<text x="${x(m - 1)}" y="${h - b + 24}" text-anchor="middle" class="eg-tick">${m}</text>`).join('');
  const lx = x(3);
  const rows = withSite.map((v, i) => `<tr><th scope="row">${i + 1}</th><td>${without[i]}</td><td>${v}</td></tr>`).join('');
  return `<figure class="eg" data-seq>
    <svg viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="eg-t eg-d" class="eg-svg">
      <title id="eg-t">Example only: inquiries per month before and after a website launch</title>
      <desc id="eg-d">An invented example, not a client result. Without a website, inquiries stay around 4 to 5 a month. With a website launched in month 4, inquiries in this example climb to 46 a month by month 12.</desc>
      ${grid}${months}
      <text x="${(l + w - r) / 2}" y="${h - 8}" text-anchor="middle" class="eg-axis">Month</text>
      <text x="14" y="${t - 14}" class="eg-axis">Inquiries per month</text>
      <line x1="${lx}" x2="${lx}" y1="${t}" y2="${h - b}" class="eg-launch"/>
      <text x="${lx + 8}" y="${t + 12}" class="eg-launch-t">Website launches</text>
      <path d="${area}" class="eg-area"/>
      <path d="${line(without)}" pathLength="1" class="eg-line eg-without"/>
      <path d="${line(withSite)}" pathLength="1" class="eg-line eg-with"/>
      <circle cx="${x(11)}" cy="${y(46)}" r="5" class="eg-dot"/>
      <text x="${x(11) - 8}" y="${y(46) - 12}" text-anchor="end" class="eg-end">46</text>
    </svg>
    <ul class="mc-legend" aria-hidden="true"><li><i class="eg-key with"></i>With a website</li><li><i class="eg-key without"></i>Without a website</li></ul>
    <p class="eg-flag"><strong>Example only.</strong> These numbers are made up to show the idea. They are not a client result and not a promise.</p>
    <div class="sr-only"><table><caption>Example only: invented inquiries per month</caption><thead><tr><th>Month</th><th>Without a website</th><th>With a website</th></tr></thead><tbody>${rows}</tbody></table></div>
  </figure>`;
}

/** Funnel diagram: shapes and words only (no numbers). */
export function funnel() {
  return `<figure class="funnel" data-seq>
    <ol class="funnel-steps">
      <li style="--i:0;--w:100%"><b>Visitors</b><span>People who find your website</span></li>
      <li style="--i:1;--w:78%"><b>Inquiries</b><span>They ask a question or book a call</span></li>
      <li style="--i:2;--w:56%"><b>Customers</b><span>They buy from you</span></li>
    </ol>
    <figcaption>Your website's job is to move more people down this path.</figcaption>
  </figure>`;
}

/** Website payback calculator. The math runs in charts.js on the visitor's own numbers. */
export function calculator(packages) {
  const opts = packages.map((p, i) => `<option value="${p.from}"${i === 1 ? ' selected' : ''}>${esc(p.name)} (from ${peso(p.from)})</option>`).join('');
  return `<div class="calc" id="calc" data-calc>
    <form class="calc-form" action="#calc" novalidate>
      <div class="field"><label for="calc-pkg">Which website are you thinking about?</label><select id="calc-pkg" name="pkg">${opts}</select></div>
      <div class="field"><label for="calc-value">Average sale per customer (₱)</label><input id="calc-value" name="value" type="number" inputmode="numeric" min="1" step="50" value="3000"></div>
      <div class="field"><label for="calc-cust">Extra customers a month: <output id="calc-cust-out" for="calc-cust">5</output></label><input id="calc-cust" name="cust" type="range" min="1" max="60" value="5"></div>
    </form>
    <div class="calc-out" aria-live="polite">
      <p class="calc-line"><span>Extra sales each month</span><b data-out="monthly">${peso(15000)}</b></p>
      <p class="calc-line"><span>Website price (starting)</span><b data-out="price">${peso(packages[1].from)}</b></p>
      <p class="calc-big" data-out="payback">The website pays for itself in about 3 months.</p>
    </div>
    <figure class="calc-chart" data-seq>
      <svg viewBox="0 0 520 240" role="img" aria-labelledby="cc-t" class="cc-svg"><title id="cc-t">Extra sales added up over 12 months, compared with the website price</title><g data-out="chart"></g></svg>
      <figcaption>Extra sales added up over 12 months (bars) against the website price (red line).</figcaption>
    </figure>
    <p class="calc-note">${icon('shield', 'ic')}<span>This uses your own numbers and the package's starting price. It is a way to think about the return, not a promise of results.</span></p>
  </div>`;
}

/** Drag-to-compare: a typical website versus a BC Tech website, both drawn with CSS. */
export function compare() {
  return `<div class="compare" data-compare style="--pos:50%">
    <div class="cmp-layer cmp-good" aria-hidden="true">
      <div class="cmp-nav"><b></b><i></i><i></i><i></i><u></u></div>
      <div class="cmp-hero"><div class="cmp-h1"></div><div class="cmp-h2"></div><div class="cmp-btns"><u></u><s></s></div></div>
      <div class="cmp-cards"><div></div><div></div><div></div></div>
    </div>
    <div class="cmp-layer cmp-bad" aria-hidden="true">
      <div class="cmp-nav"><b></b><i></i><i></i><i></i><i></i><i></i><i></i></div>
      <div class="cmp-wall"><div></div><div></div><div></div><div></div><div></div><div></div></div>
      <div class="cmp-tiny"><s></s></div>
    </div>
    <span class="cmp-tag cmp-tag-bad">A typical website</span>
    <span class="cmp-tag cmp-tag-good">A BC Tech website</span>
    <span class="cmp-handle" aria-hidden="true"><i></i></span>
    <input class="cmp-range" type="range" min="0" max="100" value="50" aria-label="Drag to compare a typical website with a BC Tech website">
  </div>
  <ul class="cmp-points">
    <li><b>Typical:</b> crowded pages, no clear next step, tiny buttons.</li>
    <li><b>BC Tech:</b> one clear message, one clear button, easy on every phone.</li>
  </ul>`;
}

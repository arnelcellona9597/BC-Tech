/* Davao Byte: count-up numbers and the website payback calculator. Loaded only on pages that use them. */
(() => {
  const d = document;
  const $$ = (s, c = d) => Array.from(c.querySelectorAll(s));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fmt = (n) => Math.round(n).toLocaleString('en-US');
  const peso = (n) => `₱${fmt(n)}`;

  /* ---- Count-up: the real number is already in the page, we only animate it ---- */
  $$('[data-count]').forEach((el) => {
    if (reduce || !('IntersectionObserver' in window)) return;
    const target = Number(el.dataset.count);
    const pre = el.dataset.prefix || '';
    const suf = el.dataset.suffix || '';
    const io = new IntersectionObserver((es) => {
      if (!es[0].isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const dur = 1300;
      const tick = (t) => {
        const p = Math.min(1, (t - t0) / dur);
        el.textContent = pre + fmt(target * (1 - Math.pow(1 - p, 3))) + suf;
        if (p < 1) requestAnimationFrame(tick);
      };
      el.textContent = `${pre}0${suf}`;
      requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    io.observe(el);
  });

  /* ---- Payback calculator: only uses the numbers the visitor types ---- */
  function payback(price, value, customers) {
    const monthly = value * customers;
    if (!(monthly > 0) || !(price > 0)) return { monthly: 0, months: Infinity };
    return { monthly, months: price / monthly };
  }
  window.DBCalc = { payback };

  $$('[data-calc]').forEach((root) => {
    const pkg = root.querySelector('#calc-pkg');
    const val = root.querySelector('#calc-value');
    const cust = root.querySelector('#calc-cust');
    const custOut = root.querySelector('#calc-cust-out');
    const out = (k) => root.querySelector(`[data-out="${k}"]`);

    const render = () => {
      const price = Number(pkg.value);
      const value = Math.max(0, Number(val.value) || 0);
      const customers = Number(cust.value);
      custOut.textContent = String(customers);
      const r = payback(price, value, customers);
      out('monthly').textContent = peso(r.monthly);
      out('price').textContent = peso(price);

      let text;
      if (!r.monthly) text = 'Enter an average sale to see the result.';
      else if (r.months <= 1) text = 'At these numbers, the website could pay for itself in the first month.';
      else if (r.months > 36) text = 'At these numbers it would take more than 3 years. Try a higher average sale or more customers.';
      else text = `At these numbers, the website could pay for itself in about ${r.months.toFixed(1).replace(/\.0$/, '')} months.`;
      out('payback').textContent = text;

      // 12-month running total (bars) against the website price (line)
      const W = 520, H = 240, l = 10, rr = 10, t = 30, b = 30;
      const cum = Array.from({ length: 12 }, (_, i) => r.monthly * (i + 1));
      const max = Math.max(price, cum[11], 1) * 1.12;
      const bw = (W - l - rr) / 12;
      let html = '';
      cum.forEach((c, i) => {
        const h = (c / max) * (H - t - b);
        const x = l + i * bw + bw * 0.14;
        html += `<rect class="cc-bar${c >= price ? ' over' : ''}" x="${x.toFixed(1)}" y="${(H - b - h).toFixed(1)}" width="${(bw * 0.72).toFixed(1)}" height="${Math.max(0, h).toFixed(1)}" rx="3"/>`;
        html += `<text class="cc-txt" x="${(l + i * bw + bw / 2).toFixed(1)}" y="${H - 10}" text-anchor="middle">${i + 1}</text>`;
      });
      const py = H - b - (price / max) * (H - t - b);
      html += `<line class="cc-price" x1="${l}" x2="${W - rr}" y1="${py.toFixed(1)}" y2="${py.toFixed(1)}"/>`;
      html += `<text class="cc-ptxt" x="${l + 2}" y="16">Red line: website price ${peso(price)}</text>`;
      out('chart').innerHTML = html;
    };

    root.addEventListener('input', render);
    root.addEventListener('change', render);
    root.querySelector('form').addEventListener('submit', (e) => e.preventDefault());
    render();
  });
})();

/* Davao Byte: the 3D package stage on the Pricing page (chips, arrows, dots, swipe, keyboard). */
(() => {
  const d = document;
  const $$ = (s, c = d) => Array.from(c.querySelectorAll(s));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return; // the plain grid is shown instead

  $$('[data-flow]').forEach((flow) => {
    const stage = flow.querySelector('.flow-stage');
    const items = $$('.flow-item', flow);
    const chips = $$('.flow-chip', flow);
    const dotsBox = flow.querySelector('.flow-dots');
    const prev = flow.querySelector('.flow-prev');
    const next = flow.querySelector('.flow-next');
    const n = items.length;
    let cur = items.findIndex((el) => el.classList.contains('is-current'));
    if (cur < 0) cur = Math.floor(n / 2);

    items.forEach((_, i) => {
      const b = d.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', `Show package ${i + 1} of ${n}`);
      b.addEventListener('click', () => set(i));
      dotsBox.appendChild(b);
    });
    const dots = $$('button', dotsBox);

    function set(i, picked) {
      cur = Math.max(0, Math.min(n - 1, i));
      items.forEach((el, k) => {
        const o = k - cur;
        el.style.setProperty('--o', o);
        el.style.setProperty('--a', Math.abs(o));
        el.toggleAttribute('data-far', Math.abs(o) > 2);
        el.classList.toggle('is-current', o === 0);
      });
      dots.forEach((b, k) => (k === cur ? b.setAttribute('aria-current', 'true') : b.removeAttribute('aria-current')));
      chips.forEach((c, k) => c.setAttribute('aria-pressed', String(picked !== undefined && k === cur)));
      prev.disabled = cur === 0;
      next.disabled = cur === n - 1;
    }

    // The stage is as tall as the tallest card
    const fit = () => {
      const h = Math.max(...items.map((el) => el.offsetHeight));
      if (h > 0) stage.style.setProperty('--stage-h', `${h + 90}px`);
    };
    if ('ResizeObserver' in window) new ResizeObserver(fit).observe(items[0]);
    addEventListener('resize', fit);
    if (d.fonts && d.fonts.ready) d.fonts.ready.then(fit);
    fit();

    chips.forEach((c) => c.addEventListener('click', () => set(Number(c.dataset.i), true)));
    prev.addEventListener('click', () => set(cur - 1));
    next.addEventListener('click', () => set(cur + 1));

    // Keyboard: arrows, Home and End work anywhere inside the stage
    flow.addEventListener('keydown', (e) => {
      if (e.target.closest('input,select,textarea')) return;
      if (e.key === 'ArrowLeft') { e.preventDefault(); set(cur - 1); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); set(cur + 1); }
      else if (e.key === 'Home') { e.preventDefault(); set(0); }
      else if (e.key === 'End') { e.preventDefault(); set(n - 1); }
    });

    // Tabbing to a card that is off to the side brings it to the front
    flow.addEventListener('focusin', (e) => {
      const it = e.target.closest('.flow-item');
      if (it) { const i = items.indexOf(it); if (i !== cur) set(i); }
    });

    // Clicking a side card brings it forward (clicking the current card works normally)
    flow.addEventListener('click', (e) => {
      const it = e.target.closest('.flow-item');
      if (!it) return;
      const i = items.indexOf(it);
      if (i !== cur && !e.target.closest('.flow-chip')) { e.preventDefault(); set(i); }
    });

    // Swipe or drag sideways
    let sx = 0, sy = 0, down = false, dx = 0;
    stage.addEventListener('pointerdown', (e) => {
      if (e.target.closest('a,button,input,select,textarea')) return;
      down = true; sx = e.clientX; sy = e.clientY; dx = 0;
    });
    stage.addEventListener('pointermove', (e) => { if (down) dx = e.clientX - sx; });
    const end = () => {
      if (!down) return;
      down = false;
      if (Math.abs(dx) > 50) set(cur + (dx < 0 ? 1 : -1));
    };
    stage.addEventListener('pointerup', end);
    stage.addEventListener('pointercancel', () => { down = false; });
    stage.addEventListener('pointerleave', end);

    // A link like /pricing/#store-small opens with that package in front
    const fromHash = () => {
      const id = location.hash.slice(1);
      if (!id) return;
      const i = items.findIndex((el) => el.querySelector(`#${CSS.escape(id)}`));
      if (i >= 0) set(i, true);
    };
    addEventListener('hashchange', fromHash);
    set(cur);
    fromHash();
  });
})();

/* BC Tech: navigation, scroll effects, tilt, sliders. No dependencies. */
(() => {
  const d = document;
  const root = d.documentElement;
  const $ = (s, c = d) => c.querySelector(s);
  const $$ = (s, c = d) => Array.from(c.querySelectorAll(s));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---- Mobile navigation ---- */
  const toggle = $('.nav-toggle');
  const nav = $('#site-nav');
  const setNav = (open) => {
    root.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  if (toggle && nav) {
    toggle.addEventListener('click', () => setNav(!root.classList.contains('nav-open')));
    nav.addEventListener('click', (e) => { if (e.target.closest('a')) setNav(false); });
    d.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && root.classList.contains('nav-open')) { setNav(false); toggle.focus(); }
    });
    matchMedia('(min-width: 960px)').addEventListener('change', (e) => { if (e.matches) setNav(false); });
  }

  /* ---- "Stranger to customer" path: draws itself once when it scrolls into view ---- */
  $$('[data-path]').forEach((el) => {
    if (reduce || !('IntersectionObserver' in window)) { el.classList.add('go'); return; }
    const io = new IntersectionObserver((es) => {
      if (es[0].isIntersecting) { el.classList.add('go'); io.disconnect(); }
    }, { threshold: 0.45 });
    io.observe(el);
  });

  /* ---- Statement: words light up as you scroll past ---- */
  const lits = $$('[data-lit]').map((el) => ({ el, words: $$('.w', el) }));
  const scrub = () => {
    lits.forEach(({ el, words }) => {
      const top = el.getBoundingClientRect().top;
      const p = reduce ? 1 : Math.min(1, Math.max(0, (innerHeight * 0.9 - top) / (innerHeight * 0.5)));
      const n = Math.round(p * words.length);
      words.forEach((w, i) => w.classList.toggle('on', i < n));
    });
  };

  /* ---- Header state, progress bar, floating call button, parallax ---- */
  const header = $('.site-header');
  const bar = $('.progress');
  const float = $('.float-cta');
  const parallax = $('.hero-mark-wrap');
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      const max = root.scrollHeight - innerHeight;
      header && header.classList.toggle('is-scrolled', y > 24);
      if (lits.length) scrub();
      bar && bar.style.setProperty('--p', max > 0 ? (y / max).toFixed(4) : 0);
      if (float) float.classList.toggle('show', y > 520 && !float.dataset.hide);
      if (parallax && !reduce && y < innerHeight * 1.2) parallax.style.setProperty('--py', `${(y * 0.14).toFixed(1)}px`);
      ticking = false;
    });
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Hide the floating button while the closing call-to-action or footer is on screen
  if (float && 'IntersectionObserver' in window) {
    const watch = $$('.cta, .site-footer');
    const seen = new Set();
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => (e.isIntersecting ? seen.add(e.target) : seen.delete(e.target)));
      if (seen.size) float.dataset.hide = '1'; else delete float.dataset.hide;
      onScroll();
    });
    watch.forEach((el) => io.observe(el));
  }

  /* ---- Reveal on scroll ---- */
  const items = $$('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach((el) => io.observe(el));
  } else {
    items.forEach((el) => el.classList.add('in'));
  }

  /* ---- 3D tilt + light sheen on hover ---- */
  if (fine && !reduce) {
    $$('.tilt').forEach((el) => {
      let raf = 0;
      el.addEventListener('pointermove', (e) => {
        if (e.pointerType !== 'mouse') return;
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          el.classList.add('is-moving');
          el.style.setProperty('--ry', `${((x - 0.5) * 10).toFixed(2)}deg`);
          el.style.setProperty('--rx', `${((0.5 - y) * 8).toFixed(2)}deg`);
          el.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`);
          el.style.setProperty('--my', `${(y * 100).toFixed(1)}%`);
        });
      });
      el.addEventListener('pointerleave', () => {
        cancelAnimationFrame(raf);
        el.classList.remove('is-moving');
        el.style.setProperty('--rx', '0deg');
        el.style.setProperty('--ry', '0deg');
      });
    });

    /* soft red light that follows the cursor */
    const glow = d.createElement('div');
    glow.className = 'cursor-glow';
    glow.setAttribute('aria-hidden', 'true');
    d.body.appendChild(glow);
    let gx = 0, gy = 0, gr = 0;
    addEventListener('pointermove', (e) => {
      if (e.pointerType !== 'mouse') return;
      gx = e.clientX; gy = e.clientY;
      if (!gr) gr = requestAnimationFrame(() => {
        glow.style.setProperty('--cx', `${gx}px`);
        glow.style.setProperty('--cy', `${gy}px`);
        glow.classList.add('on');
        gr = 0;
      });
    }, { passive: true });
    d.addEventListener('pointerleave', () => glow.classList.remove('on'));
  }

  /* ---- Sliders: grid on desktop, swipe slider on mobile ---- */
  const mq = matchMedia('(max-width: 899px)');
  const arrow = (dir) => `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${dir < 0 ? 'm15 6-6 6 6 6' : 'm9 6 6 6-6 6'}"/></svg>`;
  $$('[data-slider]').forEach((sl) => {
    const track = $('.slider-track', sl);
    const slides = $$('.slide', track);
    if (slides.length < 2) return;
    const ui = d.createElement('div');
    ui.className = 'slider-ui';
    ui.innerHTML = `<button type="button" class="slider-btn" aria-label="Previous slide">${arrow(-1)}</button><div class="slider-dots"></div><button type="button" class="slider-btn" aria-label="Next slide">${arrow(1)}</button>`;
    sl.appendChild(ui);
    const [prev, next] = $$('.slider-btn', ui);
    const dots = $('.slider-dots', ui);
    slides.forEach((_, i) => {
      const b = d.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', `Go to slide ${i + 1}`);
      b.addEventListener('click', () => go(i));
      dots.appendChild(b);
    });
    const go = (i) => {
      const s = slides[Math.max(0, Math.min(slides.length - 1, i))];
      track.scrollTo({ left: s.offsetLeft - (track.clientWidth - s.clientWidth) / 2, behavior: reduce ? 'auto' : 'smooth' });
    };
    const current = () => {
      const mid = track.scrollLeft + track.clientWidth / 2;
      let best = 0, dist = Infinity;
      slides.forEach((s, i) => { const dd = Math.abs(s.offsetLeft + s.clientWidth / 2 - mid); if (dd < dist) { dist = dd; best = i; } });
      return best;
    };
    const sync = () => {
      const i = current();
      $$('button', dots).forEach((b, k) => (k === i ? b.setAttribute('aria-current', 'true') : b.removeAttribute('aria-current')));
      prev.disabled = i === 0;
      next.disabled = i === slides.length - 1;
    };
    prev.addEventListener('click', () => go(current() - 1));
    next.addEventListener('click', () => go(current() + 1));
    let t = 0;
    track.addEventListener('scroll', () => { cancelAnimationFrame(t); t = requestAnimationFrame(sync); }, { passive: true });
    // Only a scrollable region needs a keyboard stop
    const fit = () => { if (mq.matches) track.setAttribute('tabindex', '0'); else track.removeAttribute('tabindex'); sync(); };
    mq.addEventListener('change', fit);
    fit();
  });
})();

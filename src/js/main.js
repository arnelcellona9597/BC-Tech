/* Davao Byte: navigation, scroll effects, tilt, sliders. No dependencies. */
(() => {
  const d = document;
  const root = d.documentElement;
  const $ = (s, c = d) => c.querySelector(s);
  const $$ = (s, c = d) => Array.from(c.querySelectorAll(s));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---- Path and chat: play once when they scroll into view ---- */
  $$('[data-path], [data-seq]').forEach((el) => {
    if (reduce || !('IntersectionObserver' in window)) { el.classList.add('go'); return; }
    const io = new IntersectionObserver((es) => {
      if (es[0].isIntersecting) { el.classList.add('go'); io.disconnect(); }
    }, { threshold: 0.35 });
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
  const parallax = $('.hero-mark-wrap, .hero-visual');
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

    /* primary buttons lean toward the cursor */
    $$('.btn-primary').forEach((b) => {
      b.addEventListener('pointermove', (e) => {
        if (e.pointerType !== 'mouse') return;
        const r = b.getBoundingClientRect();
        b.style.setProperty('--bx', `${((e.clientX - r.left - r.width / 2) * 0.12).toFixed(1)}px`);
        b.style.setProperty('--by', `${((e.clientY - r.top - r.height / 2) * 0.22).toFixed(1)}px`);
      });
      b.addEventListener('pointerleave', () => { b.style.setProperty('--bx', '0px'); b.style.setProperty('--by', '0px'); });
    });

    /* soft red light that follows the cursor */
    const glow = d.createElement('div');
    glow.className = 'cursor-glow';
    glow.setAttribute('aria-hidden', 'true');
    d.body.appendChild(glow);
    let gx = 0, gy = 0, gr = 0;
    const heroEl = d.querySelector('.hero.has-form');
    addEventListener('pointermove', (e) => {
      if (e.pointerType !== 'mouse') return;
      gx = e.clientX; gy = e.clientY;
      /* no red haze over white sections: it made red text hard to read */
      glow.classList.toggle('off', !!(e.target.closest && e.target.closest('.sec.light, .cta, input, select, textarea, .faq')));
      if (heroEl && gy < innerHeight) { heroEl.style.setProperty('--mx', ((gx / innerWidth - .5) * 2).toFixed(3)); heroEl.style.setProperty('--my', ((gy / innerHeight - .5) * 2).toFixed(3)); }
      if (!gr) gr = requestAnimationFrame(() => {
        glow.style.setProperty('--cx', `${gx}px`);
        glow.style.setProperty('--cy', `${gy}px`);
        glow.classList.add('on');
        gr = 0;
      });
    }, { passive: true });
    d.addEventListener('pointerleave', () => glow.classList.remove('on'));
  }

  /* ---- Sliders: scroll-snap carousels with arrows, dots, mouse drag and keyboard ---- */
  const mq = matchMedia('(max-width: 899px)');
  const arrow = (dir) => `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${dir < 0 ? 'm15 6-6 6 6 6' : 'm9 6 6 6-6 6'}"/></svg>`;
  $$('[data-slider]').forEach((sl) => {
    const track = $('.slider-track', sl);
    const slides = $$('.slide', track);
    if (slides.length < 2) return;
    const always = sl.classList.contains('is-carousel');
    const ui = d.createElement('div');
    ui.className = 'slider-ui';
    ui.innerHTML = `<button type="button" class="slider-btn" aria-label="Previous slide">${arrow(-1)}</button><div class="slider-dots"></div><button type="button" class="slider-btn" aria-label="Next slide">${arrow(1)}</button>`;
    sl.appendChild(ui);
    const [prev, next] = $$('.slider-btn', ui);
    const dots = $('.slider-dots', ui);
    if (always || mq.matches) track.setAttribute('tabindex', '0'); // set up front: sections below the fold are not measured until drawn
    let pages = 1;
    const step = () => (slides[1].offsetLeft - slides[0].offsetLeft) || slides[0].clientWidth;
    const maxScroll = () => track.scrollWidth - track.clientWidth;
    const page = () => Math.max(0, Math.min(pages - 1, Math.round(track.scrollLeft / step())));
    const go = (i) => track.scrollTo({ left: Math.max(0, Math.min(maxScroll(), i * step())), behavior: reduce ? 'auto' : 'smooth' });
    const sync = () => {
      const i = page();
      $$('button', dots).forEach((b, k) => (k === i ? b.setAttribute('aria-current', 'true') : b.removeAttribute('aria-current')));
      prev.disabled = i <= 0;
      next.disabled = i >= pages - 1 || track.scrollLeft >= maxScroll() - 2;
    };
    const build = () => {
      const scrollable = maxScroll() > 4;
      pages = scrollable ? Math.min(slides.length, Math.round(maxScroll() / step()) + 1) : 1;
      sl.classList.toggle('no-scroll', !scrollable);
      dots.innerHTML = '';
      for (let i = 0; i < pages; i++) {
        const b = d.createElement('button');
        b.type = 'button';
        b.setAttribute('aria-label', `Go to slide ${i + 1}`);
        b.addEventListener('click', () => go(i));
        dots.appendChild(b);
      }
      // A scrollable region needs a keyboard stop. Carousels that scroll on every screen size always keep one.
      if (scrollable || always) track.setAttribute('tabindex', '0'); else track.removeAttribute('tabindex');
      sync();
    };
    prev.addEventListener('click', () => go(page() - 1));
    next.addEventListener('click', () => go(page() + 1));
    let t = 0;
    track.addEventListener('scroll', () => { cancelAnimationFrame(t); t = requestAnimationFrame(sync); }, { passive: true });
    if ('ResizeObserver' in window) new ResizeObserver(build).observe(track); else { addEventListener('resize', build); build(); }
    // Sections below the fold are not measured until they are drawn, so measure again when they come into view
    if ('IntersectionObserver' in window) new IntersectionObserver((es) => { if (es[0].isIntersecting) build(); }).observe(sl);
    // Gentle autoplay (only where asked): pauses on hover, focus, touch, drag, when off-screen or the tab is hidden
    if (sl.hasAttribute('data-autoplay') && !reduce && 'IntersectionObserver' in window) {
      let vis = false, hov = false, foc = false, hold = 0;
      new IntersectionObserver((es) => { vis = es[0].isIntersecting; }, { threshold: 0.3 }).observe(sl);
      sl.addEventListener('mouseenter', () => { hov = true; });
      sl.addEventListener('mouseleave', () => { hov = false; });
      sl.addEventListener('focusin', () => { foc = true; });
      sl.addEventListener('focusout', () => { foc = false; });
      sl.addEventListener('touchstart', () => { hold = Date.now() + 9000; }, { passive: true });
      setInterval(() => {
        if (!vis || hov || foc || d.hidden || Date.now() < hold || track.classList.contains('dragging') || maxScroll() < 4) return;
        if (page() >= pages - 1 || track.scrollLeft >= maxScroll() - 2) go(0); else go(page() + 1);
      }, 5200);
    }
    mq.addEventListener('change', build);

    // Mouse drag (touch already scrolls natively)
    if (always && fine) {
      let down = false, sx = 0, start = 0, moved = 0;
      track.addEventListener('pointerdown', (e) => {
        if (e.pointerType !== 'mouse' || e.button !== 0 || e.target.closest('a,button,input,select,textarea')) return;
        down = true; moved = 0; sx = e.clientX; start = track.scrollLeft;
      });
      addEventListener('pointermove', (e) => {
        if (!down) return;
        const dx = e.clientX - sx;
        moved = Math.max(moved, Math.abs(dx));
        if (moved > 6) { track.classList.add('dragging'); track.scrollLeft = start - dx; }
      });
      const up = () => {
        if (!down) return;
        down = false;
        if (track.classList.contains('dragging')) {
          track.classList.remove('dragging');
          go(Math.round(track.scrollLeft / step()));
        }
      };
      addEventListener('pointerup', up);
      addEventListener('pointercancel', up);
    }
  });

  /* ---- Drag-to-compare slider ---- */
  $$('[data-compare]').forEach((el) => {
    const input = $('.cmp-range', el);
    const set = () => el.style.setProperty('--pos', `${input.value}%`);
    input.addEventListener('input', set);
    set();
  });
})();

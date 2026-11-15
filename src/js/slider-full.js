/* Full-width autoplay slider: 3 rotating effects, pause on hover/focus/touch/off-screen, swipe, keyboard. */
(function () {
  var reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
  document.querySelectorAll('.hs').forEach(function (hs) {
    var slides = [].slice.call(hs.querySelectorAll('.hs-slide'));
    var dots = [].slice.call(hs.querySelectorAll('.hs-dot'));
    var fx = (hs.getAttribute('data-fx') || 'fade').split(',');
    var bar = hs.querySelector('.hs-bar i');
    var play = hs.querySelector('.hs-play');
    var DUR = 6000, cur = 0, n = slides.length, timer = 0, busy = false, count = 0;
    var userPaused = false, hover = false, focus = false, visible = false, touching = false;
    var announce = document.createElement('p'); announce.className = 'sr-only'; announce.setAttribute('aria-live', 'polite'); hs.appendChild(announce);
    hs.style.setProperty('--hs-dur', DUR + 'ms');
    slides[0].classList.add('fx-fade');

    function go(to, dir) {
      if (busy || to === cur) return;
      to = (to + n) % n; busy = true;
      var from = slides[cur], next = slides[to];
      var effect = reduce ? 'fade' : fx[count++ % fx.length];
      slides.forEach(function (s) { s.classList.remove('fx-fade', 'fx-wipe', 'fx-slide', 'rev', 'is-leaving'); });
      next.classList.add('fx-' + effect); if (dir < 0) next.classList.add('rev');
      from.classList.remove('is-active'); from.classList.add('is-leaving');
      next.classList.add('is-active');
      dots[cur].classList.remove('is-active'); dots[to].classList.add('is-active');
      cur = to;
      announce.textContent = slides[cur].querySelector('h3').textContent + ', slide ' + (cur + 1) + ' of ' + n;
      setTimeout(function () { from.classList.remove('is-leaving'); busy = false; }, reduce ? 50 : 1150);
      restart();
    }
    function should() { return !reduce && !userPaused && !hover && !focus && !touching && visible && !document.hidden; }
    function restart() {
      clearTimeout(timer);
      if (bar) { bar.style.animation = 'none'; void bar.offsetWidth; bar.style.animation = ''; }
      hs.classList.toggle('is-playing', should());
      if (should()) timer = setTimeout(function () { go(cur + 1, 1); }, DUR);
    }
    function sync() { hs.classList.toggle('is-playing', should()); if (should()) restart(); else clearTimeout(timer); }
    hs.querySelector('.hs-next').addEventListener('click', function () { go(cur + 1, 1); });
    hs.querySelector('.hs-prev').addEventListener('click', function () { go(cur - 1, -1); });
    dots.forEach(function (d, i) { d.addEventListener('click', function () { go(i, i > cur ? 1 : -1); }); });
    play.addEventListener('click', function () {
      userPaused = !userPaused;
      play.setAttribute('aria-pressed', String(userPaused));
      play.setAttribute('aria-label', userPaused ? 'Play slideshow' : 'Pause slideshow');
      sync();
    });
    if (reduce) { play.hidden = true; }
    hs.addEventListener('mouseenter', function () { hover = true; sync(); });
    hs.addEventListener('mouseleave', function () { hover = false; sync(); });
    hs.addEventListener('focusin', function () { focus = true; sync(); });
    hs.addEventListener('focusout', function () { focus = false; sync(); });
    var sx = 0, sy = 0;
    hs.addEventListener('touchstart', function (e) { touching = true; sx = e.touches[0].clientX; sy = e.touches[0].clientY; sync(); }, { passive: true });
    hs.addEventListener('touchend', function (e) {
      touching = false; var dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) go(cur + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1); else sync();
    }, { passive: true });
    hs.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') go(cur + 1, 1); else if (e.key === 'ArrowLeft') go(cur - 1, -1);
    });
    document.addEventListener('visibilitychange', sync);
    new IntersectionObserver(function (e) { visible = e[0].isIntersecting; sync(); }, { threshold: .35 }).observe(hs);
  });
})();

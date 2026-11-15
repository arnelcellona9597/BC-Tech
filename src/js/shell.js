/* Mobile menu, footer clock, back-to-top ring and the chat button. */
(function () {
  var d = document, root = d.documentElement;
  var reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;

  /* ---- Mobile menu ---- */
  var toggle = d.querySelector('.nav-toggle'), menu = d.getElementById('mobile-menu');
  if (toggle && menu) {
    var behind = d.querySelectorAll('main,.site-footer,.chat,.float-wrap,.skip');
    var isOpen = false, openedAt = 0;
    var setMenu = function (open) {
      if (open === isOpen) return;
      isOpen = open;
      if (open) {
        var r = toggle.getBoundingClientRect();
        root.style.setProperty('--mbx', (r.left + r.width / 2) + 'px');
        root.style.setProperty('--mby', (r.top + r.height / 2) + 'px');
        openedAt = Date.now();
      }
      root.classList.toggle('nav-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      if (open) menu.removeAttribute('inert'); else menu.setAttribute('inert', '');
      behind.forEach(function (el) { if (open) el.setAttribute('inert', ''); else el.removeAttribute('inert'); });
      if (open) { var f = menu.querySelector('a'); setTimeout(function () { if (isOpen && f) f.focus({ preventScroll: true }); }, reduce ? 30 : 420); }
    };
    toggle.addEventListener('click', function () { setMenu(!isOpen); });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    d.addEventListener('keydown', function (e) {
      if (!isOpen) return;
      if (e.key === 'Escape') { setMenu(false); toggle.focus(); return; }
      if (e.key !== 'Tab') return;
      var list = [].slice.call(d.querySelectorAll('.site-header .brand, .nav-toggle, #mobile-menu a')).filter(function (el) { return el.offsetParent !== null; });
      var i = list.indexOf(d.activeElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); list[list.length - 1].focus(); }
      else if (!e.shiftKey && (i === list.length - 1 || i < 0)) { e.preventDefault(); list[0].focus(); }
    });
    matchMedia('(min-width: 960px)').addEventListener('change', function (e) { if (e.matches) setMenu(false); });
  }

  /* ---- Davao clock, open/closed pill, chat status ---- */
  var pill = d.querySelector('[data-open]');
  var cfg = pill ? { days: pill.dataset.days.split(',').map(Number), start: +pill.dataset.start, end: +pill.dataset.end, tz: pill.dataset.tz } : { days: [1, 2, 3, 4, 5], start: 9, end: 17, tz: 'Asia/Manila' };
  var wd = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  function status() {
    try {
      var parts = new Intl.DateTimeFormat('en-US', { timeZone: cfg.tz, weekday: 'short', hour: 'numeric', minute: '2-digit', hour12: true }).formatToParts(new Date());
      var g = function (t) { return (parts.filter(function (p) { return p.type === t; })[0] || {}).value; };
      var hour24 = new Intl.DateTimeFormat('en-US', { timeZone: cfg.tz, hour: 'numeric', hour12: false }).format(new Date()) % 24;
      var open = cfg.days.indexOf(wd[g('weekday')]) > -1 && hour24 >= cfg.start && hour24 < cfg.end;
      return { open: open, time: g('hour') + ':' + g('minute') + ' ' + g('dayPeriod') };
    } catch (e) { return null; }
  }
  var chat = d.querySelector('.chat');
  function tick() {
    var s = status(); if (!s) return;
    if (pill) { pill.classList.toggle('is-open', s.open); pill.querySelector('[data-open-text]').textContent = (s.open ? 'We are open now' : 'Closed right now, we reply by email') + ' · ' + s.time + ' Davao'; }
    var mt = d.querySelector('[data-davao-clock]');
    if (mt) { mt.textContent = (s.open ? 'Open now' : 'Closed now') + ' · ' + s.time + ' in Davao City'; mt.parentElement.classList.toggle('is-open', s.open); }
    if (chat) chat.classList.toggle('is-open', s.open);
  }
  tick(); setInterval(tick, 30000);

  /* ---- Back to top with scroll ring + footer watermark parallax ---- */
  var top = d.querySelector('.to-top'), foot = d.querySelector('.site-footer'), ticking = false;
  if (top) top.addEventListener('click', function () { scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); });
  function onScroll() {
    ticking = false;
    var max = root.scrollHeight - innerHeight;
    if (top) top.style.setProperty('--sp', max > 0 ? Math.min(1, scrollY / max).toFixed(3) : 0);
    if (foot && !reduce) { var r = foot.getBoundingClientRect(); if (r.top < innerHeight) foot.style.setProperty('--fy', ((r.top - innerHeight) * -.06).toFixed(1) + 'px'); }
  }
  addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  /* ---- Chat greeting bubble: cycles a few friendly lines ---- */
  if (chat) {
    var txt = chat.querySelector('[data-chat-text]');
    var lines = ['Hi! Need a quote?', 'Ask us anything, we reply fast.', 'Want a website that sells?', 'Chat with us on Messenger'];
    var li = 0;
    var show = function () { chat.classList.add('say'); setTimeout(function () { chat.classList.remove('say'); }, 5200); };
    var next = function () { li = (li + 1) % lines.length; setTimeout(function () { txt.textContent = lines[li]; show(); }, 400); };
    if (!reduce) { setTimeout(function () { show(); setInterval(next, 14000); }, 4500); }
    chat.addEventListener('mouseenter', function () { chat.classList.add('say'); });
    chat.addEventListener('mouseleave', function () { chat.classList.remove('say'); });
    chat.addEventListener('focus', function () { chat.classList.add('say'); });
    chat.addEventListener('blur', function () { chat.classList.remove('say'); });
  }
})();

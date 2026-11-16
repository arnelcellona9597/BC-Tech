/* Marketing popup: shows at most once every 12 hours, after a short wait, a bit of scrolling, or when the mouse leaves the top of the page. */
(function () {
  var pop = document.getElementById('promo');
  if (!pop) return;
  var KEY = 'davaobyte_promo', HOURS = 12, root = document.documentElement;
  var reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
  function last() { try { return +localStorage.getItem(KEY) || 0; } catch (e) { return 0; } }
  function mark(extraHours) { try { localStorage.setItem(KEY, String(Date.now() + (extraHours || 0) * 36e5)); } catch (e) {} }
  if (Date.now() - last() < HOURS * 36e5) return;

  var shown = false, prevFocus = null, born = Date.now();
  var behind = document.querySelectorAll('main,.site-header,.site-footer,.chat-wrap,.float-wrap,.skip');
  function open() {
    if (shown || root.classList.contains('nav-open') || document.hidden) return;
    var a = document.activeElement;
    if (a && /INPUT|TEXTAREA|SELECT/.test(a.tagName)) return; // never interrupt someone typing
    shown = true; mark(0); prevFocus = a;
    pop.hidden = false;
    behind.forEach(function (el) { el.setAttribute('inert', ''); });
    root.style.overflow = 'hidden';
    requestAnimationFrame(function () { requestAnimationFrame(function () { pop.classList.add('in'); }); });
    setTimeout(function () { var f = pop.querySelector('input[name="name"]'); if (f) f.focus({ preventScroll: true }); }, reduce ? 50 : 700);
    cleanupTriggers();
  }
  function close() {
    if (!shown) return; shown = false;
    pop.classList.remove('in');
    behind.forEach(function (el) { el.removeAttribute('inert'); });
    root.style.overflow = '';
    setTimeout(function () { if (!shown) pop.hidden = true; }, reduce ? 50 : 650);
    if (prevFocus && prevFocus.focus) try { prevFocus.focus({ preventScroll: true }); } catch (e) {}
  }
  pop.addEventListener('click', function (e) { if (e.target.closest('[data-pop-close]')) close(); });
  pop.querySelector('form').addEventListener('submit', function () { mark(72); }); // they reached out: leave them alone for 3 more days
  document.addEventListener('keydown', function (e) {
    if (!shown) return;
    if (e.key === 'Escape') { close(); return; }
    if (e.key !== 'Tab') return;
    var f = [].slice.call(pop.querySelectorAll('a[href],button,input:not([tabindex="-1"]),select,textarea')).filter(function (x) { return x.offsetParent !== null; });
    if (!f.length) return;
    var i = f.indexOf(document.activeElement);
    if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
    else if (!e.shiftKey && (i === f.length - 1 || i < 0)) { e.preventDefault(); f[0].focus(); }
  });

  /* triggers: whichever comes first, never in the first 6 seconds */
  var timer = setTimeout(open, 16000);
  function onScroll() { var h = root.scrollHeight - innerHeight; if (h > 0 && scrollY / h > .45 && Date.now() - born > 6000) open(); }
  function onLeave(e) { if (!e.relatedTarget && e.clientY <= 0 && Date.now() - born > 6000) open(); }
  addEventListener('scroll', onScroll, { passive: true });
  document.addEventListener('mouseout', onLeave);
  function cleanupTriggers() { clearTimeout(timer); removeEventListener('scroll', onScroll); document.removeEventListener('mouseout', onLeave); }
})();

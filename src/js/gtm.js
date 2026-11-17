/* Davao Byte: Google Tag Manager, loaded late so it never slows the first view.
   It starts on the first touch, scroll, click or key press, or about 5 seconds after the page has loaded.
   It only runs on the live domain, so local previews do not pollute the analytics. */
(function () {
  var s = document.currentScript, id = s && s.getAttribute('data-gtm'), t0 = new Date().getTime();
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  if (!id || !/(^|\.)davaobyte\.com$/.test(location.hostname)) return;
  var started = false, evs = ['pointerdown', 'keydown', 'scroll', 'touchstart'];
  function start() {
    if (started) return;
    started = true;
    evs.forEach(function (e) { removeEventListener(e, start); });
    window.dataLayer.push({ 'gtm.start': t0, event: 'gtm.js' });
    var j = document.createElement('script');
    j.async = true;
    j.src = 'https://www.googletagmanager.com/gtm.js?id=' + encodeURIComponent(id);
    document.head.appendChild(j);
  }
  evs.forEach(function (e) { addEventListener(e, start, { passive: true }); });
  addEventListener('load', function () { setTimeout(start, 5000); });
})();

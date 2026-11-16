/* Davao Byte: applies the saved theme before the page paints (light is the default). Kept tiny and synchronous on purpose. */
(function () {
  try {
    var t = localStorage.getItem('davaobyte_theme');
    var h = document.documentElement;
    if (t === 'dark' || t === 'light') h.setAttribute('data-theme', t);
    var m = document.querySelector('meta[name="theme-color"]');
    if (m) m.setAttribute('content', h.getAttribute('data-theme') === 'dark' ? '#0B0B0C' : '#F6F3EE');
  } catch (e) {}
})();

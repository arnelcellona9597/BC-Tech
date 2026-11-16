/* Soft glowing particles for any element with data-particles. Pauses off-screen and when the tab is hidden. */
(function () {
  var reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
  var canvases = document.querySelectorAll('canvas[data-particles]');
  if (!canvases.length) return;
  function start(cv) {
    var host = cv.parentElement;
    var lite = cv.getAttribute('data-particles') === 'lite';
    var ctx = cv.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    var w = 0, h = 0, pts = [], run = false, visible = true, raf = 0;
    var mx = -9999, my = -9999;
    function size() {
      var r = host.getBoundingClientRect();
      w = Math.max(1, r.width); h = Math.max(1, r.height);
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.round(Math.min(w * h / (lite ? 26000 : 15000), lite ? 28 : (w < 700 ? 32 : 70)));
      pts = [];
      for (var i = 0; i < n; i++) pts.push({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - .5) * .22, vy: -(.06 + Math.random() * .22),
        r: .7 + Math.random() * 1.9, red: Math.random() < .55, a: .25 + Math.random() * .6, p: Math.random() * 6.28
      });
    }
    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      var i, j, a, b, dx, dy, d, lt = document.documentElement.getAttribute('data-theme') !== 'dark';
      for (i = 0; i < pts.length; i++) {
        a = pts[i];
        if (!reduce) {
          a.x += a.vx; a.y += a.vy;
          dx = mx - a.x; dy = my - a.y; d = dx * dx + dy * dy;
          if (d < 22000) { a.x += dx * .0009; a.y += dy * .0009; }
          if (a.y < -6) { a.y = h + 6; a.x = Math.random() * w; }
          if (a.x < -6) a.x = w + 6; else if (a.x > w + 6) a.x = -6;
        }
        var tw = reduce ? 1 : .65 + .35 * Math.sin(t / 900 + a.p);
        ctx.beginPath();
        if (lt) {
          ctx.fillStyle = a.red ? 'rgba(200,16,46,' + (a.a * .75 * tw).toFixed(3) + ')' : 'rgba(11,11,12,' + (a.a * .4 * tw).toFixed(3) + ')';
          ctx.shadowColor = 'rgba(200,16,46,.25)'; ctx.shadowBlur = a.red ? 4 : 0;
        } else {
          ctx.fillStyle = a.red ? 'rgba(255,90,110,' + (a.a * tw).toFixed(3) + ')' : 'rgba(255,255,255,' + (a.a * .8 * tw).toFixed(3) + ')';
          ctx.shadowColor = a.red ? 'rgba(255,60,90,.9)' : 'rgba(255,255,255,.7)';
          ctx.shadowBlur = 8 + a.r * 3;
        }
        ctx.arc(a.x, a.y, a.r, 0, 6.283);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      if (!lite) for (i = 0; i < pts.length; i++) {
        a = pts[i];
        for (j = i + 1; j < pts.length; j++) {
          b = pts[j]; dx = a.x - b.x; dy = a.y - b.y; d = dx * dx + dy * dy;
          if (d < 9000) {
            ctx.strokeStyle = (lt ? 'rgba(200,16,46,' : 'rgba(255,90,110,') + ((1 - d / 9000) * (lt ? .13 : .16)).toFixed(3) + ')';
            ctx.lineWidth = .7; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
    }
    function loop(t) { if (!run) return; draw(t); raf = requestAnimationFrame(loop); }
    function go() { var want = visible && !document.hidden && !reduce; if (want && !run) { run = true; raf = requestAnimationFrame(loop); } else if (!want && run) { run = false; cancelAnimationFrame(raf); } }
    size(); draw(0);
    document.addEventListener('themechange', function () { draw(0); });
    if (!reduce) {
      new IntersectionObserver(function (e) { visible = e[0].isIntersecting; go(); }).observe(host);
      document.addEventListener('visibilitychange', go);
      host.addEventListener('pointermove', function (e) { var r = host.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; }, { passive: true });
      host.addEventListener('pointerleave', function () { mx = my = -9999; });
    }
    var rt; new ResizeObserver(function () { clearTimeout(rt); rt = setTimeout(function () { size(); draw(0); }, 150); }).observe(host);
    go();
  }
  function init() { canvases.forEach(start); }
  if ('requestIdleCallback' in window) requestIdleCallback(init, { timeout: 1200 }); else setTimeout(init, 300);
})();

/* Davao Byte: pixel map of the Philippines. Dots ripple in from Davao City, a red pulse travels outward,
   and dots near the cursor lift. Pauses when off screen; static when the visitor prefers reduced motion. */
(function () {
  var cv = document.querySelector('canvas[data-phmap]');
  if (!cv) return;
  var g, ctx = cv.getContext('2d');
  try { g = JSON.parse(cv.getAttribute('data-grid')); } catch (e) { return; }
  var reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
  var dots = [], maxD = 1, home, cities = [], w = 0, h = 0, cs = 1, dpr = 1, raf = 0, run = false, vis = false, t0 = 0, px = -999, py = -999;
  g.data.split('|').forEach(function (row, r) {
    if (!row) return;
    row.split(',').forEach(function (u) { var a = u.split('-'), s = +a[0], l = +a[1]; for (var c = s; c < s + l; c++) dots.push({ c: c, r: r, d: 0 }); });
  });
  function pos(lon, lat) { return { x: ((lon - g.lonMin) * g.k / g.C), y: ((g.latMax - lat) / g.C) }; }
  g.cities.forEach(function (c) { var p = pos(c.lon, c.lat); cities.push({ n: c.n, x: p.x, y: p.y, home: !!c.home }); if (c.home) home = cities[cities.length - 1]; });
  dots.forEach(function (d) { var dx = d.c + .5 - home.x, dy = d.r + .5 - home.y; d.d = Math.sqrt(dx * dx + dy * dy); if (d.d > maxD) maxD = d.d; });
  function dark() { return document.documentElement.getAttribute('data-theme') === 'dark'; }
  function size() {
    var r = cv.getBoundingClientRect(); w = Math.max(1, r.width); h = Math.max(1, r.height);
    dpr = Math.min(window.devicePixelRatio || 1, 2); cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); cs = w / (g.cols + 8);
  }
  function ease(x) { return x < 0 ? 0 : x > 1 ? 1 : 1 - Math.pow(1 - x, 3); }
  function draw(t) {
    var D = dark(), land = D ? '255,255,255' : '11,11,12', red = D ? '255,90,110' : '200,16,46';
    ctx.clearRect(0, 0, w, h);
    var reveal = reduce ? 9 : t * 0.9, wave = reduce ? -1 : ((t * 0.32) % 1.5) * maxD * 1.1, i, d, k, a, sc, x, y, boost, dx, dy;
    for (i = 0; i < dots.length; i++) {
      d = dots[i];
      k = ease((reveal - d.d / maxD * 1.3) / 0.45); if (k <= 0) continue;
      x = (d.c + .5) * cs; y = (d.r + .5) * cs;
      a = (D ? .2 : .17) * k; sc = .34 + .06 * k;
      var wd = Math.abs(d.d - wave), wv = wd < 3.2 ? 1 - wd / 3.2 : 0;
      dx = x - px; dy = y - py; boost = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / (cs * 6));
      var hot = Math.max(wv * .9, boost);
      if (hot > 0) { ctx.fillStyle = 'rgba(' + red + ',' + (.25 + .75 * hot) * k + ')'; sc += .26 * hot; } else ctx.fillStyle = 'rgba(' + land + ',' + a + ')';
      var s = cs * sc * 2; ctx.fillRect(x - s / 2, y - s / 2, s, s);
    }
    var hx = home.x * cs, hy = home.y * cs, vis1 = ease((reveal - .6) / .6);
    cities.forEach(function (c, n) {
      if (c.home) return;
      var cx = c.x * cs, cy = c.y * cs, mx = (hx + cx) / 2 - (cy - hy) * .28, my = (hy + cy) / 2 + (cx - hx) * .28;
      ctx.strokeStyle = 'rgba(' + red + ',' + (.5 * vis1) + ')'; ctx.lineWidth = 1.2; ctx.setLineDash([3, 5]);
      ctx.beginPath(); ctx.moveTo(hx, hy); ctx.quadraticCurveTo(mx, my, cx, cy); ctx.stroke(); ctx.setLineDash([]);
      var u = reduce ? .5 : ((t * .22 + n * .45) % 1), qx = (1 - u) * (1 - u) * hx + 2 * (1 - u) * u * mx + u * u * cx, qy = (1 - u) * (1 - u) * hy + 2 * (1 - u) * u * my + u * u * cy;
      ctx.fillStyle = 'rgba(' + red + ',' + vis1 + ')'; ctx.beginPath(); ctx.arc(qx, qy, 2.4, 0, 6.283); ctx.fill();
      ctx.fillStyle = 'rgba(' + land + ',' + (.9 * vis1) + ')'; ctx.beginPath(); ctx.arc(cx, cy, 3.2, 0, 6.283); ctx.fill();
      ctx.font = '600 ' + Math.max(10, cs * 1.45) + 'px Montserrat, system-ui, sans-serif'; ctx.textBaseline = 'middle';
      ctx.fillStyle = 'rgba(' + land + ',' + (.78 * vis1) + ')'; ctx.fillText(c.n, cx + 9, cy);
    });
    var pr = reduce ? 0 : ((t * .55) % 1.6);
    for (i = 0; i < 2; i++) { var q = reduce ? .6 : ((pr + i * .8) % 1.6) / 1.6; ctx.strokeStyle = 'rgba(' + red + ',' + (.55 * (1 - q) * vis1) + ')'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(hx, hy, 6 + q * cs * 9, 0, 6.283); ctx.stroke(); }
    ctx.fillStyle = 'rgb(' + red + ')'; ctx.shadowColor = 'rgba(' + red + ',.8)'; ctx.shadowBlur = D ? 14 : 6; ctx.beginPath(); ctx.arc(hx, hy, 5, 0, 6.283); ctx.fill(); ctx.shadowBlur = 0;
    ctx.font = '700 ' + Math.max(11, cs * 1.7) + 'px Montserrat, system-ui, sans-serif'; ctx.textBaseline = 'middle'; ctx.textAlign = 'right';
    ctx.fillStyle = 'rgb(' + red + ')'; ctx.fillText(home.n, hx - 12, hy); ctx.textAlign = 'left';
  }
  function loop(ts) { if (!run) return; if (!t0) t0 = ts; draw((ts - t0) / 1000); raf = requestAnimationFrame(loop); }
  function go() { var want = vis && !document.hidden && !reduce; if (want && !run) { run = true; raf = requestAnimationFrame(loop); } else if (!want && run) { run = false; cancelAnimationFrame(raf); } }
  size();
  if (reduce) { draw(9); } else { draw(0); }
  new IntersectionObserver(function (es) { vis = es[0].isIntersecting; if (vis && !t0) t0 = 0; go(); }, { threshold: .15 }).observe(cv);
  document.addEventListener('visibilitychange', go);
  var rt; new ResizeObserver(function () { clearTimeout(rt); rt = setTimeout(function () { size(); if (reduce || !run) draw(reduce ? 9 : 0); }, 120); }).observe(cv);
  document.addEventListener('themechange', function () { if (!run) draw(reduce ? 9 : 4); });
  if (!reduce) {
    cv.addEventListener('pointermove', function (e) { var r = cv.getBoundingClientRect(); px = e.clientX - r.left; py = e.clientY - r.top; }, { passive: true });
    cv.addEventListener('pointerleave', function () { px = py = -999; });
  }
})();

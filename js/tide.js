/* Tide testimonials
 * Rotates the client quotes in the bioluminescent section. Every change is a wave
 * rolling across the quote from the left: the words under the water dissolve like
 * writing in wet sand, the water pauses at full reach, then drains back and the
 * next quote settles into place behind it. The water is drawn on a small canvas
 * that only animates during a transition; the text itself stays real HTML, so it
 * is selectable, readable and reflows. All quotes stay in the document for screen
 * readers; the hidden ones are only faded out. With reduced motion the quotes
 * simply swap. No dependencies.
 */
(function () {
  'use strict';
  var root = document.querySelector('[data-tide]');
  if (!root) return;
  var quotes = [].slice.call(root.querySelectorAll('.tide-quote'));
  var canvas = root.querySelector('.tide-water');
  if (quotes.length < 2) return;

  var REDUCE = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var SMALL = window.matchMedia('(max-width: 640px)').matches;
  var ctx = canvas && !REDUCE ? canvas.getContext('2d') : null;
  var HOLD = 5800;                      // how long a quote stays before the next wave
  var T_IN = 1900, T_TOP = 420, T_OUT = 2000; // wave rolls in, surges at full reach, drains back

  /* ---- split each quote into words so they can be washed one by one ---- */
  function wrapWords(q) {
    var walker = document.createTreeWalker(q, NodeFilter.SHOW_TEXT, null, false), nodes = [], n;
    while ((n = walker.nextNode())) nodes.push(n);
    nodes.forEach(function (t) {
      var parent = t.parentNode;
      if (parent.classList.contains('tide-src')) { parent.classList.add('tide-w'); return; }
      if (!t.nodeValue.trim()) return;
      var frag = document.createDocumentFragment();
      t.nodeValue.split(/(\s+)/).forEach(function (piece) {
        if (!piece) return;
        if (/^\s+$/.test(piece)) { frag.appendChild(document.createTextNode(piece)); return; }
        var s = document.createElement('span'); s.className = 'tide-w'; s.textContent = piece; frag.appendChild(s);
      });
      parent.replaceChild(frag, t);
    });
    return [].slice.call(q.querySelectorAll('.tide-w'));
  }
  quotes.forEach(function (q) { q.tideWords = wrapWords(q); });
  root.classList.add('is-ready');

  /* ---- dots ---- */
  var dots = document.createElement('div');
  dots.className = 'tide-dots'; dots.setAttribute('role', 'group'); dots.setAttribute('aria-label', 'Choose a client review');
  var dotBtns = quotes.map(function (q, i) {
    var b = document.createElement('button'); b.type = 'button';
    b.setAttribute('aria-label', 'Show review ' + (i + 1) + ' of ' + quotes.length);
    b.addEventListener('click', function () { go(i); });
    dots.appendChild(b); return b;
  });
  root.appendChild(dots);

  var cur = quotes.findIndex ? quotes.findIndex(function (q) { return q.classList.contains('is-on'); }) : 0;
  if (cur < 0) { cur = 0; quotes[0].classList.add('is-on'); }
  function markDots() { dotBtns.forEach(function (b, i) { if (i === cur) b.setAttribute('aria-current', 'true'); else b.removeAttribute('aria-current'); }); }
  markDots();

  /* ---- pausing: off screen, hidden tab, or keyboard focus inside ---- */
  var busy = false, timer = null, onScreen = true, focused = false;
  function paused() { return !onScreen || document.hidden || focused; }
  function schedule() {
    clearTimeout(timer);
    if (busy || paused()) return;
    timer = setTimeout(function () { go((cur + 1) % quotes.length); }, HOLD);
  }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) { onScreen = es[0].isIntersecting; schedule(); }, { threshold: 0.25 }).observe(root);
  }
  document.addEventListener('visibilitychange', schedule);
  root.addEventListener('focusin', function () { focused = true; schedule(); });
  root.addEventListener('focusout', function () { focused = root.contains(document.activeElement) && document.activeElement !== document.body; schedule(); });

  /* ---- the wave ---- */
  var W = 0, H = 0, amp = SMALL ? 0.5 : 1;
  function resize() {
    var r = canvas.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    W = r.width; H = r.height;
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return r;
  }
  // deterministic noise so the lace of the foam holds its shape frame to frame
  var NOISE = []; for (var i = 0; i < 512; i++) NOISE.push(Math.random() * 2 - 1);
  function noise(i) { return NOISE[((i % 512) + 512) % 512]; }
  var BUBBLES = []; for (var b = 0; b < (SMALL ? 50 : 110); b++) {
    BUBBLES.push({ u: Math.random(), d: Math.pow(Math.random(), 1.6) * 80, r: 0.8 + Math.random() * 2.6, a: 0.25 + Math.random() * 0.65, ph: Math.random() * 6.28 });
  }
  var residue = [];
  var TAU = Math.PI * 2;
  function edgeAt(y, base, t, surge) {
    return base
      + amp * 22 * Math.sin(y * TAU / 300 + t * 0.0035)
      + amp * 10 * Math.sin(y * TAU / 95 - t * 0.0052 + 1.3)
      + amp * 30 * Math.sin(y * TAU / 620 + 0.7 + t * 0.0012)
      + surge * 14 * Math.sin(t * 0.006 + y * 0.004);
  }
  function easeIn(p) { return Math.pow(p, 1.9); }
  function easeOut(p) { return 1 - Math.pow(1 - p, 1.8); }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }

  // where the water's edge is at time t, plus which phase we are in
  function waveState(t) {
    var reach = W + 170, start = -160;
    if (t < T_IN) return { base: start + (reach - start) * easeOut(t / T_IN), phase: 'in', surge: t / T_IN, foam: 1 };
    if (t < T_IN + T_TOP) return { base: reach, phase: 'top', surge: 1, foam: 1 };
    var p = clamp((t - T_IN - T_TOP) / T_OUT, 0, 1);
    return { base: reach + (start - reach) * easeIn(p), phase: 'out', surge: 1 - p, foam: 0.55 + 0.25 * (1 - p), p: p };
  }

  function drawWater(t, st) {
    ctx.clearRect(0, 0, W, H);
    var base = st.base, step = 6, pts = [], y;
    for (y = -12; y <= H + 12; y += step) pts.push([edgeAt(y, base, t, st.surge), y]);

    // wet sheen left on the sand as the water pulls back
    if (st.phase === 'out') {
      var g0 = ctx.createLinearGradient(base, 0, base + 170, 0);
      g0.addColorStop(0, 'rgba(200,245,255,' + (0.16 * (1 - st.p * 0.5)).toFixed(3) + ')'); g0.addColorStop(1, 'rgba(200,245,255,0)');
      ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
      pts.forEach(function (p) { ctx.lineTo(p[0], p[1]); });
      for (var k = pts.length - 1; k >= 0; k--) ctx.lineTo(pts[k][0] + 170, pts[k][1]);
      ctx.closePath(); ctx.fillStyle = g0; ctx.fill();
    }

    // the body of the water
    var g = ctx.createLinearGradient(base - Math.max(W, 400), 0, base, 0);
    g.addColorStop(0, 'rgba(14,68,108,0.26)');
    g.addColorStop(0.72, 'rgba(32,138,164,0.46)');
    g.addColorStop(0.94, 'rgba(110,214,228,0.56)');
    g.addColorStop(1, 'rgba(190,245,248,0.62)');
    ctx.beginPath(); ctx.moveTo(-200, -200);
    pts.forEach(function (p) { ctx.lineTo(p[0], p[1]); });
    ctx.lineTo(-200, H + 200); ctx.closePath();
    ctx.fillStyle = g; ctx.fill();

    // light moving through the water behind the crest
    ctx.lineCap = 'round';
    [[62, 0.07, 9], [128, 0.055, 12], [205, 0.04, 16]].forEach(function (s, si) {
      ctx.beginPath();
      for (var i = 0; i < pts.length; i++) {
        var yy = pts[i][1], xx = pts[i][0] - s[0] + amp * 16 * Math.sin(yy * 0.021 + t * 0.0045 + si * 2.1);
        if (i) ctx.lineTo(xx, yy); else ctx.moveTo(xx, yy);
      }
      ctx.strokeStyle = 'rgba(220,250,255,' + s[1] + ')'; ctx.lineWidth = s[2]; ctx.stroke();
    });

    // foam: a soft band, a bright crest line, and a lacy line behind it
    var f = st.foam;
    ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
    pts.forEach(function (p, i) { ctx.lineTo(p[0] + 2 * noise(i), p[1]); });
    for (var j = pts.length - 1; j >= 0; j--) ctx.lineTo(pts[j][0] - 26 - 16 * Math.abs(noise(j * 3 + 7)) - 6 * Math.sin(t * 0.01 + j), pts[j][1]);
    ctx.closePath(); ctx.fillStyle = 'rgba(255,255,255,' + (0.26 * f).toFixed(3) + ')'; ctx.fill();

    ctx.beginPath();
    pts.forEach(function (p, i) { var x = p[0] + 1.5 * noise(i + 40); if (i) ctx.lineTo(x, p[1]); else ctx.moveTo(x, p[1]); });
    ctx.strokeStyle = 'rgba(255,255,255,' + (0.8 * f).toFixed(3) + ')'; ctx.lineWidth = 2.6; ctx.stroke();

    ctx.beginPath();
    pts.forEach(function (p, i) { var x = p[0] - 13 - 7 * noise(i * 5 + 90) - 3 * Math.sin(t * 0.012 + i); if (i) ctx.lineTo(x, p[1]); else ctx.moveTo(x, p[1]); });
    ctx.strokeStyle = 'rgba(255,255,255,' + (0.42 * f).toFixed(3) + ')'; ctx.lineWidth = 1.4; ctx.stroke();

    // bubbles riding just behind the crest
    ctx.fillStyle = '#fff';
    for (var q = 0; q < BUBBLES.length; q++) {
      var bb = BUBBLES[q], by = bb.u * H, bx = edgeAt(by, base, t, st.surge) - bb.d + 3 * Math.sin(t * 0.01 + bb.ph);
      ctx.globalAlpha = bb.a * f * (1 - bb.d / 90);
      ctx.beginPath(); ctx.arc(bx, by, bb.r, 0, TAU); ctx.fill();
    }

    // foam left stranded on the sand while the water drains back
    if (st.phase === 'out' && residue.length < 160) {
      for (var s2 = 0; s2 < 3; s2++) {
        var ry = Math.random() * H;
        residue.push({ x: edgeAt(ry, base, t, st.surge) + 4 + Math.random() * 40, y: ry, r: 1 + Math.random() * 2.2, t0: t, life: 500 + Math.random() * 700 });
      }
    }
    for (var r2 = residue.length - 1; r2 >= 0; r2--) {
      var rb = residue[r2], age = (t - rb.t0) / rb.life;
      if (age >= 1) { residue.splice(r2, 1); continue; }
      ctx.globalAlpha = 0.55 * (1 - age);
      ctx.beginPath(); ctx.arc(rb.x, rb.y, rb.r * (1 + age * 0.4), 0, TAU); ctx.fill();
    }
    ctx.globalAlpha = 1;

    // soften the top and bottom of the band so the water has no hard edges
    var m = ctx.createLinearGradient(0, 0, 0, H), fade = SMALL ? 0.3 : 0.26;
    m.addColorStop(0, 'rgba(0,0,0,0)'); m.addColorStop(fade, 'rgba(0,0,0,1)'); m.addColorStop(1 - fade, 'rgba(0,0,0,1)'); m.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.globalCompositeOperation = 'destination-in';
    ctx.fillStyle = m; ctx.fillRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'source-over';
  }

  /* ---- words ---- */
  function measure(words, crect) {
    return words.map(function (el) {
      var r = el.getBoundingClientRect();
      return { el: el, x: r.left + r.width / 2 - crect.left, y: r.top + r.height / 2 - crect.top, w: 0, hit: false };
    });
  }
  function styleWord(wd, w, dir, glimpse) {
    var o = 1 - w;
    if (glimpse > 0 && o < glimpse * 0.32) o = glimpse * 0.32;
    var blur = w * 5, el = wd.el.style;
    el.opacity = o.toFixed(3);
    el.filter = blur > 0.05 ? 'blur(' + blur.toFixed(2) + 'px)' : '';
    el.transform = w > 0.003 ? 'translate(' + (dir * w * 12).toFixed(2) + 'px,' + (w * 3).toFixed(2) + 'px)' : '';
  }
  function resetWords(words) { words.forEach(function (el) { el.style.opacity = ''; el.style.filter = ''; el.style.transform = ''; }); }

  function go(next) {
    if (busy || next === cur || next < 0 || next >= quotes.length) return;
    clearTimeout(timer);
    var from = quotes[cur], to = quotes[next];
    if (!ctx) {
      from.classList.remove('is-on'); to.classList.add('is-on');
      cur = next; markDots(); schedule(); return;
    }
    busy = true;
    var crect = resize();
    var oldW = measure(from.tideWords, crect);
    to.classList.add('is-on');
    var newW = measure(to.tideWords, crect);
    newW.forEach(function (wd) { wd.w = 1; styleWord(wd, 1, -1, 0); });
    root.classList.add('is-washing');
    residue.length = 0;

    var t0 = null, last = null;
    function frame(now) {
      if (t0 === null) { t0 = now; last = now; }
      var t = now - t0, dt = Math.min(50, now - last); last = now;
      var st = waveState(t);
      drawWater(t, st);
      var kWash = 1 - Math.exp(-dt / 240), kSettle = 1 - Math.exp(-dt / 300);
      oldW.forEach(function (wd) {
        if (!wd.hit && edgeAt(wd.y, st.base, t, st.surge) > wd.x - 18) wd.hit = true;
        if (wd.hit) { wd.w += (1 - wd.w) * kWash; styleWord(wd, wd.w, 1, 0); }
      });
      if (st.phase === 'out') {
        newW.forEach(function (wd) {
          var e = edgeAt(wd.y, st.base, t, st.surge);
          if (!wd.hit && e < wd.x + 10) wd.hit = true;
          if (wd.hit) { wd.w += (0 - wd.w) * kSettle; styleWord(wd, wd.w, -1, 0); }
          else styleWord(wd, 1, -1, clamp(1 - (e - wd.x) / 150, 0, 1));
        });
      }
      if (t < T_IN + T_TOP + T_OUT + 120) { requestAnimationFrame(frame); return; }
      ctx.clearRect(0, 0, W, H);
      root.classList.remove('is-washing');
      from.classList.remove('is-on');
      resetWords(from.tideWords); resetWords(to.tideWords);
      cur = next; markDots(); busy = false; schedule();
    }
    requestAnimationFrame(frame);
  }

  schedule();
})();

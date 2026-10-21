/* Easter eggs in the hero scene.
 *
 * The scene art never takes pointer events, so this listens for clicks on the
 * scene as a whole and checks where they land against the art's own boxes:
 *   - the sun, five quick clicks: fireworks over the coast (any scene)
 *   - the dog on the beach: "Woof!"
 *   - a balloon at the fair: it slips free and floats away
 *   - the train on the coast: its horn
 *   - a horse at the track: a photo finish
 * Each one makes its own sound, only on a click: the dog's bark is a recording
 * (sounds/dog-bark.mp3), the rest are built here with Web Audio.
 * Clicks on links, buttons and form fields are left alone.
 */
(function () {
  'use strict';

  var scene = document.querySelector('.scene');
  if (!scene) return;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var PALETTE = ['#ffd79a', '#ff9fd8', '#7fc8d8', '#c58cff', '#e4745c', '#9fe0a8', '#fff3d6'];

  function which() { return scene.getAttribute('data-scene') || 'beach'; }
  function inside(r, x, y, pad) {
    pad = pad || 0;
    return r.width > 0 && x >= r.left - pad && x <= r.right + pad && y >= r.top - pad && y <= r.bottom + pad;
  }
  function local(x, y) { var r = scene.getBoundingClientRect(); return { x: x - r.left, y: y - r.top }; }

  // A small speech bubble that pops up over the art and fades away.
  function bubble(text, x, y, cls) {
    var p = local(x, y), b = document.createElement('div');
    b.className = 'egg-bubble' + (cls ? ' ' + cls : '');
    b.textContent = text;
    b.style.left = p.x + 'px'; b.style.top = p.y + 'px';
    scene.appendChild(b);
    setTimeout(function () { b.classList.add('out'); }, 1300);
    setTimeout(function () { b.remove(); }, 1800);
  }

  /* ---------- Sound, made on the spot (no audio files) ---------- */

  // Every sound runs through one master volume, kept low: these are surprises,
  // not alarms, and someone may be browsing at work.
  var ac = null, master = null, VOLUME = 0.32;
  function audio() {
    if (!ac) {
      try { ac = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return null; }
      master = ac.createGain(); master.gain.value = VOLUME; master.connect(ac.destination);
    }
    if (ac.state === 'suspended') ac.resume();
    return ac;
  }
  // A train horn: a minor chord on reedy tones, swelling in and tailing off.
  function horn() {
    var a = audio(); if (!a) return;
    var t = a.currentTime, env = a.createGain(), lp = a.createBiquadFilter();
    lp.type = 'lowpass'; lp.frequency.value = 1400;
    env.gain.setValueAtTime(0, t);
    env.gain.linearRampToValueAtTime(0.16, t + 0.08);
    env.gain.setValueAtTime(0.16, t + 0.9);
    env.gain.exponentialRampToValueAtTime(0.001, t + 1.4);
    lp.connect(env); env.connect(master);
    [277.2, 329.6, 415.3].forEach(function (f) {
      var o = a.createOscillator(); o.type = 'sawtooth'; o.frequency.value = f;
      o.connect(lp); o.start(t); o.stop(t + 1.45);
    });
  }
  // A camera shutter: a short burst of filtered noise.
  function shutter() {
    var a = audio(); if (!a) return;
    var n = Math.floor(a.sampleRate * 0.09), buf = a.createBuffer(1, n, a.sampleRate), d = buf.getChannelData(0);
    for (var i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / n);
    var s = a.createBufferSource(), g = a.createGain(), hp = a.createBiquadFilter();
    hp.type = 'highpass'; hp.frequency.value = 1800; g.gain.value = 0.22;
    s.buffer = buf; s.connect(hp); hp.connect(g); g.connect(master); s.start();
  }

  function noiseBuf(a, secs) {
    var n = Math.floor(a.sampleRate * secs), buf = a.createBuffer(1, n, a.sampleRate), d = buf.getChannelData(0);
    for (var i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
    return buf;
  }
  // A real bark (sounds/dog-bark.mp3), fetched the first time the dog is clicked.
  // If it can't load, the woof made below stands in.
  var barkBuf = null, barkLoading = false;
  function bark() {
    var a = audio(); if (!a) return;
    if (barkBuf) return playBuf(barkBuf, 0.48);
    if (barkLoading) return;
    barkLoading = true;
    fetch('sounds/dog-bark.mp3').then(function (r) { if (!r.ok) throw 0; return r.arrayBuffer(); })
      .then(function (b) { return new Promise(function (ok, no) { a.decodeAudioData(b, ok, no); }); })
      .then(function (buf) { barkBuf = buf; playBuf(buf, 0.48); })
      .catch(function () { barkLoading = false; woof(); });
  }
  function playBuf(buf, vol) {
    var a = audio(); if (!a) return;
    var s = a.createBufferSource(), g = a.createGain();
    s.buffer = buf; g.gain.value = vol; s.connect(g); g.connect(master); s.start();
  }
  // A made-up "woof woof": a falling growl through a mouth-shaped filter, twice.
  function woof() {
    var a = audio(); if (!a) return;
    [0, 0.26].forEach(function (dt) {
      var t = a.currentTime + dt, o = a.createOscillator(), n = a.createBufferSource(), bp = a.createBiquadFilter(), g = a.createGain(), ng = a.createGain();
      o.type = 'sawtooth'; o.frequency.setValueAtTime(330, t); o.frequency.exponentialRampToValueAtTime(150, t + 0.16);
      n.buffer = noiseBuf(a, 0.2); ng.gain.value = 0.35;
      bp.type = 'bandpass'; bp.frequency.setValueAtTime(900, t); bp.frequency.exponentialRampToValueAtTime(500, t + 0.16); bp.Q.value = 2.2;
      g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.5, t + 0.015); g.gain.exponentialRampToValueAtTime(0.001, t + 0.19);
      o.connect(bp); n.connect(ng); ng.connect(bp); bp.connect(g); g.connect(master);
      o.start(t); o.stop(t + 0.2); n.start(t); n.stop(t + 0.2);
    });
  }
  // A rubber squeak as the string slips, then a soft whoosh as the balloons rise.
  function squeak() {
    var a = audio(); if (!a) return;
    var t = a.currentTime, o = a.createOscillator(), vib = a.createOscillator(), vg = a.createGain(), g = a.createGain();
    o.type = 'triangle'; o.frequency.setValueAtTime(700, t); o.frequency.exponentialRampToValueAtTime(1500, t + 0.25);
    vib.frequency.value = 28; vg.gain.value = 60; vib.connect(vg); vg.connect(o.frequency);
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.12, t + 0.03); g.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
    o.connect(g); g.connect(master); o.start(t); vib.start(t); o.stop(t + 0.32); vib.stop(t + 0.32);
    var n = a.createBufferSource(), bp = a.createBiquadFilter(), ng = a.createGain();
    n.buffer = noiseBuf(a, 1.2); bp.type = 'bandpass'; bp.Q.value = 1.4;
    bp.frequency.setValueAtTime(400, t + 0.15); bp.frequency.exponentialRampToValueAtTime(2200, t + 1.2);
    ng.gain.setValueAtTime(0, t + 0.15); ng.gain.linearRampToValueAtTime(0.07, t + 0.5); ng.gain.exponentialRampToValueAtTime(0.001, t + 1.3);
    n.connect(bp); bp.connect(ng); ng.connect(master); n.start(t + 0.15); n.stop(t + 1.35);
  }
  // A rocket going up: a thin rising whistle.
  function whistle() {
    var a = audio(); if (!a) return;
    var t = a.currentTime, o = a.createOscillator(), g = a.createGain();
    o.type = 'sine'; o.frequency.setValueAtTime(900, t); o.frequency.exponentialRampToValueAtTime(2300, t + 0.7);
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.035, t + 0.1); g.gain.exponentialRampToValueAtTime(0.001, t + 0.75);
    o.connect(g); g.connect(master); o.start(t); o.stop(t + 0.78);
  }
  // A burst: a low thump, then a scatter of crackles.
  function boom() {
    var a = audio(); if (!a) return;
    var t = a.currentTime, n = a.createBufferSource(), lp = a.createBiquadFilter(), g = a.createGain();
    n.buffer = noiseBuf(a, 1); lp.type = 'lowpass'; lp.frequency.setValueAtTime(900, t); lp.frequency.exponentialRampToValueAtTime(90, t + 0.6);
    g.gain.setValueAtTime(0.45, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.9);
    n.connect(lp); lp.connect(g); g.connect(master); n.start(t); n.stop(t + 1);
    for (var i = 0; i < 14; i++) {
      var ct = t + 0.12 + Math.random() * 0.7, c = a.createBufferSource(), hp = a.createBiquadFilter(), cg = a.createGain();
      c.buffer = noiseBuf(a, 0.03); hp.type = 'highpass'; hp.frequency.value = 2500;
      cg.gain.setValueAtTime(0.06 + Math.random() * 0.06, ct); cg.gain.exponentialRampToValueAtTime(0.001, ct + 0.03);
      c.connect(hp); hp.connect(cg); cg.connect(master); c.start(ct); c.stop(ct + 0.035);
    }
  }
  // The grandstand roars: shaped noise in the voice range, swelling and fading.
  function cheer() {
    var a = audio(); if (!a) return;
    var t = a.currentTime, n = a.createBufferSource(), bp = a.createBiquadFilter(), bp2 = a.createBiquadFilter(), g = a.createGain(), lfo = a.createOscillator(), lg = a.createGain();
    n.buffer = noiseBuf(a, 2.4); bp.type = 'bandpass'; bp.frequency.value = 900; bp.Q.value = .7; bp2.type = 'peaking'; bp2.frequency.value = 2400; bp2.gain.value = 6;
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.16, t + 0.35); g.gain.setValueAtTime(0.16, t + 1.3); g.gain.exponentialRampToValueAtTime(0.001, t + 2.3);
    lfo.frequency.value = 5.5; lg.gain.value = 0.04; lfo.connect(lg); lg.connect(g.gain);
    n.connect(bp); bp.connect(bp2); bp2.connect(g); g.connect(master); n.start(t); n.stop(t + 2.4); lfo.start(t); lfo.stop(t + 2.4);
  }

  /* ---------- The sun: five quick clicks for fireworks ---------- */

  var sunHits = [], show = null;
  function sunEl() { return scene.querySelector('.layer-sun circle[fill="url(#sunCore)"]'); }
  function pulseSun() {
    var s = sunEl(); if (!s) return;
    s.style.transition = 'none'; s.style.filter = 'brightness(1.35)';
    requestAnimationFrame(function () { s.style.transition = 'filter .5s ease'; s.style.filter = ''; });
  }
  function fireworks() {
    if (show) return;
    var cv = document.createElement('canvas');
    cv.className = 'egg-sky';
    scene.appendChild(cv);
    var w = scene.clientWidth, h = scene.clientHeight, dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    cv.width = w * dpr; cv.height = h * dpr;
    var c = cv.getContext('2d'); c.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (reduce.matches) {
      // A quiet glow instead of bursts.
      var g = c.createRadialGradient(w * .7, h * .3, 0, w * .7, h * .3, w * .5);
      g.addColorStop(0, 'rgba(255,215,154,.35)'); g.addColorStop(1, 'rgba(255,215,154,0)');
      c.fillStyle = g; c.fillRect(0, 0, w, h);
      boom(); show = cv; setTimeout(function () { cv.classList.add('out'); }, 1800); setTimeout(function () { cv.remove(); show = null; }, 2600);
      return;
    }
    var rockets = [], sparks = [], t0 = performance.now(), launched = 0, TOTAL = 9;
    function launch() {
      var x = w * (0.45 + Math.random() * 0.5);
      rockets.push({ x: x, y: h * 0.82, vy: -(h * 0.011 + Math.random() * h * 0.004), top: h * (0.14 + Math.random() * 0.28), col: PALETTE[Math.floor(Math.random() * PALETTE.length)] });
      launched++; whistle();
    }
    function burst(r) {
      var n = 46 + Math.floor(Math.random() * 20), sp = 2.2 + Math.random() * 1.6;
      for (var i = 0; i < n; i++) {
        var a = (i / n) * Math.PI * 2, v = sp * (0.6 + Math.random() * 0.5);
        sparks.push({ x: r.x, y: r.y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: 1, col: Math.random() < .25 ? '#fff3d6' : r.col });
      }
    }
    show = cv;
    (function frame(now) {
      var el = now - t0;
      if (launched < TOTAL && el > launched * 480) launch();
      c.globalCompositeOperation = 'destination-out';
      c.fillStyle = 'rgba(0,0,0,.22)'; c.fillRect(0, 0, w, h);
      c.globalCompositeOperation = 'lighter';
      for (var i = rockets.length - 1; i >= 0; i--) {
        var r = rockets[i]; r.y += r.vy;
        c.fillStyle = '#fff3d6'; c.beginPath(); c.arc(r.x, r.y, 1.8, 0, 6.283); c.fill();
        if (r.y <= r.top) { burst(r); boom(); rockets.splice(i, 1); }
      }
      for (var k = sparks.length - 1; k >= 0; k--) {
        var s = sparks[k]; s.x += s.vx; s.y += s.vy; s.vy += 0.035; s.vx *= 0.985; s.vy *= 0.985; s.life -= 0.012;
        if (s.life <= 0) { sparks.splice(k, 1); continue; }
        c.globalAlpha = Math.max(0, s.life); c.fillStyle = s.col;
        c.beginPath(); c.arc(s.x, s.y, 1.6, 0, 6.283); c.fill();
      }
      c.globalAlpha = 1;
      if (launched < TOTAL || rockets.length || sparks.length) requestAnimationFrame(frame);
      else { cv.remove(); show = null; }
    })(t0);
  }

  /* ---------- Per-scene surprises ---------- */

  function tryDog(x, y) {
    var b = window.__beach; if (!b || !b.dogs) return false;
    for (var i = 0; i < b.dogs.length; i++) {
      var d = b.dogs[i], part = d.sit.style.display === 'none' ? d.stand : d.sit, r = part.getBoundingClientRect();
      if (inside(r, x, y, 10)) { bark(); bubble('Woof!', r.left + r.width * .75, r.top - 6); return true; }
    }
    return false;
  }

  function tryBalloon(x, y) {
    var list = scene.querySelectorAll('.layer-fair-midway .fb, .layer-fair-fore .fb');
    for (var i = 0; i < list.length; i++) {
      var g = list[i], r = g.getBoundingClientRect();
      if (g.getAttribute('data-gone') || !inside(r, x, y, 4)) continue;
      g.setAttribute('data-gone', '1');
      var drift = (Math.random() - .5) * 120;
      g.style.transition = reduce.matches ? 'opacity .6s ease' : 'transform 7s cubic-bezier(.3,.1,.6,1), opacity 7s ease-in';
      g.style.transform = reduce.matches ? '' : 'translate(' + drift + 'px,-620px)';
      g.style.opacity = '0';
      squeak(); bubble('Bye, balloons!', r.left + r.width / 2, r.top - 4, 'small');
      // A new bunch is back in the vendor's hand a little later.
      setTimeout(function () { g.style.transition = 'none'; g.style.transform = ''; g.style.opacity = '0';
        requestAnimationFrame(function () { g.style.transition = 'opacity 1.2s ease'; g.style.opacity = ''; g.removeAttribute('data-gone'); }); }, 9000);
      return true;
    }
    return false;
  }

  function tryTrain(x, y) {
    var t = document.getElementById('hwTrain'); if (!t) return false;
    if (parseFloat(t.getAttribute('opacity') || '1') < .3) return false;
    var parts = t.querySelectorAll('path');
    for (var i = 0; i < parts.length; i++) {
      var r = parts[i].getBoundingClientRect(), s = scene.getBoundingClientRect();
      // Clip the box to the scene; the nearest car can run off the bottom edge.
      var box = { left: Math.max(r.left, s.left), right: Math.min(r.right, s.right), top: Math.max(r.top, s.top), bottom: Math.min(r.bottom, s.bottom) };
      box.width = box.right - box.left;
      if (box.width > 0 && box.bottom > box.top && inside(box, x, y, 6)) { horn(); bubble('HOOONK!', x, y - 24); return true; }
    }
    return false;
  }

  var photoBusy = false;
  function tryHorse(x, y) {
    if (photoBusy) return false;
    var horses = scene.querySelectorAll('.layer-rt-track use'), hit = -1, best = -1e9;
    for (var i = 0; i < horses.length; i++) {
      var r = horses[i].getBoundingClientRect();
      if (inside(r, x, y, 4) && r.right > best) { best = r.right; hit = i; }
    }
    if (hit < 0) return false;
    // The leader is whoever is furthest along right now.
    var lead = 0, far = -1e9;
    for (var k = 0; k < horses.length; k++) { var rr = horses[k].getBoundingClientRect(); if (rr.right > far) { far = rr.right; lead = k; } }
    var silks = horses[lead].style.getPropertyValue('--silk') || '#e4745c';
    photoBusy = true; shutter(); cheer();
    var flash = document.createElement('div'); flash.className = 'egg-flash'; scene.appendChild(flash);
    var svgs = scene.querySelectorAll('.layer-rt-track svg, .layer-rt-apron svg, .layer-rt-stand svg');
    if (!reduce.matches) svgs.forEach(function (s) { if (s.pauseAnimations) s.pauseAnimations(); });
    var card = document.createElement('div'); card.className = 'egg-photo';
    card.innerHTML = '<b>Photo finish</b><span><i style="background:' + silks.trim() + '"></i>Wins by a nose</span>';
    scene.appendChild(card);
    setTimeout(function () { flash.remove(); }, 700);
    setTimeout(function () {
      card.classList.add('out');
      if (!reduce.matches) svgs.forEach(function (s) { if (s.unpauseAnimations) s.unpauseAnimations(); });
    }, 1900);
    setTimeout(function () { card.remove(); photoBusy = false; }, 2500);
    return true;
  }

  /* ---------- One listener for the whole scene ---------- */

  scene.addEventListener('click', function (e) {
    if (e.target.closest('a, button, input, select, textarea, label, .pv-bar')) return;
    var x = e.clientX, y = e.clientY, s = which();
    if (s === 'beach' && tryDog(x, y)) return;
    if (s === 'fair' && tryBalloon(x, y)) return;
    if (s === 'highway' && tryTrain(x, y)) return;
    if (s === 'racetrack' && tryHorse(x, y)) return;
    var sun = sunEl();
    if (sun && inside(sun.getBoundingClientRect(), x, y, 6)) {
      var now = Date.now();
      sunHits = sunHits.filter(function (t) { return now - t < 4000; });
      sunHits.push(now); pulseSun();
      if (sunHits.length >= 5) { sunHits = []; fireworks(); }
    }
  });

  // For the curious who open the console.
  try { console.log('%cPsst. The sun likes to be clicked. Five times, quickly. And go say hi to the dog.', 'color:#e4745c;font:600 13px Inter,sans-serif'); } catch (e) {}
})();

/* Neighborhood map for neighborhoods.html.
 * An illustrated map of the San Diego coast: every community is its own colored shape.
 * Hover an area to light it up, click it to zoom in, then pick a neighborhood for details
 * and a link to its guide. Hand drawn and simplified, with no tiles and no outside library.
 */
(function () {
  'use strict';
  var root = document.getElementById('hood-map');
  var dataEl = document.getElementById('hood-map-data');
  if (!root || !dataEl) return;

  var NS = 'http://www.w3.org/2000/svg';
  var data = JSON.parse(dataEl.textContent);
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

  var AREAS = {
    coast:   { name: 'North County coast',    color: '#f0674d', blurb: 'Beach cities from Del Mar to Oceanside, linked by I-5 and the Coaster train.',
               fills: ['#f0674d', '#f6a24b', '#e04f6a', '#f7c548', '#ef8a62'] },
    inland:  { name: 'North County inland',   color: '#4f9d6e', blurb: 'Foothill and valley communities along SR-78, SR-76 and I-15, from Rancho Santa Fe and Poway to Fallbrook.',
               fills: ['#4f9d6e', '#8bb84f', '#2f8f7d', '#b4c44a', '#5f9c4a', '#3f8a5c', '#7aa650'] },
    central: { name: 'Central San Diego',     color: '#5a78d4', blurb: 'The urban core and the neighborhoods around Downtown, Balboa Park and Mission Valley.',
               fills: ['#5a78d4', '#8a5cc7', '#3f56a8', '#a24bb0', '#3f9ac9', '#6b4fb5', '#2f7fb8', '#9a6cd0', '#4a68c4', '#7a4fa8'] },
    beach:   { name: 'Beach and bay',         color: '#1fa3b5', blurb: 'Ocean and bayfront neighborhoods from La Jolla south to Point Loma.',
               fills: ['#1fa3b5', '#2bb59c', '#0f8497', '#4cc3cc', '#1a9a7c'] },
    north:   { name: 'North city and inland', color: '#b9784f', blurb: 'The north side of the City of San Diego, from University City to Rancho Bernardo.',
               fills: ['#e0883f', '#c2527a', '#a0406e', '#d4a03a', '#8a4b8f', '#cf6b5a', '#b9784f'] }
  };
  var ORDER = ['coast', 'inland', 'central', 'beach', 'north'];
  // Where each area's name sits on the full map (lat, lon). Written in the sea or open land beside it.
  var AREA_LABEL = { coast: [33.14, -117.485, 'NORTH COUNTY', 'COAST'], beach: [32.80, -117.42, 'BEACH', 'AND BAY'], inland: [33.335, -117.08, 'NORTH COUNTY', 'INLAND'], north: [33.09, -117.06, 'NORTH CITY', 'AND INLAND'], central: [32.665, -117.075, 'CENTRAL', 'SAN DIEGO'] };

  // ---- Geography: [lat, lon]. Simplified on purpose; a guide to where things are, not a survey. ----
  var BB = { n: 33.43, s: 32.53, w: -117.60, e: -116.95 }, H = 1000;
  var W = Math.round(H * (BB.e - BB.w) * Math.cos(33 * Math.PI / 180) / (BB.n - BB.s));
  function P(lat, lon) { return [(lon - BB.w) / (BB.e - BB.w) * W, (BB.n - lat) / (BB.n - BB.s) * H]; }
  function path(arr, close) { return arr.map(function (p, i) { var q = P(p[0], p[1]); return (i ? 'L' : 'M') + q[0].toFixed(1) + ' ' + q[1].toFixed(1); }).join('') + (close ? 'Z' : ''); }

  var COAST = [[33.43, -117.64], [33.385, -117.595], [33.35, -117.545], [33.31, -117.50], [33.27, -117.435], [33.235, -117.405], [33.215, -117.395], [33.195, -117.385], [33.18, -117.362], [33.16, -117.355], [33.145, -117.347], [33.12, -117.335], [33.09, -117.312], [33.07, -117.31], [33.04, -117.298], [33.015, -117.283], [32.99, -117.272], [32.96, -117.266], [32.93, -117.262], [32.90, -117.258], [32.86, -117.262], [32.852, -117.272], [32.83, -117.28], [32.81, -117.278], [32.795, -117.258], [32.77, -117.255], [32.75, -117.255], [32.735, -117.256], [32.70, -117.25], [32.668, -117.243]];
  var CORONADO = [[32.69, -117.195], [32.675, -117.178], [32.64, -117.15], [32.60, -117.135], [32.565, -117.13], [32.53, -117.125]];
  var BAY = [[32.672, -117.236], [32.70, -117.232], [32.716, -117.236], [32.72, -117.205], [32.714, -117.178], [32.70, -117.162], [32.67, -117.128], [32.64, -117.107], [32.612, -117.10], [32.598, -117.115], [32.602, -117.128], [32.632, -117.14], [32.66, -117.165], [32.682, -117.185], [32.683, -117.215]];
  var MISSION_BAY = [[32.795, -117.255], [32.80, -117.238], [32.79, -117.222], [32.775, -117.222], [32.765, -117.235], [32.77, -117.252]];
  var COVER = [[33.43, -117.33], [33.43, -116.98], [32.93, -116.98], [32.93, -117.05], [32.69, -117.05], [32.69, -117.35], [33.26, -117.50], [33.26, -117.33]];
  
  function svgNS(tag, attrs, parent) { var e = document.createElementNS(NS, tag); for (var k in attrs) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; }
  function html(tag, cls, parent, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text) e.textContent = text; if (parent) parent.appendChild(e); return e; }

  var byslug = {}, idx = {}; ORDER.forEach(function (g) { idx[g] = 0; });
  data.forEach(function (d) {
    byslug[d.s] = d; d.hay = (d.n + ' ' + d.b + ' ' + d.z + ' ' + AREAS[d.g].name).toLowerCase();
    d.fill = AREAS[d.g].fills[idx[d.g]++ % AREAS[d.g].fills.length];
    var q = P(d.lat, d.lon); d.x = q[0]; d.y = q[1];
  });
  var count = {}; ORDER.forEach(function (g) { count[g] = data.filter(function (d) { return d.g === g; }).length; });

  var regionsBar = root.querySelector('.hm-regions'), svgHost = root.querySelector('.hm-svg'), card = root.querySelector('.hm-card'), list = root.querySelector('.hm-list');
  var state = { area: null, sel: null, q: '' };

  // ---- build the static map once ----
  var svg = svgNS('svg', { viewBox: '0 0 ' + W + ' ' + H, role: 'group', 'aria-label': 'Illustrated map of San Diego County communities. Choose an area, then a neighborhood.', focusable: 'false' }, svgHost);
  var defs = svgNS('defs', {}, svg), og = svgNS('linearGradient', { id: 'hmsea', x1: 0, y1: 0, x2: 1, y2: 0 }, defs);
  svgNS('stop', { offset: 0, 'stop-color': '#4d9fd2' }, og); svgNS('stop', { offset: 1, 'stop-color': '#8ccbea' }, og);
  svgNS('rect', { x: -W, y: -H, width: W * 3, height: H * 3, fill: '#ebe8e2' }, svg);
  var clip = svgNS('clipPath', { id: 'hmcover' }, defs); svgNS('path', { d: path(COVER, true) }, clip);
  var gCells = svgNS('g', { 'clip-path': 'url(#hmcover)' }, svg);
  var oceanPts = [[34, -118.6]].concat(COAST).concat([[32.668, -117.243], [32.69, -117.195]]).concat(CORONADO).concat([[32.40, -117.125], [32.40, -118.6]]);
  svgNS('path', { d: path(oceanPts, true), fill: 'url(#hmsea)' }, svg);
  svgNS('path', { d: path(BAY, true), fill: '#8ccbea' }, svg);
  svgNS('path', { d: path(MISSION_BAY, true), fill: '#8ccbea' }, svg);
  [path(COAST), path(CORONADO), path(BAY, true), path(MISSION_BAY, true)].forEach(function (d) {
    svgNS('path', { d: d, fill: 'none', stroke: '#1b2a38', 'stroke-width': 2, 'vector-effect': 'non-scaling-stroke', 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, svg);
  });
  var scaled = [];   // things drawn at a constant pixel size: [element, x, y]
  var gDeco = svgNS('g', { 'pointer-events': 'none' }, svg), gAreaLabels = svgNS('g', { 'pointer-events': 'none' }, svg), gLabels = svgNS('g', { 'pointer-events': 'none' }, svg);
  [['PACIFIC OCEAN', 33.02, -117.50, '#fff', .75], ['CAMP PENDLETON', 33.33, -117.30, '#a89a82', 1], ['SOUTH BAY', 32.585, -117.04, '#a89a82', 1]].forEach(function (n) {
    var g = svgNS('g', {}, gDeco), t = svgNS('text', { 'class': 'hm-name', x: 0, y: 0, 'text-anchor': 'middle', fill: n[3], 'fill-opacity': n[4] }, g); t.textContent = n[0];
    var q = P(n[1], n[2]); scaled.push([g, q[0], q[1]]);
  });

  var cellEls = {}, labelEls = {}, areaLabelEls = {};
  data.forEach(function (d) {
    var el = svgNS('path', { 'class': 'hm-cell', d: path(d.c, true), fill: d.fill, 'data-s': d.s, 'data-g': d.g, tabindex: -1, role: 'button', 'aria-label': d.n }, gCells);
    el.addEventListener('click', function () { onCell(d); });
    el.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onCell(d); } });
    el.addEventListener('mouseenter', function () { onHover(d, true); });
    el.addEventListener('mouseleave', function () { onHover(d, false); });
    el.addEventListener('focus', function () { onHover(d, true); });
    el.addEventListener('blur', function () { onHover(d, false); });
    el.style.setProperty('--c', d.fill); cellEls[d.s] = el;
    var lg = svgNS('g', {}, gLabels), t = svgNS('text', { 'class': 'hm-label', x: 0, y: 0 }, lg); t.textContent = d.n.toUpperCase(); lg._t = t; labelEls[d.s] = lg;
    scaled.push([lg, d.x, d.y]);
  });
  ORDER.forEach(function (g) {
    var lg = svgNS('g', {}, gAreaLabels), q = P(AREA_LABEL[g][0], AREA_LABEL[g][1]);
    var t1 = svgNS('text', { 'class': 'hm-area-label', x: 0, y: -8, 'text-anchor': 'middle' }, lg); t1.textContent = AREA_LABEL[g][2];
    var t1b = svgNS('text', { 'class': 'hm-area-label', x: 0, y: 11, 'text-anchor': 'middle' }, lg); t1b.textContent = AREA_LABEL[g][3];
    var t2 = svgNS('text', { 'class': 'hm-area-sub', x: 0, y: 28, 'text-anchor': 'middle' }, lg); t2.textContent = count[g] + ' NEIGHBORHOODS';
    areaLabelEls[g] = lg; scaled.push([lg, q[0], q[1], 68]);
  });

  // ---- viewport: units per pixel keeps text a constant size while zooming ----
  var view = { x: 0, y: 0, w: W, h: H }, anim = null;
  function pxWidth() { var r = svg.getBoundingClientRect(); return r.width || 440; }
  function applyView() {
    svg.setAttribute('viewBox', view.x.toFixed(1) + ' ' + view.y.toFixed(1) + ' ' + view.w.toFixed(1) + ' ' + view.h.toFixed(1));
    var k = view.w / pxWidth();
    var pw = pxWidth();
    scaled.forEach(function (s) {
      var x = s[1];
      if (s[3]) { var px = Math.max(s[3], Math.min(pw - s[3], (x - view.x) / k)); x = view.x + px * k; }   // keep area names on the map
      s[0].setAttribute('transform', 'translate(' + x.toFixed(1) + ' ' + s[2].toFixed(1) + ') scale(' + k.toFixed(4) + ')');
    });
  }
  function boxFor(area) {
    if (!area) return { x: 0, y: 0, w: W, h: H };
    var xs = [], ys = [];
    data.filter(function (d) { return d.g === area; }).forEach(function (d) {
      var a = P(d.lat + d.rad, d.lon - d.rad / .84), b2 = P(d.lat - d.rad, d.lon + d.rad / .84); xs.push(a[0], b2[0]); ys.push(a[1], b2[1]);
    });
    var x0 = Math.min.apply(0, xs), x1 = Math.max.apply(0, xs), y0 = Math.min.apply(0, ys), y1 = Math.max.apply(0, ys);
    var aspect = W / H, cx = (x0 + x1) / 2, cy = (y0 + y1) / 2, w = (x1 - x0) * 1.15, h = (y1 - y0) * 1.15;
    if (w / h < aspect) w = h * aspect; else h = w / aspect;
    if (w >= W || h >= H) return { x: 0, y: 0, w: W, h: H };
    return { x: Math.max(0, Math.min(W - w, cx - w / 2)), y: Math.max(0, Math.min(H - h, cy - h / 2)), w: w, h: h };
  }
  function goTo(box, done) {
    if (anim) cancelAnimationFrame(anim);
    if (reduce.matches) { view = box; applyView(); done && done(); return; }
    var from = { x: view.x, y: view.y, w: view.w, h: view.h }, t0 = null, dur = 560;
    gLabels.style.opacity = 0;
    function step(ts) {
      if (t0 === null) t0 = ts;
      var u = Math.min(1, (ts - t0) / dur), e = u < .5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2;
      view = { x: from.x + (box.x - from.x) * e, y: from.y + (box.y - from.y) * e, w: from.w + (box.w - from.w) * e, h: from.h + (box.h - from.h) * e };
      applyView();
      if (u < 1) anim = requestAnimationFrame(step); else { anim = null; done && done(); }
    }
    anim = requestAnimationFrame(step);
  }

  // ---- state to screen ----
  function visible(d) {
    if (state.q) return d.hay.indexOf(state.q) > -1;
    return state.area ? d.g === state.area : true;
  }
  function overview() { return !state.area && !state.q; }
  function paint() {
    var ov = overview(), firstOfGroup = {};
    data.forEach(function (d) {
      var el = cellEls[d.s], on = visible(d), q = !!state.q, a = !!state.area;
      el.classList.toggle('dim', (a || q) && !on);
      el.classList.toggle('sel', state.sel === d.s);
      el.classList.toggle('soft', !!state.sel && state.sel !== d.s && on);
      var tab = ov ? (!firstOfGroup[d.g] && (firstOfGroup[d.g] = 1)) : on;
      el.setAttribute('tabindex', tab ? 0 : -1);
      el.setAttribute('aria-label', ov ? AREAS[d.g].name + ': ' + d.n + '. Zoom in.' : d.n + ', show details');
    });
    if (state.sel) gCells.appendChild(cellEls[state.sel]);
    ORDER.forEach(function (g) { areaLabelEls[g].style.display = ov ? '' : 'none'; });
    regionsBar.querySelectorAll('.hm-r').forEach(function (b) { var on = (b.getAttribute('data-a') || '') === (state.area || ''); b.classList.toggle('on', on); b.setAttribute('aria-pressed', on ? 'true' : 'false'); });
  }
  function placeLabels() {
    var k = view.w / pxWidth(), placed = [], show = data.filter(visible);
    data.forEach(function (d) { labelEls[d.s].style.display = 'none'; });
    gLabels.style.opacity = 1;
    if (overview()) return;
    var pw = pxWidth(), ph = pw * H / W;
    var spots = [[0, 5, 'middle'], [0, -12, 'middle'], [0, 22, 'middle'], [0, -29, 'middle'], [0, 39, 'middle']];
    show.sort(function (a, b) { return (state.sel === b.s) - (state.sel === a.s); });
    show.forEach(function (d) {
      var px = (d.x - view.x) / k, py = (d.y - view.y) / k, el = labelEls[d.s], w = d.n.length * 8.6 + 8, pick = null;
      for (var i = 0; i < spots.length && !pick; i++) {
        var s = spots[i], x0 = px - w / 2, y0 = py + s[1] - 14, ok = x0 > 2 && x0 + w < pw - 2 && y0 > 2 && y0 + 20 < ph - 2;
        for (var j = 0; j < placed.length && ok; j++) { var b = placed[j]; if (x0 < b[0] + b[2] && x0 + w > b[0] && y0 < b[1] + b[3] && y0 + 20 > b[1]) ok = false; }
        if (ok) pick = { s: s, box: [x0, y0, w, 20] };
      }
      el.style.display = ''; var t = el._t, s2 = pick ? pick.s : spots[0];
      t.setAttribute('y', s2[1]); t.setAttribute('text-anchor', 'middle');
      t.setAttribute('class', 'hm-label' + (pick ? '' : ' hm-extra') + (state.sel === d.s ? ' hm-on' : ''));
      if (pick) placed.push(pick.box);
    });
  }
  function onHover(d, on) {
    gCells.classList.toggle('hovering', on);
    if (overview()) {
      ORDER.forEach(function (g) { areaLabelEls[g].classList.toggle('hot', on && g === d.g); });
      data.forEach(function (o) { cellEls[o.s].classList.toggle('hot', on && o.g === d.g); });
      return;
    }
    data.forEach(function (o) { cellEls[o.s].classList.toggle('hot', on && o.s === d.s); });
    var el = labelEls[d.s]; if (!el || el.style.display === 'none') return;
    if (on) el._t.classList.add('hm-on'); else if (state.sel !== d.s) el._t.classList.remove('hm-on');
  }
  function lightArea(g, on) {
    if (!overview()) return;
    gCells.classList.toggle('hovering', on);
    data.forEach(function (o) { cellEls[o.s].classList.toggle('hot', on && o.g === g); });
    areaLabelEls[g].classList.toggle('hot', on);
  }
  function onCell(d) {
    if (overview()) setArea(d.g); else select(d.s);
  }
  function nearest(d, n) {
    return data.filter(function (o) { return o.s !== d.s; }).map(function (o) { var dy = o.lat - d.lat, dx = (o.lon - d.lon) * .84; return [dy * dy + dx * dx, o]; })
      .sort(function (a, b) { return a[0] - b[0]; }).slice(0, n).map(function (a) { return a[1]; });
  }

  function renderRegions() {
    regionsBar.textContent = '';
    var all = html('button', 'hm-r', regionsBar, 'All of San Diego'); all.type = 'button'; all.setAttribute('data-a', ''); all.addEventListener('click', function () { setArea(null); });
    ORDER.forEach(function (g) {
      var b = html('button', 'hm-r', regionsBar); b.type = 'button'; b.setAttribute('data-a', g);
      var dot = html('span', 'hm-dot', b); dot.style.background = AREAS[g].color; html('span', '', b, AREAS[g].name);
      b.addEventListener('click', function () { setArea(g); });
      b.addEventListener('mouseenter', function () { lightArea(g, true); });
      b.addEventListener('mouseleave', function () { lightArea(g, false); });
    });
  }
  function renderSide() {
    card.textContent = ''; list.textContent = '';
    var d = state.sel ? byslug[state.sel] : null;
    if (d) {
      var top = html('div', 'hm-card-top', card);
      var back = html('button', 'hm-back', top, '‹ ' + AREAS[d.g].name); back.type = 'button'; back.addEventListener('click', function () { state.sel = null; update(false); });
      var x = html('button', 'hm-x', top, '×'); x.type = 'button'; x.setAttribute('aria-label', 'Close details'); x.addEventListener('click', function () { state.sel = null; update(false); });
      var badge = html('span', 'hm-badge', card, AREAS[d.g].name); badge.style.background = AREAS[d.g].color;
      html('h3', '', card, d.n); html('p', 'hm-blurb', card, d.b);
      var z = html('p', 'hm-zip', card); html('strong', '', z, 'ZIP '); z.appendChild(document.createTextNode(d.z));
      var a = html('a', 'btn btn-coral', card, 'View the ' + d.n + ' guide'); a.href = d.s + '.html';
      html('p', 'hm-near-h', card, 'Close by'); var row = html('div', 'hm-near', card);
      nearest(d, 3).forEach(function (o) { var c = html('button', 'hm-chip', row, o.n); c.type = 'button'; c.addEventListener('click', function () { select(o.s); }); });
    } else if (state.area) {
      var A = AREAS[state.area], top2 = html('div', 'hm-card-top', card);
      var back2 = html('button', 'hm-back', top2, '‹ All of San Diego'); back2.type = 'button'; back2.addEventListener('click', function () { setArea(null); });
      var b2 = html('span', 'hm-badge', card, count[state.area] + ' neighborhoods'); b2.style.background = A.color;
      html('h3', '', card, A.name); html('p', 'hm-blurb', card, A.blurb);
    } else if (state.q) {
      html('p', 'hm-hint', card, 'Showing neighborhoods that match “' + state.q + '”. Clear the search to go back to the full map.');
    } else {
      html('p', 'hm-hint', card, 'Pick an area on the map, or from the list, to zoom in and meet its neighborhoods. On a computer, hover over the map to light areas up.');
    }
    if (!state.area && !state.q) {
      ORDER.forEach(function (g) {
        var b = html('button', 'hm-area', list); b.type = 'button';
        var dot = html('span', 'hm-dot', b); dot.style.background = AREAS[g].color;
        var tx = html('span', 'hm-area-t', b); html('strong', '', tx, AREAS[g].name); html('small', '', tx, count[g] + ' neighborhoods');
        b.addEventListener('click', function () { setArea(g); });
        b.addEventListener('mouseenter', function () { lightArea(g, true); });
        b.addEventListener('mouseleave', function () { lightArea(g, false); });
      });
    } else {
      var items = data.filter(visible);
      if (!items.length) { html('p', 'hm-none', list, 'Nothing matches that search.'); return; }
      var ul = html('ul', '', list);
      items.forEach(function (d2) {
        var li = html('li', '', ul), b = html('button', 'hm-item' + (state.sel === d2.s ? ' on' : ''), li); b.type = 'button';
        var dot = html('span', 'hm-dot', b); dot.style.background = d2.fill; html('span', '', b, d2.n);
        b.addEventListener('click', function () { select(d2.s); });
        b.addEventListener('mouseenter', function () { onHover(d2, true); });
        b.addEventListener('mouseleave', function () { onHover(d2, false); });
      });
    }
  }
  function update(zoom) {
    paint(); renderSide();
    if (zoom === false) { placeLabels(); return; }
    goTo(boxFor(state.q ? null : state.area), placeLabels);
  }
  function setArea(g) { state.area = g; state.sel = null; gCells.classList.remove('hovering'); data.forEach(function (o) { cellEls[o.s].classList.remove('hot'); }); update(); }
  function select(s) {
    var d = byslug[s]; if (!d) return;
    var changed = state.area !== d.g && !state.q;
    state.sel = s; if (!state.q) state.area = d.g;
    paint(); renderSide();
    if (changed) goTo(boxFor(state.area), placeLabels); else placeLabels();
    try { cellEls[s].focus({ preventScroll: true }); } catch (e) { }
  }

  var q = document.getElementById('dir-q');
  if (q) q.addEventListener('input', function () { state.q = q.value.trim().toLowerCase(); state.sel = null; update(); });
  window.addEventListener('resize', function () { applyView(); placeLabels(); });

  renderRegions();
  var hash = (location.hash || '').replace('#', '');
  if (byslug[hash]) { state.area = byslug[hash].g; state.sel = hash; }
  view = boxFor(state.area); applyView(); paint(); renderSide(); placeLabels();
  root.classList.add('ready');
})();

/**
 * Hexasolv - Cursor Chain
 * 4 small icon circles follow the mouse like a chain (code, AI chip, layers, lightning).
 * - Self-contained: injects its own CSS/HTML, nothing else to edit
 * - Brand colours, visible on light AND dark sections, supports html.dark
 * - Your normal cursor stays visible (the chain just follows it)
 * - Mouse devices only, respects "reduce motion"
 * - Stops animating when the mouse is still
 * Use this INSTEAD of cursor.js (not together).
 */
(function () {
  'use strict';
 
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
 
  // Icons + colours. Add, remove or reorder freely. (Keep `speeds` the same length.)
  var items = [
    { color: '#5813BC', svg: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>' },
    { color: '#AC22CB', svg: '<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/>' },
    { color: '#0ea5e9', svg: '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>' },
    { color: '#f59e0b', svg: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>' }
  ];
  // Smaller number = more lag (longer, floatier chain)
  var speeds = [0.22, 0.16, 0.12, 0.09];
 
  var css = `
    #hx-chain-line { position: fixed; inset: 0; width: 100vw; height: 100vh;
      pointer-events: none; z-index: 2147483646; }
    #hx-chain-line polyline { fill: none; stroke: rgba(124, 58, 237, .55);
      stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; }
    .hx-chain-dot { position: fixed; top: 0; left: 0; width: 34px; height: 34px;
      margin: -17px 0 0 -17px; border-radius: 50%; background: #fff;
      border: .5px solid rgba(0,0,0,.08); display: grid; place-items: center;
      pointer-events: none; z-index: 2147483647; will-change: transform;
      box-shadow: 0 3px 10px rgba(20,10,40,.22); opacity: 0; transition: opacity .25s ease; }
    html.dark .hx-chain-dot { background: #1a1230; border-color: rgba(255,255,255,.12);
      box-shadow: 0 3px 10px rgba(0,0,0,.5); }
    .hx-chain-visible .hx-chain-dot { opacity: 1; }
    .hx-chain-dot svg { width: 16px; height: 16px; fill: none; stroke-width: 2;
      stroke-linecap: round; stroke-linejoin: round; }
  `;
  var styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);
 
  var NS = 'http://www.w3.org/2000/svg';
  var svg = document.createElementNS(NS, 'svg');
  svg.id = 'hx-chain-line';
  var line = document.createElementNS(NS, 'polyline');
  svg.appendChild(line);
  document.body.appendChild(svg);
 
  var mouse = { x: 0, y: 0 };
  var started = false, running = false;
  var root = document.documentElement;
 
  var dots = items.map(function (it) {
    var el = document.createElement('div');
    el.className = 'hx-chain-dot';
    el.innerHTML = '<svg viewBox="0 0 24 24" stroke="' + it.color + '">' + it.svg + '</svg>';
    document.body.appendChild(el);
    return { el: el, x: 0, y: 0 };
  });
 
  function tick() {
    var tx = mouse.x, ty = mouse.y, moving = false;
    var pts = [mouse.x + ',' + mouse.y];
    dots.forEach(function (d, i) {
      d.x += (tx - d.x) * speeds[i];
      d.y += (ty - d.y) * speeds[i];
      if (Math.abs(tx - d.x) > 0.2 || Math.abs(ty - d.y) > 0.2) moving = true;
      d.el.style.transform = 'translate3d(' + d.x + 'px,' + d.y + 'px,0)';
      pts.push(d.x + ',' + d.y);
      tx = d.x; ty = d.y;
    });
    line.setAttribute('points', pts.join(' '));
    if (moving) requestAnimationFrame(tick); else running = false;
  }
 
  window.addEventListener('pointermove', function (e) {
    if (e.pointerType && e.pointerType !== 'mouse') return;
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    if (!started) {
      dots.forEach(function (d) { d.x = mouse.x; d.y = mouse.y; });
      started = true;
    }
    root.classList.add('hx-chain-visible');
    if (!running) { running = true; requestAnimationFrame(tick); }
  }, { passive: true });
 
  document.addEventListener('mouseleave', function () {
    root.classList.remove('hx-chain-visible');
    line.setAttribute('points', '');
  });
  document.addEventListener('mouseenter', function () { root.classList.add('hx-chain-visible'); });
})();
 
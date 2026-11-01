// Sticky pill navbar (partials/essentials/header.html). The header sits inside
// page sections (e.g. the hero), so CSS `position: sticky` would stop at the end
// of that section. Instead, the moment the capsule reaches the top of the screen
// the header gets .is-stuck and the capsule turns fixed at that same spot and
// width, so it never scrolls away, then .is-compact animates it a little
// narrower and slimmer (styles: "Sticky state" in scss/custom.scss). The header
// keeps its height so the page does not jump.
(function () {
  var header = document.querySelector('.navigation--pill');
  var bar = header && header.querySelector(':scope > .container');
  var pill = bar && bar.querySelector('.navbar-pill');
  if (!pill) return;
  var GAP = 10;          // px between the stuck capsule and the top edge
  var SHRINK = 0.1;      // narrow the stuck bar by at most 10% of its width
  var stuck = false, ticking = false, offset = 0, settleTimer;

  // Wrappers that form their own stacking layer (e.g. the hero section:
  // position: relative; z-index: 1) cap the bar's z-index, so later sections
  // would paint over it. While stuck, lift those wrappers above the page.
  var layers = [];
  for (var el = header.parentElement; el && el !== document.body; el = el.parentElement) {
    var cs = getComputedStyle(el);
    if (cs.position !== 'static' && cs.zIndex !== 'auto') layers.push(el);
  }
  function lift(on) {
    layers.forEach(function (el) { el.style.zIndex = on ? '1030' : ''; });
  }

  // Empty space in the bar's first row: the gaps between its visible items,
  // minus a 16px breathing room per gap. The bar never shrinks past that, so
  // links and buttons are never squeezed.
  function freeSpace() {
    var row = pill.querySelector('.navbar-brand').getBoundingClientRect();
    var items = pill.querySelectorAll('.navbar-brand, .navbar-actions, .navbar-nav, .navbar-right');
    var boxes = [];
    items.forEach(function (it) {
      var r = it.getBoundingClientRect();
      if (r.width > 0 && r.top < row.bottom) boxes.push(r);
    });
    boxes.sort(function (a, b) { return a.left - b.left; });
    var free = 0;
    for (var i = 1; i < boxes.length; i++) {
      free += Math.max(0, boxes[i].left - boxes[i - 1].right - 16);
    }
    return free;
  }

  // In-flow measurements: capsule position in the header, full and compact width
  function measure() {
    var was = header.className;
    header.classList.remove('is-stuck', 'is-compact', 'is-sized');
    offset = bar.getBoundingClientRect().top - header.getBoundingClientRect().top;
    var w = pill.getBoundingClientRect().width;
    var shrink = Math.min(freeSpace(), w * SHRINK);
    header.style.setProperty('--nav-w', w + 'px');
    header.style.setProperty('--nav-w-compact', (w - shrink) + 'px');
    header.className = was;
  }

  function stick() {
    clearTimeout(settleTimer);
    header.style.height = header.offsetHeight + 'px';
    measure();
    header.classList.add('is-sized', 'is-stuck');
    lift(true);
    pill.getBoundingClientRect();          // commit full width before shrinking
    header.classList.add('is-compact');
  }

  function unstick() {
    header.classList.remove('is-stuck', 'is-compact');
    header.style.height = '';
    lift(false);
    // grow back to full width, then hand the width back to the layout
    settleTimer = setTimeout(function () { header.classList.remove('is-sized'); }, 500);
  }

  function update() {
    ticking = false;
    // the header stays in the flow in both states, so it is the reference
    var next = header.getBoundingClientRect().top + offset <= GAP;
    if (next === stuck) return;
    stuck = next;
    if (stuck) stick(); else unstick();
  }

  function onScroll() {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', function () { measure(); onScroll(); });
  measure();
  update();
})();

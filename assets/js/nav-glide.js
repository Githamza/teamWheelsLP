// Pill navbar (partials/essentials/header.html): one highlight glides to the
// hovered or focused top-level link and rests on the current page. Desktop
// only; below xl the list is a stacked menu and the highlight is hidden.
(function () {
  var ul = document.querySelector('.navbar-pill .navbar-nav');
  var glide = ul && ul.querySelector('.navbar-pill__glide');
  if (!glide) return;
  var desk = window.matchMedia('(min-width: 1200px)');
  var current = function () { return ul.querySelector('.nav-item.active > .nav-link'); };

  function moveTo(link, instant) {
    if (!link || !desk.matches) { glide.classList.remove('is-on'); return; }
    var a = link.getBoundingClientRect(), b = ul.getBoundingClientRect();
    if (instant) glide.classList.add('no-anim');
    glide.style.width = a.width + 'px';
    glide.style.height = a.height + 'px';
    glide.style.transform = 'translate(' + (a.left - b.left) + 'px,' + (a.top - b.top) + 'px)';
    glide.classList.add('is-on');
    if (instant) { glide.offsetWidth; glide.classList.remove('no-anim'); }
  }

  ul.classList.add('has-glide');
  ul.querySelectorAll('.nav-item > .nav-link').forEach(function (link) {
    link.addEventListener('pointerenter', function () { moveTo(link); });
    link.addEventListener('focus', function () { moveTo(link); });
  });
  ul.addEventListener('pointerleave', function () { moveTo(current()); });
  ul.addEventListener('focusout', function (e) { if (!ul.contains(e.relatedTarget)) moveTo(current()); });
  var settle = function () { moveTo(current(), true); };
  new ResizeObserver(settle).observe(ul);   // breakpoints, font swap
  settle();
})();

(function () {
  'use strict';

  // Preloader
  window.addEventListener('load', function () {
    var preloader = document.querySelector('.preloader');
    if (preloader) {
      preloader.style.opacity = '0';
      preloader.style.transition = 'opacity 250ms';
      setTimeout(function () { preloader.remove(); }, 500);
    }
  });

  document.addEventListener('DOMContentLoaded', function () {

    // dropdown height fix
    function dropdownHeightFix() {
      var width = window.innerWidth;
      document.querySelectorAll('.navbar-nav .dropdown-menu').forEach(function (menu) {
        menu.style.height = width > 1200 ? menu.offsetHeight + 'px' : 'auto';
      });
    }
    dropdownHeightFix();
    window.addEventListener('resize', dropdownHeightFix);

    // menuHumBurger icon toggle
    document.querySelectorAll('.navbar-toggler').forEach(function (toggler) {
      toggler.addEventListener('click', function () {
        this.querySelectorAll('i').forEach(function (icon) {
          icon.classList.toggle('d-inline');
          icon.classList.toggle('d-none');
        });
      });
    });

    // videoPopupInit
    var videoButtons = document.querySelectorAll('[data-bs-target="#videoModal"]');
    if (videoButtons.length) {
      var videoSrc = '';
      videoButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
          videoSrc = this.getAttribute('data-src');
        });
      });
      var videoModal = document.getElementById('videoModal');
      if (videoModal) {
        videoModal.addEventListener('shown.bs.modal', function () {
          var el = document.getElementById('showVideo');
          if (el) el.setAttribute('src', videoSrc + '?autoplay=1&modestbranding=1&showinfo=0');
        });
        videoModal.addEventListener('hide.bs.modal', function () {
          var el = document.getElementById('showVideo');
          if (el) el.setAttribute('src', videoSrc);
        });
      }
    }

    // counterUp
    var counters = document.querySelectorAll('.counter');
    if (counters.length) {
      var counted = false;
      window.addEventListener('scroll', function () {
        if (counted) return;
        var rect = counters[0].getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          counted = true;
          counters.forEach(function (counter) {
            var countTo = parseInt(counter.getAttribute('data-count'), 10);
            var start = parseInt(counter.textContent, 10) || 0;
            var duration = 850;
            var startTime = null;
            function step(ts) {
              if (!startTime) startTime = ts;
              var p = Math.min((ts - startTime) / duration, 1);
              counter.textContent = Math.ceil(start + (countTo - start) * p).toLocaleString('en');
              if (p < 1) requestAnimationFrame(step);
            }
            requestAnimationFrame(step);
          });
        }
      }, { passive: true });
    }

    // brandCarousel
    if (document.querySelector('.brand-carousel')) {
      new Swiper('.brand-carousel.swiper', {
        speed: 400,
        loop: true,
        grabCursor: true,
        pagination: { el: '.swiper-pagination', type: 'bullets', clickable: true },
        breakpoints: {
          320: { slidesPerView: 2 },
          480: { slidesPerView: 3 },
          767: { slidesPerView: 4 },
          991: { slidesPerView: 5 }
        }
      });
    }

    // tab
    document.querySelectorAll('.tab-content .tab-pane').forEach(function (pane) {
      var codeTabs = pane.closest('.code-tabs');
      if (!codeTabs) return;
      var ul = codeTabs.querySelector('.nav-tabs');
      if (!ul) return;
      var li = document.createElement('li');
      li.className = 'nav-item';
      li.innerHTML = '<a class="nav-link" href="#">' + (pane.getAttribute('title') || '') + '</a>';
      ul.appendChild(li);
    });

    document.querySelectorAll('.code-tabs ul.nav-tabs').forEach(function (ul) {
      var first = ul.querySelector('li');
      if (first) first.classList.add('active');
    });

    document.querySelectorAll('.code-tabs .tab-content').forEach(function (tc) {
      var first = tc.querySelector('div');
      if (first) first.classList.add('active');
    });

    document.querySelectorAll('.nav-tabs a').forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        var tab = this.parentElement;
        var tabIndex = Array.prototype.indexOf.call(tab.parentElement.children, tab);
        var panel = this.closest('.code-tabs');
        var pane = panel.querySelectorAll('.tab-pane')[tabIndex];
        panel.querySelectorAll('.active').forEach(function (el) { el.classList.remove('active'); });
        tab.classList.add('active');
        if (pane) pane.classList.add('active');
      });
    });

    // Accordions
    document.querySelectorAll('.collapse').forEach(function (el) {
      el.addEventListener('shown.bs.collapse', function () {
        var icon = this.parentElement.querySelector('.fa-plus');
        if (icon) { icon.classList.remove('fa-plus'); icon.classList.add('fa-minus'); }
      });
      el.addEventListener('hidden.bs.collapse', function () {
        var icon = this.parentElement.querySelector('.fa-minus');
        if (icon) { icon.classList.remove('fa-minus'); icon.classList.add('fa-plus'); }
      });
    });

    // post carousel
    if (document.querySelector('.post-carousel')) {
      new Swiper('.post-carousel.swiper', {
        speed: 400,
        slidesPerView: 1,
        loop: true,
        pagination: { el: '.swiper-pagination', type: 'bullets', clickable: true }
      });
    }

    // testimonials carousel
    if (document.querySelector('.testimonials-carousel')) {
      new Swiper('.testimonials-carousel.swiper', {
        speed: 400,
        loop: true,
        grabCursor: true,
        autoHeight: true,
        pagination: { el: '.swiper-pagination', type: 'bullets', clickable: true }
      });
    }
  });
})();

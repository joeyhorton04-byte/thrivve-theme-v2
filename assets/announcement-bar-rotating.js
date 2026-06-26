(function () {
  function initBar(root) {
    var list = root.querySelector('[data-ab-list]');
    if (!list) return;
 
    var items = Array.prototype.slice.call(list.querySelectorAll('[data-ab-item]'));
    var count = items.length;
    if (count === 0) return;
 
    var dotsWrap = root.querySelector('[data-ab-dots]');
    var dots = dotsWrap ? Array.prototype.slice.call(dotsWrap.children) : [];
    var prevBtn = root.querySelector('[data-ab-prev]');
    var nextBtn = root.querySelector('[data-ab-next]');
 
    var speed = parseFloat(getComputedStyle(root).getPropertyValue('--tab-speed')) || 4;
    var autoRotate = root.getAttribute('data-auto-rotate') === 'true';
    var current = 0;
    var timer = null;
    var paused = false;
 
    function show(index) {
      items[current].classList.remove('is-active');
      if (dots[current]) dots[current].classList.remove('is-active');
 
      current = (index + count) % count;
 
      items[current].classList.add('is-active');
      if (dots[current]) dots[current].classList.add('is-active');
    }
 
    function next() {
      show(current + 1);
    }
 
    function prev() {
      show(current - 1);
    }
 
    function start() {
      if (!autoRotate || count < 2) return;
      stop();
      timer = setInterval(function () {
        if (!paused) next();
      }, speed * 1000);
    }
 
    function stop() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }
 
    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        next();
      });
    }
 
    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        prev();
      });
    }
 
    if (dots.length) {
      dots.forEach(function (dot, i) {
        dot.style.cursor = 'pointer';
        dot.style.pointerEvents = 'auto';
        dot.addEventListener('click', function () {
          show(i);
        });
      });
    }
 
    root.addEventListener('mouseenter', function () {
      paused = true;
    });
    root.addEventListener('mouseleave', function () {
      paused = false;
    });
    root.addEventListener('focusin', function () {
      paused = true;
    });
    root.addEventListener('focusout', function () {
      paused = false;
    });
 
    start();
 
    root.__thrivveAnnouncementStop = stop;
  }
 
  function initAll() {
    document.querySelectorAll('[data-thrivve-announcement]').forEach(initBar);
  }
 
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
 
  document.addEventListener('shopify:section:load', function (event) {
    var root = event.target.querySelector && event.target.querySelector('[data-thrivve-announcement]');
    if (root) initBar(root);
  });
 
  document.addEventListener('shopify:section:unload', function (event) {
    var root = event.target.querySelector && event.target.querySelector('[data-thrivve-announcement]');
    if (root && root.__thrivveAnnouncementStop) root.__thrivveAnnouncementStop();
  });
})();

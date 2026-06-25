(function () {
  function initRotatingBar(list) {
    var items = list.querySelectorAll('.announcement-bar-rotating__item');
    var count = items.length;
    if (count === 0) return;
 
    var speedVar = getComputedStyle(list.closest('.announcement-bar-rotating')).getPropertyValue('--ab-speed');
    var perItemSeconds = parseFloat(speedVar) || 4;
    var totalDuration = perItemSeconds * count;
 
    items.forEach(function (item) {
      item.style.animationDuration = totalDuration + 's';
    });
 
    if (count === 1) {
      items[0].style.animation = 'none';
      items[0].style.opacity = '1';
      items[0].style.transform = 'none';
    }
  }
 
  function initAll() {
    document.querySelectorAll('[data-ab-list]').forEach(initRotatingBar);
  }
 
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
 
  document.addEventListener('shopify:section:load', function (event) {
    var list = event.target.querySelector && event.target.querySelector('[data-ab-list]');
    if (list) initRotatingBar(list);
  });
})();

function debounce (fn, time) {
  var timeout;
  return function () {
    var context = this,
        args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      fn.apply(context, args);
    }, time)
  }
}

function sendHeight () {
  var container = document.getElementById('dsn-height-container');

  function _sendHeight() {
      var height = Math.max(container.scrollHeight, container.offsetHeight, container.clientHeight);
      window.parent.postMessage({ height: height }, 'https://altex.ro/');
  }

  window.addEventListener('resize', debounce(_sendHeight, 300));

  // XXX We need a timeout here because there are many independent jQuery
  // libraries that change the layout and we can't control when this happens
  setTimeout(_sendHeight, 500);
}
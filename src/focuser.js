module.exports = (function() {

  var currentElem = null;
  var focusElem = null;

  /*
    --------------------
    Set up
    --------------------
  */

  var createFocuser = function() {
    focusElem = document.createElement('div');
    focusElem.classList.add('a11y-focuser');

    document.body.appendChild(focusElem);
  };

  var updateFocuser = function() {
    if (currentElem) {
      var elemInfo = currentElem.getBoundingClientRect();

      if (
        (
          currentElem.nodeName.toLowerCase() === 'body' ||
          currentElem.nodeName.toLowerCase() === 'div' ||
          currentElem.nodeName.toLowerCase() === 'form' ||
          currentElem.nodeName.toLowerCase() === 'main' ||
          currentElem.nodeName.toLowerCase() === 'nav'
        ) || (
          elemInfo.height <= 1 &&
          elemInfo.width <= 1
        )
      ) {
        hideFocuser(event);
      } else {
        focusElem.style.height = (elemInfo.height + 6) + 'px';
        focusElem.style.width = (elemInfo.width + 6) + 'px';
        focusElem.style.left = (elemInfo.left + window.pageXOffset - 3) + 'px';
        focusElem.style.top = (elemInfo.top + window.pageYOffset - 3) + 'px';
        focusElem.classList.add('-focus');
      }
    }

    requestAnimationFrame(updateFocuser);
  };


  /*
    --------------------
    Events
    --------------------
  */

  var toggleFocuser = function(event) {
    currentElem = (event.type === 'focusin') ? event.target : null;
    focusElem.classList[(event.type === 'focusin') ? 'add' : 'remove']('-focus');
  };

  var addListeners = function() {
    window.addEventListener('focusin', toggleFocuser);
    window.addEventListener('focusout', toggleFocuser);
  };


  /*
    --------------------
    Init
    --------------------
  */

  createFocuser();
  addListeners();
  updateFocuser();

}());

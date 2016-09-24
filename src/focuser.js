module.exports = (function() {

  var focuser = document.createElement('div');
  focuser.classList.add('a11y-focuser');
  document.body.appendChild(focuser);

  var updateFocuser = function(event) {
    var elem = event.target;

    if (
      elem.nodeName.toLowerCase() === 'body' ||
      elem.nodeName.toLowerCase() === 'div' ||
      elem.nodeName.toLowerCase() === 'form' ||
      elem.nodeName.toLowerCase() === 'main' ||
      elem.nodeName.toLowerCase() === 'nav'
    ) {
      hideFocuser(event);
    } else {
      var elemInfo = elem.getBoundingClientRect();

      focuser.style.height = (elemInfo.height + 6) + 'px';
      focuser.style.width = (elemInfo.width + 6) + 'px';
      focuser.style.left = (elemInfo.left + window.pageXOffset - 3) + 'px';
      focuser.style.top = (elemInfo.top + window.pageYOffset - 3) + 'px';
      focuser.classList.add('-focus');
    }
  };

  var hideFocuser = function(event) {
    var elem = event.target;
    focuser.classList.remove('-focus');
  };

  window.addEventListener('focusin', updateFocuser);
  window.addEventListener('focusout', hideFocuser);

}());

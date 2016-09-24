/**
 * focuser - Ditch those ugly focus styles and use Focuser! A stylable, traveling focus indicator.
 * @version v1.0.0
 * @link https://github.com/ten1seven/focuser
 * @license MIT
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("focuser", [], factory);
	else if(typeof exports === 'object')
		exports["focuser"] = factory();
	else
		root["focuser"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

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


/***/ }
/******/ ])
});
;
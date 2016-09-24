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
	        currentElem = null;
	        focusElem.classList.remove('-focus');
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


/***/ }
/******/ ])
});
;
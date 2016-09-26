/**
 * focuser - Ditch those ugly focus styles and use Focuser! A stylable, traveling focus indicator.
 * @version v1.0.4
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

	  // object containing the focuser's current dimensions
	  var focuserBox = {
	    width: 0,
	    height: 0,
	    top: 0,
	    left: 0
	  };

	  // block-level elements
	  // that should not receive a focus indicator
	  var formInputs = [
	    'body',
	    'div',
	    'form',
	    'main',
	    'nav'
	  ];

	  // empty variable for holding the curretly-focused element
	  var currentElem = null;

	  // empty variable for the focuser element
	  var focuserElem = null;

	  // extra "padding" between focuser and the element it's focusing
	  var focuserElemPadding = 5;

	  // boolean containing whether something is currently focused
	  var isFocused = false;

	  /*
	    --------------------
	    Set up
	    --------------------
	  */

	  var createFocuser = function() {
	    focuserElem = document.createElement('div');
	    focuserElem.classList.add('a11y-focuser');

	    document.body.appendChild(focuserElem);
	  };

	  var updateFocuser = function() {
	    if (isFocused && currentElem) {
	      var elemInfo = currentElem.getBoundingClientRect();

	      // reasons to stop an active focuser
	      if (

	        // if the current element is one of the block level elements
	        (formInputs.indexOf(currentElem.nodeName.toLowerCase()) !== -1) ||

	        // OR the element is less than 1px in height and width
	        // this catches elements that may be using accessible techniques for hidden content
	        // via: https://snook.ca/archives/html_and_css/hiding-content-for-accessibility
	        (
	          elemInfo.height <= 1 &&
	          elemInfo.width <= 1
	        )
	      ) {
	        stopFocuser();

	      // only update the focuser element if
	      // the dimensions have changed to save on processing
	      } else if (
	        focuserBox.width !== elemInfo.width ||
	        focuserBox.height !== elemInfo.height ||
	        focuserBox.top !== elemInfo.top ||
	        focuserBox.left !== elemInfo.left
	      ) {

	        // save the current dimensions for comparison
	        focuserBox.width = elemInfo.width;
	        focuserBox.height = elemInfo.height;
	        focuserBox.top = elemInfo.top;
	        focuserBox.left = elemInfo.left;

	        // set the style on the focuser
	        focuserElem.style.width = (elemInfo.width + (focuserElemPadding * 2)) + 'px';
	        focuserElem.style.height = (elemInfo.height + (focuserElemPadding * 2)) + 'px';
	        focuserElem.style.top = (elemInfo.top + window.pageYOffset - focuserElemPadding) + 'px';
	        focuserElem.style.left = (elemInfo.left + window.pageXOffset - focuserElemPadding) + 'px';
	      }

	      requestAnimationFrame(updateFocuser);
	    }
	  };


	  /*
	    --------------------
	    Events
	    --------------------
	  */

	  var startFocuser = function(event) {
	    isFocused = true;
	    currentElem = event.target;

	    focuserElem.classList.add('-focus');

	    updateFocuser();
	  };

	  var stopFocuser = function() {
	    isFocused = false;
	    currentElem = null;

	    focuserElem.classList.remove('-focus');
	  };

	  var addListeners = function() {
	    document.body.addEventListener('focusin', startFocuser);
	    document.body.addEventListener('focusout', stopFocuser);
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
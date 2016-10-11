module.exports = (function () {
  // object containing the focuser's current dimensions
  let focuserBox = {
    width: 0,
    height: 0,
    top: 0,
    left: 0
  }

  // block-level elements
  // that should not receive a focus indicator
  const formInputs = [
    'body',
    'div',
    'form',
    'main',
    'nav'
  ]

  // empty variable for holding the curretly-focused element
  let currentElem = null

  // empty variable for the focuser element
  let focuserElem = null

  // extra "padding" between focuser and the element it's focusing
  const focuserElemPadding = 5

  // boolean containing whether something is currently focused
  let isFocused = false

  /*
    --------------------
    Set up
    --------------------
  */

  const createFocuser = function () {
    focuserElem = document.createElement('div')
    focuserElem.classList.add('a11y-focuser')

    document.body.appendChild(focuserElem)
  }

  const updateFocuser = function () {
    if (isFocused && currentElem) {
      let elemInfo = currentElem.getBoundingClientRect()

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
        stopFocuser()

      // only update the focuser element if
      // the dimensions have changed to save on processing
      } else if (
        focuserBox.width !== elemInfo.width ||
        focuserBox.height !== elemInfo.height ||
        focuserBox.top !== elemInfo.top ||
        focuserBox.left !== elemInfo.left
      ) {
        // save the current dimensions for comparison
        focuserBox.width = elemInfo.width
        focuserBox.height = elemInfo.height
        focuserBox.top = elemInfo.top
        focuserBox.left = elemInfo.left

        // set the style on the focuser
        focuserElem.style.width = (elemInfo.width + (focuserElemPadding * 2)) + 'px'
        focuserElem.style.height = (elemInfo.height + (focuserElemPadding * 2)) + 'px'
        focuserElem.style.top = (elemInfo.top + window.pageYOffset - focuserElemPadding) + 'px'
        focuserElem.style.left = (elemInfo.left + window.pageXOffset - focuserElemPadding) + 'px'
      }

      window.requestAnimationFrame(updateFocuser)
    }
  }

  /*
    --------------------
    Events
    --------------------
  */

  const startFocuser = function (event) {
    isFocused = true
    currentElem = event.target

    focuserElem.classList.add('-focus')

    updateFocuser()
  }

  const stopFocuser = function () {
    isFocused = false
    currentElem = null

    focuserElem.classList.remove('-focus')
  }

  const addListeners = function () {
    document.body.addEventListener('focusin', startFocuser)
    document.body.addEventListener('focusout', stopFocuser)
  }

  /*
    --------------------
    Init
    --------------------
  */

  createFocuser()
  addListeners()
  updateFocuser()
}())

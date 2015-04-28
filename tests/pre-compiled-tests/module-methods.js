  /**
   * ---------------------------------------------
   * Public Method (getID)
   * ---------------------------------------------
   * @desc A shortcut for getElementById.
   * @param {string} title - The name of the id of the element to select.
   * @return {HTMLElement} A reference to element with the given id.
   */
  function getID(title) {
    return document.getElementById(title);
  }

  /**
   * ---------------------------------------------------
   * Public Method (hasOwnProp)
   * ---------------------------------------------------
   * @desc A shortcut for the Object.prototype.hasOwnProperty method.
   * @param {!object|function} obj - The object to check.
   * @param {string} prop - The property to check.
   * @return {boolean} The result of the check.
   */
  function hasOwnProp(obj, prop) {

    /** @type {string} */
    var errorMessage;

    if (!obj || (typeof obj !== 'object' && typeof obj !== 'function')) {
      errorMessage = 'A hasOwnProp call received an invalid obj parameter.';
      throw new TypeError(errorMessage);
      return;
    }

    if (!prop || typeof prop !== 'string') {
      errorMessage = 'A hasOwnProp call received an invalid prop parameter.';
      throw new TypeError(errorMessage);
      return;
    }

    return obj.hasOwnProperty(prop);
  }

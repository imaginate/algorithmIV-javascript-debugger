  /**
   * -----------------------------------------------------
   * Public Variable (debugInstances)
   * -----------------------------------------------------
   * @desc Saves a reference to all of the created Debug instances.
   * @type {!Object<string, !Debug>}
   */
  var debugInstances = {};

  /**
   * ----------------------------------------------- 
   * Public Variable (errorBreakpoints)
   * -----------------------------------------------
   * @desc Controls whether debugger breakpoints are included with error logs.
   * @type {boolean}
   */
  var errorBreakpoints = true;

  /**
   * ----------------------------------------------- 
   * Public Variable (formatElementsAsObj)
   * -----------------------------------------------
   * @desc Controls whether logged DOM elements are shown as expandable
   *   objects or elements.
   * @type {boolean}
   */
  var formatElementsAsObj = true;

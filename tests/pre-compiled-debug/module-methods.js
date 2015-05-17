  /**
   * -----------------------------------------------------
   * Public Method (makeNewDebugInst)
   * -----------------------------------------------------
   * @desc Creates a new Debug object instance. For more details about the
   *   parameters [see debugModuleAPI.init]{@link debugModuleAPI#init}.
   * @param {string} classTitle
   * @param {Object} settings
   * @param {(string|!strings)=} settings.turnOffMethods
   * @param {(string|!strings)=} settings.addBreakpoints
   * @param {boolean=} settings.turnOnGroups
   * @param {boolean=} settings.openGroups
   * @param {boolean=} settings.turnOnProfiles
   * @param {boolean=} settings.turnOnTimers
   */
  function makeNewDebugInst(classTitle, settings) {

    /** @type {!Object} */
    var defaultTypes;
    /** @type {!Object} */
    var newSettings;
    /** @type {!Object} */
    var defaults;
    /** @type {string} */
    var propName;
    /** @type {*} */
    var propVal;

    newSettings = {};
    defaults = Debug.defaultSettings;

    // Set the new instance's settings to the defaults
    for (propName in defaults) {
      if ( hasOwnProp(defaults, propName) ) {
        newSettings[ propName ] = defaults[ propName ];
      }
    }

    // Update the new instance's settings with any local settings
    if (settings) {
      defaultTypes = Debug.DEFAULT_TYPES;
      for (propName in settings) {
        if (hasOwnProp(settings, propName) && hasOwnProp(defaults, propName)) {
          propVal = settings[ propName ];
          if ( checkType(propVal, defaultTypes[ propName ]) ) {
            if ( checkType(propVal, '!strings') ) {
              propVal = propVal.join(' ');
            }
            newSettings[ propName ] = propVal;
          }
        }
      }
    }

    // Update the new instance's class title
    newSettings.classTitle = classTitle;

    // Setup and save the new Debug instance
    debugInstances[ classTitle ] = new Debug(newSettings);
  };

  /**
   * -----------------------------------------------------
   * Public Method (insertErrorBreakpoint)
   * -----------------------------------------------------
   * @desc Handles whether a debugger breakpoint is inserted for an error.
   * @return {boolean} Whether a breakpoint was inserted.
   */
  function insertErrorBreakpoint() {

    if (errorBreakpoints) {
      debugger;
    }

    return errorBreakpoints;
  };

  /**
   * ---------------------------------------------------
   * Public Method (freezeObj)
   * ---------------------------------------------------
   * @desc A shortcut for the Object.freeze method with a deep freeze option.
   * @param {!(Object|function)} obj - The object to freeze.
   * @param {boolean=} deep - Deep freeze the object. The default is false.
   * @return {!(Object|function)} The frozen object.
   */
  var freezeObj = aIV.utils.freezeObj;

  /**
   * ---------------------------------------------------
   * Public Method (hasOwnProp)
   * ---------------------------------------------------
   * @desc A shortcut for the Object.prototype.hasOwnProperty method.
   * @param {!(Object|function)} obj - The object to check.
   * @param {string} prop - The property to check.
   * @return {boolean} The result of the check.
   */
  var hasOwnProp = aIV.utils.hasOwnProp;

  /**
   * ---------------------------------------------------
   * Public Method (checkType)
   * ---------------------------------------------------
   * @desc Checks a value's data type against the given optional types.
   * @param {*} val - The value to be evaluated.
   * @param {string} type - A string of the data types to evaluate the value
   *   against. For a complete list of acceptable strings
   *   [see aIV.utils.checkType]{@link https://github.com/imaginate/algorithmIV-javascript-shortcuts/blob/master/src/pre-compiled-parts/js-methods/checkType.js}.
   * @param {boolean=} noTypeValCheck - If true skips the data type string checks.
   *   The default is false. Use to avoid duplicating checks.
   * @return {boolean} The evaluation result.
   */
  var checkType = aIV.utils.checkType;

  /**
   * ---------------------------------------------------
   * Public Method (isValidTypeString)
   * ---------------------------------------------------
   * @desc Evaluates whether a string is a valid data type string.
   * @param {string} type - The string to evaluate.
   * @return {boolean} The evaluation result.
   */
  var isValidTypeString = aIV.utils.isValidTypeString;

  /**
   * ---------------------------------------------------
   * Public Method (getTypeOf)
   * ---------------------------------------------------
   * @desc A shortcut for the native typeof operator that additionally
   *   distinguishes null, array, document, and element types from an
   *   object type.
   * @param {*} val - The value to get the typeof.
   * @return {string} The value's type.
   */
  var getTypeOf = aIV.utils.getTypeOf;

  /**
   * ---------------------------------------------------
   * Public Method (freezeObj)
   * ---------------------------------------------------
   * @desc A shortcut for the Object.freeze method.
   * @param {!object|function} obj - The object to freeze.
   * @param {boolean=} deep - Deep freeze the object. The default is false.
   * @return {!object|function} The frozen object.
   */
  var freezeObj = (function setupFreezeObj() {

    /**
     * -------------------------------------------------
     * Private Method (deepFreeze)
     * -------------------------------------------------
     * @desc A helper to freezeObj that recursively freezes all of its
     *   properties.
     * @param {!object|function} obj - The object to freeze.
     */
    var deepFreeze = function(obj) {

      /** @type {string} */
      var prop;

      Object.freeze(obj);

      for (prop in obj) {
        if (hasOwnProp(obj, prop) && checkType(obj[ prop ], '!object|function')) {
          deepFreeze(obj[ prop ]);
        }
      }
    };

    return function freezeObj(obj, deep) {

      /** @type {string} */
      var errorMessage;

      if ( !checkType(obj, '!object|function') ) {
        errorMessage = 'A freezeObj call received an invalid obj parameter.';
        throw new TypeError(errorMessage);
        return;
      }

      if ( !checkType(deep, 'boolean') ) {
        deep = false;
      }

      if (deep) {
        deepFreeze(obj);
      }
      else {
        Object.freeze(obj);
      }

      return obj;
    };
  })();

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

    if ( !checkType(obj, '!object|function') ) {
      errorMessage = 'A hasOwnProp call received an invalid obj parameter.';
      throw new TypeError(errorMessage);
      return false;
    }

    if ( !checkType(prop, 'string') ) {
      errorMessage = 'A hasOwnProp call received an invalid prop parameter.';
      throw new TypeError(errorMessage);
      return false;
    }

    return obj.hasOwnProperty(prop);
  }

  /**
   * ---------------------------------------------------
   * Public Method (getSubstituteString)
   * ---------------------------------------------------
   * @desc Gets the correct substitution string for the given value.
   * @param {val} val - The value to be evaluated.
   * @return {string} The correct substitution string.
   */
  function getSubstituteString(val) {

    /** @type {string} */
    var str;

    str = '%s';

    if ( checkType(val, '!number|object|function') ) {
      str = ( ( checkType(val, 'number') ) ?
        '%i' : (!formatElementsAsObj && val instanceof HTMLElement) ?
          '%o' : '%O'
      );
    }

    return str;
  }

  /**
   * ---------------------------------------------------
   * Public Method (makeSubstituteStrings)
   * ---------------------------------------------------
   * @desc Creates a string of the correct matching substitution strings
   *   for a console log message.
   * @param {vals} vals - The values to match.
   * @return {string} The substitution strings.
   */
  function makeSubstituteStrings(vals) {

    /** @type {number} */
    var i;
    /** @type {number} */
    var len;
    /** @type {string} */
    var message;

    message = '';

    len = vals.length;
    i = -1;
    while (++i < len) {
      if (i) {
        message += ', ';
      }
      message += getSubstituteString(vals[i]);
    }

    return message;
  }

  /**
   * ---------------------------------------------------
   * Public Method (insertSubstituteStrings)
   * ---------------------------------------------------
   * @desc Inserts the correct substitution strings into a console message.
   * @param {string} msg - The original console message string.
   * @param {vals} vals - The values to use for finding the
   *   substitution strings.
   * @return {string} The prepared console message.
   */
  function insertSubstituteStrings(msg, vals) {

    /** @type {string} */
    var errorMsg;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;
    /** @type {string} */
    var substituteString;

    // Test the given arguments before executing
    if (!checkType(msg, 'string') || !checkType(vals, '!array')) {
      errorMsg = 'An aIV.debug insertSubstituteStrings method was given a ';
      errorMsg += 'param that was an incorrect data type. The console message ';
      errorMsg += 'should be a string and the values should be an array of any ';
      errorMsg += 'data type. The given data types for the params follow: ';
      errorMsg += 'msg= ' + ( (msg === null) ? 'null' : typeof msg ) + ', ';
      errorMsg += 'vals= ' + ( (vals === null) ? 'null' : typeof vals );
      console.error(errorMsg);
      insertErrorBreakpoint();
      return errorMsg;
    }

    // Insert the substitution strings
    len = vals.length;
    i = -1;
    while (++i < len) {

      substituteString = getSubstituteString(vals[i]);

      if ( RegExps.dualDollarSigns.test(msg) ) {
        substituteString = '$1' + substituteString;
        msg = msg.replace(RegExps.dualDollarSigns, substituteString);
      }
      else {
        msg += ' unnamedVar' + i + '= ' + substituteString + ';';
      }
    }

    return msg;
  }

  /**
   * ---------------------------------------------------
   * Public Method (checkType)
   * ---------------------------------------------------
   * @param {val} val - The value to be evaluated.
   * @param {string} type - The type to evaluate the value against. The optional
   *   types are 'string', 'number', 'boolean', 'object', 'function', 'elem',
   *   'undefined', 'array', 'strings', 'numbers', 'booleans', 'objects',
   *   'functions', 'arrays', 'elems', 'stringMap', 'numberMap', 'booleanMap',
   *   'objectMap', 'functionMap', 'arrayMap', and 'elemMap'. Use '|' as the
   *   separator for multiple types (e.g.'strings|numbers'). Use '=' to indicate
   *   the value is optional (e.g. 'array=' or 'string|number='). Use '!' to
   *   indicate that null is not a possibility (e.g. '!string').
   * @return {boolean} The evaluation result.
   */
  function checkType(val, type) {

    // Test the given arguments before executing
    var msg;
    if (typeof type !== 'string') {
      msg = 'A checkType method\'s type was the wrong data type. ';
      msg += 'It should be a string. The given type was a(n) %s.';
      console.error(msg, (typeof type));
      insertErrorBreakpoint();
      return false;
    }

    /**
     * @type {strings}
     * @private
     */
    var types;

    type = type.toLowerCase().replace(/[^a-z\|\=\!]/g, '');

    types = ( /\|/.test(type) ) ? type.split('|') : [ type ];

    return types.some(function(/** string */ type) {
      /**
       * @type {string}
       * @private
       */
      var cleanType;

      cleanType = type.replace(/\!|\=/g, '');

      // Ensure a correct type was given
      if ( !RegExps.allDataTypes.test(cleanType) ) {
        msg = 'A checkType method\'s type was the wrong value. ';
        msg += 'See the docs for acceptable values. ';
        msg += 'The incorrect value was \'%s\'.';
        console.error(msg, type);
        insertErrorBreakpoint();
        return false;
      }

      // Handle undefined val
      if (val === undefined) {
        type = type.replace(/\!/g, '');
        return /\=|^undefined$/.test(type);
      }
      else {

        // Evaluate null
        if (val === null) {
          return !(/\!/.test(type));
        }

        if (cleanType === 'undefined') {
          return false;
        }

        // Evaluate array types
        if ( RegExps.arrayDataTypes.test(cleanType) ) {

          if ( !Array.isArray(val) ) {
            return false;
          }

          // Evaluate a basic array
          if (cleanType === 'array') {
            return true;
          }

          // Evaluate an array of arrays
          if (cleanType === 'arrays') {
            return val.every(function(subVal) {
              return ( Array.isArray(subVal) );
            });
          }

          // Evaluate an array of elements
          if (cleanType === 'elems') {
            return val.every(function(subVal) {
              return (subVal instanceof HTMLElement);
            });
          }

          // Evaluate each value of the array
          cleanType = cleanType.replace(/s$/, '');
          return val.every(function(subVal) {
            return (typeof subVal === cleanType);
          });
        }

        // Evaluate element
        if (cleanType === 'elem') {
          return (val instanceof HTMLElement);
        }

        // Evaluate string, number, boolean, object, and function types
        if ( RegExps.basicDataTypes.test(cleanType) ) {
          return (typeof val === cleanType);
        }

        // Evaluate hash map types
        if ( RegExps.mapDataTypes.test(cleanType) ) {

          if (typeof val !== 'object') {
            return false;
          }

          // Evaluate a hash map of arrays
          if (cleanType === 'arraymap') {
            return Object.keys(val).every(function(subVal) {
              return ( Array.isArray(val[ subVal ]) );
            });
          }

          // Evaluate a hash map of elements
          if (cleanType === 'elemmap') {
            return Object.keys(val).every(function(subVal) {
              return (val[ subVal ] instanceof HTMLElement);
            });
          }

          // Evaluate each value of the hash map
          cleanType = cleanType.replace(/map$/, '');
          return Object.keys(val).every(function(subVal) {
            return (typeof val[ subVal ] === cleanType);
          });
        }
      }

      return false;
    });
  }

  /**
   * ---------------------------------------------------
   * Public Method (checkTypeStrings)
   * ---------------------------------------------------
   * @desc Evaluates argument data type strings.
   * @param {!vals} args - The arguments to be evaluated.
   * @return {boolean} The evaluation result.
   */
  function checkTypeStrings(args) {

    /** @type {number} */
    var i;
    /** @type {boolean} */
    var pass;

    pass = true;

    i = args.length;
    while (i--) {

      if (i % 2) {
        pass = checkType(args[i], 'string');
      }

      if (!pass) {
        break;
      }
    }

    return pass;
  }

  /**
   * ---------------------------------------------------
   * Public Method (testArgTypes)
   * ---------------------------------------------------
   * @desc Evaluates argument data types.
   * @param {!vals} args - The arguments to be evaluated.
   * @return {boolean} The evaluation result.
   */
  function testArgTypes(args) {

    /** @type {number} */
    var i;
    /** @type {boolean} */
    var pass;
    /** @type {val} */
    var arg;
    /** @type {string} */
    var dataTypeOpts;

    pass = true;

    i = args.length;
    while (i--) {

      dataTypeOpts = args[i];

      --i;
      arg = args[i];

      pass = checkType(arg, dataTypeOpts);

      if (!pass) {
        break;
      }
    }

    return pass;
  }

  /**
   * ---------------------------------------------------
   * Public Method (stripArgTypeStrings)
   * ---------------------------------------------------
   * @desc Removes the data type strings from an array of arguments.
   * @param {!vals} args - The arguments.
   * @return {!vals} An array of the stripped arguments.
   */
  function stripArgTypeStrings(args) {

    /** @type {number} */
    var i;
    /** @type {number} */
    var ii;
    /** @type {number} */
    var len;
    /** @type {!vals} */
    var newArgs;

    len = args.length / 2;
    newArgs = new Array(len);

    i = args.length;
    ii = len;
    while (ii--) {
      i = i - 2;
      newArgs[ii] = args[i];
    }

    return newArgs;
  }

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

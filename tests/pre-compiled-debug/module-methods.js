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
      if (errorBreakpoints) {
        debugger;
      }
      return errorMsg;
    }

    // Insert the substitution strings
    len = vals.length;
    i = -1;
    while (++i < len) {

      substituteString = getSubstituteString(vals[i]);

      if ( regexps.dualDollarSigns.test(msg) ) {
        substituteString = '$1' + substituteString;
        msg = msg.replace(regexps.dualDollarSigns, substituteString);
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
      if (errorBreakpoints) {
        debugger;
      }
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
      if ( !regexps.types.all.test(cleanType) ) {
        msg = 'A checkType method\'s type was the wrong value. ';
        msg += 'See the docs for acceptable values. ';
        msg += 'The incorrect value was \'%s\'.';
        console.error(msg, type);
        if (errorBreakpoints) {
          debugger;
        }
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
        if ( regexps.types.arrays.test(cleanType) ) {

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
        if ( regexps.types.basic.test(cleanType) ) {
          return (typeof val === cleanType);
        }

        // Evaluate hash map types
        if ( regexps.types.maps.test(cleanType) ) {

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

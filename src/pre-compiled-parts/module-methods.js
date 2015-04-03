  /**
   * ---------------------------------------------------
   * Public Method (getSubstituteString)
   * ---------------------------------------------------
   * @desc Gets the correct substitution string for the given value.
   * @param {val} val - The value to be evaluated.
   * @return {string} The correct substitution string.
   */
  function getSubstituteString(val) {

    if (typeof val === 'object') {
      return '%O';
    }

    if (typeof val === 'number') {
      return '%i';
    }

    return '%s';
  };

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

    // Test the given arguments before executing
    if (typeof msg !== 'string' || !Array.isArray(vals)) {
      console.error('An insertSubstituteStrings method\'s arg(s) was wrong.');
      debugger;
      return '';
    }

    // Insert the substitution strings
    vals.forEach(function(/** val */ val, /** number */ i) {
      /**
       * @type {string}
       * @private
       */
      var sub;

      sub = getSubstituteString(val);
      if ( /(\$\$)/.test(msg) ) {
        msg = msg.replace(/(\$\$)/, sub);
      }
      else {
        msg += ' var' + i + '= ' + sub + ';';
      }
    });

    return msg;
  };

  /**
   * ---------------------------------------------------
   * Public Method (checkType)
   * ---------------------------------------------------
   * @param {val} val - The value to be evaluated.
   * @param {string} type - The type to evaluate the value against.
   *   The optional types are 'string', 'number', 'boolean', 'object',
   *   'elem', 'undefined', 'array', 'strings', 'numbers', 'booleans',
   *   'objects', and 'elems'. Use '|' as the separator for multiple
   *    types (e.g.'strings|numbers'). Use '=' to indicate the value
   *   is optional (e.g. 'array=' or 'string|number='). Use '!' to
   *   indicate that null is not a possibility (e.g. '!string').
   * @return {boolean} The evaluation result.
   */
  function checkType(val, type) {

    // Test the given arguments before executing
    var msg;
    if (typeof type !== 'string') {
      msg = 'A checkType method\'s type was the wrong operand. ';
      msg += 'It should be a string. The given type was a(n) %s.';
      console.error(msg, (typeof type));
      debugger;
      return false;
    }

    /**
     * @type {RegExp}
     * @private
     */
    var arrays;
    /**
     * @type {RegExp}
     * @private
     */
    var simple;
    /**
     * @type {RegExp}
     * @private
     */
    var allTypes;
    /**
     * @type {strings}
     * @private
     */
    var types;

    arrays = /^array$|^strings$|^numbers$|^booleans$|^objects$|^elems$/;
    simple = /^string$|^number$|^boolean$|^object$/;
    allTypes = '^elem$|^undefined$|' + simple.source + '|' + arrays.source;
    allTypes = new RegExp(allTypes);

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
      if ( !allTypes.test(cleanType) ) {
        msg = 'A checkType method\'s type was the wrong value. ';
        msg += 'See the docs for acceptable values. ';
        msg += 'The incorrect value was \'%s\'.';
        console.error(msg, type);
        debugger;
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
        if ( arrays.test(cleanType) ) {

          if ( !Array.isArray(val) ) {
            return false;
          }

          if (cleanType === 'array') {
            return true;
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

        // Evaluate string, number, boolean, and object types
        if ( simple.test(cleanType) ) {
          return (typeof val === cleanType);
        }
      }

      return false;
    });
  };
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
        '%i' : (!Debug.formatElementsAsObj && val instanceof HTMLElement) ?
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
   * @desc Inserts the correct substitution strings into a log message.
   * @param {string} msg - The original console message string.
   * @param {vals} vals - The values to use for finding the
   *   substitution strings.
   * @return {string} The prepared console message.
   */
  var insertSubstituteStrings = (function() {

    /** @type {!RegExp} */
    var dualDollarSigns;

    dualDollarSigns = /([^\\]*?)\$\$/;

    return function insertSubstituteStrings(msg, vals) {

      /** @type {number} */
      var len;
      /** @type {number} */
      var i;
      /** @type {string} */
      var substituteString;

      // Insert the substitution strings
      len = vals.length;
      i = -1;
      while (++i < len) {

        substituteString = getSubstituteString(vals[i]);

        if ( dualDollarSigns.test(msg) ) {
          substituteString = '$1' + substituteString;
          msg = msg.replace(dualDollarSigns, substituteString);
        }
        else {
          msg += ' unnamedVar' + i + '= ' + substituteString + ';';
        }
      }

      return msg;
    };
  })();

  /**
   * ---------------------------------------------------
   * Public Method (checkArgsDataTypeStrings)
   * ---------------------------------------------------
   * @desc Evaluates whether the arguments contain valid data type string
   *   values for each argument.
   * @param {!vals} args - The arguments to be evaluated.
   * @return {boolean} The evaluation result.
   */
  function checkArgsDataTypeStrings(args) {

    /** @type {number} */
    var i;
    /** @type {boolean} */
    var pass;

    pass = true;

    i = args.length;
    while (i--) {

      if (i % 2) {
        pass = checkType(args[i], 'string', true);
        pass = pass && checkDataTypeString(args[i]);
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

      pass = checkType(arg, dataTypeOpts, true);

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

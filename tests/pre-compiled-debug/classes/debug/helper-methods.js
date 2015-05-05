  /**
   * -----------------------------------------------------
   * Public Method (Debug.insertBreakpoint)
   * -----------------------------------------------------
   * @desc Handles whether a debugger breakpoint is inserted for every
   *   logging method.
   * @this {!Debug}
   * @param {string} method - The name of the method to insert for.
   * @return {boolean} Whether a breakpoint was inserted.
   */
  Debug.insertBreakpoint = (function() {

    /** @type {!RegExp} */
    var space;

    space = /\s/;

    return function insertBreakpoint(method) {

      /** @type {number} */
      var i;
      /** @type {boolean} */
      var pass;
      /** @type {strings} */
      var methods;

      methods = ( ( space.test(method) ) ?
        method.split(' ') : [ method ]
      );
      pass = false;

      i = methods.length;
      while (i--) {
        method = methods[i];
        pass = this.getBreakpoint(method);
        if (pass) {
          debugger;
          break;
        }
      }

      return pass;
    };
  })();

  /**
   * -----------------------------------------------------
   * Public Method (Debug.handleAuto)
   * -----------------------------------------------------
   * @desc Handles the automated actions for a logging method.
   * @this {!Debug}
   * @param {string} type - The type of automation to handle.
   * @param {string} methodName - The name of the user's method to log.
   * @param {boolean=} end - Controls whether the automation should start
   *   or end. The default value is false.
   * @return {boolean} The automation's success (i.e. whether an action
   *   was made).
   */
  Debug.handleAuto = function(type, methodName, end) {

    /** @type {string} */
    var label;

    if ( !this.getAuto(type) ) {
      return false;
    }

    if ( !checkType(end, 'boolean') ) {
      end = false;
    }

    label = Debug.autoSettings[ type ].msgTitle + ': ';
    label += this.classTitle + methodName;

    if (end) {
      Debug.autoSettings[ type ].endFunc(label);
    }
    else {
      Debug.autoSettings[ type ].startFunc(label);
    }

    return true;
  };

  /**
   * -----------------------------------------------------
   * Public Method (Debug.handleToggle)
   * -----------------------------------------------------
   * @desc Handles the turn on/off actions for a Debug controlling method.
   * @param {string} callerName - The name of the caller method.
   * @param {function} setter - The setter to use.
   * @param {string} type - The type or method name to toggle.
   * @return {boolean} The toggle's success (i.e. whether an action was made).
   */
  Debug.handleToggle = function(callerName, setter, type) {

    /** @type {!strings} */
    var args;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;
    /** @type {!(string|strings)} */
    var errors;

    // Setup the arguments
    args = ( ( checkType(type, '!strings') ) ?
      type.slice(0) : (arguments.length > 1) ?
        Array.prototype.slice.call(arguments, 0) : [ type ]
    );

    // Ensure valid arguments are supplied
    if ( !checkType(args, '!strings') ) {
      console.error( ErrorMessages.invalidSetName(callerName, type) );
      insertErrorBreakpoint();
      return;
    }

    // Split strings with multiple methods
    type = args.join(' ');
    args = type.split(' ');

    // Turn on the methods & save any errors
    len = args.length;
    i = -1;
    while (++i < len) {
      if ( !setter(args[i]) ) {
        if (!errors) {
          errors = [];
        }
        errors.push("'" + args[i] + "'");
      }
    }
    if (errors) {
      errors = errors.join(', ');
    }

    // Report any errors
    if (errors) {
      console.error( ErrorMessages.invalidSetName(callerName, errors) );
      insertErrorBreakpoint();
      return;
    }

    return true;
  };

  /**
   * ---------------------------------------------------
   * Public Method (Debug.getSubstituteString)
   * ---------------------------------------------------
   * @desc Gets the correct substitution string for the given value.
   * @param {val} val - The value to be evaluated.
   * @return {string} The correct substitution string.
   */
  Debug.getSubstituteString = function(val) {

    /** @type {string} */
    var str;

    str = ( (!checkType(val, '!object|function')) ?
      '%s' : (!Debug.formatElementsAsObj && val instanceof HTMLElement) ?
        '%o' : '%O'
    );

    return str;
  };

  /**
   * ---------------------------------------------------
   * Public Method (Debug.makeSubstituteStrings)
   * ---------------------------------------------------
   * @desc Creates a string of the correct matching substitution strings
   *   for a console log message.
   * @param {vals} vals - The values to match.
   * @return {string} The substitution strings.
   */
  Debug.makeSubstituteStrings = function(vals) {

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
      message += Debug.getSubstituteString(vals[i]);
    }

    return message;
  };

  /**
   * ---------------------------------------------------
   * Public Method (Debug.insertSubstituteStrings)
   * ---------------------------------------------------
   * @desc Inserts the correct substitution strings into a log message.
   * @param {string} msg - The original console message string.
   * @param {vals} vals - The values to use for finding the
   *   substitution strings.
   * @return {string} The prepared console message.
   */
  Debug.insertSubstituteStrings = (function() {

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

        substituteString = Debug.getSubstituteString(vals[i]);

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
   * Public Method (Debug.checkArgsDataTypeStrings)
   * ---------------------------------------------------
   * @desc Evaluates whether the arguments contain valid data type string
   *   values for each argument.
   * @param {!vals} args - The arguments to be evaluated.
   * @return {boolean} The evaluation result.
   */
  Debug.checkArgsDataTypeStrings = function(args) {

    /** @type {number} */
    var i;
    /** @type {boolean} */
    var pass;

    pass = true;

    i = args.length;
    while (i--) {

      if (i % 2) {
        pass = checkType(args[i], 'string', true);
        pass = pass && isValidTypeString(args[i]);
      }

      if (!pass) {
        break;
      }
    }

    return pass;
  };

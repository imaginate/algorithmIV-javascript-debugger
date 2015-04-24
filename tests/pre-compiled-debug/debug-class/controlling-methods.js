  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.turnOnMethod)
   * -----------------------------------------------------
   * @desc Used to enable any methods that are disabled.
   * @param {...!(string|strings)} method - The method to enable.
   *   If 'all' is provided then all methods are enabled.
   * @return {boolean} The update's success (if error return false).
   * @example
   *   debug.turnOnMethod('start', 'state', ...);
   *   // OR
   *   debug.turnOnMethod([ 'start', 'state', ... ]);
   */
  Debug.prototype.turnOnMethod = function(method) {

    /** @type {string} */
    var msg;
    /** @type {strings} */
    var args;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;
    /** @type {!(string|strings)} */
    var errors;

    // Setup the arguments
    args = ( ( checkType(method, '!strings') ) ?
      method.slice(0) : (arguments.length > 1) ?
        Array.prototype.slice.call(arguments, 0) : [ method ]
    );

    // Ensure valid arguments are supplied
    if ( !checkType(args, '!strings') ) {
      msg = 'An aIV.debug turnOnMethod call received invalid arguments.';
      console.error(msg);
      if (errorBreakpoints) {
        debugger;
      }
      return false;
    }

    // Split strings with multiple methods
    method = args.join(' ');
    args = method.split(' ');

    // Turn on the methods & save any errors
    len = args.length;
    i = -1;
    while (++i < len) {
      if ( !this.setMethod(args[i], true) ) {
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
      msg = 'An aIV.debug turnOnMethod call was given invalid method ';
      msg += 'names to turn on. The incorrect name(s) follow:' + errors;
      console.error(msg);
      if (errorBreakpoints) {
        debugger;
      }
      return false;
    }

    return true;
  };

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.turnOn)
   * -----------------------------------------------------
   * @desc The same as {@link Debug.prototype.turnOnMethod}.
   * @type {function( ...!(string|strings) ): boolean}
   */
  Debug.prototype.turnOn = Debug.prototype.turnOnMethod;

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.turnOffMethod)
   * -----------------------------------------------------
   * @desc Used to disable any methods that are enabled.
   * @param {...!(string|strings)} method - The method to disable.
   *   If 'all' is provided then all methods are disabled.
   * @return {boolean} The update's success (if error return false).
   * @example
   *   debug.turnOffMethod('args', 'fail', ...);
   *   // OR
   *   debug.turnOffMethod([ 'args', 'fail', ... ]);
   */
  Debug.prototype.turnOffMethod = function(method) {

    /** @type {string} */
    var msg;
    /** @type {strings} */
    var args;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;
    /** @type {!(string|strings)} */
    var errors;

    // Setup the arguments
    args = ( ( checkType(method, '!strings') ) ?
      method.slice(0) : (arguments.length > 1) ?
        Array.prototype.slice.call(arguments, 0) : [ method ]
    );

    // Ensure valid arguments are supplied
    if ( !checkType(args, '!strings') ) {
      msg = 'An aIV.debug turnOffMethod call received invalid arguments.';
      console.error(msg);
      if (errorBreakpoints) {
        debugger;
      }
      return false;
    }

    // Split strings with multiple methods
    method = args.join(' ');
    args = method.split(' ');

    // Turn off the methods & save any errors
    len = args.length;
    i = -1;
    while (++i < len) {
      if ( !this.setMethod(args[i], false) ) {
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
      msg = 'An aIV.debug turnOffMethod call was given invalid method ';
      msg += 'names to turn off. The incorrect name(s) follow:' + errors;
      console.error(msg);
      if (errorBreakpoints) {
        debugger;
      }
      return false;
    }

    return true;
  };

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.turnOff)
   * -----------------------------------------------------
   * @desc The same as {@link Debug.prototype.turnOffMethod}.
   * @type {function( ...!(string|strings) ): boolean}
   */
  Debug.prototype.turnOff = Debug.prototype.turnOffMethod;

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.turnOnDebugger)
   * -----------------------------------------------------
   * @desc Use to enable debugger instances in a debug method.
   * @param {...(string|strings)} logCat - The log category(ies)'s debuggers to show.
   *   If 'all' is provided then all debugger instances will be enabled.
   * @example
   *   debug.turnOnDebugger('args', 'fail', ...);
   *   // OR
   *   debug.turnOnDebugger([ 'args', 'fail', ... ]);
   */
  Debug.prototype.turnOnDebugger = function(logCat) {

    /**
     * @type {?strings}
     * @private
     */
    var args;
    /**
     * @type {number}
     * @private
     */
    var len;
    /**
     * @type {number}
     * @private
     */
    var i;
    /**
     * @type {(string|strings)}
     * @private
     */
    var errors;

    // Ensure arguments are supplied
    if (!logCat) {
      console.error('A debug.turnOnDebugger method received no args.');
      if (errorBreakpoints) {
        debugger;
      }
      return false;
    }

    // Setup the variables
    args = ( (checkType(logCat, 'strings') && logCat.length > 1) ?
      logCat.slice(0) : (arguments.length > 1) ?
        Array.prototype.slice.call(arguments, 0) : null
    );
    logCat = ( (args) ?
      null : (typeof logCat === 'string') ?
        logCat : ( checkType(logCat, 'strings') ) ?
          logCat[0] : null
    );

    // Make sure a value still exists to test
    if (!logCat && (!args || !checkType(args, 'strings'))) {
      errors = 'A debug.turnOnDebugger method\'s arg(s) was ';
      errors += 'the wrong data type.';
      console.error(errors);
      if (errorBreakpoints) {
        debugger;
      }
      return false;
    }

    // Check for string with multiple categories
    if (logCat && /\s/.test(logCat)) {
      args = logCat.split(' ');
      logCat = null;
    }

    // Turn on the debuggers & save any errors
    if (args) {
      len = args.length;
      i = -1;
      while (++i < len) {
        if ( !this.setBreakpoint(args[i], true) ) {
          if (!errors) {
            errors = [];
          }
          errors.push("'" + args[i] + "'");
        }
      }
      if (errors) {
        errors = errors.join(', ');
      }
    }
    else {
      if ( !this.setBreakpoint(logCat, true) ) {
        errors = "'" + logCat + "'";
      }
    }

    // Report any errors
    if (errors) {
      errors = '' +
        'A debug.turnOnDebugger method was given an invalid debug ' +
        'category to turn on. The incorrect value(s) follow:' + errors;
      console.error(errors);
      if (errorBreakpoints) {
        debugger;
      }
      return false;
    }

    return true;
  };

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.turnOffDebugger)
   * -----------------------------------------------------
   * @desc Use to disable debugger instances in a debug method.
   * @param {...(string|strings)} logCat - The log category(ies)'s debuggers to hide.
   *   If 'all' is provided then all debugger instances will be disabled.
   * @example
   *   debug.turnOffDebugger('args', 'fail', ...);
   *   // OR
   *   debug.turnOffDebugger([ 'args', 'fail', ... ]);
   */
  Debug.prototype.turnOffDebugger = function(logCat) {

    /**
     * @type {?strings}
     * @private
     */
    var args;
    /**
     * @type {number}
     * @private
     */
    var len;
    /**
     * @type {number}
     * @private
     */
    var i;
    /**
     * @type {(string|strings)}
     * @private
     */
    var errors;

    // Ensure arguments are supplied
    if (!logCat) {
      console.error('A debug.turnOffDebugger method received no args.');
      if (errorBreakpoints) {
        debugger;
      }
      return false;
    }

    // Setup the variables
    args = ( (checkType(logCat, 'strings') && logCat.length > 1) ?
      logCat.slice(0) : (arguments.length > 1) ?
        Array.prototype.slice.call(arguments, 0) : null
    );
    logCat = ( (args) ?
      null : (typeof logCat === 'string') ?
        logCat : ( checkType(logCat, 'strings') ) ?
          logCat[0] : null
    );

    // Make sure a value still exists to test
    if (!logCat && (!args || !checkType(args, 'strings'))) {
      errors = 'A debug.turnOffDebugger method\'s arg(s) was ';
      errors += 'the wrong data type.';
      console.error(errors);
      if (errorBreakpoints) {
        debugger;
      }
      return false;
    }

    // Check for string with multiple categories
    if (logCat && /\s/.test(logCat)) {
      args = logCat.split(' ');
      logCat = null;
    }

    // Turn off the debuggers & save any errors
    if (args) {
      len = args.length;
      i = -1;
      while (++i < len) {
        if ( !this.setBreakpoint(args[i], false) ) {
          if (!errors) {
            errors = [];
          }
          errors.push("'" + args[i] + "'");
        }
      }
      if (errors) {
        errors = errors.join(', ');
      }
    }
    else {
      if ( !this.setBreakpoint(logCat, false) ) {
        errors = "'" + logCat + "'";
      }
    }

    // Report any errors
    if (errors) {
      errors = '' +
        'A debug.turnOffDebugger method was given an invalid debug ' +
        'category to turn off. The incorrect value(s) follow:' + errors;
      console.error(errors);
      if (errorBreakpoints) {
        debugger;
      }
      return false;
    }

    return false;
  };

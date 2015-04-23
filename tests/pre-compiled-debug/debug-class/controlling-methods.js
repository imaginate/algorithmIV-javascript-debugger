  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.turnOn)
   * -----------------------------------------------------
   * @desc Use to show a category of logs that was hidden.
   * @param {...(string|strings)} logCat - The log category(ies) to show.
   *   If 'all' is provided then all categories will be shown.
   * @example
   *   debug.turnOn('start', 'state', ...);
   *   // OR
   *   debug.turnOn([ 'start', 'state', ... ]);
   */
  Debug.prototype.turnOn = function(logCat) {

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
      console.error('A debug.turnOn method received no args.');
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
      console.error('A debug.turnOn method\'s arg(s) was the wrong data type.');
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

    // Turn on the debug method category(ies) & save any errors
    if (args) {
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
    }
    else {
      if ( !this.setMethod(logCat, true) ) {
        errors = "'" + logCat + "'";
      }
    }

    // Report any errors
    if (errors) {
      errors = '' +
        'A debug.turnOn method was given an invalid debug category ' +
        'to turn on. The incorrect value(s) follow:' + errors;
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
   * Public Method (Debug.prototype.turnOff)
   * -----------------------------------------------------
   * @desc Use to hide a category of logs from the console.
   * @param {...(string|strings)} logCat - The log category(ies) to hide.
   *   If 'all' is provided then all categories will be hidden.
   * @example
   *   debug.turnOff('args', 'fail', ...);
   *   // OR
   *   debug.turnOff([ 'args', 'fail', ... ]);
   */
  Debug.prototype.turnOff = function(logCat) {

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
      console.error('A debug.turnOff method received no args.');
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
      console.error('A debug.turnOff method\'s arg(s) was the wrong data type.');
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

    // Turn off the debug method category(ies) & save any errors
    if (args) {
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
    }
    else {
      if ( !this.setMethod(logCat, false) ) {
        errors = "'" + logCat + "'";
      }
    }

    // Report any errors
    if (errors) {
      errors = '' +
        'A debug.turnOff method was given an invalid debug category ' +
        'to turn off. The incorrect value(s) follow:' + errors;
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
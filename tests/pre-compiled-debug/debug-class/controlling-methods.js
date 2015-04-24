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
   * Public Method (Debug.prototype.addBreakpoint)
   * -----------------------------------------------------
   * @desc Used to add debugger breakpoints to methods.
   * @param {...!(string|strings)} method - The method to add to.
   *   If 'all' is provided then all methods will add breakpoints.
   * @return {boolean} The update's success (if error return false).
   * @example
   *   debug.addBreakpoint('args', 'fail', ...);
   *   // OR
   *   debug.addBreakpoint([ 'args', 'fail', ... ]);
   */
  Debug.prototype.addBreakpoint = function(method) {

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
      msg = 'An aIV.debug addBreakpoint call received invalid arguments.';
      console.error(msg);
      if (errorBreakpoints) {
        debugger;
      }
      return false;
    }

    // Split strings with multiple methods
    method = args.join(' ');
    args = method.split(' ');

    // Turn on the method breakpoints & save any errors
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

    // Report any errors
    if (errors) {
      msg = 'An aIV.debug addBreakpoint call was given invalid method ';
      msg += 'names to enable. The incorrect name(s) follow:' + errors;
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
   * Public Method (Debug.prototype.turnOnDebugger)
   * -----------------------------------------------------
   * @desc The same as {@link Debug.prototype.addBreakpoint}.
   * @type {function( ...!(string|strings) ): boolean}
   */
  Debug.prototype.turnOnDebugger = Debug.prototype.addBreakpoint;

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.removeBreakpoint)
   * -----------------------------------------------------
   * @desc Used to remove debugger breakpoints from methods.
   * @param {...!(string|strings)} method - The method to remove from.
   *   If 'all' is provided then all methods will not add breakpoints.
   * @return {boolean} The update's success (if error return false).
   * @example
   *   debug.removeBreakpoint('args', 'fail', ...);
   *   // OR
   *   debug.removeBreakpoint([ 'args', 'fail', ... ]);
   */
  Debug.prototype.removeBreakpoint = function(method) {

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
      msg = 'An aIV.debug removeBreakpoint call received invalid arguments.';
      console.error(msg);
      if (errorBreakpoints) {
        debugger;
      }
      return false;
    }

    // Split strings with multiple methods
    method = args.join(' ');
    args = method.split(' ');

    // Turn on the method breakpoints & save any errors
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

    // Report any errors
    if (errors) {
      msg = 'An aIV.debug removeBreakpoint call was given invalid method ';
      msg += 'names to remove. The incorrect name(s) follow:' + errors;
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
   * Public Method (Debug.prototype.turnOffDebugger)
   * -----------------------------------------------------
   * @desc The same as {@link Debug.prototype.removeBreakpoint}.
   * @type {function( ...!(string|strings) ): boolean}
   */
  Debug.prototype.turnOffDebugger = Debug.prototype.removeBreakpoint;

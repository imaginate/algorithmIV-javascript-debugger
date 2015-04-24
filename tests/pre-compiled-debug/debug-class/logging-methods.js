  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.start)
   * -----------------------------------------------------
   * @desc Used to log the start of a method and insert any automated actions.
   * @param {!(string|vals)} methodName - The name of the method or an array
   *   of all the parameters for this method in correct order.
   * @param {...val=} val - Each argument passed to the method in order of
   *   appearance.
   * @return {boolean} The log's success (i.e. whether a log was made).
   * @example
   *   debug.start('methodName', arg1, arg2);
   *   // OR
   *   debug.start([ 'methodName', arg1, arg2 ]);
   */
  Debug.prototype.start = function(methodName) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;
    /** @type {!vals} */
    var args;
    /** @type {string} */
    var message;

    // Setup the variables
    if ( checkType(methodName, '!string|array') ) {
      if ( checkType(methodName, 'string') ) {
        args = ( (arguments.length > 1) ?
          Array.prototype.slice.call(arguments, 1) : []
        );
      }
      else {
        args = (methodName.length > 1) ? methodName.slice(1) : [];
        methodName = methodName[0];
      }
    }

    // Test the method name before executing
    if ( !checkType(methodName, 'string') ) {
      message = 'An aIV.debug start method call was given an incorrect data ';
      message += 'type for its method name param (should be a string). The ';
      message += 'given incorrect data type for the method name follows: ';
      message += (methodName === null) ? 'null' : typeof methodName;
      console.error(message);
      if (errorBreakpoints) {
        debugger;
      }
      return false;
    }

    // Check whether this method has been turned off
    if ( !this.getMethod('start') ) {
      this.handleAuto('groups', methodName);
      this.handleAuto('profiles', methodName);
      this.handleAuto('timers', methodName);
      return false;
    }

    // Prepare the console message
    message = 'START: ' + this.classTitle + methodName + '(';
    len = args.length;
    i = -1;
    while (++i < len) {
      if (i) {
        message += ', ';
      }
      message += getSubstituteString(args[i]);
    }
    message += ')';

    // Prepare the start log arguments
    args = [ message ].concat(args);

    // Insert auto grouping
    this.handleAuto('groups', methodName);

    // Log the start message
    console.log.apply(console, args);

    // Insert a debugger breakpoint
    if ( this.getBreakpoint('start') ) {
      debugger;
    }

    // Insert auto profiling and timing
    this.handleAuto('profiles', methodName);
    this.handleAuto('timers', methodName);

    return true;
  };

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.end)
   * -----------------------------------------------------
   * @desc Used to log the end of a method and insert any automated actions.
   * @param {!(string|vals)} methodName - The name of the method or an array
   *   of all the parameters for this method in correct order.
   * @param {val=} returnVal - The return value for the method.
   * @return {boolean} The log's success (i.e. whether a log was made).
   * @example
   *   debug.end('methodName', returnVal);
   *   // OR
   *   debug.end([ 'methodName', returnVal ]);
   */
  Debug.prototype.end = function(methodName, returnVal) {

    /** @type {string} */
    var message;

    // Setup the variables
    if ( checkType(methodName, '!array') ) {
      if (methodName.length > 1) {
        returnVal = methodName[1];
      }
      methodName = methodName[0];
    }

    // Test the method name before executing
    if ( !checkType(methodName, 'string') ) {
      message = 'An aIV.debug end method call was given an incorrect data ';
      message += 'type for its method name param (should be a string). The ';
      message += 'given incorrect data type for the method name follows: ';
      message += (methodName === null) ? 'null' : typeof methodName;
      console.error(message);
      if (errorBreakpoints) {
        debugger;
      }
      return false;
    }

    // Check whether this method has been turned off
    if ( !this.getMethod('end') ) {
      this.handleAuto('groups', methodName, true);
      this.handleAuto('profiles', methodName, true);
      this.handleAuto('timers', methodName, true);
      return false;
    }

    // Prepare the console message
    message = 'END: ' + this.classTitle + methodName + '() | ';
    message += 'return= ' + getSubstituteString(returnVal);

    // Insert auto grouping
    this.handleAuto('groups', methodName, true);

    // Log the end message
    console.log(message, returnVal);

    // Insert a debugger breakpoint
    if ( this.getBreakpoint('end') ) {
      debugger;
    }

    // Insert auto profiling and timing
    this.handleAuto('profiles', methodName, true);
    this.handleAuto('timers', methodName, true);

    return true;
  };

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.args)
   * -----------------------------------------------------
   * @desc Used to catch undesired parameter/argument data types.
   * @param {!(string|vals)} methodName - The name of the method or an array
   *   with all the parameters for this method (in correct order).
   * @param {...val=} val - Each argument passed to the method.
   * @param {...string=} type -  Each passed parameter's data type. To review
   *   the input options available
   *   [see the checkType helper method]{@link checkType}.
   * @return {boolean} The log's success (i.e. whether a log was made).
   * @example
   *   debug.args('methodName', arg1, 'object', arg2, 'number');
   *   // OR
   *   debug.args([ 'methodName', arg1, 'object', arg2, 'number' ]);
   */
  Debug.prototype.args = function(methodName) {

    /** @type {!vals} */
    var args;
    /** @type {boolean} */
    var pass;
    /** @type {number} */
    var i;
    /** @type {val} */
    var arg;
    /** @type {string} */
    var dataTypeOpts;
    /** @type {string} */
    var message;

    // Setup the variables
    if ( checkType(methodName, '!string|array') ) {
      if ( checkType(methodName, 'string') ) {
        args = ( (arguments.length > 1) ?
          Array.prototype.slice.call(arguments, 1) : []
        );
      }
      else {
        args = (methodName.length > 1) ? methodName.slice(1) : [];
        methodName = methodName[0];
      }
    }

    // Test the given arguments before executing
    if ( !checkType(methodName, 'string') ) {
      message = 'An aIV.debug args method call was given an incorrect data ';
      message += 'type (should be a string) for its first parameter (the name ';
      message += 'of the user\'s method arguments being tested). The ';
      message += 'incorrect data type given for the method name follows: ';
      message += (methodName === null) ? 'null' : typeof methodName;
      console.error(message);
      if (errorBreakpoints) {
        debugger;
      }
      return false;
    }
    if (args.length < 2) {
      message = 'An aIV.debug args method call was missing arguments to test. ';
      message += 'The args method requires that at least one argument be ';
      message += 'tested. After the first parameter (the method name), the ';
      message += 'second parameter should be an argument to test, and the ';
      message += 'third parameter should be a string of the argument\'s ';
      message += 'optional data types. You can include as many pairs of ';
      message += 'arguments and optional data types as you like.';
      console.error(message);
      if (errorBreakpoints) {
        debugger;
      }
      return false;
    }
    if ( !(args.length % 2) ) {
      message = 'An aIV.debug args method call was missing optional data ';
      message += 'type strings to use for testing arguments. You should ';
      message += 'include a string of the optional data types after each ';
      message += 'argument parameter.';
      console.error(message);
      if (errorBreakpoints) {
        debugger;
      }
      return false;
    }

    // Check whether this method has been turned off
    if ( !this.getMethod('args') ) {
      return false;
    }

    // Test the arguments
    pass = true;
    i = args.length;
    while (i--) {

      dataTypeOpts = args[i];

      --i;
      arg = args[i];

      if ( !checkType(arg, dataTypeOpts) ) {
        pass = false;
        break;
      }
    }

    // If test passes end this method
    if (pass) {
      return false;
    }

    // Prepare and log the error message
    message = 'ARGS: ' + this.classTitle + methodName + '() | ';
    message += 'Error: Incorrect argument data type.';
    console.error(message);

    // Insert a debugger breakpoint
    if ( this.getBreakpoint('args') ) {
      debugger;
    }

    return true;
  };

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.fail)
   * -----------------------------------------------------
   * @desc Used to catch failures within a method. Comparable to console.assert.
   * @param {!(string|vals)} methodName - The name of the method or an array
   *   of all the parameters for this method (in correct order).
   * @param {val=} pass - The test to run. If this value is a function it runs
   *   it, converts its return to a boolean, and uses the result. Otherwise it
   *   converts it to a boolean. If the resulting boolean value is false then it
   *   logs an error.
   * @param {string=} message - The message to log if test fails. Use two
   *   consecutive dollar signs to include variable values in the message
   *   (e.g. This string, '... numberVar is $$ and  objectVar is $$', will
   *   be automatically converted to '... numberVar is %i, objectVar is %O').
   * @param {...val=} val - Any values to include in the error message.
   * @return {boolean} The log's success (i.e. whether a log was made).
   * @example
   *   // A function that tests the value of testVar
   *   var testFunc = (function(testVar) {
   *     return function() {
   *       return (testVar === 1);
   *     };
   *   })(testVar);
   *   // The message to include
   *   var errorMsg = 'Your error message var1 is $$. | var2= $$';
   *
   *   debug.fail('methodName', testFunc, errorMsg, var1, var2);
   *   // OR
   *   debug.fail([ 'methodName', testFunc, errorMsg, var1, var2 ]);
   */
  Debug.prototype.fail = function(methodName, pass, message) {

    /** @type {!vals} */
    var args;
    /** @type {string} */
    var msg;

    // Setup the variables
    if ( checkType(methodName, '!string|array') ) {
      if ( checkType(methodName, 'string') ) {
        pass = ( checkType(pass, 'function') ) ? !!pass() : !!pass;
        args = ( (arguments.length > 3) ?
          Array.prototype.slice.call(arguments, 3) : []
        );
      }
      else {
        pass = methodName[1];
        pass = ( checkType(pass, 'function') ) ? !!pass() : !!pass;
        message = methodName[2];
        args = (methodName.length > 3) ? methodName.slice(3) : [];
        methodName = methodName[0];
      }
    }

    // Test the given arguments before executing
    if ( !checkType(methodName, 'string') ) {
      msg = 'An aIV.debug fail method call was given an incorrect data ';
      msg += 'type (should be a string) for its first parameter (the name ';
      msg += 'of the user\'s method to log). The incorrect data type ';
      msg += 'given for the method name follows: ';
      msg += (methodName === null) ? 'null' : typeof methodName;
      console.error(msg);
      if (errorBreakpoints) {
        debugger;
      }
      return false;
    }
    if ( !checkType(message, 'string') ) {
      msg = 'An aIV.debug fail method call was given an incorrect data ';
      msg += 'type (should be a string) for its third parameter (the user\'s ';
      msg += 'error message to log upon test failure). The incorrect data ';
      msg += 'type given for the error message follows: ';
      msg += (message === null) ? 'null' : typeof message;
      console.error(msg);
      if (errorBreakpoints) {
        debugger;
      }
      return false;
    }

    // Check whether this method has been turned off
    if ( !this.getMethod('fail') ) {
      return false;
    }

    // If test passes end this method
    if (pass) {
      return false;
    }

    // Prepare the message
    if (args) {
      message = insertSubstituteStrings(message, args);
    }
    message = 'FAIL: ' + this.classTitle + methodName + '() | ' + message;

    // Prepare the error log's arguments
    args = [ message ].concat(args);

    // Log the error
    console.error.apply(console, args);

    // Insert a debugger breakpoint
    if ( this.getBreakpoint('fail') ) {
      debugger;
    }

    return true;
  };

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.group)
   * -----------------------------------------------------
   * @desc Used to group console messages.
   * @param {(string|vals)} methodName - The name of the method or an array
   *   of all the parameters for this method (in correct order).
   * @param {string=} groupType - The type of console group method to use. The
   *   options are: 'open'= console.group() | 'coll'= console.groupCollapsed()
   *   | 'end'= console.groupEnd(). The default value is 'open'.
   * @param {string=} message - A message to add to an open group call. Use two
   *   consecutive dollar signs to include variable values in the message
   *   (e.g. This string, '... numberVar is $$ and  objectVar is $$', will
   *   be automatically converted to '... numberVar is %i, objectVar is %O').
   * @param {...val=} val - Any values to include in the log message.
   * @return {boolean} The group's success (i.e. whether an action was made).
   * @example
   *   // The message to include
   *   var message = 'Lorem ipsem var1 is $$. | var2= $$';
   *
   *   debug.group('methodName', 'coll', message, var1, var2);
   *   // OR
   *   debug.group([ 'methodName', 'coll', message, var1, var2 ]);
   */
  Debug.prototype.group = function(methodName, groupType, message) {

    /** @type {Object<string, string>} */
    var groupTypes;
    /** @type {!vals} */
    var args;
    /** @type {string} */
    var msg;

    groupTypes = {
      open: 'open',
      coll: 'coll',
      end : 'end'
    };

    // Setup the variables
    if ( checkType(methodName, '!string|array') ) {

      if ( checkType(methodName, 'string') ) {

        if ( checkType(groupType, 'undefined') ) {
          groupType = 'open';
        }
        if ( checkType(message, 'undefined') ) {
          message = '';
        }
        args = ( (arguments.length > 3) ?
          Array.prototype.slice.call(arguments, 3) : []
        );
      }
      else {
        groupType = (methodName.length > 1) ? methodName[1] : 'open';
        message = (methodName.length > 2) ? methodName[2] : '';
        args = (methodName.length > 3) ? methodName.slice(3) : [];
        methodName = methodName[0];
      }

      if ( !checkType(message, 'string') ) {
        args.unshift(message);
        message = '';
      }
    }

    // Test the given arguments before executing
    if ( !checkType(methodName, 'string') ) {
      msg = 'An aIV.debug group method call was given an incorrect data ';
      msg += 'type (should be a string) for its first parameter (the name ';
      msg += 'of the user\'s method to log). The incorrect data type ';
      msg += 'given for the method name follows: ';
      msg += (methodName === null) ? 'null' : typeof methodName;
      console.error(msg);
      if (errorBreakpoints) {
        debugger;
      }
      return false;
    }
    if (!checkType(groupType, 'string') ||
        !groupTypes.hasOwnProperty(groupType)) {
      msg = 'An aIV.debug group method call was given an incorrect value ';
      msg += "(should be 'open', 'coll', or 'end') for its second ";
      msg += 'parameter (the console group type to use). The data type ';
      msg += 'given for the group type was \'';
      msg += ( (groupType === null) ? 'null' : typeof groupType ) + '\', ';
      msg += 'and the value converted to a string was \'' + groupType + "'.";
      console.error(msg);
      if (errorBreakpoints) {
        debugger;
      }
      return false;
    }

    // Check whether this method has been turned off
    if ( !this.getMethod('group') ) {
      return false;
    }

    // Check for end group type
    if (openGroup === 'end') {
      console.groupEnd();
      return true;
    }

    // Prepare the message
    if (message) {
      if (args) {
        message = insertSubstituteStrings(message, args);
      }
      message = ' | ' + message;
    }
    message = 'GROUP: ' + this.classTitle + methodName + '()' + message;

    // Prepare the group log's arguments
    args = [ message ].concat(args);

    // Open a console group
    if (openGroup === 'coll') {
      console.groupCollapsed.apply(console, args);
    }
    else {
      console.group.apply(console, args);
    }

    // Insert a debugger breakpoint
    if ( this.getBreakpoint('group') ) {
      debugger;
    }

    return true;
  };

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.state)
   * -----------------------------------------------------
   * @desc Use to view the state of a variable or property.
   * @param {(string|vals)} methodName - The name of the method. An array
   *   with all the parameters for this method (in correct order) can be
   *   supplied here.
   * @param {string=} message - A log message that shares a state. Use two
   *   consecutive dollar signs to include varaible values in the message
   *   (e.g. This string, '... numberVar is $$ and  objectVar is $$', will
   *   be automatically converted to '... numberVar is %i, objectVar is %O').
   * @param {...val=} val - The current value of a variable to log.
   * @return {boolean} The log's success (i.e. whether a log was made).
   * @example
   *   // The message to include
   *   var message = 'Lorem ipsem var1 is $$ and var2= $$';
   *
   *   debug.state('methodName', message, var1, var2);
   *   // OR
   *   debug.state([ 'methodName', message, var1, var2 ]);
   */
  Debug.prototype.state = function(methodName, message) {

    /**
     * @type {boolean}
     * @private
     */
    var argTest;
    /**
     * @type {vals}
     * @private
     */
    var args;

    // Test the given arguments before executing
    argTest = ( (typeof methodName === 'string') ?
      (typeof message === 'string' && arguments.length > 2)
      : ( Array.isArray(methodName) ) ?
        (typeof methodName[0] === 'string' && methodName.length > 2 &&
         typeof methodName[1] === 'string')
        : false
    );
    if(!argTest) {
      console.error('A debug.state method\'s arg(s) was wrong.');
      if (errorBreakpoints) {
        debugger;
      }
      return false;
    }

    // Check whether this method has been turned off for the current instance
    if ( !this.getMethod('state') ) {
      return false;
    }

    // Setup the variables
    if (typeof methodName === 'string') {
      args = Array.prototype.slice.call(arguments, 2);
    }
    else {
      message = methodName[1];
      args = methodName.slice(2);
      methodName = methodName[0];
    }

    // Prepare the message
    message = insertSubstituteStrings(message, args);
    message = 'STATE: ' + this.classTitle + methodName + '() | ' + message;

    // Prepare the console args
    args.unshift(message);

    // Log the state
    console.log.apply(console, args);

    // Pause the script
    if ( this.getBreakpoint('state') ) {
      debugger;
    }

    return true;
  };

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.misc)
   * -----------------------------------------------------
   * @desc Use to make a custom console log.
   * @param {(string|vals)} methodName - The name of the method. An
   *   array with all the parameters can be supplied here.
   * @param {string} message - The misc log message. Use two consecutive
   *   dollar signs to include varaible values in the message (e.g. This
   *   string, '... numberVar is $$ and  objectVar is $$', will be
   *   automatically converted to '... numberVar is %i, objectVar is %O').
   * @param {...val=} val - The value of any variables to add to the log.
   * @return {boolean} The log's success (i.e. whether a log was made).
   * @example
   *   // The message to include
   *   var message = 'Lorem ipsem. | var1= $$, var2= $$';
   *
   *   debug.misc('methodName', message, var1, var2);
   *   // OR
   *   debug.misc([ 'methodName', message, var1, var2 ]);
   */
  Debug.prototype.misc = function(methodName, message) {

    /**
     * @type {boolean}
     * @private
     */
    var argTest;
    /**
     * @type {?vals}
     * @private
     */
    var args;

    // Test the given arguments before executing
    argTest = ( (typeof methodName === 'string') ?
      (typeof message === 'string') : ( Array.isArray(methodName) ) ?
        (typeof methodName[0] === 'string' && typeof methodName[1] === 'string')
        : false
    );
    if(!argTest) {
      console.error('A debug.misc method\'s arg(s) was wrong.');
      if (errorBreakpoints) {
        debugger;
      }
      return false;
    }

    // Check whether this method has been turned off for the current instance
    if ( !this.getMethod('misc') ) {
      return false;
    }

    // Setup the variables
    if (typeof methodName === 'string') {
      args = ( (arguments.length > 2) ?
        Array.prototype.slice.call(arguments, 2) : null
      );
    }
    else {
      message = methodName[1];
      args = (methodName.length > 2) ? methodName.slice(2) : null;
      methodName = methodName[0];
    }

    // Prepare the message
    if (args) {
      message = insertSubstituteStrings(message, args);
    }
    message = 'MISC: ' + this.classTitle + methodName + '() | ' + message;

    // Log the misc message
    if (args) {
      args.unshift(message);
      console.log.apply(console, args);
    }
    else {
      console.log(message);
    }

    // Pause the script
    if ( this.getBreakpoint('misc') ) {
      debugger;
    }

    return true;
  };

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.init)
   * -----------------------------------------------------
   * @desc Used to log the start of a method, check for incorrect argument
   *   data types, and insert any automated actions.
   * @param {!(string|vals)} methodName - The name of the method or an array
   *   of all the parameters for this method in correct order.
   * @param {...val=} val - Each argument passed to the method.
   * @param {...string=} type -  Each passed argument's data type. To review
   *   the input options available
   *   [see the checkType helper method]{@link checkType}.
   * @return {boolean} Whether the method made a log or not.
   * @example
   *   // Create an aIV.console class instance
   *   Example.prototype.constructor = function Example() {
   *     this.console = aIV.console.create('Example');
   *   };
   *   
   *   // Calling init with multiple params
   *   Example.prototype.paramsMethod = function paramsMethod(arg1, arg2) {
   *     this.console.init('paramsMethod', arg1, 'object', arg2, 'number=');
   *   };
   *   
   *   // Calling init with an array
   *   Example.prototype.arrayMethod = function arrayMethod(arg1, arg2) {
   *     var arr = [ 'arrayMethod', arg1, 'object', arg2, 'number=' ];
   *     this.console.init(arr);
   *   };
   */
  Debug.prototype.init = function(methodName) {

    /** @type {number} */
    var len;
    /** @type {!vals} */
    var args;
    /** @type {boolean} */
    var pass;
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

    // Test the method name
    if ( !checkType(methodName, 'string') ) {
      console.error( ErrorMessages.missingMethodName('init', methodName) );
      if (errorBreakpoints) {
        debugger;
      }
      return;
    }

    // Save a length reference
    len = args.length;

    // Test for each argument's data type string
    if (len) {
      if ((len % 2) || !checkTypeStrings(args)) {
        console.error( ErrorMessages.missingTypeStrings('init') );
        if (errorBreakpoints) {
          debugger;
        }
        return;
      }
    }

    // Check whether this method has been turned off
    if ( !this.getMethod('init') ) {
      this.handleAuto('groups', methodName);
      this.handleAuto('profiles', methodName);
      this.handleAuto('timers', methodName);
      return false;
    }

    // Insert auto grouping
    this.handleAuto('groups', methodName);

    // Test the arguments
    pass = (len) ? testArgTypes(args) : true;

    // Log an args error message and insert a debugger breakpoint
    if (!pass) {
      message = 'ARGS: ' + this.classTitle + methodName + '() | ';
      message += 'Error: Incorrect argument data type.';
      console.error(message);

      if (this.getBreakpoint('init') || this.getBreakpoint('args')) {
        debugger;
      }
    }

    // Remove the data type strings
    args = stripArgTypeStrings(args);

    // Prepare the call log message and arguments
    message = 'CALL: ' + this.classTitle + methodName;
    message += '(' + makeSubstituteStrings(args) + ')';
    args.unshift(message);

    // Log the call message
    console.log.apply(console, args);

    // Insert a debugger breakpoint
    if ( this.getBreakpoint('init') ) {
      debugger;
    }

    // Insert auto profiling and timing
    this.handleAuto('profiles', methodName);
    this.handleAuto('timers', methodName);

    return !pass;
  };

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
      console.error( ErrorMessages.missingMethodName('start', methodName) );
      if (errorBreakpoints) {
        debugger;
      }
      return;
    }

    // Check whether this method has been turned off
    if ( !this.getMethod('start') ) {
      this.handleAuto('groups', methodName);
      this.handleAuto('profiles', methodName);
      this.handleAuto('timers', methodName);
      return false;
    }

    // Insert auto grouping
    this.handleAuto('groups', methodName);

    // Prepare the call log message and arguments
    message = 'CALL: ' + this.classTitle + methodName;
    message += '(' + makeSubstituteStrings(args) + ')';
    args.unshift(message);

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
      console.error( ErrorMessages.missingMethodName('end', methodName) );
      if (errorBreakpoints) {
        debugger;
      }
      return;
    }

    // Check whether this method has been turned off
    if ( !this.getMethod('end') ) {
      this.handleAuto('groups', methodName, true);
      this.handleAuto('profiles', methodName, true);
      this.handleAuto('timers', methodName, true);
      return false;
    }

    // Insert auto grouping
    this.handleAuto('groups', methodName, true);

    // Prepare the console message
    message = 'END: ' + this.classTitle + methodName + '() | ';
    message += 'return= ' + getSubstituteString(returnVal);

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

    // Test the method name
    if ( !checkType(methodName, 'string') ) {
      console.error( ErrorMessages.missingMethodName('args', methodName) );
      if (errorBreakpoints) {
        debugger;
      }
      return;
    }

    // Test for arguments
    if (args.length < 2) {
      console.error( ErrorMessages.missingTestArgs() );
      if (errorBreakpoints) {
        debugger;
      }
      return;
    }

    // Test for each argument's data type string
    if ((args.length % 2) || !checkTypeStrings(args)) {
      console.error( ErrorMessages.missingTypeStrings('args') );
      if (errorBreakpoints) {
        debugger;
      }
      return;
    }

    // Check whether this method has been turned off
    if ( !this.getMethod('args') ) {
      return false;
    }

    // If test passes end this method
    if ( testArgTypes(args) ) {
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
      console.error( ErrorMessages.missingMethodName('fail', methodName) );
      if (errorBreakpoints) {
        debugger;
      }
      return;
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
    args.unshift(message);

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
      console.error( ErrorMessages.missingMethodName('group', methodName) );
      if (errorBreakpoints) {
        debugger;
      }
      return;
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
    args.unshift(message);

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
   * @desc Used to log the state of a variable or property.
   * @param {!(string|vals)} methodName - The name of the method or an array
   *   of all the parameters for this method (in correct order).
   * @param {string=} message - A log message that shares a state. Use two
   *   consecutive dollar signs to include variable values in the message
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

    /** @type {!vals} */
    var args;
    /** @type {string} */
    var msg;

    // Setup the variables
    if ( checkType(methodName, '!string|array') ) {
      if ( checkType(methodName, 'string') ) {
        args = ( (arguments.length > 2) ?
          Array.prototype.slice.call(arguments, 2) : []
        );
      }
      else {
        message = (methodName.length > 1) ? methodName[1] : '';
        args = (methodName.length > 2) ? methodName.slice(2) : [];
        methodName = methodName[0];
      }

      if ( !checkType(message, 'string') ) {
        args.unshift(message);
        message = '';
      }
    }

    // Test the given arguments before executing
    if ( !checkType(methodName, 'string') ) {
      console.error( ErrorMessages.missingMethodName('state', methodName) );
      if (errorBreakpoints) {
        debugger;
      }
      return;
    }
    if (!args.length) {
      msg = 'An aIV.debug state method call was missing a state to log. ';
      msg += 'The state method requires that at least one variable state ';
      msg += 'be recorded. After the first parameter (the method name), the ';
      msg += 'second parameter should be the log message with $$ in the ';
      msg += 'places where you would like the variable states to be placed. The ';
      msg += 'third parameter should be a variable state you would like to ';
      msg += 'record. You can record as many variables as you like.';
      console.error(msg);
      if (errorBreakpoints) {
        debugger;
      }
      return false;
    }

    // Check whether this method has been turned off
    if ( !this.getMethod('state') ) {
      return false;
    }

    // Prepare the message
    message = insertSubstituteStrings(message, args);
    message = 'STATE: ' + this.classTitle + methodName + '() | ' + message;

    // Prepare the log's arguments
    args.unshift(message);

    // Log the state
    console.log.apply(console, args);

    // Insert a debugger breakpoint
    if ( this.getBreakpoint('state') ) {
      debugger;
    }

    return true;
  };

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.misc)
   * -----------------------------------------------------
   * @desc Used to make a custom console log.
   * @param {!(string|vals)} methodName - The name of the method or an
   *   array of all the parameters (in correct order).
   * @param {string=} message - The misc log message. Use two consecutive
   *   dollar signs to include variable values in the message (e.g. This
   *   string, '... numberVar is $$ and  objectVar is $$', will be
   *   automatically converted to '... numberVar is %i, objectVar is %O').
   * @param {...val=} val - Any values to include in the log.
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

    /** @type {!vals} */
    var args;
    /** @type {string} */
    var msg;

    // Setup the variables
    if ( checkType(methodName, '!string|array') ) {
      if ( checkType(methodName, 'string') ) {
        args = ( (arguments.length > 2) ?
          Array.prototype.slice.call(arguments, 2) : []
        );
      }
      else {
        message = (methodName.length > 1) ? methodName[1] : '';
        args = (methodName.length > 2) ? methodName.slice(2) : [];
        methodName = methodName[0];
      }

      if ( !checkType(message, 'string') ) {
        args.unshift(message);
        message = '';
      }
    }

    // Test the given arguments before executing
    if ( !checkType(methodName, 'string') ) {
      console.error( ErrorMessages.missingMethodName('misc', methodName) );
      if (errorBreakpoints) {
        debugger;
      }
      return;
    }
    if (!message && !args.length) {
      msg = 'An aIV.debug misc method call was missing a message to log. ';
      msg += 'The misc method requires that a message be supplied. After ';
      msg += 'the first parameter (the method name), the second parameter ';
      msg += 'should be the log message with $$ in the places where you ';
      msg += 'would like to add any variable states. The following ';
      msg += 'parameters are optional variable states to include.';
      console.error(msg);
      if (errorBreakpoints) {
        debugger;
      }
      return false;
    }

    // Check whether this method has been turned off
    if ( !this.getMethod('misc') ) {
      return false;
    }

    // Prepare the message
    if (args) {
      message = insertSubstituteStrings(message, args);
    }
    message = 'MISC: ' + this.classTitle + methodName + '() | ' + message;

    // Log the misc message
    args.unshift(message);
    console.log.apply(console, args);

    // Insert a debugger breakpoint
    if ( this.getBreakpoint('misc') ) {
      debugger;
    }

    return true;
  };

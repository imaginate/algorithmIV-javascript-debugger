  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.init)
   * -----------------------------------------------------
   * @desc Used to log the start of a method, check for incorrect argument
   *   data types, and insert any automated actions.
   * @param {!(string|vals)} methodName - The name of the method or an array
   *   of all the parameters for this method (in the correct order).
   * @param {...val=} val - Each argument passed to the method.
   * @param {...string=} type -  Each passed argument's data type. To review
   *   the input options available
   *   [see the checkType helper method]{@link checkType}.
   * @return {boolean} Whether the method made two logs or not.
   * @example
   *   // Create an aIV.console class instance
   *   Example.prototype.constructor = function Example() {
   *     this.console = aIV.console.create('Example');
   *   };
   *   
   *   // Calling init with multiple params
   *   Example.prototype.paramsMethod = function(arg1, arg2) {
   *     this.console.init('paramsMethod', arg1, 'object', arg2, 'number=');
   *   };
   *   
   *   // Calling init with an array
   *   Example.prototype.arrayMethod = function(arg1, arg2) {
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
      console.error( Errors.missingMethodName('init', methodName) );
      insertErrorBreakpoint();
      return;
    }

    // Save a length reference
    len = args.length;

    // Test for each argument's data type string
    if (len) {
      if ((len % 2) || !Debug.checkArgsDataTypeStrings(args)) {
        console.error( Errors.missingTypeStrings('init') );
        insertErrorBreakpoint();
        return;
      }
    }

    // Check whether this method has been turned off
    if ( !this.getMethod('init') ) {
      Debug.handleAuto.call(this, 'groups', methodName);
      Debug.handleAuto.call(this, 'profiles', methodName);
      Debug.handleAuto.call(this, 'timers', methodName);
      return false;
    }

    // Insert auto grouping
    Debug.handleAuto.call(this, 'groups', methodName);

    // Test the arguments
    pass = (len) ? Debug.testArgTypes(args) : true;

    // Log an args error message and insert a debugger breakpoint
    if (!pass) {
      message = 'ARGS: ' + this.classTitle + methodName + '() | ';
      message += 'Error: Incorrect argument data type.';
      console.error(message);
      Debug.insertBreakpoint.call(this, 'init args');
    }

    // Remove the data type strings
    if (len) {
      args = Debug.stripArgTypeStrings(args);
    }

    // Prepare the call log message and arguments
    message = 'CALL: ' + this.classTitle + methodName;
    message += '(' + Debug.makeSubstituteStrings(args) + ')';
    args.unshift(message);

    // Log the call message
    console.log.apply(console, args);

    // Insert a debugger breakpoint
    Debug.insertBreakpoint.call(this, 'init');

    // Insert auto profiling and timing
    Debug.handleAuto.call(this, 'profiles', methodName);
    Debug.handleAuto.call(this, 'timers', methodName);

    return !pass;
  };

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.start)
   * -----------------------------------------------------
   * @desc Used to log the start of a method and insert any automated actions.
   * @param {!(string|vals)} methodName - The name of the method or an array
   *   of all the parameters for this method (in the correct order).
   * @param {...val=} val - Each argument passed to the method in order of
   *   appearance.
   * @return {boolean} Whether a log was made.
   * @example
   *   // Create an aIV.console class instance
   *   Example.prototype.constructor = function Example() {
   *     this.console = aIV.console.create('Example');
   *   };
   *   
   *   // Calling start with multiple params
   *   Example.prototype.paramsMethod = function(arg1, arg2) {
   *     this.console.start('paramsMethod', arg1, arg2);
   *   };
   *   
   *   // Calling start with an array
   *   Example.prototype.arrayMethod = function(arg1, arg2) {
   *     var arr = [ 'arrayMethod', arg1, arg2 ];
   *     this.console.start(arr);
   *   };
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
      console.error( Errors.missingMethodName('start', methodName) );
      insertErrorBreakpoint();
      return;
    }

    // Check whether this method has been turned off
    if ( !this.getMethod('start') ) {
      Debug.handleAuto.call(this, 'groups', methodName);
      Debug.handleAuto.call(this, 'profiles', methodName);
      Debug.handleAuto.call(this, 'timers', methodName);
      return false;
    }

    // Insert auto grouping
    Debug.handleAuto.call(this, 'groups', methodName);

    // Prepare the call log message and arguments
    message = 'CALL: ' + this.classTitle + methodName;
    message += '(' + Debug.makeSubstituteStrings(args) + ')';
    args.unshift(message);

    // Log the start message
    console.log.apply(console, args);

    // Insert a debugger breakpoint
    Debug.insertBreakpoint.call(this, 'start');

    // Insert auto profiling and timing
    Debug.handleAuto.call(this, 'profiles', methodName);
    Debug.handleAuto.call(this, 'timers', methodName);

    return true;
  };

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.end)
   * -----------------------------------------------------
   * @desc Used to log the end of a method and insert any automated actions.
   * @param {!(string|vals)} methodName - The name of the method or an array
   *   of all the parameters for this method (in the correct order).
   * @param {val=} returnVal - The return value for the method.
   * @return {boolean} Whether a log was made.
   * @example
   *   // Create an aIV.console class instance
   *   Example.prototype.constructor = function Example() {
   *     this.console = aIV.console.create('Example');
   *   };
   *   
   *   // Calling end with multiple params
   *   Example.prototype.paramsMethod = function() {
   *     this.console.end('paramsMethod', returnVal);
   *   };
   *   
   *   // Calling end with an array
   *   Example.prototype.arrayMethod = function() {
   *     var arr = [ 'arrayMethod', returnVal ];
   *     this.console.end(arr);
   *   };
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
      console.error( Errors.missingMethodName('end', methodName) );
      insertErrorBreakpoint();
      return;
    }

    // Check whether this method has been turned off
    if ( !this.getMethod('end') ) {
      Debug.handleAuto.call(this, 'timers', methodName, true);
      Debug.handleAuto.call(this, 'profiles', methodName, true);
      Debug.handleAuto.call(this, 'groups', methodName, true);
      return false;
    }

    // Prepare the console message
    message = 'END: ' + this.classTitle + methodName + '() | ';
    message += 'return= ' + Debug.getSubstituteString(returnVal);

    // Log the end message
    console.log(message, returnVal);

    // Insert a debugger breakpoint
    Debug.insertBreakpoint.call(this, 'end');

    // Insert auto profiling and timing
    Debug.handleAuto.call(this, 'timers', methodName, true);
    Debug.handleAuto.call(this, 'profiles', methodName, true);

    // Insert auto grouping
    Debug.handleAuto.call(this, 'groups', methodName, true);

    return true;
  };

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.args)
   * -----------------------------------------------------
   * @desc Used to catch undesired argument data types.
   * @param {!(string|vals)} methodName - The name of the method or an array
   *   with all the parameters for this method (in the correct order).
   * @param {...val=} val - Each argument passed to the method.
   * @param {...string=} type -  Each argument's data type. To review
   *   the input options available
   *   [see the checkType helper method]{@link checkType}.
   * @return {boolean} Whether a log was made.
   * @example
   *   // Create an aIV.console class instance
   *   Example.prototype.constructor = function Example() {
   *     this.console = aIV.console.create('Example');
   *   };
   *   
   *   // Calling args with multiple params
   *   Example.prototype.paramsMethod = function(arg1, arg2) {
   *     this.console.args('paramsMethod', arg1, 'object', arg2, 'number=');
   *   };
   *   
   *   // Calling args with an array
   *   Example.prototype.arrayMethod = function(arg1, arg2) {
   *     var arr = [ 'arrayMethod', arg1, 'object', arg2, 'number=' ];
   *     this.console.args(arr);
   *   };
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
      console.error( Errors.missingMethodName('args', methodName) );
      insertErrorBreakpoint();
      return;
    }

    // Test for arguments
    if (args.length < 2) {
      console.error( Errors.missingTestArgs() );
      insertErrorBreakpoint();
      return;
    }

    // Test each argument's data type string
    if ((args.length % 2) || !Debug.checkArgsDataTypeStrings(args)) {
      console.error( Errors.missingTypeStrings('args') );
      insertErrorBreakpoint();
      return;
    }

    // Check whether this method has been turned off
    if ( !this.getMethod('args') ) {
      return false;
    }

    // If test passes end this method
    if ( Debug.testArgTypes(args) ) {
      return false;
    }

    // Prepare and log the error message
    message = 'ARGS: ' + this.classTitle + methodName + '() | ';
    message += 'Error: Incorrect argument data type.';
    console.error(message);

    // Insert a debugger breakpoint
    Debug.insertBreakpoint.call(this, 'args');

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
   * @return {boolean} Whether a log was made.
   * @example
   *   // Create an aIV.console class instance
   *   Example.prototype.constructor = function Example() {
   *     this.console = aIV.console.create('Example');
   *   };
   *   
   *   Example.prototype.exampleMethod = function() {
   *     // An important variable
   *     var exampleVar = 'A random value';
   *     
   *     // A function that tests the value of exampleVar
   *     var testFunc = (function(exampleVar) {
   *       return function testFunc() {
   *         return (exampleVar.length > 20);
   *       };
   *     })(exampleVar);
   *     
   *     // The message to log on an error
   *     var errorMsg = 'Example error message exampleVar was $$.';
   *     
   *     // Calling fail with multiple params and a test function
   *     this.console.fail('exampleMethod', testFunc, errorMsg, exampleVar);
   *     
   *     // A test boolean value for exampleVar
   *     var testValue = (exampleVar.length > 20);
   *     
   *     // Calling fail with an array and a boolean test value
   *     var arr = [ 'exampleMethod', testValue, errorMsg, exampleVar ];
   *     this.console.fail(arr);
   *   };
   */
  Debug.prototype.fail = function(methodName, pass, message) {

    /** @type {!vals} */
    var args;

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

    // Test the method name
    if ( !checkType(methodName, 'string') ) {
      console.error( Errors.missingMethodName('fail', methodName) );
      insertErrorBreakpoint();
      return;
    }

    // Test the error message
    if ( !checkType(message, 'string') ) {
      console.error( Errors.missingErrorMessage(message) );
      insertErrorBreakpoint();
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
    if (args.length) {
      message = Debug.insertSubstituteStrings(message, args);
    }
    message = 'FAIL: ' + this.classTitle + methodName + '() | ' + message;

    // Prepare the error log's arguments
    args.unshift(message);

    // Log the error
    console.error.apply(console, args);

    // Insert a debugger breakpoint
    Debug.insertBreakpoint.call(this, 'fail');

    return true;
  };

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.group)
   * -----------------------------------------------------
   * @desc Used to group console messages.
   * @param {(string|vals)} methodName - The name of the method or an array
   *   of all the parameters for this method (in the correct order).
   * @param {string=} groupType - The type of console group method to use. The
   *   options are: 'open'= console.group() | 'coll'= console.groupCollapsed()
   *   | 'end'= console.groupEnd(). The default value is 'open'.
   * @param {string=} message - A message to add to an open group call. Use two
   *   consecutive dollar signs to include variable values in the message
   *   (e.g. This string, '... numberVar is $$ and  objectVar is $$', will
   *   be automatically converted to '... numberVar is %i, objectVar is %O').
   * @param {...val=} val - Any values to include in the log message.
   * @return {boolean} Whether a group was opened/closed or not (i.e. action
   *   vs no action).
   * @example
   *   // Create an aIV.console class instance
   *   Example.prototype.constructor = function Example() {
   *     this.console = aIV.console.create('Example');
   *   };
   *   
   *   Example.prototype.exMethod = function() {
   *     // Important variables
   *     var exVar1 = 'A random value 1';
   *     var exVar2 = 'A random value 2';
   *     
   *     // The message to log
   *     var groupMsg = 'Lorem ipsem exVar1 is $$. | exVar2= $$';
   *     
   *     // Calling open group with multiple params
   *     this.console.group('exMethod', 'open', groupMsg, exVar1, exVar2);
   *     
   *     // Calling collapsed group with an array
   *     var arr = [ 'exMethod', 'coll', groupMsg, exVar1, exVar2 ];
   *     this.console.group(arr);
   *     
   *     // Calling close group
   *     this.console.group('exMethod', 'end');
   *   };
   */
  Debug.prototype.group = function(methodName, groupType, message) {

    /** @type {Object<string, string>} */
    var groupTypes;
    /** @type {!vals} */
    var args;

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

    // Test the method name
    if ( !checkType(methodName, 'string') ) {
      console.error( Errors.missingMethodName('group', methodName) );
      insertErrorBreakpoint();
      return;
    }

    // Test the group type
    if (!checkType(groupType, 'string') || !hasOwnProp(groupTypes, groupType)) {
      console.error( Errors.invalidGroupType(groupType) );
      insertErrorBreakpoint();
      return;
    }

    // Check whether this method has been turned off
    if ( !this.getMethod('group') ) {
      return false;
    }

    // Check for end group type
    if (groupType === 'end') {
      console.groupEnd();
      return true;
    }

    // Prepare the message
    if (message || args.length) {
      if (args.length) {
        message = Debug.insertSubstituteStrings(message, args);
      }
      message = ' | ' + message;
    }
    message = 'GROUP: ' + this.classTitle + methodName + '()' + message;

    // Prepare the group's arguments
    args.unshift(message);

    // Open a console group
    if (groupType === 'coll') {
      console.groupCollapsed.apply(console, args);
    }
    else {
      console.group.apply(console, args);
    }

    // Insert a debugger breakpoint
    Debug.insertBreakpoint.call(this, 'group');

    return true;
  };

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.state)
   * -----------------------------------------------------
   * @desc Used to log the state of a variable or property.
   * @param {!(string|vals)} methodName - The name of the method or an array
   *   of all the parameters for this method (in the correct order).
   * @param {string=} message - A log message that shares a state. Use two
   *   consecutive dollar signs to include variable values in the message
   *   (e.g. This string, '... numberVar is $$ and  objectVar is $$', will
   *   be automatically converted to '... numberVar is %i, objectVar is %O').
   * @param {...val=} val - The value's state to log.
   * @return {boolean} Whether a log was made.
   * @example
   *   // Create an aIV.console class instance
   *   Example.prototype.constructor = function Example() {
   *     this.console = aIV.console.create('Example');
   *   };
   *   
   *   Example.prototype.exMethod = function() {
   *     // Important variables
   *     var exVar1 = 'A random value 1';
   *     var exVar2 = 'A random value 2';
   *     
   *     // The message to log
   *     var stateMsg = 'Lorem ipsem exVar1 is $$ and exVar2= $$.';
   *     
   *     // Calling state with multiple params
   *     this.console.state('exMethod', stateMsg, exVar1, exVar2);
   *     
   *     // Calling state with an array
   *     var arr = [ 'exMethod', stateMsg, exVar1, exVar2 ];
   *     this.console.state(arr);
   *   };
   */
  Debug.prototype.state = function(methodName, message) {

    /** @type {!vals} */
    var args;

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

    // Test the method name
    if ( !checkType(methodName, 'string') ) {
      console.error( Errors.missingMethodName('state', methodName) );
      insertErrorBreakpoint();
      return;
    }

    // Test the remaining arguments
    if (!args.length) {
      console.error( Errors.missingStateValues() );
      insertErrorBreakpoint();
      return;
    }

    // Check whether this method has been turned off
    if ( !this.getMethod('state') ) {
      return false;
    }

    // Prepare the message and arguments
    message = Debug.insertSubstituteStrings(message, args);
    message = 'STATE: ' + this.classTitle + methodName + '() | ' + message;
    args.unshift(message);

    // Log the state
    console.log.apply(console, args);

    // Insert a debugger breakpoint
    Debug.insertBreakpoint.call(this, 'state');

    return true;
  };

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.misc)
   * -----------------------------------------------------
   * @desc Used to make a custom console log.
   * @param {!(string|vals)} methodName - The name of the method or an
   *   array of all the parameters (in the correct order).
   * @param {string=} message - The log message. Use two consecutive
   *   dollar signs to include variable values in the message (e.g. This
   *   string, '... numberVar is $$ and  objectVar is $$', will be
   *   automatically converted to '... numberVar is %i, objectVar is %O').
   * @param {...val=} val - Any values to include in the log.
   * @return {boolean} Whether a log was made.
   * @example
   *   // Create an aIV.console class instance
   *   Example.prototype.constructor = function Example() {
   *     this.console = aIV.console.create('Example');
   *   };
   *   
   *   Example.prototype.exMethod = function() {
   *     // Important variables
   *     var exVar1 = 'A random value 1';
   *     var exVar2 = 'A random value 2';
   *     
   *     // The message to log
   *     var miscMsg = 'Lorem ipsem | exVar1= $$, exVar2= $$';
   *     
   *     // Calling misc with multiple params
   *     this.console.misc('exMethod', miscMsg, exVar1, exVar2);
   *     
   *     // Calling misc with an array
   *     var arr = [ 'exMethod', miscMsg, exVar1, exVar2 ];
   *     this.console.misc(arr);
   *   };
   */
  Debug.prototype.misc = function(methodName, message) {

    /** @type {!vals} */
    var args;

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

    // Test the method name
    if ( !checkType(methodName, 'string') ) {
      console.error( Errors.missingMethodName('misc', methodName) );
      insertErrorBreakpoint();
      return;
    }

    // Test the log message
    if (!message && !args.length) {
      console.error( Errors.missingLogMessage(message) );
      insertErrorBreakpoint();
      return;
    }

    // Check whether this method has been turned off
    if ( !this.getMethod('misc') ) {
      return false;
    }

    // Prepare the message and arguments
    if (args.length) {
      message = Debug.insertSubstituteStrings(message, args);
    }
    message = 'MISC: ' + this.classTitle + methodName + '() | ' + message;
    args.unshift(message);

    // Log the misc message
    console.log.apply(console, args);

    // Insert a debugger breakpoint
    Debug.insertBreakpoint.call(this, 'misc');

    return true;
  };

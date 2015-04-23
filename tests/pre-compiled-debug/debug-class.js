  /**
   * -----------------------------------------------------
   * Public Class (Debug)
   * -----------------------------------------------------
   * @desc Contains the debugging properties and methods.
   * @param {!Object<string, (string|boolean)>} settings - The class settings.
   * @param {string} settings.classTitle - The name of the class.
   * @param {string} settings.turnOffMethods - The class methods to disable. If
   *   'all' is provided then all methods are disabled.
   * @param {string} settings.addBreakpoints - The methods to add debugger
   *   breakpoints to. If 'all' is provided then breakpoints are added to all
   *   methods.
   * @param {boolean} settings.turnOnGroups - Enables/disables automatic
   *   grouping of all logs, timers, and profiles between every start and end
   *   method.
   * @param {boolean} settings.turnOnProfiles - Enables/disables automatic
   *   profiling for all logic between every start and end method.
   * @param {boolean} settings.turnOnTimers - Enables/disables automatic
   *   timing for all logic between every start and end method.
   * @constructor
   */
  var Debug = function(settings) {


    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ---------------------------------------------------
     * Public Property (Debug.classTitle)
     * ---------------------------------------------------
     * @desc The class name for the instance.
     * @type {string}
     */
    this.classTitle = settings.classTitle + '.';


    ////////////////////////////////////////////////////////////////////////////
    // Define The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -----------------------------------------------------
     * Protected Property (methods)
     * -----------------------------------------------------
     * @desc Allows disabling of specific methods per class instance.
     *   <ol>
     *     <li>start: Logs the start of every method.</li>
     *     <li>end: Logs the end of every method.</li>
     *     <li>args: Evaluations that assert method's arguments and
     *         log error messages when they are incorrect.</li>
     *     <li>fail: Applies custom evaluations and logs errors when
     *         they occur.</li>
     *     <li>group: Groups console logs and shares any supplied
     *         properties.</li>
     *     <li>state: Logs the state of the supplied properties.</li>
     *     <li>misc: Logs a custom message and properties.</li>
     *   </ol>
     * @type {{
     *   start: boolean,
     *   end  : boolean,
     *   args : boolean,
     *   fail : boolean,
     *   group: boolean,
     *   state: boolean,
     *   misc : boolean
     * }}
     * @private
     */
    var methods;

    /**
     * -----------------------------------------------------
     * Protected Property (breakpoints)
     * -----------------------------------------------------
     * @desc Allows disabling of debugger breakpoints for specific methods.
     * @type {{
     *   start: boolean,
     *   end  : boolean,
     *   args : boolean,
     *   fail : boolean,
     *   group: boolean,
     *   state: boolean,
     *   misc : boolean
     * }}
     * @private
     */
    var breakpoints;

    /**
     * -----------------------------------------------------
     * Protected Property (groups)
     * -----------------------------------------------------
     * @desc Allows automatic grouping of all logs, timers, and profiles between
     *   every start and end method.
     * @type {boolean}
     * @private
     */
    var groups;

    /**
     * -----------------------------------------------------
     * Protected Property (profiles)
     * -----------------------------------------------------
     * @desc Allows automatic profiling for all logic between every start and
     *   end method.
     * @type {boolean}
     * @private
     */
    var profiles;

    /**
     * -----------------------------------------------------
     * Protected Property (timers)
     * -----------------------------------------------------
     * @desc Allows automatic timing for all logic between every start and end
     *   method.
     * @type {boolean}
     * @private
     */
    var timers;


    ////////////////////////////////////////////////////////////////////////////
    // Setup The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    settings.turnOffMethods = settings.turnOffMethods.toLowerCase();
    settings.addBreakpoints = settings.addBreakpoints.toLowerCase();

    methods = {
      start: !/start|all/.test(settings.turnOffMethods),
      end  :   !/end|all/.test(settings.turnOffMethods),
      args :  !/args|all/.test(settings.turnOffMethods),
      fail :  !/fail|all/.test(settings.turnOffMethods),
      group: !/group|all/.test(settings.turnOffMethods),
      state: !/state|all/.test(settings.turnOffMethods),
      misc :  !/misc|all/.test(settings.turnOffMethods)
    };

    breakpoints = {
      start: /start|all/.test(settings.addBreakpoints),
      end  :   /end|all/.test(settings.addBreakpoints),
      args :  /args|all/.test(settings.addBreakpoints),
      fail :  /fail|all/.test(settings.addBreakpoints),
      group: /group|all/.test(settings.addBreakpoints),
      state: /state|all/.test(settings.addBreakpoints),
      misc :  /misc|all/.test(settings.addBreakpoints)
    };

    groups   = settings.turnOnGroups;
    profiles = settings.turnOnProfiles;
    timers   = settings.turnOnTimers;


    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ---------------------------------------------------
     * Public Method (Debug.getMethod)
     * ---------------------------------------------------
     * @desc Gets a method's current value for whether it is active.
     * @param {string} method - The method value to get.
     * @return {boolean} The method's current enabled/disabled state.
     * @return {(boolean|undefined)} The method's current enabled/disabled
     *   state or undefined for an error.
     */
    this.getMethod = function(method) {

      /** @type {string} */
      var msg;

      if (!checkType(method, 'string') ||  !methods.hasOwnProperty(method)) {
        msg = 'An aIV.debug getMethod call was given an incorrect method ';
        msg += 'name. The given incorrect method name was \'' + method + '\'.';
        console.error(msg);
        if (errorBreakpoints) {
          debugger;
        }
        return;
      }

      return methods[ method ];
    };

    /**
     * ---------------------------------------------------
     * Public Method (Debug.getBreakpoint)
     * ---------------------------------------------------
     * @desc Gets a method's current value for whether it has added debugger
     *   breakpoints.
     * @param {string} method - The method value to get.
     * @return {(boolean|undefined)} The method's current breakpoint addition
     *   enabled/disabled state or undefined for an error.
     */
    this.getBreakpoint = function(method) {

      /** @type {string} */
      var msg;

      if (!checkType(method, 'string') || !breakpoints.hasOwnProperty(method)) {
        msg = 'An aIV.debug getBreakpoint call was given an incorrect method ';
        msg += 'name. The given incorrect method name was \'' + method + '\'.';
        console.error(msg);
        if (errorBreakpoints) {
          debugger;
        }
        return;
      }

      return breakpoints[ method ];
    };

    /**
     * ---------------------------------------------------
     * Public Method (Debug.getAuto)
     * ---------------------------------------------------
     * @desc Gets the current automated value for groups, profiles, and timers.
     * @param {string} prop - The automated type value to get.
     * @return {boolean} The automated type's current enabled/disabled state.
     */
    this.getAuto = function(prop) {

      /** @type {Object<string, boolean>} */
      var props;
      /** @type {string} */
      var msg;

      props = {
        groups  : groups,
        profiles: profiles,
        timers  : timers
      };

      if (!checkType(prop, 'string') || !props.hasOwnProperty(prop)) {
        msg = 'An aIV.debug getAuto call was given an incorrect type name. ';
        msg += 'The given incorrect type name was \'' + prop + '\'.';
        console.error(msg);
        if (errorBreakpoints) {
          debugger;
        }
        return;
      }

      return props[ prop ];
    };

    /**
     * ---------------------------------------------------
     * Public Method (Debug.setMethod)
     * ---------------------------------------------------
     * @desc Sets a method's active state.
     * @param {string} method - The method state to set.
     * @param {boolean} val - The new state.
     * @return {boolean} Indicates whether correct arguments were given.
     */
    this.setMethod = function(method, val) {

      if (!checkType(method, 'string') || !checkType(val, 'boolean')) {
        return false;
      }

      method = method.toLowerCase();

      if (!methods.hasOwnProperty(method) && method !== 'all') {
        return false;
      }

      if (method === 'all') {
        for (method in methods) {
          if ( methods.hasOwnProperty(method) ) {
            methods[ method ] = val;
          }
        }
      }
      else {
        methods[ method ] = val;
      }

      return true;
    };

    /**
     * ---------------------------------------------------
     * Public Method (Debug.setBreakpoint)
     * ---------------------------------------------------
     * @desc Sets a method's added breakpoints state.
     * @param {string} method - The method state to set.
     * @param {boolean} val - The new state.
     * @return {boolean} Indicates whether correct arguments were given.
     */
    this.setBreakpoint = function(method, val) {

      if (!checkType(method, 'string') || !checkType(val, 'boolean')) {
        return false;
      }

      method = method.toLowerCase();

      if (!breakpoints.hasOwnProperty(method) && method !== 'all') {
        return false;
      }

      if (method === 'all') {
        for (method in breakpoints) {
          if ( breakpoints.hasOwnProperty(method) ) {
            breakpoints[ method ] = val;
          }
        }
      }
      else {
        breakpoints[ method ] = val;
      }

      return true;
    };

    /**
     * ---------------------------------------------------
     * Public Method (Debug.setAuto)
     * ---------------------------------------------------
     * @desc Sets the current automated value for groups, profiles, and timers.
     * @param {string} prop - The automated type value to set.
     * @param {boolean} val - The new automated value.
     */
    this.setAuto = function(prop, val) {

      /** @type {Object<string, function(boolean)>} */
      var props;

      props = {
        groups  : function(val) { groups   = val; },
        profiles: function(val) { profiles = val; },
        timers  : function(val) { timers   = val; }
      };

      props[ prop ](!!val);
    };

    // Freeze all of the public methods
    Object.freeze(this.getMethod);
    Object.freeze(this.getBreakpoint);
    Object.freeze(this.getAuto);
    Object.freeze(this.setMethod);
    Object.freeze(this.setBreakpoint);
    Object.freeze(this.setAuto);


    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

    // Freeze this class instance
    Object.freeze(this);
  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

  Debug.prototype.constructor = Debug;

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.start)
   * -----------------------------------------------------
   * @desc Use to start every method.
   * @param {(string|vals)} methodName - The name of the method. An array
   *   with all the parameters for this method (in correct order) can be
   *   supplied here.
   * @param {...val=} val - Each argument passed to the method in order
   *   of appearance.
   * @example
   *   debug.start('methodName', arg1, arg2);
   *   // OR
   *   debug.start([ 'methodName', arg1, arg2 ]);
   */
  Debug.prototype.start = function(methodName) {

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
    /**
     * @type {string}
     * @private
     */
    var message;

    // Test the given arguments before executing
    argTest = ( ( Array.isArray(methodName) ) ?
      (typeof methodName[0] === 'string') : (typeof methodName === 'string')
    );
    if (!argTest) {
      console.error('A debug.start method\'s arg(s) was wrong.');
      if (errorBreakpoints) {
        debugger;
      }
      return false;
    }

    // Check whether this method has been turned off for the current instance
    if ( !this.getMethod('start') ) {
      return false;
    }

    // Setup the varaibles
    if (typeof methodName === 'string') {
      args = ( (arguments.length > 1) ?
        Array.prototype.slice.call(arguments, 1) : null
      );
    }
    else {
      args = ( (methodName.length > 1) ?
        methodName.slice(1) : null
      );
      methodName = methodName[0];
    }

    // Prepare the console message
    message = 'START: ' + this.classTitle + methodName + '(';
    if (args) {
      args.forEach(function(/** val */ val, /** number */ i) {
        message += ( (i) ? ', ' : '' ) + getSubstituteString(val);
      });
    }
    message += ')';

    // Log the message
    if (args) {
      args.unshift(message);
      console.log.apply(console, args);
    }
    else {
      console.log(message);
    }

    // Pause the script
    if ( this.getBreakpoint('start') ) {
      debugger;
    }

    return true;
  };

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.args)
   * -----------------------------------------------------
   * @desc Use to catch an improper method argument.
   * @param {(string|vals)} methodName - The name of the method. An array
   *   with all the parameters for this method (in correct order) can be
   *   supplied here.
   * @param {...val=} val - Each argument passed to the method.
   * @param {...string=} type -  Each passed argument's data type.
   *   [See public module method, checkType,]{@link Debug#checkType} for
   *   the input options.
   * @example
   *   debug.args('methodName', arg1, 'object', arg2, 'number');
   *   // OR
   *   debug.args([ 'methodName', arg1, 'object', arg2, 'number' ]);
   */
  Debug.prototype.args = function(methodName) {

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
    /**
     * @type {boolean}
     * @private
     */
    var pass;
    /**
     * @type {string}
     * @private
     */
    var message;

    // Test the given arguments before executing
    argTest = ( (typeof methodName === 'string') ?
      (arguments.length > 2) : ( Array.isArray(methodName) ) ?
        (typeof methodName[0] === 'string' && methodName.length > 2) : false
    );
    if(!argTest) {
      console.error('A debug.args method\'s arg(s) was wrong.');
      if (errorBreakpoints) {
        debugger;
      }
      return false;
    }

    // Check whether this method has been turned off for the current instance
    if ( !this.getMethod('args') ) {
      return false;
    }

    // Setup the varaibles
    if (typeof methodName === 'string') {
      args = Array.prototype.slice.call(arguments, 1);
    }
    else {
      args = methodName.slice(1);
      methodName = methodName[0];
    }

    // Test the args
    pass = args.every(function(/** val */ val, /** number */ i) {
      if (i % 2) {
        return checkType(args[i - 1], val);
      }
      return true;
    });

    // If test passes end this method
    if (pass) {
      return false;
    }

    // Prepare and log the error message
    message = 'ARGS: ' + this.classTitle + methodName + '() | ';
    message += 'Error: Incorrect argument data type.';
    console.error(message);

    // Pause the script
    if ( this.getBreakpoint('args') ) {
      debugger;
    }

    return true;
  };

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.fail)
   * -----------------------------------------------------
   * @desc Use to catch failures within a method.
   * @param {(string|vals)} methodName - The name of the method. An array
   *   with all the parameters for this method (in correct order) can be
   *   supplied here.
   * @param {val=} pass - The test to run (fails if false).
   * @param {string=} message - The message to log if test fails. Use two
   *   consecutive dollar signs to include varaible values in the message
   *   (e.g. This string, '... numberVar is $$ and  objectVar is $$', will
   *   be automatically converted to '... numberVar is %i, objectVar is %O').
   * @param {...val=} val - The value of the passed variables to include in
   *   error message.
   * @example
   *   // A function that returns a boolean value
   *   var test = function() {
   *     if (typeof testVar === 'number') {
   *       ++testVar;
   *     }
   *     return (testVar === 1);
   *   };
   *   // The message to include
   *   var errorMsg = 'Lorem ipsem var1 is $$. | var2= $$';
   *
   *   debug.fail('methodName', test, errorMsg, var1, var2);
   *   // OR
   *   debug.fail([ 'methodName', test, errorMsg, var1, var2 ]);
   */
  Debug.prototype.fail = function(methodName, pass, message) {

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
        (typeof methodName[0] === 'string' && typeof methodName[2] === 'string')
        : false
    );
    if(!argTest) {
      console.error('A debug.fail method\'s arg(s) was wrong.');
      if (errorBreakpoints) {
        debugger;
      }
      return false;
    }

    // Check whether this method has been turned off for the current instance
    if ( !this.getMethod('fail') ) {
      return false;
    }

    // Setup the varaibles
    if (typeof methodName === 'string') {
      pass = (typeof pass === 'function') ? ( !!pass() ) : (!!pass);
      args = ( (arguments.length > 3) ?
        Array.prototype.slice.call(arguments, 3) : null
      );
    }
    else {
      pass = ( (typeof methodName[1] === 'function') ?
        ( !!methodName[1]() ) : (!!methodName[1])
      );
      message = methodName[2];
      args = (methodName.length > 3) ? methodName.slice(3) : null;
      methodName = methodName[0];
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

    // Log the error
    if (args) {
      args.unshift(message);
      console.error.apply(console, args);
    }
    else {
      console.error(message);
    }

    // Pause the script
    if ( this.getBreakpoint('fail') ) {
      debugger;
    }

    return true;
  };

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.group)
   * -----------------------------------------------------
   * @desc Use to group console messages.
   * @param {(string|vals)} methodName - The name of the method. An array
   *   with all the parameters for this method (in correct order) can be
   *   supplied here.
   * @param {string=} openGroup - The type of console method to use. The
   *   options are: 'open'= console.group() | 'coll'= console.groupCollapsed()
   *   | 'end'= console.groupEnd()
   * @param {string=} message - A message to add to an open group call. Use two
   *   consecutive dollar signs to include varaible values in the message
   *   (e.g. This string, '... numberVar is $$ and  objectVar is $$', will
   *   be automatically converted to '... numberVar is %i, objectVar is %O').
   * @param {...val=} val - The value of the passed variables to include in message.
   * @example
   *   // The message to include
   *   var message = 'Lorem ipsem var1 is $$. | var2= $$';
   *
   *   debug.group('methodName', 'coll', message, var1, var2);
   *   // OR
   *   debug.group([ 'methodName', 'coll', message, var1, var2 ]);
   */
  Debug.prototype.group = function(methodName, openGroup, message) {

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
      (checkType(openGroup, 'string=') &&
       checkType(message, 'string='))
      : ( Array.isArray(methodName) ) ?
        (typeof methodName[0] === 'string' &&
         checkType(methodName[1], 'string=') &&
         checkType(methodName[2], 'string='))
        : false
    );
    if(!argTest) {
      console.error('A debug.group method\'s arg(s) was wrong.');
      if (errorBreakpoints) {
        debugger;
      }
      return false;
    }

    // Check whether this method has been turned off for the current instance
    if ( !this.getMethod('group') ) {
      return false;
    }

    // Setup the varaibles
    if (typeof methodName === 'string') {
      openGroup = openGroup || 'coll';
      message = message || '';
      args = ( (arguments.length > 3) ?
        Array.prototype.slice.call(arguments, 3) : null
      );
    }
    else {
      openGroup = methodName[1] || 'coll';
      message = methodName[2] || '';
      args = (methodName.length > 3) ? methodName.slice(3) : null;
      methodName = methodName[0];
    }

    // Check for end group type
    if (openGroup === 'end') {
      console.groupEnd();
      return true;
    }

    // Ensure group type is correct
    if (openGroup !== 'open' && openGroup !== 'coll') {
      message = 'A debug.group method\'s openGroup arg was wrong. ';
      message += 'The supplied openGroup argument was \'%s\'.';
      console.error(message, openGroup);
      if (errorBreakpoints) {
        debugger;
      }
      return false;
    }

    // Prepare the message
    if (message) {
      if (args) {
        message = insertSubstituteStrings(message, args);
      }
      message = ' | ' + message;
    }
    message = 'GROUP: ' + this.classTitle + methodName + '()' + message;

    // Setup the console open group args
    if (args) {
      args.unshift(message);
    }
    else {
      args = [ message ];
    }

    // Open a console group
    if (openGroup === 'coll') {
      console.groupCollapsed.apply(console, args);
    }
    else {
      console.group.apply(console, args);
    }

    // Pause the script
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

    // Setup the varaibles
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

    // Setup the varaibles
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

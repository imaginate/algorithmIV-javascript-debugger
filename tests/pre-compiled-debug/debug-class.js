  /**
   * -----------------------------------------------------
   * Public Class (Debug)
   * -----------------------------------------------------
   * @desc Contains the debugging methods.
   * @param {string} classTitle - The name of the class.
   * @param {?(string|strings)} turnOffTypes - The debug categories to disable
   *   for this Debug class instance. If 'all' is provided then all categories
   *   for this Debug instance are disabled.
   * @param {?(string|strings)} turnOnBuggers - The debugger instances to
   *   enable for this Debug class instance. If 'all' is provided then all
   *   instances of debugger are enabled.
   * @constructor
   */
  var Debug = function(classTitle, turnOffTypes, turnOnBuggers) {

    classTitle += '.';

    if ( Array.isArray(turnOffTypes) ) {
      turnOffTypes = turnOffTypes.join(' ');
    }
    if ( Array.isArray(turnOnBuggers) ) {
      turnOnBuggers = turnOnBuggers.join(' ');
    }

    if (turnOffTypes) {
      turnOffTypes = turnOffTypes.toLowerCase();
    }
    if (turnOnBuggers) {
      turnOnBuggers = turnOnBuggers.toLowerCase();
    }

    /**
     * -----------------------------------------------------
     * Private Variable (types)
     * -----------------------------------------------------
     * @desc Allows disabling of specific debug methods per class instance.
     *   <ol>
     *     <li>start: Logs the start of every method.</li>
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
     *   args : boolean,
     *   fail : boolean,
     *   group: boolean,
     *   state: boolean,
     *   misc : boolean
     * }}
     * @private
     */
    var types = {
      start: (!turnOffTypes || !/start|all/.test(turnOffTypes)),
      args : (!turnOffTypes ||  !/args|all/.test(turnOffTypes)),
      fail : (!turnOffTypes ||  !/fail|all/.test(turnOffTypes)),
      group: (!turnOffTypes || !/group|all/.test(turnOffTypes)),
      state: (!turnOffTypes || !/state|all/.test(turnOffTypes)),
      misc : (!turnOffTypes ||  !/misc|all/.test(turnOffTypes))
    };

    /**
     * -----------------------------------------------------
     * Private Variable (buggers)
     * -----------------------------------------------------
     * @desc Allows disabling of debugger instances in debug methods.
     * @type {{
     *   start: boolean,
     *   args : boolean,
     *   fail : boolean,
     *   group: boolean,
     *   state: boolean,
     *   misc : boolean
     * }}
     * @private
     */
    var buggers = {
      start: (!!turnOnBuggers && /start|all/.test(turnOnBuggers)),
      args : (!!turnOnBuggers &&  /args|all/.test(turnOnBuggers)),
      fail : (!!turnOnBuggers &&  /fail|all/.test(turnOnBuggers)),
      group: (!!turnOnBuggers && /group|all/.test(turnOnBuggers)),
      state: (!!turnOnBuggers && /state|all/.test(turnOnBuggers)),
      misc : (!!turnOnBuggers &&  /misc|all/.test(turnOnBuggers))
    };

    /**
     * ---------------------------------------------------
     * Public Property (Debug.classTitle)
     * ---------------------------------------------------
     * @desc The class name for the instance.
     * @type {string}
     */
    this.classTitle = classTitle;

    /**
     * ---------------------------------------------------
     * Public Method (Debug.getType)
     * ---------------------------------------------------
     * @desc Retrieve this instance's value for the supplied type.
     * @param {string} type - The type to get.
     * @return {boolean}
     */
    this.getType = function(type) {
      return (!!types[type]);
    };

    /**
     * ---------------------------------------------------
     * Public Method (Debug.getBugger)
     * ---------------------------------------------------
     * @desc Retrieve this instance's debuuger value for the supplied type.
     * @param {string} type - The type's debugger setting to get.
     * @return {boolean}
     */
    this.getBugger = function(type) {
      return (!!buggers[type]);
    };

    /**
     * ---------------------------------------------------
     * Public Method (Debug.setType)
     * ---------------------------------------------------
     * @desc Set this instance's value for the supplied type.
     * @param {string} type - The type to set.
     * @param {boolean} val - The type's new value.
     * @return {boolean} Indicates whether correct arguments were given.
     */
    this.setType = function(type, val) {

      if (typeof type === 'string' && typeof val  === 'boolean') {

        type = type.toLowerCase();

        if (types.hasOwnProperty(type) || type === 'all') {

          if (type === 'all') {
            for (type in types) {
              if ( types.hasOwnProperty(type) ) {
                types[type] = val;
              }
            }
          }
          else {
            types[type] = val;
          }

          return true;
        }
      }

      return false;
    };

    /**
     * ---------------------------------------------------
     * Public Method (Debug.setBugger)
     * ---------------------------------------------------
     * @desc Set this instance's debugger value for the supplied type.
     * @param {string} type - The type's debugger value to set.
     * @param {boolean} val - The type's new debugger value.
     * @return {boolean} Indicates whether correct arguments were given.
     */
    this.setBugger = function(type, val) {

      if (typeof type === 'string' && typeof val  === 'boolean') {

        type = type.toLowerCase();

        if (buggers.hasOwnProperty(type) || type === 'all') {

          if (type === 'all') {
            for (type in buggers) {
              if ( buggers.hasOwnProperty(type) ) {
                buggers[type] = val;
              }
            }
          }
          else {
            buggers[type] = val;
          }

          return true;
        }
      }

      return false;
    };
  };

  // Ensure constructor is set to this class.
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
      debugger;
      return;
    }

    // Check whether this method has been turned off for the current instance
    if ( !this.getType('start') ) {
      return;
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
    message = 'START: ' + this._classTitle + methodName + '(';
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
    if ( this.getBugger('start') ) {
      debugger;
    }
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
      (arguments.length > 3) : ( Array.isArray(methodName) ) ?
        (typeof methodName[0] === 'string' && methodName.length > 3) : false
    );
    if(!argTest) {
      console.error('A debug.args method\'s arg(s) was wrong.');
      debugger;
      return;
    }

    // Check whether this method has been turned off for the current instance
    if ( !this.getType('args') ) {
      return;
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
      return;
    }

    // Prepare and log the error message
    message = 'ARGS: ' + this._classTitle + methodName + '() | ';
    message += 'Error: Incorrect argument operand.';
    console.error(message);

    // Pause the script
    if ( this.getBugger('args') ) {
      debugger;
    }
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
      debugger;
      return;
    }

    // Check whether this method has been turned off for the current instance
    if ( !this.getType('fail') ) {
      return;
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
      return;
    }

    // Prepare the message
    if (args) {
      message = insertSubstituteStrings(message, args);
    }
    message = 'FAIL: ' + this._classTitle + methodName + '() | ' + message;

    // Log the error
    if (args) {
      args.unshift(message);
      console.error.apply(console, args);
    }
    else {
      console.error(message);
    }

    // Pause the script
    if ( this.getBugger('fail') ) {
      debugger;
    }
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
      debugger;
      return;
    }

    // Check whether this method has been turned off for the current instance
    if ( !this.getType('group') ) {
      return;
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
      return;
    }

    // Ensure group type is correct
    if (openGroup !== 'open' && openGroup !== 'coll') {
      message = 'A debug.group method\'s openGroup arg was wrong. ';
      message += 'The supplied openGroup argument was \'%s\'.';
      console.error(message, openGroup);
      debugger;
      return;
    }

    // Prepare the message
    if (message) {
      if (args) {
        message = insertSubstituteStrings(message, args);
      }
      message = ' | ' + message;
    }
    message = 'GROUP: ' + this._classTitle + methodName + '()' + message;

    // Setup the console open group args
    if (args) {
      args.unshift(message);
    }
    else {
      args = [ message ];
    }

    // Check for collapsed group type
    if (openGroup === 'coll') {
      console.groupCollapsed.apply(console, args);
      return;
    }

    // Open a console group
    console.group.apply(console, args);

    // Pause the script
    if ( this.getBugger('group') ) {
      debugger;
    }
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
      debugger;
      return;
    }

    // Check whether this method has been turned off for the current instance
    if ( !this.getType('state') ) {
      return;
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
    message = 'STATE: ' + this._classTitle + methodName + '() | ' + message;

    // Prepare the console args
    args.unshift(message);

    // Log the state
    console.log.apply(console, args);

    // Pause the script
    if ( this.getBugger('state') ) {
      debugger;
    }
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
      debugger;
      return;
    }

    // Check whether this method has been turned off for the current instance
    if ( !this.getType('misc') ) {
      return;
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
    message = 'MISC: ' + this._classTitle + methodName + '() | ' + message;

    // Log the misc message
    if (args) {
      args.unshift(message);
      console.log.apply(console, args);
    }
    else {
      console.log(message);
    }

    // Pause the script
    if ( this.getBugger('misc') ) {
      debugger;
    }
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
     * @type {boolean}
     * @private
     */
    var testSet;
    /**
     * @type {?strings}
     * @private
     */
    var args;

    // Ensure arguments are supplied
    if (!logCat) {
      console.error('A debug.turnOn method received no args.');
      debugger;
      return;
    }

    // Setup the variables
    args = ( (Array.isArray(logCat) && logCat.length > 1) ?
      logCat.slice(0) : (arguments.length > 1) ?
        Array.prototype.slice.call(arguments, 0) : null
    );
    logCat = ( (args) ?
      null : (typeof logCat === 'string') ?
        logCat : ( Array.isArray(logCat) ) ?
          logCat[0] : null
    );

    // Turn on the debug method category(ies) & save the result(s)
    testSet = ( (args) ?
      args.every(function(/** string */ val) {
        return (!!val && typeof val === 'string' && this.setType(val, true));
      }, this)
      : (!!logCat && this.setType(logCat, true))
    );

    // Test the result(s)
    if (!testSet) {
      logCat = 'A debug.turnOn method\'s arg(s) was wrong. ';
      logCat += 'Ensure that the correct operands are given, ';
      logCat += 'and each string is a valid debug category or \'all\'.';
      console.error(logCat);
      debugger;
    }
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
     * @type {boolean}
     * @private
     */
    var testSet;
    /**
     * @type {?strings}
     * @private
     */
    var args;

    // Ensure arguments are supplied
    if (!logCat) {
      console.error('A debug.turnOff method received no args.');
      debugger;
      return;
    }

    // Setup the variables
    args = ( (Array.isArray(logCat) && logCat.length > 1) ?
      logCat.slice(0) : (arguments.length > 1) ?
        Array.prototype.slice.call(arguments, 0) : null
    );
    logCat = ( (args) ?
      null : (typeof logCat === 'string') ?
        logCat : ( Array.isArray(logCat) ) ?
          logCat[0] : null
    );

    // Turn off the debug method category(ies) & save the result(s)
    testSet = ( (args) ?
      args.every(function(/** string */ val) {
        return (!!val && typeof val === 'string' && this.setType(val, false));
      }, this)
      : (!!logCat && this.setType(logCat, false))
    );

    // Test the result(s)
    if (!testSet) {
      logCat = 'A debug.turnOff method\'s arg(s) was wrong. ';
      logCat += 'Ensure that the correct operands are given, ';
      logCat += 'and each string is a valid debug category or \'all\'.';
      console.error(logCat);
      debugger;
    }
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
     * @type {boolean}
     * @private
     */
    var testSet;
    /**
     * @type {?strings}
     * @private
     */
    var args;

    // Ensure arguments are supplied
    if (!logCat) {
      console.error('A debug.turnOnDebugger method received no args.');
      debugger;
      return;
    }

    // Setup the variables
    args = ( (Array.isArray(logCat) && logCat.length > 1) ?
      logCat.slice(0) : (arguments.length > 1) ?
        Array.prototype.slice.call(arguments, 0) : null
    );
    logCat = ( (args) ?
      null : (typeof logCat === 'string') ?
        logCat : ( Array.isArray(logCat) ) ?
          logCat[0] : null
    );

    // Turn off the debug method category(ies) & save the result(s)
    testSet = ( (args) ?
      args.every(function(/** string */ val) {
        return (!!val && typeof val === 'string' && this.setBugger(val, true));
      }, this)
      : (!!logCat && this.setBugger(logCat, true))
    );

    // Test the result(s)
    if (!testSet) {
      logCat = 'A debug.turnOnDebugger method\'s arg(s) was wrong. ';
      logCat += 'Ensure that the correct operands are given, ';
      logCat += 'and each string is a valid debug category or \'all\'.';
      console.error(logCat);
      debugger;
    }
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
     * @type {boolean}
     * @private
     */
    var testSet;
    /**
     * @type {?strings}
     * @private
     */
    var args;

    // Ensure arguments are supplied
    if (!logCat) {
      console.error('A debug.turnOffDebugger method received no args.');
      debugger;
      return;
    }

    // Setup the variables
    args = ( (Array.isArray(logCat) && logCat.length > 1) ?
      logCat.slice(0) : (arguments.length > 1) ?
        Array.prototype.slice.call(arguments, 0) : null
    );
    logCat = ( (args) ?
      null : (typeof logCat === 'string') ?
        logCat : ( Array.isArray(logCat) ) ?
          logCat[0] : null
    );

    // Turn off the debug method category(ies) & save the result(s)
    testSet = ( (args) ?
      args.every(function(/** string */ val) {
        return (!!val && typeof val === 'string' && this.setBugger(val, false));
      }, this)
      : (!!logCat && this.setBugger(logCat, false))
    );

    // Test the result(s)
    if (!testSet) {
      logCat = 'A debug.turnOffDebugger method\'s arg(s) was wrong. ';
      logCat += 'Ensure that the correct operands are given, ';
      logCat += 'and each string is a valid debug category or \'all\'.';
      console.error(logCat);
      debugger;
    }
  };

/** @preserve blank line for custom compile (sed scripting) */

/**
 * -----------------------------------------------------------------------------
 * Algorithm IV Debug - Module (v1.0.1)
 * -----------------------------------------------------------------------------
 * @file The module for creating an aIV Debug object instance.
 * @module aIVDebug
 * @version 1.0.1
 * @author Adam Smith ({@link adamsmith@youlum.com})
 * @copyright 2015 Adam A Smith ([github.com/imaginate]{@link https://github.com/imaginate})
 * @license The MIT License ([algorithmiv.com/docs/license]{@link http://algorithmiv.com/docs/license})
 **
 * @desc More details about aIV.debug's module:
 * <ol>
 *   <li>annotations: 
 *       [See Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/}
 *       and [See JSDoc3]{@link http://usejsdoc.org/}
 *   </li>
 *   <li>contributing: 
 *       [See the guideline]{@link https://github.com/imaginate/algorithmIV--javascript-debugger/blob/master/CONTRIBUTING.md}
 *   </li>
 * </ol>
 */

/**
 * -----------------------------------------------------------------------------
 * Pre-Defined JSDoc Types
 * -----------------------------------------------------------------------------
 * @typedef {*} val
 * @typedef {Array<*>} vals
 * @typedef {Array<string>} strings
 * @typedef {Array<number>} numbers
 * @typedef {Array<Object>} objects
 * @typedef {{ newDebug: function(?Object) }} newDebug
 */

(function(/** Window */ window, /** newDebug */ debug) {
  "use strict";


/* -----------------------------------------------------------------------------
 * | The Public API                                                            |
 * v ------------------------------------------------------------------------- v
                                                              public-api.js */
  /**
   * ---------------------------------------------------
   * Global Variable (aIV)
   * ---------------------------------------------------
   * @desc Holds the public API for aIV's apps, tools, and libraries.
   * @struct
   * @global
   */
  window.aIV = window.aIV || {};

  /**
   * ---------------------------------------------------
   * Global Method (aIV.debug)
   * ---------------------------------------------------
   * @desc Creates an instance of aIV's Debug class.
   * @param {(string|{
   *   classTitle     : (string|undefined),
   *   turnOffTypes   : (string|strings|undefined),
   *   turnOnDebuggers: (string|strings|undefined)
   * })=} settings - The Debug instance's settings.
   * return {Debug}
   * @global
   */
  aIV.debug = debug.newDebug;

})(window, (function() {
  "use strict"; 


/* -----------------------------------------------------------------------------
 * | The External API for the Module                                           |
 * v ------------------------------------------------------------------------- v
                                                            external-api.js */
  /**
   * -----------------------------------------------------
   * Private Variable (_return)
   * -----------------------------------------------------
   * @desc Holds the public methods for the module.
   * @typedef {newDebug}
   * @struct
   */
  var _return = {};

  /**
   * -----------------------------------------------------
   * Private Variable (_instances)
   * -----------------------------------------------------
   * @desc Saves a reference to each instance of Debug.
   * @type {!Object}
   * @private
   */
  var _instances = {};

  /**
   * -----------------------------------------------------
   * Public Method (_return.newDebug)
   * -----------------------------------------------------
   * @desc Returns an instance of Debug.
   * @param {(string|Object)} settings - The Debug instance's settings.
   */
  _return.newDebug = function(settings) {

    /**
     * @type {!string}
     * @private
     */
    var classTitle;
    /**
     * @type {?(string|strings)}
     * @private
     */
    var turnOffTypes;
    /**
     * @type {?(string|strings)}
     * @private
     */
    var turnOnBuggers;

    if (typeof settings !== 'string' && typeof settings !== 'object') {
      settings = null;
    }

    // Setup classTitle
    if (typeof settings === 'string') {
      classTitle = settings;
      settings = null;
    }
    else {
      classTitle = ( (settings && !!settings.classTitle &&
                      typeof settings.classTitle === 'string') ?
        settings.classTitle : 'unknown'
      );
    }

    // Create a new Debug instance
    if ( !_instances.hasOwnProperty(classTitle) ) {

      turnOffTypes = ( (settings && !!settings.turnOffTypes) ?
        settings.turnOffTypes : null
      );
      if ( !checkType(turnOffTypes, 'string|strings') ) {
        turnOffTypes = null;
      }

      turnOnBuggers = ( (settings && !!settings.turnOnDebuggers) ?
        settings.turnOnDebuggers : null
      );
      if ( !checkType(turnOnBuggers, 'string|strings') ) {
        turnOnBuggers = null;
      }

      // Setup, save, and freeze the new Debug instance
      _instances[classTitle] = new Debug(classTitle, turnOffTypes, turnOnBuggers);
      Object.freeze(_instances[classTitle]);
    }

    return _instances[classTitle];
  };

  /**
   * -----------------------------------------------------
   * Public Method (_return.newDebug.config)
   * -----------------------------------------------------
   * @desc Allows you to configure settings for all of the debug instances
   *   called in the app.
   * @param {(string|Object)} settings - The Debug module's settings.
   */
  _return.newDebug.config = function(settings) {

    /** @type {string} */
    var msg;

    if (typeof settings !== 'object') {
      msg = 'The settings given to aIV.debug.config were incorrrect. They ';
      msg += 'should be an object. They were a(n) %s.';
      console.error(msg, (typeof settings));
      if (debuggers) {
        debugger;
      }
      return;
    }

    // Configure debuggers
    if (settings.hasOwnProperty('errorDebuggers') &&
        typeof settings.errorDebuggers === 'boolean') {
      debuggers = settings.errorDebuggers;
    }
  };


/* -----------------------------------------------------------------------------
 * | The Public Variables for the Module                                       |
 * v ------------------------------------------------------------------------- v
                                                             module-vars.js */
  /**
   * ----------------------------------------------- 
   * Public Variable (debuggers)
   * -----------------------------------------------
   * @desc Controls whether debuggers are included with error logs.
   * @type {boolean}
   */
  var debuggers = true;

  /**
   * ----------------------------------------------- 
   * Public Variable (regexps)
   * -----------------------------------------------
   * @desc Regular expressions that are used multiple times
   *   by the debugger (avoid re-creating multiple times).
   * @type {Object<string, Object>}
   */
  var regexps = {};

  /**
   * ----------------------------------------------- 
   * Public Variable (regexps.types)
   * -----------------------------------------------
   * @desc Regular expressions that contain types.
   * @type {Object<string, RegExp>}
   */
  regexps.types = {};

  /**
   * ----------------------------------------------- 
   * Public Variable (regexps.types.all)
   * -----------------------------------------------
   * @desc All the types available.
   * @type {RegExp}
   */
  regexps.types.all = (function() {
    /** @type {string} */
    var types;

    types = '' +
    '^string$|^number$|^boolean$|^object$|^array$|^function$|^elem$|'          +
    '^undefined$|^strings$|^numbers$|^booleans$|^objects$|^arrays$|^elems$|'   +
    '^functions$|^stringmap$|^numbermap$|^booleanmap$|^objectmap$|^arraymap$|' +
    '^functionmap$|^elemmap$';

    return new RegExp(types);
  })();

  /**
   * ----------------------------------------------- 
   * Public Variable (regexps.types.basic)
   * -----------------------------------------------
   * @desc The basic types available.
   * @type {RegExp}
   */
  regexps.types.basic = (function() {
    /** @type {string} */
    var types;

    types = '^string$|^number$|^boolean$|^object$|' +
            '^function$|^elem$|^undefined$';

    return new RegExp(types);
  })();

  /**
   * ----------------------------------------------- 
   * Public Variable (regexps.types.arrays)
   * -----------------------------------------------
   * @desc The array types available.
   * @type {RegExp}
   */
  regexps.types.arrays = (function() {
    /** @type {string} */
    var types;

    types = '^strings$|^numbers$|^booleans$|^objects$|' +
            '^arrays$|^elems$|^functions$';

    return new RegExp(types);
  })();

  /**
   * ----------------------------------------------- 
   * Public Variable (regexps.types.maps)
   * -----------------------------------------------
   * @desc The hash map types available.
   * @type {RegExp}
   */
  regexps.types.maps = (function() {
    /** @type {string} */
    var types;

    types = '^stringmap$|^numbermap$|^booleanmap$|^objectmap$|' +
            '^arraymap$|^functionmap$|^elemmap$';

    return new RegExp(types);
  })();


/* -----------------------------------------------------------------------------
 * | The Public Methods for the Module                                         |
 * v ------------------------------------------------------------------------- v
                                                          module-methods.js */
  /**
   * ---------------------------------------------------
   * Public Method (getSubstituteString)
   * ---------------------------------------------------
   * @desc Gets the correct substitution string for the given value.
   * @param {val} val - The value to be evaluated.
   * @return {string} The correct substitution string.
   */
  function getSubstituteString(val) {

    if ( checkType(val, 'object|function') ) {
      return '%O';
    }

    if (typeof val === 'number') {
      return '%i';
    }

    return '%s';
  };

  /**
   * ---------------------------------------------------
   * Public Method (insertSubstituteStrings)
   * ---------------------------------------------------
   * @desc Inserts the correct substitution strings into a console message.
   * @param {string} msg - The original console message string.
   * @param {vals} vals - The values to use for finding the
   *   substitution strings.
   * @return {string} The prepared console message.
   */
  function insertSubstituteStrings(msg, vals) {

    // Test the given arguments before executing
    if (typeof msg !== 'string' || !Array.isArray(vals)) {
      console.error('An insertSubstituteStrings method\'s arg(s) was wrong.');
      if (debuggers) {
        debugger;
      }
      return '';
    }

    // Insert the substitution strings
    vals.forEach(function(/** val */ val, /** number */ i) {
      /**
       * @type {string}
       * @private
       */
      var sub;

      sub = getSubstituteString(val);
      if ( /(\$\$)/.test(msg) ) {
        msg = msg.replace(/(\$\$)/, sub);
      }
      else {
        msg += ' var' + i + '= ' + sub + ';';
      }
    });

    return msg;
  };

  /**
   * ---------------------------------------------------
   * Public Method (checkType)
   * ---------------------------------------------------
   * @param {val} val - The value to be evaluated.
   * @param {string} type - The type to evaluate the value against. The optional
   *   types are 'string', 'number', 'boolean', 'object', 'function', 'elem',
   *   'undefined', 'array', 'strings', 'numbers', 'booleans', 'objects',
   *   'functions', 'arrays', 'elems', 'stringMap', 'numberMap', 'booleanMap',
   *   'objectMap', 'functionMap', 'arrayMap', and 'elemMap'. Use '|' as the
   *   separator for multiple types (e.g.'strings|numbers'). Use '=' to indicate
   *   the value is optional (e.g. 'array=' or 'string|number='). Use '!' to
   *   indicate that null is not a possibility (e.g. '!string').
   * @return {boolean} The evaluation result.
   */
  function checkType(val, type) {

    // Test the given arguments before executing
    var msg;
    if (typeof type !== 'string') {
      msg = 'A checkType method\'s type was the wrong data type. ';
      msg += 'It should be a string. The given type was a(n) %s.';
      console.error(msg, (typeof type));
      if (debuggers) {
        debugger;
      }
      return false;
    }

    /**
     * @type {strings}
     * @private
     */
    var types;

    type = type.toLowerCase().replace(/[^a-z\|\=\!]/g, '');

    types = ( /\|/.test(type) ) ? type.split('|') : [ type ];

    return types.some(function(/** string */ type) {
      /**
       * @type {string}
       * @private
       */
      var cleanType;

      cleanType = type.replace(/\!|\=/g, '');

      // Ensure a correct type was given
      if ( !regexps.types.all.test(cleanType) ) {
        msg = 'A checkType method\'s type was the wrong value. ';
        msg += 'See the docs for acceptable values. ';
        msg += 'The incorrect value was \'%s\'.';
        console.error(msg, type);
        if (debuggers) {
          debugger;
        }
        return false;
      }

      // Handle undefined val
      if (val === undefined) {
        type = type.replace(/\!/g, '');
        return /\=|^undefined$/.test(type);
      }
      else {

        // Evaluate null
        if (val === null) {
          return !(/\!/.test(type));
        }

        if (cleanType === 'undefined') {
          return false;
        }

        // Evaluate array types
        if ( regexps.types.arrays.test(cleanType) ) {

          if ( !Array.isArray(val) ) {
            return false;
          }

          // Evaluate a basic array
          if (cleanType === 'array') {
            return true;
          }

          // Evaluate an array of arrays
          if (cleanType === 'arrays') {
            return val.every(function(subVal) {
              return ( Array.isArray(subVal) );
            });
          }

          // Evaluate an array of elements
          if (cleanType === 'elems') {
            return val.every(function(subVal) {
              return (subVal instanceof HTMLElement);
            });
          }

          // Evaluate each value of the array
          cleanType = cleanType.replace(/s$/, '');
          return val.every(function(subVal) {
            return (typeof subVal === cleanType);
          });
        }

        // Evaluate element
        if (cleanType === 'elem') {
          return (val instanceof HTMLElement);
        }

        // Evaluate string, number, boolean, object, and function types
        if ( regexps.types.basic.test(cleanType) ) {
          return (typeof val === cleanType);
        }

        // Evaluate hash map types
        if ( regexps.types.maps.test(cleanType) ) {

          if (typeof val !== 'object') {
            return false;
          }

          // Evaluate a hash map of arrays
          if (cleanType === 'arraymap') {
            return Object.keys(val).every(function(subVal) {
              return ( Array.isArray(val[ subVal ]) );
            });
          }

          // Evaluate a hash map of elements
          if (cleanType === 'elemmap') {
            return Object.keys(val).every(function(subVal) {
              return (val[ subVal ] instanceof HTMLElement);
            });
          }

          // Evaluate each value of the hash map
          cleanType = cleanType.replace(/map$/, '');
          return Object.keys(val).every(function(subVal) {
            return (typeof val[ subVal ] === cleanType);
          });
        }
      }

      return false;
    });
  };


/* -----------------------------------------------------------------------------
 * | The Debug Class                                                             |
 * v ------------------------------------------------------------------------- v
                                                             debug-class.js */
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
      if (debuggers) {
        debugger;
      }
      return false;
    }

    // Check whether this method has been turned off for the current instance
    if ( !this.getType('start') ) {
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
    if ( this.getBugger('start') ) {
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
      if (debuggers) {
        debugger;
      }
      return false;
    }

    // Check whether this method has been turned off for the current instance
    if ( !this.getType('args') ) {
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
    if ( this.getBugger('args') ) {
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
      if (debuggers) {
        debugger;
      }
      return false;
    }

    // Check whether this method has been turned off for the current instance
    if ( !this.getType('fail') ) {
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
    if ( this.getBugger('fail') ) {
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
      if (debuggers) {
        debugger;
      }
      return false;
    }

    // Check whether this method has been turned off for the current instance
    if ( !this.getType('group') ) {
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
      if (debuggers) {
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
    if ( this.getBugger('group') ) {
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
      if (debuggers) {
        debugger;
      }
      return false;
    }

    // Check whether this method has been turned off for the current instance
    if ( !this.getType('state') ) {
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
    if ( this.getBugger('state') ) {
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
      if (debuggers) {
        debugger;
      }
      return false;
    }

    // Check whether this method has been turned off for the current instance
    if ( !this.getType('misc') ) {
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
    if ( this.getBugger('misc') ) {
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
      if (debuggers) {
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
      if (debuggers) {
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
        if ( !this.setType(args[i], true) ) {
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
      if ( !this.setType(logCat, true) ) {
        errors = "'" + logCat + "'";
      }
    }

    // Report any errors
    if (errors) {
      errors = '' +
        'A debug.turnOn method was given an invalid debug category ' +
        'to turn on. The incorrect value(s) follow:' + errors;
      console.error(errors);
      if (debuggers) {
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
      if (debuggers) {
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
      if (debuggers) {
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
        if ( !this.setType(args[i], false) ) {
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
      if ( !this.setType(logCat, false) ) {
        errors = "'" + logCat + "'";
      }
    }

    // Report any errors
    if (errors) {
      errors = '' +
        'A debug.turnOff method was given an invalid debug category ' +
        'to turn off. The incorrect value(s) follow:' + errors;
      console.error(errors);
      if (debuggers) {
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
      if (debuggers) {
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
      if (debuggers) {
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
        if ( !this.setBugger(args[i], true) ) {
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
      if ( !this.setBugger(logCat, true) ) {
        errors = "'" + logCat + "'";
      }
    }

    // Report any errors
    if (errors) {
      errors = '' +
        'A debug.turnOnDebugger method was given an invalid debug ' +
        'category to turn on. The incorrect value(s) follow:' + errors;
      console.error(errors);
      if (debuggers) {
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
      if (debuggers) {
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
      if (debuggers) {
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
        if ( !this.setBugger(args[i], false) ) {
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
      if ( !this.setBugger(logCat, false) ) {
        errors = "'" + logCat + "'";
      }
    }

    // Report any errors
    if (errors) {
      errors = '' +
        'A debug.turnOffDebugger method was given an invalid debug ' +
        'category to turn off. The incorrect value(s) follow:' + errors;
      console.error(errors);
      if (debuggers) {
        debugger;
      }
      return false;
    }

    return false;
  };


/* -----------------------------------------------------------------------------
 * | The Polyfill Methods                                                      |
 * v ------------------------------------------------------------------------- v
                                                        polyfill-methods.js */
  if (!Object.keys) {
    /**
     * ---------------------------------------------
     * Public Method (Object.keys)
     * ---------------------------------------------
     * @desc A polyfill for the native method. For method details
     *   [see MDN]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys}
     * @param {!Object} obj
     * @return {vals}
     */
    Object.keys = (function(obj) {

      /** @type {Object} */
      var testObj;
      /** @type {boolean} */
      var enumBug;
      /** @type {strings} */
      var notEnum;

      testObj = { toString: null };
      enumBug = !( testObj.propertyIsEnumerable('toString') );
      notEnum = [
        'toString',
        'toLocaleString',
        'valueOf',
        'hasOwnProperty',
        'isPrototypeOf',
        'propertyIsEnumerable',
        'constructor'
      ];

      return function(obj) {

        polyfill.debug.start('Object.keys', obj);
        polyfill.debug.args('Object.keys', obj, '!object|function');

        if (typeof obj !== 'object' && typeof obj !== 'function') {
          throw new TypeError('Object.keys only accepts objects.');
          return;
        }

        if (obj === null) {
          throw new TypeError('Object.keys does not accept null types.');
          return;
        }

        /** @type {string} */
        var prop;
        /** @type {number} */
        var i;
        /** @type {vals} */
        var result;

        result = [];

        for (prop in obj) {
          if ( obj.hasOwnProperty(prop) ) {
            result.push(prop);
          }
        }

        if (enumBug) {
          i = notEnum.length;
          while (i--) {
            if ( obj.hasOwnProperty(notEnum[i]) ) {
              result.push(notEnum[i]);
            }
          }
        }

        return result;
      };
    })();
  }

  if (!Object.freeze) {
    /**
     * ---------------------------------------------
     * Public Method (Object.freeze)
     * ---------------------------------------------
     * @desc A polyfill for the native method. For method details
     *   [see MDN]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze}
     * @param {Object} obj
     * @return {Object}
     */
    Object.freeze = function(obj) {

      polyfill.debug.start('Object.freeze', obj);
      polyfill.debug.args('Object.freeze', obj, 'object|function');

      if (typeof obj !== 'object' && typeof obj !== 'function') {
        throw new TypeError('Object.freeze only accepts objects.');
        return;
      }

      return obj;
    };
  }

  // Fix Object.freeze function param bug
  try {
    Object.freeze(function() {});
  }
  catch (e) {
    Object.freeze = (function(originalFreeze) {
      return function(obj) {
        if (typeof obj === 'function') {
          return obj;
        }
        else {
          return originalFreeze(obj);
        }
      };
    }(Object.freeze));
  }


/* -----------------------------------------------------------------------------
 * | End of module                                                             |
 * v ------------------------------------------------------------------------- v
                                                                            */
  return _return;

})());
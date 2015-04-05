/**
 * -----------------------------------------------------------------------------
 * Algorithm IV Debug Tests - Module (v1.0.2)
 * -----------------------------------------------------------------------------
 * @file The module for testing the aIV debug module.
 * @module aIVDebugTests
 * @version 1.0.2
 * @author Adam Smith ({@link adamsmith@youlum.com})
 * @copyright 2015 Adam A Smith ([github.com/imaginate]{@link https://github.com/imaginate})
 * @license The MIT License ([algorithmiv.com/docs/license]{@link http://algorithmiv.com/docs/license})
 **
 * @desc More details about the module for aIV.tests:
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
 * @typedef {{ init: function() }} tests
 */

(function(/** Window */ window, /** tests */ tests) {
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
   * Global Method (aIV.tests)
   * ---------------------------------------------------
   * @desc Runs tests on aIV.debug.
   * @type {function()}
   * @global
   */
  aIV.tests = tests.init;

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
   * @typedef {tests}
   * @struct
   */
  var _return = {};

  /**
   * -----------------------------------------------------
   * Private Variable (_initialized)
   * -----------------------------------------------------
   * @desc Indicates whether the tests module has been initialized.
   * @type {boolean}
   * @private
   */
  var _initialized = false;

  /**
   * -----------------------------------------------------
   * Public Method (_return.init)
   * -----------------------------------------------------
   * @desc Initializes the aIV.debug tests.
   * @type {function()}
   */
  _return.init = function() {

    // Check if tests module has been initialized
    if (!_initialized) {

      // Save the init to prevent second init
      _initialized = true;

      // Setup the dummy app
      app = new App();
      Object.freeze(app);

      // Run the tests
      app.runTests();
    }
  };


/* -----------------------------------------------------------------------------
 * | The Public Variables for the Module                                       |
 * v ------------------------------------------------------------------------- v
                                                             module-vars.js */
  /**
   * ----------------------------------------------- 
   * Public Variable (debug)
   * -----------------------------------------------
   * @desc The Debug instance for the module's public methods.
   * @type {Object}
   */
  var debug = aIV.debug({
    classTitle     : 'module',
    turnOnDebuggers: 'fail args'
  });

  /**
   * ----------------------------------------------- 
   * Public Variable (app)
   * -----------------------------------------------
   * @desc The instance of DummyApp for the tests.
   * @type {DummyApp}
   */
  var app;


/* -----------------------------------------------------------------------------
 * | The Public Methods for the Module                                         |
 * v ------------------------------------------------------------------------- v
                                                          module-methods.js */
  /**
   * ---------------------------------------------
   * Public Method (getID)
   * ---------------------------------------------
   * @desc A shortcut for getElementById.
   * @param {string} title - The name of the id of the element to select.
   * @return {HTMLElement} A reference to element with the given id.
   */
  function getID(title) {
    return document.getElementById(title);
  }

  /**
   * ---------------------------------------------
   * Public Method (generateNumbers)
   * ---------------------------------------------
   * @desc Generates a random number or array of numbers.
   * @param {?number=} amount - The amount of numbers to return.
   * @return {(number|numbers)} The random number(s).
   */
  function generateNumbers(amount) {

    debug.start('generateNumbers', amount);
    debug.args('generateNumbers', amount, 'number=');

    /**
     * @type {number}
     * @private
     */
    var limit;
    /**
     * @type {number}
     * @private
     */
    var min;
    /**
     * @type {number}
     * @private
     */
    var max;
    /**
     * @type {number}
     * @private
     */
    var i;
    /**
     * @type {numbers}
     */
    var arr;

    amount = ( (typeof amount === 'number' && amount > 1) ?
      Math.floor(amount) : null
    );

    limit = 1000;

    if (amount && amount > limit) {
      debug.fail('generateNumbers', false, 'Error: Amount arg was over limit.');
      amount = null;
    }

    min = 1;
    max = 50;

    if (!amount) {
      return Math.floor(Math.random() * (max - min)) + min;
    }

    arr = new Array(amount);
    i = 0;

    while (++i < amount) {
      arr[i] = Math.floor(Math.random() * (max - min)) + min;
    }

    return arr;
  }


/* -----------------------------------------------------------------------------
 * | The Tests Class                                                           |
 * v ------------------------------------------------------------------------- v
                                                           classes/tests.js */
  /**
   * -----------------------------------------------------
   * Public Class (Tests)
   * -----------------------------------------------------
   * @desc The tests to run.
   * @struct
   */
  var Tests = {};

  /**
   * -------------------------------------------------
   * Public Method (Tests.checkClassTitle)
   * -------------------------------------------------
   * @desc Checks the setting of the classTitle property.
   * @type {function()}
   */
  Tests.checkClassTitle = function() {

    /** @type {TestResults} */
    var results;
    /** @type {string} */
    var msg;
    /** @type {Object} */
    var tests;

    results = new TestResults('Tests.checkClassTitle');
    Object.freeze(results);

    // Setup for the tests
    tests = {
      prop: aIV.debug({ classTitle: 'Tests.checkClassTitle.prop' }),
      str : aIV.debug('Tests.checkClassTitle.str'),
      none: aIV.debug()
    };

    // Run the tests
    if (tests.prop.classTitle !== 'Tests.checkClassTitle.prop.') {
      msg = 'Tests.checkClassTitle evaluation failed: ';
      msg += tests.prop.classTitle + ' !== Tests.checkClassTitle.prop.';
      results.addError(msg);
    }

    if (tests.str.classTitle !== 'Tests.checkClassTitle.str.') {
      msg = 'Tests.checkClassTitle evaluation failed: ';
      msg += tests.str.classTitle + ' !== Tests.checkClassTitle.str.';
      results.addError(msg);
    }

    if (tests.none.classTitle !== 'unknown.') {
      msg = 'Tests.checkClassTitle evaluation failed: ';
      msg += tests.none.classTitle + ' !== unknown.';
      results.addError(msg);
    }

    // Save the results
    app.results.push(results);
  };

  /**
   * -------------------------------------------------
   * Public Method (Tests.checkTurnOffTypes)
   * -------------------------------------------------
   * @desc Checks the setting of the turnOffTypes param.
   * @type {function()}
   */
  Tests.checkTurnOffTypes = function() {

    /** @type {TestResults} */
    var results;
    /** @type {string} */
    var msg;
    /** @type {Object} */
    var tests;

    results = new TestResults('Tests.checkTurnOffTypes');
    Object.freeze(results);

    // Setup for the tests
    tests = {
      all: aIV.debug({
        classTitle  : 'Tests.checkTurnOffTypes.all',
        turnOffTypes: 'all'
      }),
      str: aIV.debug({
        classTitle  : 'Tests.checkTurnOffTypes.str',
        turnOffTypes: 'fail state'
      }),
      arr: aIV.debug({
        classTitle  : 'Tests.checkTurnOffTypes.arr',
        turnOffTypes: [ 'fail', 'state' ]
      })
    };

    // Run the tests
    if (tests.all.getType('start') ||
        tests.all.getType('args')  ||
        tests.all.getType('fail')  ||
        tests.all.getType('group') ||
        tests.all.getType('state') ||
        tests.all.getType('misc')) {
      msg = 'Tests.turnOffTypes.all failed: no types should be on';
      results.addError(msg);
    }

    if (!tests.str.getType('start') ||
        !tests.str.getType('args')  ||
        tests.str.getType('fail')   ||
        !tests.str.getType('group') ||
        tests.str.getType('state')  ||
        !tests.str.getType('misc')) {
      msg = "Tests.turnOffTypes.str failed: only 'fail' and 'state'";
      msg += ' should be off';
      results.addError(msg);
    }

    if (!tests.arr.getType('start') ||
        !tests.arr.getType('args')  ||
        tests.arr.getType('fail')   ||
        !tests.arr.getType('group') ||
        tests.arr.getType('state')  ||
        !tests.arr.getType('misc')) {
      msg = "Tests.turnOffTypes.arr failed: only 'fail' and 'state'";
      msg += ' should be off';
      results.addError(msg);
    }

    // Save the results
    app.results.push(results);
  };

  /**
   * -------------------------------------------------
   * Public Method (Tests.checkTurnOnDebuggers)
   * -------------------------------------------------
   * @desc Checks the setting of the turnOnDebuggers param.
   * @type {function()}
   */
  Tests.checkTurnOnDebuggers = function() {

    /** @type {TestResults} */
    var results;
    /** @type {string} */
    var msg;
    /** @type {Object} */
    var tests;

    results = new TestResults('Tests.checkTurnOnDebuggers');
    Object.freeze(results);

    // Setup for the tests
    tests = {
      all: aIV.debug({
        classTitle     : 'Tests.checkTurnOnDebuggers.all',
        turnOnDebuggers: 'all'
      }),
      str: aIV.debug({
        classTitle     : 'Tests.checkTurnOnDebuggers.str',
        turnOnDebuggers: 'fail state'
      }),
      arr: aIV.debug({
        classTitle     : 'Tests.checkTurnOnDebuggers.arr',
        turnOnDebuggers: [ 'fail', 'state' ]
      })
    };

    // Run the tests
    if (!tests.all.getBugger('start') ||
        !tests.all.getBugger('args')  ||
        !tests.all.getBugger('fail')  ||
        !tests.all.getBugger('group') ||
        !tests.all.getBugger('state') ||
        !tests.all.getBugger('misc')) {
      msg = 'Tests.turnOnDebuggers.all failed: no debuggers should be off';
      results.addError(msg);
    }

    if (tests.str.getBugger('start')  ||
        tests.str.getBugger('args')   ||
        !tests.str.getBugger('fail')  ||
        tests.str.getBugger('group')  ||
        !tests.str.getBugger('state') ||
        tests.str.getBugger('misc')) {
      msg = "Tests.turnOnDebuggers.str failed: only 'fail' and 'state'";
      msg += ' should be on';
      results.addError(msg);
    }

    if (tests.str.getBugger('start')  ||
        tests.str.getBugger('args')   ||
        !tests.str.getBugger('fail')  ||
        tests.str.getBugger('group')  ||
        !tests.str.getBugger('state') ||
        tests.arr.getBugger('misc')) {
      msg = "Tests.turnOnDebuggers.arr failed: only 'fail' and 'state'";
      msg += ' should be on';
      results.addError(msg);
    }

    // Save the results
    app.results.push(results);
  };

  /**
   * -------------------------------------------------
   * Public Method (Tests.checkInstances)
   * -------------------------------------------------
   * @desc Checks that instances are not created twice for the
   *   same class.
   * @type {function()}
   */
  Tests.checkInstances = function() {

    /** @type {TestResults} */
    var results;
    /** @type {string} */
    var choiceMsg;
    /** @type {string} */
    var errorMsg;
    /** @type {Object} */
    var tests;
    /** @type {boolean} */
    var pass;

    results = new TestResults('Tests.checkInstances');
    Object.freeze(results);

    // Setup for the tests
    tests = {
      first : aIV.debug('Tests.checkInstances'),
      second: aIV.debug({
        classTitle  : 'Tests.checkInstances',
        turnOffTypes: 'misc'
      })
    };

    // Run the tests
    pass = tests.first.misc('test1', 'Instance Test 1');
    pass = pass && tests.second.misc('test2', 'Instance Test 2');
    if (!pass) {
      errorMsg = 'Tests.checkInstances failed: A misc log failed when turned on';
      results.addError(errorMsg);
    }

    tests.first.setType('misc', false);
    pass = tests.first.misc('test3', 'Instance Test 3');
    pass = pass || tests.second.misc('test4', 'Instance Test 4');
    if (pass) {
      errorMsg = 'Tests.checkInstances failed: A misc log failed when turned off';
      results.addError(errorMsg);
    }

    // Save the results
    app.results.push(results);
  };

  /**
   * -------------------------------------------------
   * Public Method (Tests.checkStart)
   * -------------------------------------------------
   * @desc Checks Debug.start method.
   * @type {function()}
   */
  Tests.checkStart = function() {

    /** @type {TestResults} */
    var results;
    /** @type {string} */
    var choiceMsg;
    /** @type {string} */
    var errorMsg;
    /** @type {Object} */
    var tests;
    /** @type {boolean} */
    var pass;

    results = new TestResults('Tests.checkStart');
    Object.freeze(results);

    // Setup for the tests
    tests = aIV.debug('Tests.checkStart');

    // Run the tests
    pass = tests.start('testMethod');
    if (!pass) {
      errorMsg = 'Tests.checkStart failed: Did not log';
      results.addError(errorMsg);
    }

    pass = tests.start('testMethod', 5, [ 5 ]);
    if (!pass) {
      errorMsg = 'Tests.checkStart failed: Did not log with arguments';
      results.addError(errorMsg);
    }

    pass = tests.start([ 'testMethod', 5, [ 5 ] ]);
    if (!pass) {
      errorMsg = 'Tests.checkStart failed: Did not log with array argument';
      results.addError(errorMsg);
    }

    choiceMsg = 'Verify that the start log message is correct. The following ';
    choiceMsg += 'message should have been logged to the console:';
    choiceMsg += ' "START: Tests.checkStart.testMethod()"';
    errorMsg = 'Tests.checkStart failed: Log message incorrect';
    app.addChoice(choiceMsg, results, errorMsg, function() {
      tests.start('testMethod');
    });

    // Save the results
    app.results.push(results);
  };

  /**
   * -------------------------------------------------
   * Public Method (Tests.checkArgs)
   * -------------------------------------------------
   * @desc Checks Debug.args method.
   * @type {function()}
   */
  Tests.checkArgs = function() {

    /** @type {TestResults} */
    var results;
    /** @type {string} */
    var choiceMsg;
    /** @type {string} */
    var errorMsg;
    /** @type {Object} */
    var tests;
    /** @type {boolean} */
    var pass;
    /** @type {boolean} */
    var fail;
    /** @type {HTMLElement} */
    var elem;
    /** @type {Object} */
    var testMap;

    elem = document.createElement('div');

    results = new TestResults('Tests.checkArgs');
    Object.freeze(results);

    // Setup for the tests
    tests = aIV.debug('Tests.checkArgs');

    // Run the tests on 'string', 'number', 'boolean', 'object',
    // 'function', 'elem', 'undefined', 'array', 'strings', 
    // 'numbers', 'booleans', 'objects', 'functions', 'arrays',
    // 'elems', 'stringMap', 'numberMap', 'booleanMap', 'objectMap',
    // 'functionMap', 'arrayMap', 'elemMap', null, '!', '|', and '='

    // String check
    pass = tests.args('testMethod', 's', 'string');
    pass = pass && tests.args([ 'testMethod', 's', 'string' ]);
    fail = tests.args('testMethod', 1, 'string');
    fail = fail || tests.args([ 'testMethod', 1, 'string' ]);
    if (pass || !fail) {
      errorMsg = 'Tests.checkArgs failed: string check failed';
      results.addError(errorMsg);
    }

    // Number check
    pass = tests.args('testMethod', 1, 'number');
    pass = pass && tests.args([ 'testMethod', 1, 'number' ]);
    fail = tests.args('testMethod', '1', 'number');
    fail = fail || tests.args([ 'testMethod', '1', 'number' ]);
    if (pass || !fail) {
      errorMsg = 'Tests.checkArgs failed: number check failed';
      results.addError(errorMsg);
    }

    // Boolean check
    pass = tests.args('testMethod', true, 'boolean');
    pass = pass && tests.args([ 'testMethod', false, 'boolean' ]);
    fail = tests.args('testMethod', 's', 'boolean');
    fail = fail || tests.args([ 'testMethod', 's', 'boolean' ]);
    if (pass || !fail) {
      errorMsg = 'Tests.checkArgs failed: boolean check failed';
      results.addError(errorMsg);
    }

    // Object check
    pass = tests.args('testMethod', {}, 'object');
    pass = pass && tests.args([ 'testMethod', {}, 'object' ]);
    fail = tests.args('testMethod', 's', 'object');
    fail = fail || tests.args([ 'testMethod', 1, 'object' ]);
    if (pass || !fail) {
      errorMsg = 'Tests.checkArgs failed: object check failed';
      results.addError(errorMsg);
    }

    // Function check
    pass = tests.args('testMethod', function(){}, 'function');
    pass = pass && tests.args([ 'testMethod', function(){}, 'function' ]);
    fail = tests.args('testMethod', 's', 'function');
    fail = fail || tests.args([ 'testMethod', {}, 'function' ]);
    if (pass || !fail) {
      errorMsg = 'Tests.checkArgs failed: function check failed';
      results.addError(errorMsg);
    }

    // Element check
    pass = tests.args('testMethod', elem, 'elem');
    pass = pass && tests.args([ 'testMethod',  elem, 'elem' ]);
    fail = tests.args('testMethod', {}, 'elem');
    fail = fail || tests.args([ 'testMethod', 5, 'elem' ]);
    if (pass || !fail) {
      errorMsg = 'Tests.checkArgs failed: elem check failed';
      results.addError(errorMsg);
    }

    // Undefined check
    pass = tests.args('testMethod', undefined, 'undefined');
    pass = pass && tests.args([ 'testMethod', undefined, 'undefined' ]);
    fail = tests.args('testMethod', {}, 'undefined');
    fail = fail || tests.args([ 'testMethod', 's', 'undefined' ]);
    if (pass || !fail) {
      errorMsg = 'Tests.checkArgs failed: undefined check failed';
      results.addError(errorMsg);
    }

    // Array check
    pass = tests.args('testMethod', [], 'array');
    pass = pass && tests.args([ 'testMethod', [], 'array' ]);
    fail = tests.args('testMethod', {}, 'array');
    fail = fail || tests.args([ 'testMethod', 1, 'array' ]);
    if (pass || !fail) {
      errorMsg = 'Tests.checkArgs failed: array check failed';
      results.addError(errorMsg);
    }

    // Strings check
    pass = tests.args('testMethod', [ 's' ], 'strings');
    pass = pass && tests.args([ 'testMethod', [ 's' ], 'strings' ]);
    fail = tests.args('testMethod', [ 1 ], 'strings');
    fail = fail || tests.args([ 'testMethod', {}, 'strings' ]);
    if (pass || !fail) {
      errorMsg = 'Tests.checkArgs failed: strings check failed';
      results.addError(errorMsg);
    }

    // Numbers check
    pass = tests.args('testMethod', [ 1, 5 ], 'numbers');
    pass = pass && tests.args([ 'testMethod', [], 'numbers' ]);
    fail = tests.args('testMethod', [ 1, 's' ], 'numbers');
    fail = fail || tests.args([ 'testMethod', {}, 'numbers' ]);
    if (pass || !fail) {
      errorMsg = 'Tests.checkArgs failed: numbers check failed';
      results.addError(errorMsg);
    }

    // Booleans check
    pass = tests.args('testMethod', [ false ], 'booleans');
    pass = pass && tests.args([ 'testMethod', [ true ], 'booleans' ]);
    fail = tests.args('testMethod', [ 's' ], 'booleans');
    fail = fail || tests.args([ 'testMethod', {}, 'booleans' ]);
    if (pass || !fail) {
      errorMsg = 'Tests.checkArgs failed: booleans check failed';
      results.addError(errorMsg);
    }

    // Functions check
    pass = tests.args('testMethod', [ function(){} ], 'functions');
    pass = pass && tests.args([ 'testMethod', [ function(){} ], 'functions' ]);
    fail = tests.args('testMethod', [ function(){}, 1 ], 'functions');
    fail = fail || tests.args([ 'testMethod', [ {} ], 'functions' ]);
    if (pass || !fail) {
      errorMsg = 'Tests.checkArgs failed: functions check failed';
      results.addError(errorMsg);
    }

    // Objects check
    pass = tests.args('testMethod', [ {} ], 'objects');
    pass = pass && tests.args([ 'testMethod', [ {} ], 'objects' ]);
    fail = tests.args('testMethod', [ 1 ], 'objects');
    fail = fail || tests.args([ 'testMethod', {}, 'objects' ]);
    if (pass || !fail) {
      errorMsg = 'Tests.checkArgs failed: objects check failed';
      results.addError(errorMsg);
    }

    // Arrays check
    pass = tests.args('testMethod', [ [ 1 ] ], 'arrays');
    pass = pass && tests.args([ 'testMethod', [ [] ], 'arrays' ]);
    fail = tests.args('testMethod', [ [], 1 ], 'arrays');
    fail = fail || tests.args([ 'testMethod', [ {} ], 'arrays' ]);
    if (pass || !fail) {
      errorMsg = 'Tests.checkArgs failed: arrays check failed';
      results.addError(errorMsg);
    }

    // Elements check
    pass = tests.args('testMethod', [ elem ], 'elems');
    pass = pass && tests.args([ 'testMethod',  [ elem ], 'elems' ]);
    fail = tests.args('testMethod', [ {} ], 'elems');
    fail = fail || tests.args([ 'testMethod', 5, 'elems' ]);
    if (pass || !fail) {
      errorMsg = 'Tests.checkArgs failed: elems check failed';
      results.addError(errorMsg);
    }

    // String Map check
    testMap = { slot1: 'str', slot2: 'str' };
    pass = tests.args('testMethod', testMap, 'stringMap');
    pass = pass && tests.args([ 'testMethod',  {}, 'stringMap' ]);
    testMap = { slot1: 'str', slot2: 1 };
    fail = tests.args('testMethod', testMap, 'stringMap');
    fail = fail || tests.args([ 'testMethod', 5, 'stringMap' ]);
    if (pass || !fail) {
      errorMsg = 'Tests.checkArgs failed: stringMap check failed';
      results.addError(errorMsg);
    }

    // Number Map check
    testMap = { slot1: 1, slot2: 5 };
    pass = tests.args('testMethod', testMap, 'numberMap');
    pass = pass && tests.args([ 'testMethod',  {}, 'numberMap' ]);
    testMap = { slot1: 5, slot2: 'str' };
    fail = tests.args('testMethod', testMap, 'numberMap');
    fail = fail || tests.args([ 'testMethod', 5, 'numberMap' ]);
    if (pass || !fail) {
      errorMsg = 'Tests.checkArgs failed: numberMap check failed';
      results.addError(errorMsg);
    }

    // Boolean Map check
    testMap = { slot1: false, slot2: true };
    pass = tests.args('testMethod', testMap, 'booleanMap');
    pass = pass && tests.args([ 'testMethod',  {}, 'booleanMap' ]);
    testMap = { slot1: true, slot2: 'str' };
    fail = tests.args('testMethod', testMap, 'booleanMap');
    fail = fail || tests.args([ 'testMethod', 5, 'booleanMap' ]);
    if (pass || !fail) {
      errorMsg = 'Tests.checkArgs failed: booleanMap check failed';
      results.addError(errorMsg);
    }

    // Object Map check
    testMap = { slot1: {}, slot2: {} };
    pass = tests.args('testMethod', testMap, 'objectMap');
    pass = pass && tests.args([ 'testMethod',  {}, 'objectMap' ]);
    testMap = { slot1: {}, slot2: 'str' };
    fail = tests.args('testMethod', testMap, 'objectMap');
    fail = fail || tests.args([ 'testMethod', 5, 'objectMap' ]);
    if (pass || !fail) {
      errorMsg = 'Tests.checkArgs failed: objectMap check failed';
      results.addError(errorMsg);
    }

    // Function Map check
    testMap = { slot1: function(){}, slot2: function(){} };
    pass = tests.args('testMethod', testMap, 'functionMap');
    pass = pass && tests.args([ 'testMethod',  {}, 'functionMap' ]);
    testMap = { slot1: {}, slot2: function(){} };
    fail = tests.args('testMethod', testMap, 'functionMap');
    fail = fail || tests.args([ 'testMethod', 5, 'functionMap' ]);
    if (pass || !fail) {
      errorMsg = 'Tests.checkArgs failed: functionMap check failed';
      results.addError(errorMsg);
    }

    // Array Map check
    testMap = { slot1: [ 1 ], slot2: [] };
    pass = tests.args('testMethod', testMap, 'arrayMap');
    pass = pass && tests.args([ 'testMethod',  {}, 'arrayMap' ]);
    testMap = { slot1: {}, slot2: [] };
    fail = tests.args('testMethod', testMap, 'arrayMap');
    fail = fail || tests.args([ 'testMethod', 5, 'arrayMap' ]);
    if (pass || !fail) {
      errorMsg = 'Tests.checkArgs failed: arrayMap check failed';
      results.addError(errorMsg);
    }

    // Element Map check
    testMap = { slot1: elem, slot2: elem };
    pass = tests.args('testMethod', testMap, 'elemMap');
    pass = pass && tests.args([ 'testMethod',  {}, 'elemMap' ]);
    testMap = { slot1: {}, slot2: elem };
    fail = tests.args('testMethod', testMap, 'elemMap');
    fail = fail || tests.args([ 'testMethod', 5, 'elemMap' ]);
    if (pass || !fail) {
      errorMsg = 'Tests.checkArgs failed: elemMap check failed';
      results.addError(errorMsg);
    }

    // Null check
    pass = tests.args('testMethod', 's', 'string');
    pass = pass && tests.args('testMethod', null, 'string');
    pass = pass && tests.args([ 'testMethod', 's', 'string' ]);
    pass = pass && tests.args([ 'testMethod', null, 'string' ]);
    fail = tests.args('testMethod', 1, 'string');
    fail = fail || tests.args('testMethod', undefined, 'string');
    if (pass || !fail) {
      errorMsg = 'Tests.checkArgs failed: null check failed';
      results.addError(errorMsg);
    }

    // ! check
    pass = tests.args('testMethod', 's', '!string');
    pass = pass && tests.args([ 'testMethod', 's', '!string' ]);
    fail = tests.args('testMethod', null, '!string');
    fail = fail || tests.args([ 'testMethod', null, '!string' ]);
    if (pass || !fail) {
      errorMsg = 'Tests.checkArgs failed: ! check failed';
      results.addError(errorMsg);
    }

    // | check
    pass = tests.args('testMethod', 's', 'string|number');
    pass = pass && tests.args([ 'testMethod', 1, 'string|number' ]);
    fail = tests.args('testMethod', true, 'string|number');
    fail = fail || tests.args([ 'testMethod', {}, 'string|number' ]);
    if (pass || !fail) {
      errorMsg = 'Tests.checkArgs failed: | check failed';
      results.addError(errorMsg);
    }

    // = check
    pass = tests.args('testMethod', undefined, 'number=');
    pass = pass && tests.args([ 'testMethod', undefined, 'number=' ]);
    fail = tests.args('testMethod', {}, 'number=');
    fail = fail || tests.args([ 'testMethod', 's', 'number=' ]);
    if (pass || !fail) {
      errorMsg = 'Tests.checkArgs failed: = check failed';
      results.addError(errorMsg);
    }

    // Check the log message
    choiceMsg = 'Verify that the args log message is correct. The following ';
    choiceMsg += 'message should have been logged to the console:';
    choiceMsg += ' "ARGS: Tests.checkArgs.testMethod() | Error: Incorrect';
    choiceMsg += ' argument data type."';
    errorMsg = 'Tests.checkArgs failed: Log message incorrect';
    app.addChoice(choiceMsg, results, errorMsg, function() {
      tests.args('testMethod', 1, 'string');
    });

    // Save the results
    app.results.push(results);
  };

  /**
   * -------------------------------------------------
   * Public Method (Tests.checkFail)
   * -------------------------------------------------
   * @desc Checks Debug.fail method.
   * @type {function()}
   */
  Tests.checkFail = function() {

    /** @type {TestResults} */
    var results;
    /** @type {string} */
    var choiceMsg;
    /** @type {string} */
    var errorMsg;
    /** @type {Object} */
    var tests;
    /** @type {boolean} */
    var pass;
    /** @type {boolean} */
    var fail;
    /** @type {function(): boolean} */
    var testFunction;

    results = new TestResults('Tests.checkFail');
    Object.freeze(results);

    // Setup for the tests
    tests = aIV.debug('Tests.checkFail');

    // Run the tests
    pass = tests.fail('testMethod', true, 'Pass');
    pass = pass && tests.fail([ 'testMethod', true, 'Pass' ]);
    fail = tests.fail('testMethod', false, 'Fail');
    fail = fail || tests.fail([ 'testMethod', false, 'Fail' ]);
    if (pass || !fail) {
      errorMsg = 'Tests.checkFail failed: boolean check failed';
      results.addError(errorMsg);
    }

    pass = tests.fail('testMethod', 1, 'Pass');
    pass = pass && tests.fail([ 'testMethod', {}, 'Pass' ]);
    fail = tests.fail('testMethod', 0, 'Fail');
    fail = fail || tests.fail([ 'testMethod', null, 'Fail' ]);
    if (pass || !fail) {
      errorMsg = 'Tests.checkFail failed: conversion check failed';
      results.addError(errorMsg);
    }

    testFunction = function() { return true; };
    pass = tests.fail('testMethod', testFunction(), 'Pass');
    pass = pass && tests.fail([ 'testMethod', testFunction, 'Pass' ]);
    testFunction = function() { return false; };
    fail = tests.fail('testMethod', testFunction(), 'Fail');
    fail = fail || tests.fail([ 'testMethod', testFunction, 'Fail' ]);
    if (pass || !fail) {
      errorMsg = 'Tests.checkFail failed: function check failed';
      results.addError(errorMsg);
    }

    // Check the log message
    choiceMsg = 'Verify that the fail log message is correct. The following ';
    choiceMsg += 'message should have been logged to the console:';
    choiceMsg += ' "FAIL: Tests.checkFail.testMethod() | Test error."';
    errorMsg = 'Tests.checkFail failed: Log message incorrect';
    app.addChoice(choiceMsg, results, errorMsg, function() {
      tests.fail('testMethod', false, 'Test error.');
    });

    // Save the results
    app.results.push(results);
  };

  /**
   * -------------------------------------------------
   * Public Method (Tests.checkGroup)
   * -------------------------------------------------
   * @desc Checks Debug.group method.
   * @type {function()}
   */
  Tests.checkGroup = function() {

    /** @type {TestResults} */
    var results;
    /** @type {string} */
    var choiceMsg;
    /** @type {string} */
    var errorMsg;
    /** @type {Object} */
    var tests;

    results = new TestResults('Tests.checkGroup');
    Object.freeze(results);

    // Setup for the tests
    tests = aIV.debug('Tests.checkGroup');

    // Run the tests
    choiceMsg = '"GROUP: Tests.checkGroup.testMethod()" ';
    choiceMsg += 'should be an open console group.';
    errorMsg = 'debug.group failed to start an open group';
    app.addChoice(choiceMsg, results, errorMsg, function() {
      tests.group('testMethod', 'open', 'This group should be open.');
      console.log('A child log of testMethod\'s group.');
      tests.group('testMethod', 'end');
    });

    choiceMsg = '"GROUP: Tests.checkGroup.testMethod()" ';
    choiceMsg += 'should be a collapsed console group.';
    errorMsg = 'debug.group failed to start a collapsed group';
    app.addChoice(choiceMsg, results, errorMsg, function() {
      tests.group('testMethod', 'coll', 'This group should be collapsed.');
      console.log('A child log of testMethod\'s group.');
      tests.group('testMethod', 'end');
    });

    choiceMsg = 'The following message should have been logged to the console:';
    choiceMsg += '"GROUP: Tests.checkGroup.testMethod() |';
    choiceMsg += ' Args: number= 5, object= jsObjRef"';
    errorMsg = 'debug.group failed to add the vars correctly to the message';
    app.addChoice(choiceMsg, results, errorMsg, function() {
      /** @type {string} */
      var msg;

      msg = 'Args: number= $$, object= $$';
      tests.group('testMethod', 'coll', msg, 5, [ 5 ]);
      tests.group('testMethod', 'end');
    });

    // Save the results
    app.results.push(results);
  };

  /**
   * -------------------------------------------------
   * Public Method (Tests.checkState)
   * -------------------------------------------------
   * @desc Checks Debug.state method.
   * @type {function()}
   */
  Tests.checkState = function() {

    /** @type {TestResults} */
    var results;
    /** @type {string} */
    var choiceMsg;
    /** @type {string} */
    var errorMsg;
    /** @type {Object} */
    var tests;
    /** @type {boolean} */
    var pass;

    results = new TestResults('Tests.checkState');
    Object.freeze(results);

    // Setup for the tests
    tests = aIV.debug('Tests.checkState');

    // Run the tests
    pass = tests.state('testMethod');
    if (pass) {
      errorMsg = 'Tests.checkState failed: Argument checks failed to catch error';
      results.addError(errorMsg);
    }

    pass = tests.state('testMethod', 'number= $$, object= $$', 5, [ 5 ]);
    if (!pass) {
      errorMsg = 'Tests.checkState failed: Did not log when it should have';
      results.addError(errorMsg);
    }

    // Check the log message
    choiceMsg = 'Verify that the state log message is correct. The following';
    choiceMsg += ' message should have been logged to the console: "STATE:';
    choiceMsg += ' Tests.checkState.testMethod() | number= 5, object= jsObjRef"';
    errorMsg = 'Tests.checkState failed: Message was logged incorrectly';
    app.addChoice(choiceMsg, results, errorMsg, function() {
      tests.state('testMethod', 'number= $$, object= $$', 5, [ 5 ]);
    });

    // Save the results
    app.results.push(results);
  };

  /**
   * -------------------------------------------------
   * Public Method (Tests.checkMisc)
   * -------------------------------------------------
   * @desc Checks Debug.misc method.
   * @type {function()}
   */
  Tests.checkMisc = function() {

    /** @type {TestResults} */
    var results;
    /** @type {string} */
    var choiceMsg;
    /** @type {string} */
    var errorMsg;
    /** @type {Object} */
    var tests;
    /** @type {boolean} */
    var pass;

    results = new TestResults('Tests.checkMisc');
    Object.freeze(results);

    // Setup for the tests
    tests = aIV.debug('Tests.checkMisc');

    // Run the tests
    pass = tests.misc('testMethod');
    if (pass) {
      errorMsg = 'Tests.checkMisc failed: Argument checks failed to catch error';
      results.addError(errorMsg);
    }

    pass = tests.misc('testMethod', 'The log message.');
    if (!pass) {
      errorMsg = 'Tests.checkMisc failed: Did not log when it should have';
      results.addError(errorMsg);
    }

    // Check the log message
    choiceMsg = 'Verify that the misc log message is correct. The following';
    choiceMsg += ' message should have been logged to the console: "MISC:';
    choiceMsg += ' Tests.checkMisc.testMethod() | Args: number= 5, object= jsObjRef"';
    errorMsg = 'Tests.checkMisc failed: Message was logged incorrectly';
    app.addChoice(choiceMsg, results, errorMsg, function() {
      tests.misc('testMethod', 'Args: number= $$, object= $$', 5, [ 5 ]);
    });

    // Save the results
    app.results.push(results);
  };

  /**
   * -------------------------------------------------
   * Public Method (Tests.checkTurnOn)
   * -------------------------------------------------
   * @desc Checks Debug.turnOn method.
   * @type {function()}
   */
  Tests.checkTurnOn = function() {

    /** @type {TestResults} */
    var results;
    /** @type {boolean} */
    var before;
    /** @type {boolean} */
    var after;
    /** @type {string} */
    var errorMsg;
    /** @type {Object} */
    var tests;

    results = new TestResults('Tests.checkTurnOn');
    Object.freeze(results);

    // Setup for the tests
    tests = aIV.debug({
      classTitle  : 'Tests.checkTurnOn',
      turnOffTypes: 'all'
    });

    // Run the tests
    before = tests.getType('misc');
    tests.turnOn('misc');
    after = tests.getType('misc');
    if (before || !after) {
      errorMsg = 'debug.turnOn failed to turn on one type';
      results.addError(errorMsg);
    }
    tests.setType('misc', false);

    before = tests.getType('start') && tests.getType('misc');
    tests.turnOn('start misc');
    after = tests.getType('start') && tests.getType('misc');
    if (before || !after) {
      errorMsg = 'debug.turnOn failed to turn on two types with a string';
      results.addError(errorMsg);
    }
    tests.setType('all', false);

    before = tests.getType('start') && tests.getType('misc');
    tests.turnOn([ 'start', 'misc' ]);
    after = tests.getType('start') && tests.getType('misc');
    if (before || !after) {
      errorMsg = 'debug.turnOn failed to turn on two types with an array';
      results.addError(errorMsg);
    }
    tests.setType('all', false);

    before = tests.getType('start') && tests.getType('misc');
    tests.turnOn('all');
    after = tests.getType('start') && tests.getType('misc');
    if (before || !after) {
      errorMsg = 'debug.turnOn failed to turn on all types';
      results.addError(errorMsg);
    }

    // Save the results
    app.results.push(results);
  };

  /**
   * -------------------------------------------------
   * Public Method (Tests.checkTurnOff)
   * -------------------------------------------------
   * @desc Checks Debug.turnOff method.
   * @type {function()}
   */
  Tests.checkTurnOff = function() {

    /** @type {TestResults} */
    var results;
    /** @type {boolean} */
    var before;
    /** @type {boolean} */
    var after;
    /** @type {string} */
    var errorMsg;
    /** @type {Object} */
    var tests;

    results = new TestResults('Tests.checkTurnOff');
    Object.freeze(results);

    // Setup for the tests
    tests = aIV.debug('Tests.checkTurnOff');

    // Run the tests
    before = tests.getType('misc');
    tests.turnOff('misc');
    after = tests.getType('misc');
    if (!before || after) {
      errorMsg = 'debug.turnOff failed to turn off one type';
      results.addError(errorMsg);
    }
    tests.setType('misc', true);

    before = tests.getType('start') && tests.getType('misc');
    tests.turnOff('start misc');
    after = tests.getType('start') && tests.getType('misc');
    if (!before || after) {
      errorMsg = 'debug.turnOff failed to turn off two types with a string';
      results.addError(errorMsg);
    }
    tests.setType('all', true);

    before = tests.getType('start') && tests.getType('misc');
    tests.turnOff([ 'start', 'misc' ]);
    after = tests.getType('start') && tests.getType('misc');
    if (!before || after) {
      errorMsg = 'debug.turnOff failed to turn off two types with an array';
      results.addError(errorMsg);
    }
    tests.setType('all', true);

    before = tests.getType('start') && tests.getType('misc');
    tests.turnOff('all');
    after = tests.getType('start') && tests.getType('misc');
    if (!before || after) {
      errorMsg = 'debug.turnOff failed to turn off all types';
      results.addError(errorMsg);
    }

    // Save the results
    app.results.push(results);
  };

  /**
   * -------------------------------------------------
   * Public Method (Tests.checkTurnOnDebugger)
   * -------------------------------------------------
   * @desc Checks Debug.turnOnDebugger method.
   * @type {function()}
   */
  Tests.checkTurnOnDebugger = function() {

    /** @type {TestResults} */
    var results;
    /** @type {boolean} */
    var before;
    /** @type {boolean} */
    var after;
    /** @type {string} */
    var errorMsg;
    /** @type {Object} */
    var tests;

    results = new TestResults('Tests.checkTurnOnDebugger');
    Object.freeze(results);

    // Setup for the tests
    tests = aIV.debug('Tests.checkTurnOnDebugger');

    // Run the tests
    before = tests.getBugger('misc');
    tests.turnOnDebugger('misc');
    after = tests.getBugger('misc');
    if (before || !after) {
      errorMsg = 'debug.turnOnDebugger failed to turn on one type';
      results.addError(errorMsg);
    }
    tests.setBugger('misc', false);

    before = tests.getBugger('start') && tests.getBugger('misc');
    tests.turnOnDebugger('start misc');
    after = tests.getBugger('start') && tests.getBugger('misc');
    if (before || !after) {
      errorMsg = 'debug.turnOnDebugger failed to turn on two ';
      errorMsg += 'types with a string';
      results.addError(errorMsg);
    }
    tests.setBugger('all', false);

    before = tests.getBugger('start') && tests.getBugger('misc');
    tests.turnOnDebugger([ 'start', 'misc' ]);
    after = tests.getBugger('start') && tests.getBugger('misc');
    if (before || !after) {
      errorMsg = 'debug.turnOnDebugger failed to turn on two ';
      errorMsg += 'types with an array';
      results.addError(errorMsg);
    }
    tests.setBugger('all', false);

    before = tests.getBugger('start') && tests.getBugger('misc');
    tests.turnOnDebugger('all');
    after = tests.getBugger('start') && tests.getBugger('misc');
    if (before || !after) {
      errorMsg = 'debug.turnOnDebugger failed to turn on all types';
      results.addError(errorMsg);
    }

    // Save the results
    app.results.push(results);
  };

  /**
   * -------------------------------------------------
   * Public Method (Tests.checkTurnOffDebugger)
   * -------------------------------------------------
   * @desc Checks Debug.turnOffDebugger method.
   * @type {function()}
   */
  Tests.checkTurnOffDebugger = function() {

    /** @type {TestResults} */
    var results;
    /** @type {boolean} */
    var before;
    /** @type {boolean} */
    var after;
    /** @type {string} */
    var errorMsg;
    /** @type {Object} */
    var tests;

    results = new TestResults('Tests.checkTurnOffDebugger');
    Object.freeze(results);

    // Setup for the tests
    tests = aIV.debug({
      classTitle     : 'Tests.checkTurnOffDebugger',
      turnOnDebuggers: 'all'
    });

    // Run the tests
    before = tests.getBugger('misc');
    tests.turnOffDebugger('misc');
    after = tests.getBugger('misc');
    if (!before || after) {
      errorMsg = 'debug.turnOffDebugger failed to turn off one type';
      results.addError(errorMsg);
    }
    tests.setBugger('misc', true);

    before = tests.getBugger('start') && tests.getBugger('misc');
    tests.turnOffDebugger('start misc');
    after = tests.getBugger('start') && tests.getBugger('misc');
    if (!before || after) {
      errorMsg = 'debug.turnOffDebugger failed to turn off two ';
      errorMsg += 'types with a string';
      results.addError(errorMsg);
    }
    tests.setBugger('all', true);

    before = tests.getBugger('start') && tests.getBugger('misc');
    tests.turnOffDebugger([ 'start', 'misc' ]);
    after = tests.getBugger('start') && tests.getBugger('misc');
    if (!before || after) {
      errorMsg = 'debug.turnOffDebugger failed to turn off two ';
      errorMsg += 'types with an array';
      results.addError(errorMsg);
    }
    tests.setBugger('all', true);

    before = tests.getBugger('start') && tests.getBugger('misc');
    tests.turnOffDebugger('all');
    after = tests.getBugger('start') && tests.getBugger('misc');
    if (!before || after) {
      errorMsg = 'debug.turnOffDebugger failed to turn off all types';
      results.addError(errorMsg);
    }

    // Save the results
    app.results.push(results);
  };

  /**
   * -------------------------------------------------
   * Public Method (Tests.checkSetConfig)
   * -------------------------------------------------
   * @desc Checks the setting of the debug module configuration.
   * @type {function}
   */
  Tests.checkSetConfig = function() {

    /** @type {TestResults} */
    var results;
    /** @type {string} */
    var msg;
    /** @type {Object} */
    var tests;

    results = new TestResults('Tests.checkSetConfig');
    Object.freeze(results);

    // Setup for the tests
    aIV.debug.setConfig({
      turnOffTypes   : 'all',
      turnOnDebuggers: 'all'
    });
    tests = {
      all : aIV.debug('Tests.checkSetConfig.all'),
      none: aIV.debug({
        classTitle     : 'Tests.checkSetConfig.none',
        turnOffTypes   : 'none',
        turnOnDebuggers: 'none'
      })
    };

    // Run the tests
    if (tests.all.getType('start') ||
        tests.all.getType('args')  ||
        tests.all.getType('fail')  ||
        tests.all.getType('group') ||
        tests.all.getType('state') ||
        tests.all.getType('misc')) {
      msg = 'Tests.checkSetConfig.all failed: no types should be on';
      results.addError(msg);
    }

    if (!tests.all.getBugger('start') ||
        !tests.all.getBugger('args')  ||
        !tests.all.getBugger('fail')  ||
        !tests.all.getBugger('group') ||
        !tests.all.getBugger('state') ||
        !tests.all.getBugger('misc')) {
      msg = 'Tests.checkSetConfig.all failed: all debuggers should be on';
      results.addError(msg);
    }

    if (!tests.none.getType('start') ||
        !tests.none.getType('args')  ||
        !tests.none.getType('fail')  ||
        !tests.none.getType('group') ||
        !tests.none.getType('state') ||
        !tests.none.getType('misc')) {
      msg = 'Tests.checkSetConfig.none failed: all types should be on';
      results.addError(msg);
    }

    if (tests.none.getBugger('start') ||
        tests.none.getBugger('args')  ||
        tests.none.getBugger('fail')  ||
        tests.none.getBugger('group') ||
        tests.none.getBugger('state') ||
        tests.none.getBugger('misc')) {
      msg = 'Tests.checkSetConfig.none failed: no debuggers should be on';
      results.addError(msg);
    }

    // Reset the config before continuing
    aIV.debug.setConfig({
      turnOffTypes   : '',
      turnOnDebuggers: 'none'
    });

    // Save the results
    app.results.push(results);
  };

  Object.freeze(Tests);


/* -----------------------------------------------------------------------------
 * | The App Class                                                             |
 * v ------------------------------------------------------------------------- v
                                                             classes/app.js */
  /**
   * -----------------------------------------------------
   * Public Class (App)
   * -----------------------------------------------------
   * @desc The base class for the app.
   * @constructor
   */
  var App = function() {

    console.log('App is being setup.');

    /**
     * ---------------------------------------------------
     * Private Property (App.elems)
     * ---------------------------------------------------
     * @desc The elements for this app.
     * @type {Object}
     */
    this.elems = new Elems();
    Object.freeze(this.elems);

    /**
     * ----------------------------------------------- 
     * Public Property (App.results)
     * -----------------------------------------------
     * @desc Saves the results of the tests.
     * @type {Array<TestResults>}
     */
    this.results = [];

    /**
     * ----------------------------------------------- 
     * Public Property (App.choices)
     * -----------------------------------------------
     * @desc Saves the choices to be executed.
     * @type {Array<Choices>}
     */
    this.choices = [];
  };

  // Ensure constructor is set to this class.
  App.prototype.constructor = App;

  /**
   * -----------------------------------------------
   * Public Method (App.prototype.runTests)
   * -----------------------------------------------
   * @desc Sets up the display for the app & runs the tests.
   * @type {function}
   */
  App.prototype.runTests = function() {

    // Turn off the debugger instances for errors
    aIV.debug.setConfig({
      errorDebuggers : false,
      turnOnDebuggers: 'none'
    });

    // Clear the console
    console.clear();

    // Clear the start message
    this.elems.clearUI();

    // Check init's params
    Tests.checkClassTitle();
    Tests.checkTurnOffTypes();
    Tests.checkTurnOnDebuggers();

    // Check instance 
    Tests.checkInstances();

    // Check the type methods
    Tests.checkStart();
    Tests.checkArgs();
    Tests.checkFail();
    Tests.checkGroup();
    Tests.checkState();
    Tests.checkMisc();

    // Check the setting methods
    Tests.checkTurnOn();
    Tests.checkTurnOff();
    Tests.checkTurnOnDebugger();
    Tests.checkTurnOffDebugger();

    // Check the config setter
    Tests.checkSetConfig();

////////////////////////////////////////////////////////////////////////////////

// ADD NEW TEST CALLS HERE

////////////////////////////////////////////////////////////////////////////////

    // Run the choices and record the results
    this.runChoices();
  };

  /**
   * -----------------------------------------------
   * Public Method (App.prototype.addChoice)
   * -----------------------------------------------
   * @desc Adds a new choice to the app.
   * @param {string} choiceMsg - The choice message.
   * @param {TestResults} results - The results object.
   * @param {string} errorMsg - The error message.
   * @param {?Object=} before - A function that gets called before
   *   the choice is shown.
   * @param {?Object=} after - A function that gets called after
   *   a choice is completed.
   */
  App.prototype.addChoice = function(choiceMsg, results, errorMsg, before, after) {
    /** @type {Choice} */
    var choice;

    before = before || null;
    after  = after  || null;

    choice = new Choice(choiceMsg, results, errorMsg, before, after);
    Object.freeze(choice);

    this.choices.push(choice);
  };

  /**
   * -----------------------------------------------
   * Public Method (App.prototype.runChoices)
   * -----------------------------------------------
   * @desc .
   * @type {function()}
   */
  App.prototype.runChoices = function() {
    /** @type {Choice} */
    var choice;

    console.clear();

    if (!this.choices.length) {
      this.shareResults();
      return;
    }

    choice = this.choices.splice(0, 1)[0];

    // Hide the UI while setup is occurring
    this.elems.ui.style.opacity = '0';

    choice.before();

    setTimeout(function() {

      // Give the choice directions
      app.elems.msg.textContent = choice.msg;

      // Set the #yes onClick event
      app.elems.yes.onclick = function() {
        choice.after();
        app.runChoices();
      };

      // Set the #no onClick event
      app.elems.no.onclick = function() {
        choice.fail();
        choice.after();
        app.runChoices();
      };

      app.elems.choose.style.display = 'block';
      app.elems.ui.style.opacity = '1';
    }, 500);
  };

  /**
   * -----------------------------------------------
   * Public Method (App.prototype.shareResults)
   * -----------------------------------------------
   * @desc .
   * @type {function()}
   */
  App.prototype.shareResults = function() {
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;
    /** @type {string} */
    var results;
    /** @type {?string} */
    var errors;
    /** @type {boolean} */
    var fail;

    len = this.results.length;
    fail = false;

    // Show the results
    results = '<h2>Results</h2>';
    results += '<ol id="results">';

    i = -1;
    while (++i < len) {
      results += this.results[i].reportResult();
      if ( !this.results[i].getResult() ) {
        fail = true;
      }
    }

    results += '</ol>';

    // Show the errors
    if (fail) {

      results += '<h2>Errors</h2>';
      results += '<ol id="errors">';

      i = -1;
      while (++i < len) {
        errors = this.results[i].reportErrors();
        if (errors) {
          results += errors;
        }
      }

      results += '</ol>';
    }

    // Hide the UI while setup is occurring
    this.elems.ui.style.opacity = '0';

    setTimeout(function() {
      app.elems.ui.innerHTML = results;
      app.elems.ui.style.opacity = '1';
    }, 500);
  };


/* -----------------------------------------------------------------------------
 * | The Elems Class                                                           |
 * v ------------------------------------------------------------------------- v
                                                           classes/elems.js */
  /**
   * -----------------------------------------------------
   * Public Class (Elems)
   * -----------------------------------------------------
   * @desc Important app elements.
   * @constructor
   */
  var Elems = function() {

    console.log('Elems is being setup.');

    /**
     * ---------------------------------------------------
     * Private Property (Elems.msg)
     * ---------------------------------------------------
     * @desc Element: #msg
     * @type {HTMLElement}
     */
    this.msg = getID('msg');

    /**
     * ---------------------------------------------------
     * Private Property (Elems.ui)
     * ---------------------------------------------------
     * @desc Element: #ui
     * @type {HTMLElement}
     */
    this.ui = getID('ui');

    /**
     * ---------------------------------------------------
     * Private Property (Elems.start)
     * ---------------------------------------------------
     * @desc Element: #start
     * @type {HTMLElement}
     */
    this.start = getID('start');

    /**
     * ---------------------------------------------------
     * Private Property (Elems.choose)
     * ---------------------------------------------------
     * @desc Element: #choose
     * @type {HTMLElement}
     */
    this.choose = getID('choose');

    /**
     * ---------------------------------------------------
     * Private Property (Elems.yes)
     * ---------------------------------------------------
     * @desc Element: #yes
     * @type {HTMLElement}
     */
    this.yes = getID('yes');

    /**
     * ---------------------------------------------------
     * Private Property (Elems.no)
     * ---------------------------------------------------
     * @desc Element: #no
     * @type {HTMLElement}
     */
    this.no = getID('no');
  };

  // Ensure constructor is set to this class.
  Elems.prototype.constructor = Elems;

  /**
   * -----------------------------------------------
   * Public Method (Elems.prototype.clearUI)
   * -----------------------------------------------
   * @desc Clears the current interactions.
   * @type {function()}
   */
  Elems.prototype.clearUI = function() {

    /** @type {Object} */
    var that;

    that = this;

    this.ui.style.opacity = '0';

    setTimeout(function() {
      that.msg.textContent = 'Tests are running.';
      that.start.style.display = 'none';
      that.choose.style.display = 'none';
      that.ui.style.opacity = '1';
    }, 500);
  };

  /**
   * -----------------------------------------------
   * Public Method (Elems.prototype.showMsg)
   * -----------------------------------------------
   * @desc Shows a message to the user.
   * @param {string} msg - The message to show.
   */
  Elems.prototype.showMsg = function(msg) {

    /** @type {Object} */
    var that;

    that = this;

    this.ui.style.opacity = '0';

    setTimeout(function() {
      that.msg.textContent = msg;
      that.choose.style.display = 'none';
      that.ui.style.opacity = '1';
    }, 500);
  };

  /**
   * -----------------------------------------------
   * Public Method (Elems.prototype.showChoice)
   * -----------------------------------------------
   * @desc Shows a message with 'yes' or 'no' options to the user.
   * @param {string} msg - The message to show.
   */
  Elems.prototype.showChoice = function(msg) {

    /** @type {Object} */
    var that;

    that = this;

    this.ui.style.opacity = '0';

    setTimeout(function() {
      that.msg.textContent = msg;
      that.choose.style.display = 'block';
      that.ui.style.opacity = '1';
    }, 500);
  };


/* -----------------------------------------------------------------------------
 * | The Test Results Class                                                    |
 * v ------------------------------------------------------------------------- v
                                                    classes/test-results.js */
  /**
   * -----------------------------------------------------
   * Public Class (TestResults)
   * -----------------------------------------------------
   * @desc Contains the results for a test.
   * @param {string} type - The type of tests that were ran.
   * @constructor
   */
  var TestResults = function(type) {

    /**
     * ----------------------------------------------- 
     * Protected Property (TestResults.result)
     * -----------------------------------------------
     * @desc The test results.
     * @type {boolean}
     */
    var result = true;

    /**
     * ----------------------------------------------- 
     * Protected Property (TestResults.errors)
     * -----------------------------------------------
     * @desc The test errors.
     * @type {?strings}
     */
    var errors = null;

    /**
     * ----------------------------------------------- 
     * Public Method (TestResults.reportResult)
     * -----------------------------------------------
     * @desc Reports the tests and their results.
     * @return {string} The test's type followed by its results.
     */
    this.reportResult = function() {
      /** @type {string} */
      var name;
      /** @type {string} */
      var msg;
      /** @type {string} */
      var report;

      name = (result) ? 'green' : 'red';
      msg = (result) ? 'Pass' : 'Fail';
      report = '' +
        '<li class="' + name + '">' +
          type + ' =&gt; ' + msg +
        '</li>';

      return report;
    };

    /**
     * ----------------------------------------------- 
     * Public Method (TestResults.reportErrors)
     * -----------------------------------------------
     * @desc Reports the tests and their errors.
     * @return {?string} The test's type followed by its errors.
     */
    this.reportErrors = function() {
      /** @type {number} */
      var len;
      /** @type {number} */
      var i;
      /** @type {?string} */
      var report;

      report = null;

      if (errors && errors.length) {

        // The type of results name
        report = '<li>' + type;

        // The errors
        report += '<ol id="subErrors">';

        len = errors.length;
        i = -1;

        while (++i < len) {
          report += '<li>' + errors[i] + '</li>';
        }

        report += '</ol></li>';
      }

      return report;
    };

    /**
     * ----------------------------------------------- 
     * Public Method (TestResults.getResult)
     * -----------------------------------------------
     * @desc Gets the test results.
     * @return {boolean} The test's results.
     */
    this.getResult = function() {
      return result;
    };

    /**
     * ----------------------------------------------- 
     * Public Method (TestResults.setResult)
     * -----------------------------------------------
     * @desc Sets the test results.
     * @param {boolean} pass - The test results.
     */
    this.setResult = function(pass) {
      result = pass;
    };

    /**
     * ----------------------------------------------- 
     * Public Method (TestResults.addError)
     * -----------------------------------------------
     * @desc Adds an error to the test results.
     * @param {string} msg - The error message.
     */
    this.addError = function(msg) {
      result = false;
      if (errors) {
        errors.push(msg);
      }
      else {
        errors = [ msg ];
      }
    };
  };

  // Ensure constructor is set to this class.
  TestResults.prototype.constructor = TestResults;


/* -----------------------------------------------------------------------------
 * | The Choice Class                                                          |
 * v ------------------------------------------------------------------------- v
                                                          classes/choice.js */
  /**
   * -----------------------------------------------------
   * Public Class (Choice)
   * -----------------------------------------------------
   * @desc A choice to be executed.
   * @param {string} choiceMsg - The choice message.
   * @param {TestResults} results - The results object.
   * @param {string} errorMsg - The error message.
   * @param {?Object} before - A function that gets called before
   *   the choice is shown.
   * @param {?Object} after - A function that gets called after
   *   a choice is completed.
   * @constructor
   */
  var Choice = function(choiceMsg, results, errorMsg, before, after) {

    /**
     * ----------------------------------------------- 
     * Protected Property (Choice.msg)
     * -----------------------------------------------
     * @desc The choice directions.
     * @type {string}
     */
    this.msg = choiceMsg;

    /**
     * ----------------------------------------------- 
     * Public Method (Choice.fail)
     * -----------------------------------------------
     * @desc A function that records an error and the failure
     *   of a test.
     * @type {function()}
     */
    this.fail = function() {
      results.addError(errorMsg);
      results.setResult(false);
    };

    /**
     * ----------------------------------------------- 
     * Public Method (Choice.before)
     * -----------------------------------------------
     * @desc Logic to call before showing the choice.
     * @type {function()}
     */
    this.before = function() {
      if (typeof before === 'function') {
        before();
      }
    };

    /**
     * ----------------------------------------------- 
     * Public Method (Choice.after)
     * -----------------------------------------------
     * @desc Logic to call after completing the choice.
     * @type {function()}
     */
    this.after = function() {
      if (typeof after === 'function') {
        after();
      }
    };
  };

  // Ensure constructor is set to this class.
  Choice.prototype.constructor = Choice;


/* -----------------------------------------------------------------------------
 * | End of module                                                             |
 * v ------------------------------------------------------------------------- v
                                                                            */
  return _return;

})());
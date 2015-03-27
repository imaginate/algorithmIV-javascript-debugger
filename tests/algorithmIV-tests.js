/**
 * -----------------------------------------------------------------------------
 * Algorithm IV Debug Tests - Module (v1.0.0)
 * -----------------------------------------------------------------------------
 * @file The module for testing the aIV debug module.
 * @module aIVDebugTests
 * @version 1.0.0
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
      document.addEventListener('DOMContentLoaded', function() {
        app.runTests();
      });
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

  /**
   * ----------------------------------------------- 
   * Public Variable (choice)
   * -----------------------------------------------
   * @desc The result of a UI interaction with #choose.
   * @type {boolean}
   */
  var choice;


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
 * | The App Class                                                             |
 * v ------------------------------------------------------------------------- v
                                                             classes/app.js */
  /**
   * -----------------------------------------------------
   * Public Class (App)
   * -----------------------------------------------------
   * @desc The base class for the dummy app.
   * @constructor
   */
  var App = function() {

    console.log('App is being setup.');

    /**
     * ---------------------------------------------------
     * Private Property (App.debug)
     * ---------------------------------------------------
     * @desc The Debug instance for this class.
     * @type {Object}
     */
    this.debug = aIV.debug('App');

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
  };

  // Ensure constructor is set to this class.
  App.prototype.constructor = App;

  /**
   * -----------------------------------------------
   * Public Method (App.prototype.runTests)
   * -----------------------------------------------
   * @desc Sets up the display for the app.
   * @type {function()}
   */
  App.prototype.runTests = function() {

    /** @type {Object} */
    var that;
    /** @type {Object} */
    var elems;

    that = this;
    elems = this.elems;

    // Clear the console
    console.clear();

    // Clear the start message
    elems.clearUI();

    // Check init's params
    checkClassTitle();
    checkTurnOffTypes();
    checkTurnOnDebuggers();

    // Check instance 
    checkInstances();

    /*
    // Check the type methods
    checkStart();
    checkArgs();
    checkFail();
    checkGroup();
    checkState();
    checkMisc();

    // Check the setting methods
    checkTurnOn();
    checkTurnOff();
    checkTurnOnDebugger();
    checkTurnOffDebugger();

    // Record the results
    console.group('The Results');
    reportResults();
    console.groupEnd();*/

    /* ------------------  |  *
     * TEST METHODS BELOW  |  *
     * ------------------  v  */

    /**
     * -------------------------------------------------
     * Private Method (checkClassTitle)
     * -------------------------------------------------
     * @desc Checks the setting of the classTitle property.
     * @type {function()}
     */
    function checkClassTitle() {

      /** @type {TestResults} */
      var results;
      /** @type {boolean} */
      var result;
      /** @type {string} */
      var msg;
      /** @type {Object} */
      var unknown;

      console.groupCollapsed('checkClassTitle');

      results = new TestResults('checkClassTitle');
      Object.freeze(results);

      result = true;

      // Setup for the tests
      unknown = aIV.debug({
        turnOffTypes   : [ 'fail', 'state' ],
        turnOnDebuggers: 'all'
      });

      // Run the tests
      if (that.debug.classTitle !== 'App.') {
        result = false;
        msg = 'The classTitle for App was incorrect. ';
        msg += 'classTitle = %s';
        console.error(msg, that.debug.classTitle);
      }

      if (unknown.classTitle !== 'unknown.') {
        result = false;
        msg = 'The classTitle for unknown was incorrect. ';
        msg += 'classTitle = %s';
        console.error(msg, unknown.classTitle);
      }

      if (debug.classTitle !== 'module.') {
        result = false;
        msg = 'The classTitle for module was incorrect. ';
        msg += 'classTitle = %s';
        console.error(msg, debug.classTitle);
      }

      // Save the results
      results.set(result);
      that.results.push(results);

      console.groupEnd();
    }

    /**
     * -------------------------------------------------
     * Private Method (checkTurnOffTypes)
     * -------------------------------------------------
     * @desc Checks the setting of the turnOffTypes param.
     * @type {function()}
     */
    function checkTurnOffTypes() {

      /** @type {TestResults} */
      var results;
      /** @type {boolean} */
      var result;
      /** @type {string} */
      var msg;
      /** @type {Object} */
      var tests;

      console.groupCollapsed('checkTurnOffTypes');

      results = new TestResults('checkTurnOffTypes');
      Object.freeze(results);

      result = true;

      // Setup for the tests
      tests = {
        all: aIV.debug({
          classTitle  : 'checkTurnOffTypes.tests.all',
          turnOffTypes: 'all'
        }),
        str: aIV.debug({
          classTitle  : 'checkTurnOffTypes.tests.str',
          turnOffTypes: 'fail state'
        }),
        arr: aIV.debug({
          classTitle  : 'checkTurnOffTypes.tests.arr',
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
        result = false;
        msg = 'The turnOffTypes \'all\' value failed to turn ';
        msg += 'off all the types.';
        console.error(msg);
      }

      if (!tests.str.getType('start') ||
          !tests.str.getType('args')  ||
          tests.str.getType('fail')   ||
          !tests.str.getType('group') ||
          tests.str.getType('state')  ||
          !tests.str.getType('misc')) {
        result = false;
        msg = 'The turnOffTypes \'fail state\' value failed to turn ';
        msg += 'off the correct types.';
        console.error(msg);
      }

      if (!tests.arr.getType('start') ||
          !tests.arr.getType('args')  ||
          tests.arr.getType('fail')   ||
          !tests.arr.getType('group') ||
          tests.arr.getType('state')  ||
          !tests.arr.getType('misc')) {
        result = false;
        msg = 'The turnOffTypes [ \'fail\', \'state\' ] value failed to ';
        msg += 'turn off the correct types.';
        console.error(msg);
      }

      // Save the results
      results.set(result);
      that.results.push(results);

      console.groupEnd();
    }

    /**
     * -------------------------------------------------
     * Private Method (checkTurnOnDebuggers)
     * -------------------------------------------------
     * @desc Checks the setting of the turnOnDebuggers param.
     * @type {function()}
     */
    function checkTurnOnDebuggers() {

      /** @type {TestResults} */
      var results;
      /** @type {boolean} */
      var result;
      /** @type {string} */
      var msg;
      /** @type {Object} */
      var tests;

      console.groupCollapsed('checkTurnOnDebuggers');

      results = new TestResults('checkTurnOnDebuggers');
      Object.freeze(results);

      result = true;

      // Setup for the tests
      tests = {
        all: aIV.debug({
          classTitle     : 'checkTurnOnDebuggers.tests.all',
          turnOnDebuggers: 'all'
        }),
        str: aIV.debug({
          classTitle     : 'checkTurnOnDebuggers.tests.str',
          turnOnDebuggers: 'fail state'
        }),
        arr: aIV.debug({
          classTitle     : 'checkTurnOnDebuggers.tests.arr',
          turnOnDebuggers: [ 'fail', 'state' ]
        })
      };

      // Run the tests
      if (tests.all.getBugger('start') ||
          tests.all.getBugger('args')  ||
          tests.all.getBugger('fail')  ||
          tests.all.getBugger('group') ||
          tests.all.getBugger('state') ||
          tests.all.getBugger('misc')) {
        result = false;
        msg = 'The turnOnDebuggers \'all\' value failed to turn ';
        msg += 'on all the debuggers.';
        console.error(msg);
      }

      if (!tests.str.getBugger('start') ||
          !tests.str.getBugger('args')  ||
          tests.str.getBugger('fail')   ||
          !tests.str.getBugger('group') ||
          tests.str.getBugger('state')  ||
          !tests.str.getBugger('misc')) {
        result = false;
        msg = 'The turnOnDebuggers \'fail state\' value failed to turn ';
        msg += 'on the correct debuggers.';
        console.error(msg);
      }

      if (!tests.arr.getBugger('start') ||
          !tests.arr.getBugger('args')  ||
          tests.arr.getBugger('fail')   ||
          !tests.arr.getBugger('group') ||
          tests.arr.getBugger('state')  ||
          !tests.arr.getBugger('misc')) {
        result = false;
        msg = 'The turnOnDebuggers [ \'fail\', \'state\' ] value failed to ';
        msg += 'turn on the correct debuggers.';
        console.error(msg);
      }

      // Save the results
      results.set(result);
      that.results.push(results);

      console.groupEnd();
    }

    /**
     * -------------------------------------------------
     * Private Method (checkInstances)
     * -------------------------------------------------
     * @desc Checks .
     * @type {function()}
     */
    function checkInstances() {

      /** @type {TestResults} */
      var results;
      /** @type {boolean} */
      var result;
      /** @type {string} */
      var msg;
      /** @type {Object} */
      var tests;

      console.group('checkInstances');

      results = new TestResults('checkInstances');
      Object.freeze(results);

      result = true;

      // Setup for the tests
      tests = {
        first : aIV.debug('checkInstances.tests'),
        second: aIV.debug({
          classTitle  : 'checkInstances.tests',
          turnOffTypes: 'misc'
        })
      };

      // Run the tests
      tests.first.misc('test1', 'Test 1 - This log should be shown.');
      tests.second.misc('test2', 'Test 2 - This log should be shown.');
      result = confirm('Did test1 and test2 get logged?');

      tests.first.setType('misc', false);
      tests.first.misc('test3', 'Test 3 - This log should NOT be shown.');
      tests.second.misc('test4', 'Test 4 - This log should NOT be shown.');
      if (result) {
        result = confirm('Did test3 and test4 get logged?');
      }

      // Save the results
      results.set(result);
      that.results.push(results);

      console.groupEnd();
    }
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
    this.yes.onclick = function () {
      choice = true;
    };

    /**
     * ---------------------------------------------------
     * Private Property (Elems.no)
     * ---------------------------------------------------
     * @desc Element: #no
     * @type {HTMLElement}
     */
    this.no = getID('no');
    this.no.onclick = function () {
      choice = false;
    };
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
     * ---------------------------------------------------
     * Private Property (TestResults.debug)
     * ---------------------------------------------------
     * @type {Object}
     */
    this.debug = aIV.debug({
      classTitle     : 'TestResults',
      turnOnDebuggers: 'misc'
    });

    /**
     * ----------------------------------------------- 
     * Protected Property (TestResults.result)
     * -----------------------------------------------
     * @desc The test results.
     * @type {boolean}
     */
    var result;

    /**
     * ----------------------------------------------- 
     * Public Method (TestResults.report)
     * -----------------------------------------------
     * @desc Reports the tests and their results.
     * @return {string} The test's type followed by its results.
     */
    this.report = function() {
      /** @type {string} */
      var report;

      report = type + ' => ';
      report += (result) ? 'Success' : 'Failure';

      return report;
    };

    /**
     * ----------------------------------------------- 
     * Public Method (TestResults.get)
     * -----------------------------------------------
     * @desc Gets the test results.
     * @return {boolean} The test's results.
     */
    this.get = function() {
      return result;
    };

    /**
     * ----------------------------------------------- 
     * Public Method (TestResults.set)
     * -----------------------------------------------
     * @desc Sets the test results.
     * @param {boolean} pass - The test results.
     */
    this.set = function(pass) {
      result = pass;
    };
  };

  // Ensure constructor is set to this class.
  TestResults.prototype.constructor = TestResults;


/* -----------------------------------------------------------------------------
 * | End of module                                                             |
 * v ------------------------------------------------------------------------- v
                                                                            */
  return _return;

})());
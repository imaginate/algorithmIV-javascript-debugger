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
  aIV.tests = tests.init();

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
      app = new DummyApp();
      Object.freeze(app);

      // Run the tests
      document.addEventListener('DOMContentLoaded', app.runTests);
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


/* -----------------------------------------------------------------------------
 * | The Public Methods for the Module                                         |
 * v ------------------------------------------------------------------------- v
                                                          module-methods.js */


/* -----------------------------------------------------------------------------
 * | The Dummy App Class                                                       |
 * v ------------------------------------------------------------------------- v
                                                               dummy-app.js */
  /**
   * -----------------------------------------------------
   * Public Class (DummyApp)
   * -----------------------------------------------------
   * @desc The base class for the dummy app.
   * @constructor
   */
  var DummyApp = function() {

    console.log('DummyApp is being setup.');

    /**
     * ---------------------------------------------------
     * Private Property (DummyApp.debug)
     * ---------------------------------------------------
     * @desc The Debug instance for this class.
     * @type {Object}
     */
    this.debug = aIV.debug('DummyApp');

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
  DummyApp.prototype.constructor = DummyApp;

  /**
   * -----------------------------------------------
   * Public Method (DummyApp.prototype.runTests)
   * -----------------------------------------------
   * @desc Sets up the display for the app.
   * @type {function()}
   */
  DummyApp.prototype.runTests = function() {

    /** @type {Object} */
    var that;

    that = this;

    console.clear();

    alert('Please ensure your console is open before continuing.');

    // Check init's params
    checkClassTitle();
    checkTurnOffTypes();
    checkTurnOffDebuggers();

    // Check instance 
    checkInstances();

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
    console.groupEnd();


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
      if (that.debug.classTitle !== 'DummyApp') {
        result = false;
        msg = 'The classTitle for DummyApp was incorrect. ';
        msg += 'classTitle = %s';
        console.error(msg, that.debug.classTitle);
      }

      if (debugUnknown.classTitle !== 'unknown') {
        result = false;
        msg = 'The classTitle for debugUnknown was incorrect. ';
        msg += 'classTitle = %s';
        console.error(msg, debugUnknown.classTitle);
      }

      if (debug.classTitle !== 'module') {
        result = false;
        msg = 'The classTitle for debug was incorrect. ';
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
        all: aIV.debug({ turnOffTypes: 'all' }),
        str: aIV.debug({ turnOffTypes: 'fail state' }),
        arr: aIV.debug({ turnOffTypes: [ 'fail', 'state' ] })
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
     * Private Method (check)
     * -------------------------------------------------
     * @desc Checks .
     * @type {function()}
     */
    function check() {

      console.groupCollapsed('check');

      // ACTION

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

      console.groupCollapsed('checkInstances');

      results.debugInst.misc('checkInst', 'This debugger should be turned on.');
      results.debug.turnOffDebugger('misc');
      results.debugInst.misc('checkInst', 'This debugger should be turned off.');

      console.groupEnd();
    }

  };


/* -----------------------------------------------------------------------------
 * | The Test Results Class                                                    |
 * v ------------------------------------------------------------------------- v
                                                            test-results.js */
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
     * ---------------------------------------------------
     * Private Property (TestResults.debugInst)
     * ---------------------------------------------------
     * @type {Object}
     */
    this.debugInst = aIV.debug('TestResults');

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
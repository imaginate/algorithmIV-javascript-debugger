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
    /** @type {boolean} */
    var result;
    /** @type {string} */
    var msg;
    /** @type {Object} */
    var tests;

    results = new TestResults('checkClassTitle');
    Object.freeze(results);

    result = true;

    // Setup for the tests
    tests = {
      prop: aIV.debug({ classTitle: 'Tests.checkClassTitle.prop' }),
      str : aIV.debug('Tests.checkClassTitle.str'),
      none: aIV.debug()
    };

    // Run the tests
    if (tests.prop.classTitle !== 'Tests.checkClassTitle.prop.') {
      result = false;
      msg = 'Tests.checkClassTitle evaluation failed, ';
      msg += tests.prop.classTitle + ' !== Tests.checkClassTitle.prop.';
      results.addError(msg);
    }

    if (tests.str.classTitle !== 'Tests.checkClassTitle.str.') {
      result = false;
      msg = 'Tests.checkClassTitle evaluation failed, ';
      msg += tests.str.classTitle + ' !== Tests.checkClassTitle.str.';
      results.addError(msg);
    }

    if (tests.none.classTitle !== 'unknown.') {
      result = false;
      msg = 'Tests.checkClassTitle evaluation failed, ';
      msg += tests.none.classTitle + ' !== unknown.';
      results.addError(msg);
    }

    // Save the results
    results.setResult(result);
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
    /** @type {boolean} */
    var result;
    /** @type {string} */
    var msg;
    /** @type {Object} */
    var tests;

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
      results.addError(msg);
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
      results.addError(msg);
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
      results.addError(msg);
    }

    // Save the results
    results.setResult(result);
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
    /** @type {boolean} */
    var result;
    /** @type {string} */
    var msg;
    /** @type {Object} */
    var tests;

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
      results.addError(msg);
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
      results.addError(msg);
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
      results.addError(msg);
    }

    // Save the results
    results.setResult(result);
    app.results.push(results);
  };

  /**
   * -------------------------------------------------
   * Public Method (Tests.checkInstances)
   * -------------------------------------------------
   * @desc Checks .
   * @type {function()}
   */
  Tests.checkInstances = function() {

    /** @type {TestResults} */
    var results;
    /** @type {string} */
    var choice;
    /** @type {string} */
    var msg;
    /** @type {Object} */
    var tests;

    results = new TestResults('checkInstances');
    Object.freeze(results);

    // Setup for the tests
    tests = {
      first : aIV.debug('checkInstances.tests'),
      second: aIV.debug({
        classTitle  : 'checkInstances.tests',
        turnOffTypes: 'misc'
      })
    };

    // Run the tests
    choice = 'Did test1 and test2 get logged?';
    msg = 'checkInstances.tests.first failed.';
    app.addChoice(choice, results, msg, function() {
      tests.first.misc('test1', 'Test 1 - This log should be shown.');
      tests.second.misc('test2', 'Test 2 - This log should be shown.');
    });

    choice = 'Did test3 and test4 NOT get logged?';
    msg = 'checkInstances.tests.second failed.';
    app.addChoice(choice, results, msg, function() {
      tests.first.setType('misc', false);
      tests.first.misc('test3', 'Test 3 - This log should NOT be shown.');
      tests.second.misc('test4', 'Test 4 - This log should NOT be shown.');
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
   * @desc Sets up the display for the app.
   * @type {function()}
   */
  App.prototype.runTests = function() {

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
    //Tests.checkStart();
    //Tests.checkArgs();
    //Tests.checkFail();
    //Tests.checkGroup();
    //Tests.checkState();
    //Tests.checkMisc();

    // Check the setting methods
    //Tests.checkTurnOn();
    //Tests.checkTurnOff();
    //Tests.checkTurnOnDebugger();
    //Tests.checkTurnOffDebugger();

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

    if (!this.choices.length) {
      this.shareResults();
      return;
    }

    choice = this.choices.splice(0, 1)[0];

    // Hide the UI while setup is occurring
    this.elems.ui.style.opacity = '0';

    console.clear();

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

    results = '<h2>Results</h2>';
    results += '<ol id="results">';
    len = this.results.length;

    i = -1;
    while (++i < len) {
      results += this.results[i].reportResult();
    }

    results += '</ol>';
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
      msg = (result) ? 'Success' : 'Failure';
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
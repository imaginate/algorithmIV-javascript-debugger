/**
 * -----------------------------------------------------------------------------
 * Algorithm IV Debugger Tests (v1.1.0)
 * -----------------------------------------------------------------------------
 * @file The module used to run all unit tests for aIV's debugger.
 * @module aIVConsoleTests
 * @version 1.1.0
 * @author Adam Smith ({@link adamsmith@youlum.com})
 * @copyright 2015 Adam A Smith ([github.com/imaginate]{@link https://github.com/imaginate})
 * @license The Apache License ([algorithmiv.com/docs/license]{@link http://algorithmiv.com/docs/license})
 * @desc More details about the module for aIV.tests:
 * <ol>
 *   <li>annotations: 
 *       [See Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 *       and [See JSDoc3]{@link http://usejsdoc.org/}
 *   </li>
 *   <li>contributing: 
 *       [See the guideline]{@link https://github.com/imaginate/algorithmIV-javascript-debugger/blob/master/CONTRIBUTING.md}
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
 * @typedef {Array<boolean>} booleans
 */

////////////////////////////////////////////////////////////////////////////////
// The Public API
////////////////////////////////////////////////////////////////////////////////

;(function setupTheTestsPublicAPI(testsModuleAPI, undefined) {
  "use strict";

/* -----------------------------------------------------------------------------
 * The Public API (public-api.js)
 * -------------------------------------------------------------------------- */

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
   * Global Method (aIV.runTests)
   * ---------------------------------------------------
   * @desc Runs the tests for aIV.console.
   * @type {function}
   * @global
   */
  aIV.runTests = testsModuleAPI.runTests;

})(

////////////////////////////////////////////////////////////////////////////////
// The Tests Module
////////////////////////////////////////////////////////////////////////////////

(function setupTheTestsModule(undefined) {
  "use strict"; 

/* -----------------------------------------------------------------------------
 * The Tests Module API (module-api.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Variable (testsModuleAPI)
   * -----------------------------------------------------
   * @desc Holds the module's public properties and methods.
   * @type {!Object<string, function>}
   * @struct
   */
  var testsModuleAPI = {};

  /**
   * -----------------------------------------------------
   * Public Method (testsModuleAPI.runTests)
   * -----------------------------------------------------
   * @desc Initializes the aIV.console tests.
   * @type {function}
   */
  testsModuleAPI.runTests = function() {

    if (testsBeenInitialized) {
      return;
    }

    testsBeenInitialized = true;

    app = new App();
    app.runTests();
  };

/* -----------------------------------------------------------------------------
 * The Public Module Variables (module-vars.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Variable (testsBeenInitialized)
   * -----------------------------------------------------
   * @desc Indicates whether the tests module has been initialized.
   * @type {boolean}
   */
  var testsBeenInitialized = false;

  /**
   * ----------------------------------------------- 
   * Public Variable (app)
   * -----------------------------------------------
   * @desc The instance of the tests App.
   * @type {!App}
   */
  var app;

/* -----------------------------------------------------------------------------
 * The Public Module Methods (module-methods.js)
 * -------------------------------------------------------------------------- */

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
   * ---------------------------------------------------
   * Public Method (hasOwnProp)
   * ---------------------------------------------------
   * @desc A shortcut for the Object.prototype.hasOwnProperty method.
   * @param {!object|function} obj - The object to check.
   * @param {string} prop - The property to check.
   * @return {boolean} The result of the check.
   */
  var hasOwnProp = aIV.utils.hasOwnProp;

  /**
   * ---------------------------------------------------
   * Public Method (checkType)
   * ---------------------------------------------------
   * @desc Checks a value's data type against the given optional types.
   * @param {*} val - The value to be evaluated.
   * @param {string} type - A string of the data types to evaluate the value
   *   against. For a complete list of acceptable strings
   *   [see aIV.utils.checkType]{@link https://github.com/imaginate/algorithmIV-javascript-shortcuts/blob/master/src/pre-compiled-parts/methods/checkType.js}.
   * @param {boolean=} noTypeValCheck - If true skips the data type string checks.
   *   The default is false. Use to avoid duplicating checks.
   * @return {boolean} The evaluation result.
   */
  var checkType = aIV.utils.checkType;

/* -----------------------------------------------------------------------------
 * The App Class (classes/app.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Class (App)
   * -----------------------------------------------------
   * @desc The constructor for the App class.
   * @constructor
   */
  var App = function() {

    ////////////////////////////////////////////////////////////////////////////
    // Define The Public Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ---------------------------------------------------
     * Public Property (App.elems)
     * ---------------------------------------------------
     * @desc The DOM elements for this app.
     * @type {!Object}
     */
    this.elems;

    /**
     * ----------------------------------------------- 
     * Public Property (App.results)
     * -----------------------------------------------
     * @desc Saves the results of the tests.
     * @type {!Array<TestResults>}
     */
    this.results;

    /**
     * ----------------------------------------------- 
     * Public Property (App.choices)
     * -----------------------------------------------
     * @desc Saves the choices to be executed.
     * @type {!Array<Choices>}
     */
    this.choices;

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Public Properties
    ////////////////////////////////////////////////////////////////////////////

    this.elems = new Elems();
    this.results = [];
    this.choices = [];

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

    aIV.utils.freezeObj(this);
  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

  App.prototype.constructor = App;

  /**
   * -----------------------------------------------
   * Public Method (App.prototype.runTests)
   * -----------------------------------------------
   * @desc Sets up the display for the app & runs the tests.
   * @type {function}
   */
  App.prototype.runTests = function() {

    /** @type {string} */
    var prop;

    // Turn off the debugger instances for errors
    aIV.console.set({
      errorBreakpoints: false,
      addBreakpoints  : 'none',
      turnOnGroups    : false,
      turnOnTimers    : false
    });

    // Clear the console
    console.clear();

    // Clear the start message
    this.elems.clearUI();

    // Run all the tests
    for (prop in Tests) {
      if ( hasOwnProp(Tests, prop) ) {
        Tests[ prop ]();
      }
    }

    // Show the choices and record the results
    this.choices.reverse();
    this.showChoices();
  };

  /**
   * -----------------------------------------------
   * Public Method (App.prototype.addChoice)
   * -----------------------------------------------
   * @desc Adds a new choice to the app.
   * @param {string} choiceMsg - The choice message.
   * @param {!TestResults} results - The results object.
   * @param {string} errorMsg - The error message.
   * @param {?function=} before - A function that gets called before
   *   the choice is shown.
   * @param {?function=} after - A function that gets called after
   *   a choice is completed.
   */
  App.prototype.addChoice = function(choiceMsg, results, errorMsg, before, after) {

    /** @type {!Choice} */
    var choice;
    /** @type {string} */
    var typeErrorMsg;

    if (typeof choiceMsg !== 'string' || !(results instanceof TestResults) ||
        typeof errorMsg !== 'string') {
      typeErrorMsg = 'An addChoice call was given an invalid param data type.';
      throw new TypeError(typeErrorMsg);
      return;
    }

    if (!before || typeof before !== 'function') {
      before = function() {};
    }
    if (!after || typeof after !== 'function') {
      after = function() {};
    }

    choice = new Choice(choiceMsg, results, errorMsg, before, after);

    this.choices.push(choice);
  };

  /**
   * -----------------------------------------------
   * Public Method (App.prototype.showChoices)
   * -----------------------------------------------
   * @desc Show each choice until all results have been recorded.
   *   Then show the results.
   * @type {function}
   */
  App.prototype.showChoices = function() {

    /** @type {!Choice} */
    var choice;

    console.clear();

    if (!this.choices.length) {
      this.shareResults();
      return;
    }

    choice = this.choices.pop();

    // Hide the UI while setup is occurring
    this.elems.ui.style.opacity = '0';

    choice.before();

    setTimeout(function() {

      // Give the choice directions
      app.elems.msg.innerHTML = choice.msg;

      // Set the #yes onClick event
      app.elems.yes.onclick = function() {
        choice.after();
        app.showChoices();
      };

      // Set the #no onClick event
      app.elems.no.onclick = function() {
        choice.fail();
        choice.after();
        app.showChoices();
      };

      app.elems.choose.style.display = 'block';
      app.elems.ui.style.opacity = '1';
    }, 500);
  };

  /**
   * -----------------------------------------------
   * Public Method (App.prototype.shareResults)
   * -----------------------------------------------
   * @desc Clears the UI and shows all of the results for the tests.
   * @type {function}
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
 * The Choice Class (classes/choice.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Class (Choice)
   * -----------------------------------------------------
   * @desc A choice to be executed.
   * @param {string} choiceMsg - The choice message.
   * @param {!TestResults} results - The results object.
   * @param {string} errorMsg - The error message.
   * @param {function} before - A function that gets called before
   *   the choice is shown.
   * @param {function} after - A function that gets called after
   *   a choice is completed.
   * @constructor
   */
  var Choice = function(choiceMsg, results, errorMsg, before, after) {

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Property (Choice.msg)
     * -----------------------------------------------
     * @desc The choice directions.
     * @type {string}
     */
    this.msg = choiceMsg;

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Method (Choice.fail)
     * -----------------------------------------------
     * @desc A function that records an error and the
     *   failure of a test.
     * @type {function}
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
     * @type {function}
     */
    this.before = before;

    /**
     * ----------------------------------------------- 
     * Public Method (Choice.after)
     * -----------------------------------------------
     * @desc Logic to call after completing the choice.
     * @type {function}
     */
    this.after = after;

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

    // Deep freeze
    aIV.utils.freezeObj(this, true);
  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

  Choice.prototype.constructor = Choice;

/* -----------------------------------------------------------------------------
 * The Elems Class (classes/elems.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Class (Elems)
   * -----------------------------------------------------
   * @desc Important app elements.
   * @constructor
   */
  var Elems = function() {

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ---------------------------------------------------
     * Public Property (Elems.msg)
     * ---------------------------------------------------
     * @desc Element: #msg
     * @type {HTMLElement}
     */
    this.msg = getID('msg');

    /**
     * ---------------------------------------------------
     * Public Property (Elems.ui)
     * ---------------------------------------------------
     * @desc Element: #ui
     * @type {HTMLElement}
     */
    this.ui = getID('ui');

    /**
     * ---------------------------------------------------
     * Public Property (Elems.start)
     * ---------------------------------------------------
     * @desc Element: #start
     * @type {HTMLElement}
     */
    this.start = getID('start');

    /**
     * ---------------------------------------------------
     * Public Property (Elems.choose)
     * ---------------------------------------------------
     * @desc Element: #choose
     * @type {HTMLElement}
     */
    this.choose = getID('choose');

    /**
     * ---------------------------------------------------
     * Public Property (Elems.yes)
     * ---------------------------------------------------
     * @desc Element: #yes
     * @type {HTMLElement}
     */
    this.yes = getID('yes');

    /**
     * ---------------------------------------------------
     * Public Property (Elems.no)
     * ---------------------------------------------------
     * @desc Element: #no
     * @type {HTMLElement}
     */
    this.no = getID('no');

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

    aIV.utils.freezeObj(this);
  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

  Elems.prototype.constructor = Elems;

  /**
   * -----------------------------------------------
   * Public Method (Elems.prototype.clearUI)
   * -----------------------------------------------
   * @desc Clears the current interactions.
   * @type {function}
   */
  Elems.prototype.clearUI = function() {

    /** @type {!Elems} */
    var that;

    that = this;

    this.ui.style.opacity = '0';

    setTimeout(function() {
      that.msg.innerHTML = 'Tests are running.';
      that.start.style.display = 'none';
      that.choose.style.display = 'none';
      that.ui.style.opacity = '1';
    }, 500);
  };

/* -----------------------------------------------------------------------------
 * The Test Results Class (classes/test-results.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Class (TestResults)
   * -----------------------------------------------------
   * @desc Contains the results for a test.
   * @param {string} type - The type of tests that were ran.
   * @param {number=} amount - The number of tests that were ran.
   * @constructor
   */
  var TestResults = function(type, amount) {

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

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
     * @type {!strings}
     */
    var errors = [];

    if (!checkType(amount, 'number') || amount < 0) {
      amount = 0;
    }

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Method (TestResults.reportResult)
     * -----------------------------------------------
     * @desc Reports the tests and their results.
     * @return {string} The test's type followed by its results.
     */
    this.reportResult = function() {

      /** @type {string} */
      var classname;
      /** @type {number} */
      var passed;
      /** @type {string} */
      var msg;
      /** @type {string} */
      var report;

      classname = (errors.length) ? 'red' : 'green';

      if (amount && amount > errors.length) {
        passed = amount - errors.length;
        report = '' +
          '<li class="' + classname + '">' +
            '<span class="title">' + type + '</span>' +
            ' =&gt; ' +
            '<span class="passed">' +
              'Passed ' + passed + ' of ' + amount + ' Tests' +
            '</span>' +
          '</li>';
      }
      else {
        msg = (result) ? 'Pass' : 'Fail';
        report = '' +
          '<li class="' + classname + '">' +
            '<span class="title">' + type + '</span>' +
            ' =&gt; ' + msg +
          '</li>';
      }

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

      len = errors.length;

      if (!len) {
        return null;
      }

      // The type of results name
      report = '<li>' + type;

      // The errors
      report += '<ol id="subErrors">';

      i = -1;
      while (++i < len) {
        report += '<li>' + errors[i] + '</li>';
      }

      report += '</ol></li>';

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
      if (typeof pass === 'boolean') {
        result = pass;
      }
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

      if (typeof msg !== 'string') {
        msg = 'No error message was provided.';
      }

      errors.push(msg);
    };

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

    // Deep freeze
    aIV.utils.freezeObj(this, true);
  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

  TestResults.prototype.constructor = TestResults;

/* -----------------------------------------------------------------------------
 * Construct The Tests Class (classes/tests-construct.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Class (Tests)
   * -----------------------------------------------------
   * @desc The tests to run.
   * @type {!Object<string, function>}
   */
  var Tests = {};

/* -----------------------------------------------------------------------------
 * The Unit Tests (classes/tests/*.js) (classes/tests-methods.js)
 * -------------------------------------------------------------------------- */

  /**
   * -------------------------------------------------
   * Public Method (Tests.args)
   * -------------------------------------------------
   * @desc Tests aIV.debug().args.
   * @type {function}
   */
  Tests.args = (function setupTests_args() {

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private args Variables
    ////////////////////////////////////////////////////////////////////////////

    /** @type {!TestResults} */
    var results = new TestResults('Debug.proto.args', 3);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public args Method
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -------------------------------------------------
     * Public Method (args)
     * -------------------------------------------------
     * @desc Tests aIV.debug().args.
     * @type {function}
     */
    var args = function() {

      testLog();
      testLogWithArr();

      testLogMsg();

      // Save the results
      app.results.push(results);
    };

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private args Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ---------------------------------------------------
     * Private Method (testLog)
     * ---------------------------------------------------
     * @type {function}
     */
    var testLog = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create('Tests.args.testLog');

      pass = consoleInst.args('testMethod', 1, 'string');

      fail = consoleInst.args('testMethod', 's', 'string');

      if (!pass || fail) {
        errorMsg = 'Debug.proto.args failed to log';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testLogWithArr)
     * ---------------------------------------------------
     * @type {function}
     */
    var testLogWithArr = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create('Tests.args.testLogWithArr');

      pass = consoleInst.args([ 'testMethod', 1, 'string' ]);

      fail = consoleInst.args([ 'testMethod', 's', 'string' ]);

      if (!pass || fail) {
        errorMsg = 'Debug.proto.args failed to log with array';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testLogMsg)
     * ---------------------------------------------------
     * @type {function}
     */
    var testLogMsg = function() {

      /** @type {string} */
      var errorMsg;
      /** @type {string} */
      var choiceMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create('Tests.args.testLogMsg');

      choiceMsg = '<strong>Verify a log. The following message should have ';
      choiceMsg += 'been logged to the console:</strong><br /><br />';
      choiceMsg += '"ARGS: Tests.args.testLogMsg.testMethod() | ';
      choiceMsg += 'Error: Incorrect argument data type."';
      errorMsg = 'Debug.proto.args logged an incorrect message';
      app.addChoice(choiceMsg, results, errorMsg, function() {
        consoleInst.args('testMethod', 5, 'string');
      });
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The args Module
    ////////////////////////////////////////////////////////////////////////////

    return args;

  })();
  /**
   * -------------------------------------------------
   * Public Method (Tests.createInstance)
   * -------------------------------------------------
   * @desc Tests the aIV.console.create method's functionality.
   * @type {function}
   */
  Tests.createInstance = (function setupTests_createInstance() {

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private createInstance Variables
    ////////////////////////////////////////////////////////////////////////////

    /** @type {!TestResults} */
    var results = new TestResults('aIV.console.create', 17);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public createInstance Method
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -------------------------------------------------
     * Public Method (createInstance)
     * -------------------------------------------------
     * @desc Tests aIV.console.create.
     * @type {function}
     */
    var createInstance = function() {

      // Ensure the Debug object instance creation occurs correctly
      testOneInstanceCreate();
      testTwoInstanceCreateSame();
      testTwoInstanceCreateDifferent();

      // The remaining tests ensure that aIV.console.create
      // is reading and using its params correctly

      // Test the classTitle param
      testClassTitleAsProp();
      testClassTitleAsString();
      testClassTitleAsBlank();

      // Test the turnOffMethods param
      testTurnOffMethodsOne();
      testTurnOffMethodsAll();
      testTurnOffMethodsTwo();
      testTurnOffMethodsTwoArr();

      // Test the addBreakpoints param
      testAddBreakpointsOne();
      testAddBreakpointsAll();
      testAddBreakpointsTwo();
      testAddBreakpointsTwoArr();

      // Test the auto insert native console methods params
      testTurnOnGroups();
      testTurnOnProfiles();
      testTurnOnTimers();

      // Save the results
      app.results.push(results);
    };

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private createInstance Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ---------------------------------------------------
     * Private Method (testOneInstanceCreate)
     * ---------------------------------------------------
     * @type {function}
     */
    var testOneInstanceCreate = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;
      /** @type {strings} */
      var props;
      /** @type {number} */
      var i;

      consoleInst = aIV.console.create('createInst.testOneInstanceCreate');

      props = String('classTitle getMethod getBreakpoint getAuto ' +
                     'setMethod setBreakpoint setAuto').split(' ');

      pass = true;
      i = props.length;
      while (i--) {
        pass = pass && hasOwnProp(consoleInst, props[i]);
      }

      if (!pass) {
        errorMsg = 'aIV.console.create failed to create a Debug instance';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testTwoInstanceCreateSame)
     * ---------------------------------------------------
     * @type {function}
     */
    var testTwoInstanceCreateSame = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;
      /** @type {string} */
      var classTitle;
      /** @type {!Debug} */
      var consoleInst1;
      /** @type {!Debug} */
      var consoleInst2;

      classTitle = 'createInst.testTwoInstanceCreateSame';

      consoleInst1 = aIV.console.create(classTitle);
      consoleInst2 = aIV.console.create({
        classTitle: classTitle
      });

      pass = (consoleInst1 === consoleInst2);

      if (!pass) {
        errorMsg = 'aIV.console.create incorrectly created a new Debug ';
        errorMsg += 'instance when it should have retrieved an existing one';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testTwoInstanceCreateDifferent)
     * ---------------------------------------------------
     * @type {function}
     */
    var testTwoInstanceCreateDifferent = function() {

      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;
      /** @type {string} */
      var classTitle;
      /** @type {!Debug} */
      var consoleInst1;
      /** @type {!Debug} */
      var consoleInst2;

      classTitle = 'createInst.testTwoInstanceCreateDifferent';
      consoleInst1 = aIV.console.create(classTitle);
      consoleInst2 = aIV.console.create(classTitle + '2');

      fail = (consoleInst1 === consoleInst2);

      if (fail) {
        errorMsg = 'aIV.console.create failed to create two separate Debug ';
        errorMsg += 'instances correctly';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testClassTitleAsProp)
     * ---------------------------------------------------
     * @type {function}
     */
    var testClassTitleAsProp = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;
      /** @type {string} */
      var classTitle;
      /** @type {!Debug} */
      var consoleInst;

      classTitle = 'createInst.testClassTitleAsProp';

      consoleInst = aIV.console.create({
        classTitle: classTitle
      });

      classTitle += '.';

      pass = (consoleInst.classTitle === classTitle);

      if (!pass) {
        errorMsg = 'aIV.console.create({ classTitle: \'name\' }) failed to ';
        errorMsg += 'correctly setup the class title';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testClassTitleAsString)
     * ---------------------------------------------------
     * @type {function}
     */
    var testClassTitleAsString = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;
      /** @type {string} */
      var classTitle;
      /** @type {!Debug} */
      var consoleInst;

      classTitle = 'createInst.testClassTitleAsString';

      consoleInst = aIV.console.create(classTitle);

      classTitle += '.';

      pass = (consoleInst.classTitle === classTitle);

      if (!pass) {
        errorMsg = 'aIV.console.create(\'name\') failed to correctly setup the ';
        errorMsg += 'class title';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testClassTitleAsBlank)
     * ---------------------------------------------------
     * @type {function}
     */
    var testClassTitleAsBlank = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create();

      pass = (consoleInst.classTitle === 'unknown.');

      if (!pass) {
        errorMsg = 'aIV.console.create() failed to correctly setup the ';
        errorMsg += '\'unknown\' class title';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testTurnOffMethodsOne)
     * ---------------------------------------------------
     * @type {function}
     */
    var testTurnOffMethodsOne = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create({
        classTitle    : 'createInst.testTurnOffMethodsOne',
        turnOffMethods: 'misc'
      });

      pass = consoleInst.getMethod('init');
      pass = pass && consoleInst.getMethod('start');
      pass = pass && consoleInst.getMethod('end');
      pass = pass && consoleInst.getMethod('args');
      pass = pass && consoleInst.getMethod('fail');
      pass = pass && consoleInst.getMethod('group');
      pass = pass && consoleInst.getMethod('state');

      fail = consoleInst.getMethod('misc');

      if (!pass || fail) {
        errorMsg = 'aIV.console.create({ turnOffMethods: \'misc\' }) failed to ';
        errorMsg += 'turn off the instance\'s misc method';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testTurnOffMethodsAll)
     * ---------------------------------------------------
     * @type {function}
     */
    var testTurnOffMethodsAll = function() {

      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create({
        classTitle    : 'createInst.testTurnOffMethodsAll',
        turnOffMethods: 'all'
      });

      fail = consoleInst.getMethod('init');
      fail = fail || consoleInst.getMethod('start');
      fail = fail || consoleInst.getMethod('end');
      fail = fail || consoleInst.getMethod('args');
      fail = fail || consoleInst.getMethod('fail');
      fail = fail || consoleInst.getMethod('group');
      fail = fail || consoleInst.getMethod('state');
      fail = fail || consoleInst.getMethod('misc');

      if (fail) {
        errorMsg = 'aIV.console.create({ turnOffMethods: \'all\' }) failed to ';
        errorMsg += 'turn off all of the instance\'s methods';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testTurnOffMethodsTwo)
     * ---------------------------------------------------
     * @type {function}
     */
    var testTurnOffMethodsTwo = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create({
        classTitle    : 'createInst.testTurnOffMethodsTwo',
        turnOffMethods: 'end misc'
      });

      pass = consoleInst.getMethod('init');
      pass = pass && consoleInst.getMethod('start');
      pass = pass && consoleInst.getMethod('args');
      pass = pass && consoleInst.getMethod('fail');
      pass = pass && consoleInst.getMethod('group');
      pass = pass && consoleInst.getMethod('state');

      fail = consoleInst.getMethod('end');
      fail = fail || consoleInst.getMethod('misc');

      if (!pass || fail) {
        errorMsg = 'aIV.console.create({ turnOffMethods: \'end misc\' }) ';
        errorMsg += 'failed to turn off the instance\'s end and misc method';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testTurnOffMethodsTwoArr)
     * ---------------------------------------------------
     * @type {function}
     */
    var testTurnOffMethodsTwoArr = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create({
        classTitle    : 'createInst.testTurnOffMethodsTwoArr',
        turnOffMethods: [ 'end', 'misc' ]
      });

      pass = consoleInst.getMethod('init');
      pass = pass && consoleInst.getMethod('start');
      pass = pass && consoleInst.getMethod('args');
      pass = pass && consoleInst.getMethod('fail');
      pass = pass && consoleInst.getMethod('group');
      pass = pass && consoleInst.getMethod('state');

      fail = consoleInst.getMethod('end');
      fail = fail || consoleInst.getMethod('misc');

      if (!pass || fail) {
        errorMsg = "aIV.console.create({ turnOffMethods: [ 'end', 'misc' ] }) ";
        errorMsg += 'failed to turn off the instance\'s end and misc method';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testAddBreakpointsOne)
     * ---------------------------------------------------
     * @type {function}
     */
    var testAddBreakpointsOne = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create({
        classTitle    : 'createInst.testAddBreakpointsOne',
        addBreakpoints: 'misc'
      });

      pass = consoleInst.getBreakpoint('misc');

      fail = consoleInst.getBreakpoint('init');
      fail = fail || consoleInst.getBreakpoint('start');
      fail = fail || consoleInst.getBreakpoint('end');
      fail = fail || consoleInst.getBreakpoint('args');
      fail = fail || consoleInst.getBreakpoint('fail');
      fail = fail || consoleInst.getBreakpoint('group');
      fail = fail || consoleInst.getBreakpoint('state');

      if (!pass || fail) {
        errorMsg = 'aIV.console.create({ addBreakpoints: \'misc\' }) failed to ';
        errorMsg += 'add a breakpoint for the instance\'s misc method';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testAddBreakpointsAll)
     * ---------------------------------------------------
     * @type {function}
     */
    var testAddBreakpointsAll = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create({
        classTitle    : 'createInst.testAddBreakpointsAll',
        addBreakpoints: 'all'
      });

      pass = consoleInst.getBreakpoint('init');
      pass = pass && consoleInst.getBreakpoint('start');
      pass = pass && consoleInst.getBreakpoint('end');
      pass = pass && consoleInst.getBreakpoint('args');
      pass = pass && consoleInst.getBreakpoint('fail');
      pass = pass && consoleInst.getBreakpoint('group');
      pass = pass && consoleInst.getBreakpoint('state');
      pass = pass && consoleInst.getBreakpoint('misc');

      if (!pass) {
        errorMsg = 'aIV.console.create({ addBreakpoints: \'all\' }) failed to ';
        errorMsg += 'add breakpoints for all of the instance\'s methods';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testAddBreakpointsTwo)
     * ---------------------------------------------------
     * @type {function}
     */
    var testAddBreakpointsTwo = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create({
        classTitle    : 'createInst.testAddBreakpointsTwo',
        addBreakpoints: 'end misc'
      });

      pass = consoleInst.getBreakpoint('end');
      pass = pass && consoleInst.getBreakpoint('misc');

      fail = consoleInst.getBreakpoint('init');
      fail = fail || consoleInst.getBreakpoint('start');
      fail = fail || consoleInst.getBreakpoint('args');
      fail = fail || consoleInst.getBreakpoint('fail');
      fail = fail || consoleInst.getBreakpoint('group');
      fail = fail || consoleInst.getBreakpoint('state');

      if (!pass || fail) {
        errorMsg = 'aIV.console.create({ addBreakpoints: \'end misc\' }) ';
        errorMsg += 'failed to add a breakpoint for the instance\'s ';
        errorMsg += 'end and misc method';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testAddBreakpointsTwoArr)
     * ---------------------------------------------------
     * @type {function}
     */
    var testAddBreakpointsTwoArr = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create({
        classTitle    : 'createInst.testAddBreakpointsTwoArr',
        addBreakpoints: [ 'end', 'misc' ]
      });

      pass = consoleInst.getBreakpoint('end');
      pass = pass && consoleInst.getBreakpoint('misc');

      fail = consoleInst.getBreakpoint('init');
      fail = fail || consoleInst.getBreakpoint('start');
      fail = fail || consoleInst.getBreakpoint('args');
      fail = fail || consoleInst.getBreakpoint('fail');
      fail = fail || consoleInst.getBreakpoint('group');
      fail = fail || consoleInst.getBreakpoint('state');

      if (!pass || fail) {
        errorMsg = "aIV.console.create({ addBreakpoints: [ 'end', 'misc' ] }) ";
        errorMsg += 'failed to add a breakpoint for the instance\'s ';
        errorMsg += 'end and misc method';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testTurnOnGroups)
     * ---------------------------------------------------
     * @type {function}
     */
    var testTurnOnGroups = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create({
        classTitle  : 'createInst.testTurnOnGroups',
        turnOnGroups: true
      });

      pass = consoleInst.getAuto('groups');

      if (!pass) {
        errorMsg = 'aIV.console.create({ turnOnGroups: true }) failed to ';
        errorMsg += 'turn on the instance\'s auto groups';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testTurnOnProfiles)
     * ---------------------------------------------------
     * @type {function}
     */
    var testTurnOnProfiles = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create({
        classTitle    : 'createInst.testTurnOnProfiles',
        turnOnProfiles: true
      });

      pass = consoleInst.getAuto('profiles');

      if (!pass) {
        errorMsg = 'aIV.console.create({ turnOnProfiles: true }) failed to ';
        errorMsg += 'turn on the instance\'s auto profiles';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testTurnOnTimers)
     * ---------------------------------------------------
     * @type {function}
     */
    var testTurnOnTimers = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create({
        classTitle  : 'createInst.testTurnOnTimers',
        turnOnTimers: true
      });

      pass = consoleInst.getAuto('timers');

      if (!pass) {
        errorMsg = 'aIV.console.create({ turnOnTimers: true }) failed to ';
        errorMsg += 'turn on the instance\'s auto timers';
        results.addError(errorMsg);
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The createInstance Module
    ////////////////////////////////////////////////////////////////////////////

    return createInstance;

  })();
  /**
   * -------------------------------------------------
   * Public Method (Tests.end)
   * -------------------------------------------------
   * @desc Tests aIV.debug().end.
   * @type {function}
   */
  Tests.end = (function setupTests_end() {

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private end Variables
    ////////////////////////////////////////////////////////////////////////////

    /** @type {!TestResults} */
    var results = new TestResults('Debug.proto.end', 4);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public end Method
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -------------------------------------------------
     * Public Method (end)
     * -------------------------------------------------
     * @desc Tests aIV.debug().end.
     * @type {function}
     */
    var end = function() {

      testLog();
      testLogWithReturn();
      testLogWithArr();

      testLogMsg();

      // Save the results
      app.results.push(results);
    };

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private end Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ---------------------------------------------------
     * Private Method (testLog)
     * ---------------------------------------------------
     * @type {function}
     */
    var testLog = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create('Tests.end.testLog');

      pass = consoleInst.end('testMethod');

      if (!pass) {
        errorMsg = 'Debug.proto.end failed to log';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testLogWithReturn)
     * ---------------------------------------------------
     * @type {function}
     */
    var testLogWithReturn = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create('Tests.end.testLogWithReturn');

      pass = consoleInst.end('testMethod', 5);

      if (!pass) {
        errorMsg = 'Debug.proto.end failed to log with return value';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testLogWithArr)
     * ---------------------------------------------------
     * @type {function}
     */
    var testLogWithArr = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create('Tests.end.testLogWithArr');

      pass = consoleInst.end([ 'testMethod', 5 ]);

      if (!pass) {
        errorMsg = 'Debug.proto.end failed to log with array';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testLogMsg)
     * ---------------------------------------------------
     * @type {function}
     */
    var testLogMsg = function() {

      /** @type {string} */
      var errorMsg;
      /** @type {string} */
      var choiceMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create('Tests.end.testLogMsg');

      choiceMsg = '<strong>Verify a log. The following message should have ';
      choiceMsg += 'been logged to the console:</strong><br /><br />';
      choiceMsg += '"END: Tests.end.testLogMsg.testMethod() | return= 5"';
      errorMsg = 'Debug.proto.end logged an incorrect message';
      app.addChoice(choiceMsg, results, errorMsg, function() {
        consoleInst.end('testMethod', 5);
      });
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The end Module
    ////////////////////////////////////////////////////////////////////////////

    return end;

  })();
  /**
   * -------------------------------------------------
   * Public Method (Tests.fail)
   * -------------------------------------------------
   * @desc Tests aIV.debug().fail.
   * @type {function}
   */
  Tests.fail = (function setupTests_fail() {

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private fail Variables
    ////////////////////////////////////////////////////////////////////////////

    /** @type {!TestResults} */
    var results = new TestResults('Debug.proto.fail', 5);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public fail Method
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -------------------------------------------------
     * Public Method (fail)
     * -------------------------------------------------
     * @desc Tests aIV.debug().fail.
     * @type {function}
     */
    var fail = function() {

      testLog();
      testLogWithArgs();
      testLogWithArgsArr();
      testLogWithFunc();

      testLogMsg();

      // Save the results
      app.results.push(results);
    };

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private fail Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ---------------------------------------------------
     * Private Method (testLog)
     * ---------------------------------------------------
     * @type {function}
     */
    var testLog = function() {

      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create('Tests.fail.testLog');

      fail = consoleInst.fail('testMethod', true, 'Message');

      if (fail) {
        errorMsg = 'Debug.proto.fail failed to log';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testLogWithArgs)
     * ---------------------------------------------------
     * @type {function}
     */
    var testLogWithArgs = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create('Tests.fail.testLogWithArgs');

      pass = consoleInst.fail('testMethod', 0, '5 should be $$', 5);

      fail = consoleInst.fail('testMethod', 1, '5 should be $$', 5);

      if (!pass || fail) {
        errorMsg = 'Debug.proto.fail failed to log with arguments';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testLogWithArgsArr)
     * ---------------------------------------------------
     * @type {function}
     */
    var testLogWithArgsArr = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create('Tests.fail.testLogWithArgsArr');

      pass = consoleInst.fail([ 'testMethod', 0, '5 should be $$', 5 ]);

      fail = consoleInst.fail([ 'testMethod', 1, '5 should be $$', 5 ]);

      if (!pass || fail) {
        errorMsg = 'Debug.proto.fail failed to log with arguments array';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testLogWithFunc)
     * ---------------------------------------------------
     * @type {function}
     */
    var testLogWithFunc = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {function(): boolean} */
      var passFunc;
      /** @type {function(): boolean} */
      var failFunc;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create('Tests.fail.testLogWithFunc');
      passFunc = function() { return true; };
      failFunc = function() { return false; };

      pass = consoleInst.fail('testMethod', failFunc, 'Message');

      fail = consoleInst.fail('testMethod', passFunc, 'Message');

      if (!pass || fail) {
        errorMsg = 'Debug.proto.fail failed to log with function';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testLogMsg)
     * ---------------------------------------------------
     * @type {function}
     */
    var testLogMsg = function() {

      /** @type {string} */
      var errorMsg;
      /** @type {string} */
      var choiceMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create('Tests.fail.testLogMsg');

      choiceMsg = '<strong>Verify a log. The following message should have ';
      choiceMsg += 'been logged to the console:</strong><br /><br />';
      choiceMsg += '"FAIL: Tests.fail.testLogMsg.testMethod() | 5 was 6"';
      errorMsg = 'Debug.proto.fail logged an incorrect message';
      app.addChoice(choiceMsg, results, errorMsg, function() {
        consoleInst.fail('testMethod', false, '5 was $$', 6);
      });
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The fail Module
    ////////////////////////////////////////////////////////////////////////////

    return fail;

  })();
  /**
   * -------------------------------------------------
   * Public Method (Tests.group)
   * -------------------------------------------------
   * @desc Tests aIV.debug().group.
   * @type {function}
   */
  Tests.group = (function setupTests_group() {

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private group Variables
    ////////////////////////////////////////////////////////////////////////////

    /** @type {!TestResults} */
    var results = new TestResults('Debug.proto.group', 5);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public group Method
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -------------------------------------------------
     * Public Method (group)
     * -------------------------------------------------
     * @desc Tests aIV.debug().group.
     * @type {function}
     */
    var group = function() {

      testLog();
      testLogWithArr();
      testLogWithArgs();
      testLogWithArgsArr();

      testLogMsg();

      // Save the results
      app.results.push(results);
    };

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private group Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ---------------------------------------------------
     * Private Method (testLog)
     * ---------------------------------------------------
     * @type {function}
     */
    var testLog = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create('Tests.group.testLog');

      pass = consoleInst.group('testMethod', 'end');

      if (!pass) {
        errorMsg = 'Debug.proto.group failed to work';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testLogWithArr)
     * ---------------------------------------------------
     * @type {function}
     */
    var testLogWithArr = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create('Tests.group.testLogWithArr');

      pass = consoleInst.group([ 'testMethod', 'open' ]);

      if (!pass) {
        errorMsg = 'Debug.proto.group failed to work with array';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testLogWithArgs)
     * ---------------------------------------------------
     * @type {function}
     */
    var testLogWithArgs = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create('Tests.group.testLogWithArgs');

      pass = consoleInst.group('testMethod', 'open', 'testNumber= $$', 5);

      if (!pass) {
        errorMsg = 'Debug.proto.group failed to work with arguments';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testLogWithArgsArr)
     * ---------------------------------------------------
     * @type {function}
     */
    var testLogWithArgsArr = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create('Tests.group.testLogWithArgsArr');

      pass = consoleInst.group([ 'testMethod', 'coll', 'testNumber= $$', 5 ]);

      if (!pass) {
        errorMsg = 'Debug.proto.group failed to work with an array ';
        errorMsg += 'with arguments';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testLogMsg)
     * ---------------------------------------------------
     * @type {function}
     */
    var testLogMsg = function() {

      /** @type {string} */
      var errorMsg;
      /** @type {string} */
      var choiceMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create('Tests.group.testLogMsg');

      choiceMsg = '<strong>Verify a log group and a log. The following group ';
      choiceMsg += 'and log should have been created in the console:</strong>';
      choiceMsg += '<br /><br />';
      choiceMsg += '"GROUP: Tests.group.testLogMsg.testMethod() | ';
      choiceMsg += 'testNumber= 5"<br /><br />';
      choiceMsg += '"MISC: Tests.group.testLogMsg.testMethod() | ';
      choiceMsg += 'A test log message."';
      errorMsg = 'Debug.proto.group logged an incorrect message';
      app.addChoice(choiceMsg, results, errorMsg, function() {
        consoleInst.group('testMethod', 'open', 'testNumber= $$', 5);
        consoleInst.misc('testMethod', 'A test log message.');
        consoleInst.group('testMethod', 'end');
      });
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The group Module
    ////////////////////////////////////////////////////////////////////////////

    return group;

  })();
  /**
   * -------------------------------------------------
   * Public Method (Tests.init)
   * -------------------------------------------------
   * @desc Tests aIV.debug().init.
   * @type {function}
   */
  Tests.init = (function setupTests_init() {

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private init Variables
    ////////////////////////////////////////////////////////////////////////////

    /** @type {!TestResults} */
    var results = new TestResults('Debug.proto.init', 4);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public init Method
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -------------------------------------------------
     * Public Method (init)
     * -------------------------------------------------
     * @desc Tests aIV.debug().init.
     * @type {function}
     */
    var init = function() {

      testLog();
      testLogWithArgs();
      testLogWithArgsArr();

      testLogMsg();

      // Save the results
      app.results.push(results);
    };

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private init Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ---------------------------------------------------
     * Private Method (testLog)
     * ---------------------------------------------------
     * @type {function}
     */
    var testLog = function() {

      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create('Tests.init.testLog');

      fail = consoleInst.init('testMethod');

      if (fail) {
        errorMsg = 'Debug.proto.init failed to log';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testLogWithArgs)
     * ---------------------------------------------------
     * @type {function}
     */
    var testLogWithArgs = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create('Tests.init.testLogWithArgs');

      pass = consoleInst.init('testMethod', 1, 'string');

      fail = consoleInst.init('testMethod', 's', 'string');

      if (!pass || fail) {
        errorMsg = 'Debug.proto.init failed to log with arguments';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testLogWithArgsArr)
     * ---------------------------------------------------
     * @type {function}
     */
    var testLogWithArgsArr = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create('Tests.init.testLogWithArgsArr');

      pass = consoleInst.init([ 'testMethod', 1, 'string' ]);

      fail = consoleInst.init([ 'testMethod', 's', 'string' ]);

      if (!pass || fail) {
        errorMsg = 'Debug.proto.init failed to log with arguments array';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testLogMsg)
     * ---------------------------------------------------
     * @type {function}
     */
    var testLogMsg = function() {

      /** @type {string} */
      var errorMsg;
      /** @type {string} */
      var choiceMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create('Tests.init.testLogMsg');

      choiceMsg = '<strong>Verify logs. The following messages should have ';
      choiceMsg += 'been logged to the console:</strong><br /><br />';
      choiceMsg += '"CALL: Tests.start.testLogMsg.testMethod()"<br /><br />';
      choiceMsg += '"ARGS: Tests.init.testLogMsg.testMethod() | ';
      choiceMsg += 'Error: Incorrect argument data type."<br /><br />';
      choiceMsg += '"CALL: Tests.start.testLogMsg.testMethod(5)"';
      errorMsg = 'Debug.proto.init logged an incorrect message';
      app.addChoice(choiceMsg, results, errorMsg, function() {
        consoleInst.init('testMethod');
        consoleInst.init('testMethod', 5, 'string');
      });
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The init Module
    ////////////////////////////////////////////////////////////////////////////

    return init;

  })();
  /**
   * -------------------------------------------------
   * Public Method (Tests.start)
   * -------------------------------------------------
   * @desc Tests aIV.debug().start.
   * @type {function}
   */
  Tests.start = (function setupTests_start() {

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private start Variables
    ////////////////////////////////////////////////////////////////////////////

    /** @type {!TestResults} */
    var results = new TestResults('Debug.proto.start', 4);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public start Method
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -------------------------------------------------
     * Public Method (start)
     * -------------------------------------------------
     * @desc Tests aIV.debug().start.
     * @type {function}
     */
    var start = function() {

      testLog();
      testLogWithArgs();
      testLogWithArgsArr();

      testLogMsg();

      // Save the results
      app.results.push(results);
    };

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private start Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ---------------------------------------------------
     * Private Method (testLog)
     * ---------------------------------------------------
     * @type {function}
     */
    var testLog = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create('Tests.start.testLog');

      pass = consoleInst.start('testMethod');

      if (!pass) {
        errorMsg = 'Debug.proto.start failed to log';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testLogWithArgs)
     * ---------------------------------------------------
     * @type {function}
     */
    var testLogWithArgs = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create('Tests.start.testLogWithArgs');

      pass = consoleInst.start('testMethod', 5, [ 5 ]);

      if (!pass) {
        errorMsg = 'Debug.proto.start failed to log with arguments';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testLogWithArgsArr)
     * ---------------------------------------------------
     * @type {function}
     */
    var testLogWithArgsArr = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create('Tests.start.testLogWithArgsArr');

      pass = consoleInst.start([ 'testMethod', 5, [ 5 ] ]);

      if (!pass) {
        errorMsg = 'Debug.proto.start failed to log with arguments array';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testLogMsg)
     * ---------------------------------------------------
     * @type {function}
     */
    var testLogMsg = function() {

      /** @type {string} */
      var errorMsg;
      /** @type {string} */
      var choiceMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create('Tests.start.testLogMsg');

      choiceMsg = '<strong>Verify a log. The following message should have ';
      choiceMsg += 'been logged to the console:</strong><br /><br />';
      choiceMsg += '"CALL: Tests.start.testLogMsg.testMethod(5)"';
      errorMsg = 'Debug.proto.start logged an incorrect message';
      app.addChoice(choiceMsg, results, errorMsg, function() {
        consoleInst.start('testMethod', 5);
      });
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The start Module
    ////////////////////////////////////////////////////////////////////////////

    return start;

  })();
  /**
   * -------------------------------------------------
   * Public Method (Tests.state)
   * -------------------------------------------------
   * @desc Tests aIV.debug().state.
   * @type {function}
   */
  Tests.state = (function setupTests_state() {

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private state Variables
    ////////////////////////////////////////////////////////////////////////////

    /** @type {!TestResults} */
    var results = new TestResults('Debug.proto.state', 3);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public state Method
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -------------------------------------------------
     * Public Method (state)
     * -------------------------------------------------
     * @desc Tests aIV.debug().state.
     * @type {function}
     */
    var state = function() {

      testLog();
      testLogWithArr();
      testLogMsg();

      // Save the results
      app.results.push(results);
    };

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private state Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ---------------------------------------------------
     * Private Method (testLog)
     * ---------------------------------------------------
     * @type {function}
     */
    var testLog = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create('Tests.state.testLog');

      pass = consoleInst.state('testMethod', 'testNumber= $$', 5, 'blah');

      if (!pass) {
        errorMsg = 'Debug.proto.state failed to log';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testLogWithArr)
     * ---------------------------------------------------
     * @type {function}
     */
    var testLogWithArr = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create('Tests.state.testLogWithArr');

      pass = consoleInst.state([ 'testMethod', 'testNumber= $$', 5, 'blah' ]);

      if (!pass) {
        errorMsg = 'Debug.proto.state failed to log with an array';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testLogMsg)
     * ---------------------------------------------------
     * @type {function}
     */
    var testLogMsg = function() {

      /** @type {string} */
      var errorMsg;
      /** @type {string} */
      var choiceMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create('Tests.state.testLogMsg');

      choiceMsg = '<strong>Verify a log. The following message should have ';
      choiceMsg += 'been logged to the console:</strong><br /><br />';
      choiceMsg += '"CALL: Tests.state.testLogMsg.testMethod() | ';
      choiceMsg += 'testNumber= 5; unknownVar1= empty"';
      errorMsg = 'Debug.proto.state logged an incorrect message';
      app.addChoice(choiceMsg, results, errorMsg, function() {
        consoleInst.state('testMethod', 'testNumber= $$', 5, 'empty');
      });
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The state Module
    ////////////////////////////////////////////////////////////////////////////

    return state;

  })();

/* -----------------------------------------------------------------------------
 * Deep Freeze The Tests Class
 * -------------------------------------------------------------------------- */

  aIV.utils.freezeObj(Tests, true);

////////////////////////////////////////////////////////////////////////////////
// The Tests Module End
////////////////////////////////////////////////////////////////////////////////

  return testsModuleAPI;

})());
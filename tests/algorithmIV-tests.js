/**
 * -----------------------------------------------------------------------------
 * Algorithm IV Debugger Tests (v1.1.0)
 * -----------------------------------------------------------------------------
 * @file The module used to run all testing for aIV.conole.
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

    Object.freeze(this);
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

    Object.freeze(this.fail);
    Object.freeze(this.before);
    Object.freeze(this.after);
    Object.freeze(this);
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

    Object.freeze(this);
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
   * @constructor
   */
  var TestResults = function(type) {

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
     * @type {?strings}
     */
    var errors = null;

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

      if (errors) {
        errors.push(msg);
      }
      else {
        errors = [ msg ];
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

    Object.freeze(this.reportResult);
    Object.freeze(this.reportErrors);
    Object.freeze(this.getResult);
    Object.freeze(this.setResult);
    Object.freeze(this.addError);
    Object.freeze(this);
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
 * The Tests (classes/tests-methods.js)
 * -------------------------------------------------------------------------- */

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
    var results = new TestResults('aIV.console.create');

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

      // The remaining tests ensure that aIV.console.create is reading and
      // using its params correctly

      // Test the classTitle param
      testClassTitleAsProp();
      testClassTitleAsString();
      testClassTitleAsBlank();

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

      consoleInst = aIV.console.create('createInst.testOneInstanceCreate');

      pass = Object.prototype.toString.call(consoleInst) === '[object Debug]';

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

      classTitle = 'createInst.testTwoInstanceCreateSame';

      consoleInst1 = aIV.console.create(classTitle);
      consoleInst2 = aIV.console.create({
        classTitle    : classTitle,
        turnOffMethods: 'misc'
      });

      pass = consoleInst1.misc('test', 'Instance Test 1');
      pass = pass && consoleInst2.misc('test', 'Instance Test 2');

      consoleInst1.setMethod('misc', false);

      fail = consoleInst1.misc('test', 'Instance Test 3');
      fail = fail || consoleInst2.misc('test', 'Instance Test 4');

      if (!pass || fail) {
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
      var pass;
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

      pass = consoleInst1.misc('test', 'Instance Test 1');
      consoleInst1.setMethod('misc', false);
      fail = consoleInst1.misc('test', 'Instance Test 2');

      pass = pass && consoleInst2.misc('test', 'Instance Test 3');
      consoleInst2.setMethod('misc', false);
      fail = fail || consoleInst2.misc('test', 'Instance Test 4');

      if (!pass || fail) {
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

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The createInstance Module
    ////////////////////////////////////////////////////////////////////////////

    return createInstance;

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
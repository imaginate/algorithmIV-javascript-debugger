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
    Tests.checkTurnOffMethods();
    Tests.checkAddBreakpoints();

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

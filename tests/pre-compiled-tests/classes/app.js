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

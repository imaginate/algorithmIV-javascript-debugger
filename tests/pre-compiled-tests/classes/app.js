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

    // Run the choices and record the results
    this.runChoices();

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
      var tests;

      results = new TestResults('checkClassTitle');
      Object.freeze(results);

      result = true;

      // Setup for the tests
      tests = {
        prop: aIV.debug({ classTitle: 'checkClassTitle.tests.prop' }),
        str : aIV.debug('checkClassTitle.tests.str'),
        none: aIV.debug()
      };

      // Run the tests
      if (tests.prop.classTitle !== 'checkClassTitle.tests.prop.') {
        result = false;
        msg = 'checkClassTitle.tests.prop failed. ';
        msg += tests.prop.classTitle + ' !== checkClassTitle.tests.prop.';
        results.addError(msg);
      }

      if (tests.str.classTitle !== 'checkClassTitle.tests.str.') {
        result = false;
        msg = 'checkClassTitle.tests.str failed. ';
        msg += tests.str.classTitle + ' !== checkClassTitle.tests.str.';
        results.addError(msg);
      }

      if (tests.none.classTitle !== 'unknown.') {
        result = false;
        msg = 'checkClassTitle.tests.none failed. ';
        msg += tests.none.classTitle + ' !== unknown.';
        results.addError(msg);
      }

      // Save the results
      results.setResult(result);
      that.results.push(results);
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
      that.results.push(results);
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
      that.results.push(results);
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
      that.addChoice(choice, results, msg, function() {
        tests.first.misc('test1', 'Test 1 - This log should be shown.');
        tests.second.misc('test2', 'Test 2 - This log should be shown.');
      });

      choice = 'Did test3 and test4 NOT get logged?';
      msg = 'checkInstances.tests.second failed.';
      that.addChoice(choice, results, msg, function() {
        tests.first.setType('misc', false);
        tests.first.misc('test3', 'Test 3 - This log should NOT be shown.');
        tests.second.misc('test4', 'Test 4 - This log should NOT be shown.');
      });

      // Save the results
      that.results.push(results);
    }
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

    results = '<ol>';
    len = this.results.length;

    i = -1;
    while (++i < len) {
      results += this.results[i].reportResult();
    }

    results += '</ol>';
    results += '<ol>';

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

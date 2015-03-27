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

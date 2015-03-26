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

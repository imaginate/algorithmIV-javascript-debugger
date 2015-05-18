  /**
   * -------------------------------------------------
   * Public Method (Tests.reset)
   * -------------------------------------------------
   * @desc Tests aIV.console.reset.
   * @type {function}
   */
  Tests.reset = (function setupTests_reset() {

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private reset Variables
    ////////////////////////////////////////////////////////////////////////////

    /** @type {!TestResults} */
    var results = new TestResults('aIV.console.reset', 5);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public reset Method
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -------------------------------------------------
     * Public Method (reset)
     * -------------------------------------------------
     * @desc Tests aIV.console.reset.
     * @type {function}
     */
    var reset = function() {

      // Test one string
      testClassTitle();
      testTurnOffMethods();

      // Test other options
      testArgs();
      testArgArr();
      testAll();

      // Reset to desired defaults before continuing
      aIV.console.set({
        errorBreakpoints   : false,
        formatElementsAsObj: true,
        classTitle         : 'unknown',
        turnOffMethods     : 'none',
        addBreakpoints     : 'none',
        turnOnGroups       : false,
        openGroups         : false,
        turnOnProfiles     : false,
        turnOnTimers       : false
      });

      // Save the results
      app.results.push(results);
    };

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private reset Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ---------------------------------------------------
     * Private Method (testClassTitle)
     * ---------------------------------------------------
     * @type {function}
     */
    var testClassTitle = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      aIV.console.set({
        classTitle: 'empty'
      });
      consoleInst = aIV.console.create();

      pass = (consoleInst.classTitle === 'empty.');

      aIV.console.reset('className');
      consoleInst = aIV.console.create();

      pass = (consoleInst.classTitle === 'unknown.');

      if (!pass) {
        errorMsg = 'aIV.console.reset failed to reset the default classTitle';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testTurnOffMethods)
     * ---------------------------------------------------
     * @type {function}
     */
    var testTurnOffMethods = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      aIV.console.set({
        turnOffMethods: 'end'
      });
      consoleInst = aIV.console.create('Tests.reset.testTurnOffMethods.1');

      fail = consoleInst.getMethod('end');

      aIV.console.reset('turnOffTypes');
      consoleInst = aIV.console.create('Tests.reset.testTurnOffMethods.2');

      pass = consoleInst.getMethod('end');

      if (!pass || fail) {
        errorMsg = 'aIV.console.reset failed to reset the default turnOffMethods';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testArgs)
     * ---------------------------------------------------
     * @type {function}
     */
    var testArgs = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      aIV.console.set({
        turnOffMethods: 'end',
        addBreakpoints: 'end',
        turnOnProfiles: true
      });
      consoleInst = aIV.console.create('Tests.reset.testArgs.1');

      fail = consoleInst.getMethod('end');
      pass = consoleInst.getBreakpoint('end');
      pass = pass && consoleInst.getAuto('profiles');

      aIV.console.reset('turnOffMethods', 'addBreakpoints', 'turnOnProfiles');
      consoleInst = aIV.console.create('Tests.reset.testArgs.2');

      pass = pass && consoleInst.getMethod('end');
      fail = fail || consoleInst.getBreakpoint('end');
      fail = fail || consoleInst.getAuto('profiles');

      if (!pass || fail) {
        errorMsg = 'aIV.console.reset failed to reset with multiple arguments';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testArgArr)
     * ---------------------------------------------------
     * @type {function}
     */
    var testArgArr = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      aIV.console.set({
        turnOffMethods: 'end',
        addBreakpoints: 'end'
      });
      consoleInst = aIV.console.create('Tests.reset.testArgArr.1');

      fail = consoleInst.getMethod('end');
      pass = consoleInst.getBreakpoint('end');

      aIV.console.reset([ 'turnOffMethods', 'addBreakpoints' ]);
      consoleInst = aIV.console.create('Tests.reset.testArgArr.2');

      pass = pass && consoleInst.getMethod('end');
      fail = fail || consoleInst.getBreakpoint('end');

      if (!pass || fail) {
        errorMsg = 'aIV.console.reset failed to reset with argument array';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testAll)
     * ---------------------------------------------------
     * @type {function}
     */
    var testAll = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      aIV.console.set({
        turnOffMethods: 'end',
        addBreakpoints: 'end',
        turnOnProfiles: true
      });
      consoleInst = aIV.console.create('Tests.reset.testAll.1');

      fail = consoleInst.getMethod('end');
      pass = consoleInst.getBreakpoint('end');
      pass = pass && consoleInst.getAuto('profiles');

      aIV.console.reset();
      consoleInst = aIV.console.create('Tests.reset.testAll.2');

      pass = pass && consoleInst.getMethod('end');
      fail = fail || consoleInst.getBreakpoint('end');
      fail = fail || consoleInst.getAuto('profiles');

      if (!pass || fail) {
        errorMsg = 'aIV.console.reset failed to reset all';
        results.addError(errorMsg);
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The reset Module
    ////////////////////////////////////////////////////////////////////////////

    return reset;

  })();

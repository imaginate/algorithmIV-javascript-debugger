  /**
   * -------------------------------------------------
   * Public Method (Tests.set)
   * -------------------------------------------------
   * @desc Tests aIV.console.set.
   * @type {function}
   */
  Tests.set = (function setupTests_set() {

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private set Variables
    ////////////////////////////////////////////////////////////////////////////

    /** @type {!TestResults} */
    var results = new TestResults('aIV.console.set', 6);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public set Method
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -------------------------------------------------
     * Public Method (set)
     * -------------------------------------------------
     * @desc Tests aIV.console.set.
     * @type {function}
     */
    var set = function() {

      // The update defaults tests
      testClassTitle();
      testTurnOffMethods();
      testAddBreakpoints();
      testTurnOnGroups();
      testTurnOnProfiles();
      testTurnOnTimers();

      // Reset the defaults before continuing
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
    // Define & Setup The Private set Methods
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

      if (!pass) {
        errorMsg = 'aIV.console.set failed to set the default classTitle';
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
      var fail;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      aIV.console.set({
        turnOffMethods: 'end'
      });

      consoleInst = aIV.console.create('Tests.set.testTurnOffMethods');

      fail = consoleInst.getMethod('end');

      if (fail) {
        errorMsg = 'aIV.console.set failed to set the default turnOffMethods';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testAddBreakpoints)
     * ---------------------------------------------------
     * @type {function}
     */
    var testAddBreakpoints = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      aIV.console.set({
        addBreakpoints: 'end'
      });

      consoleInst = aIV.console.create('Tests.set.testAddBreakpoints');

      pass = consoleInst.getBreakpoint('end');

      if (!pass) {
        errorMsg = 'aIV.console.set failed to set the default addBreakpoints';
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

      aIV.console.set({
        turnOnGroups: true
      });

      consoleInst = aIV.console.create('Tests.set.testTurnOnGroups');

      pass = consoleInst.getAuto('groups');

      if (!pass) {
        errorMsg = 'aIV.console.set failed to set the default turnOnGroups';
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

      aIV.console.set({
        turnOnProfiles: true
      });

      consoleInst = aIV.console.create('Tests.set.testTurnOnProfiles');

      pass = consoleInst.getAuto('profiles');

      if (!pass) {
        errorMsg = 'aIV.console.set failed to set the default turnOnProfiles';
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

      aIV.console.set({
        turnOnTimers: true
      });

      consoleInst = aIV.console.create('Tests.set.testTurnOnTimers');

      pass = consoleInst.getAuto('timers');

      if (!pass) {
        errorMsg = 'aIV.console.set failed to set the default turnOnTimers';
        results.addError(errorMsg);
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The set Module
    ////////////////////////////////////////////////////////////////////////////

    return set;

  })();

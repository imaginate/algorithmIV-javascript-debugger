  /**
   * -------------------------------------------------
   * Public Method (Tests.toggleBreakpoint)
   * -------------------------------------------------
   * @desc Tests aIV.debug().add/removeBreakpoint.
   * @type {function}
   */
  Tests.toggleBreakpoint = (function setupTests_toggleBreakpoint() {

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private toggleBreakpoint Variables
    ////////////////////////////////////////////////////////////////////////////

    /** @type {!TestResults} */
    var results = new TestResults('add/removeBreakpoint', 4);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public toggleBreakpoint Method
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -------------------------------------------------
     * Public Method (toggleBreakpoint)
     * -------------------------------------------------
     * @desc Tests aIV.debug().add/removeBreakpoint.
     * @type {function}
     */
    var toggleBreakpoint = function() {

      testToggleOne();
      testToggleTwoString();
      testToggleTwoArr();
      testToggleTwoStrings();

      // Save the results
      app.results.push(results);
    };

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private toggleBreakpoint Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ---------------------------------------------------
     * Private Method (testToggleOne)
     * ---------------------------------------------------
     * @type {function}
     */
    var testToggleOne = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create({
        classTitle    : 'Tests.toggleBreakpoint.testToggleOne',
        addBreakpoints: 'all'
      });

      consoleInst.removeBreakpoint('end');
      fail = consoleInst.getBreakpoint('end');

      consoleInst.addBreakpoint('end');
      pass = consoleInst.getBreakpoint('end');

      if (!pass || fail) {
        errorMsg = 'Debug.proto.add/removeBreakpoint failed to toggle one method';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testToggleTwoString)
     * ---------------------------------------------------
     * @type {function}
     */
    var testToggleTwoString = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create({
        classTitle    : 'Tests.toggleBreakpoint.testToggleTwoString',
        addBreakpoints: 'all'
      });

      consoleInst.removeBreakpoint('end init');
      fail = consoleInst.getBreakpoint('end');
      fail = fail || consoleInst.getBreakpoint('init');

      consoleInst.addBreakpoint('end init');
      pass = consoleInst.getBreakpoint('end');
      pass = pass && consoleInst.getBreakpoint('init');

      if (!pass || fail) {
        errorMsg = 'Debug.proto.add/removeBreakpoint failed to toggle two methods ';
        errorMsg += 'with a spaced string';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testToggleTwoArr)
     * ---------------------------------------------------
     * @type {function}
     */
    var testToggleTwoArr = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create({
        classTitle    : 'Tests.toggleBreakpoint.testToggleTwoArr',
        addBreakpoints: 'all'
      });

      consoleInst.removeBreakpoint([ 'end', 'init' ]);
      fail = consoleInst.getBreakpoint('end');
      fail = fail || consoleInst.getBreakpoint('init');

      consoleInst.addBreakpoint([ 'end', 'init' ]);
      pass = consoleInst.getBreakpoint('end');
      pass = pass && consoleInst.getBreakpoint('init');

      if (!pass || fail) {
        errorMsg = 'Debug.proto.add/removeBreakpoint failed to toggle two methods ';
        errorMsg += 'with an array of strings';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testToggleTwoStrings)
     * ---------------------------------------------------
     * @type {function}
     */
    var testToggleTwoStrings = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create({
        classTitle    : 'Tests.toggleBreakpoint.testToggleTwoStrings',
        addBreakpoints: 'all'
      });

      consoleInst.removeBreakpoint('end', 'init');
      fail = consoleInst.getBreakpoint('end');
      fail = fail || consoleInst.getBreakpoint('init');

      consoleInst.addBreakpoint('end', 'init');
      pass = consoleInst.getBreakpoint('end');
      pass = pass && consoleInst.getBreakpoint('init');

      if (!pass || fail) {
        errorMsg = 'Debug.proto.add/removeBreakpoint failed to toggle two methods ';
        errorMsg += 'with two string arguments';
        results.addError(errorMsg);
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The toggleBreakpoint Module
    ////////////////////////////////////////////////////////////////////////////

    return toggleBreakpoint;

  })();

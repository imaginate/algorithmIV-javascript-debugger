  /**
   * -------------------------------------------------
   * Public Method (Tests.toggleMethod)
   * -------------------------------------------------
   * @desc Tests aIV.debug().turnOn/OffMethod.
   * @type {function}
   */
  Tests.toggleMethod = (function setupTests_toggleMethod() {

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private toggleMethod Variables
    ////////////////////////////////////////////////////////////////////////////

    /** @type {!TestResults} */
    var results = new TestResults('turnOn/OffMethod', 3);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public toggleMethod Method
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -------------------------------------------------
     * Public Method (toggleMethod)
     * -------------------------------------------------
     * @desc Tests aIV.debug().turnOn/OffMethod.
     * @type {function}
     */
    var toggleMethod = function() {

      testToggleOne();
      testToggleTwoString();
      testToggleTwoArr();

      // Save the results
      app.results.push(results);
    };

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private toggleMethod Methods
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
        classTitle    : 'Tests.toggleMethod.testToggleOne',
        turnOffMethods: 'all'
      });

      consoleInst.turnOnMethod('end');
      pass = consoleInst.getMethod('end');

      consoleInst.turnOffMethod('end');
      fail = consoleInst.getMethod('end');

      if (!pass || fail) {
        errorMsg = 'Debug.proto.turnOn/OffMethod failed to toggle one method';
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
        classTitle    : 'Tests.toggleMethod.testToggleTwoString',
        turnOffMethods: 'all'
      });

      consoleInst.turnOnMethod('end init');
      pass = consoleInst.getMethod('end');
      pass = pass && consoleInst.getMethod('init');

      consoleInst.turnOffMethod('end init');
      fail = consoleInst.getMethod('end');
      fail = fail || consoleInst.getMethod('init');

      if (!pass || fail) {
        errorMsg = 'Debug.proto.turnOn/OffMethod failed to toggle two methods ';
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
        classTitle    : 'Tests.toggleMethod.testToggleTwoArr',
        turnOffMethods: 'all'
      });

      consoleInst.turnOnMethod([ 'end', 'init' ]);
      pass = consoleInst.getMethod('end');
      pass = pass && consoleInst.getMethod('init');

      consoleInst.turnOffMethod([ 'end', 'init' ]);
      fail = consoleInst.getMethod('end');
      fail = fail || consoleInst.getMethod('init');

      if (!pass || fail) {
        errorMsg = 'Debug.proto.turnOn/OffMethod failed to toggle two methods ';
        errorMsg += 'with an array of strings';
        results.addError(errorMsg);
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The toggleMethod Module
    ////////////////////////////////////////////////////////////////////////////

    return toggleMethod;

  })();

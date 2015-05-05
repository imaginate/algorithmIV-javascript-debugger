  /**
   * -------------------------------------------------
   * Public Auto (Tests.toggleAuto)
   * -------------------------------------------------
   * @desc Tests aIV.debug().turnOn/OffAuto.
   * @type {function}
   */
  Tests.toggleAuto = (function setupTests_toggleAuto() {

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private toggleAuto Variables
    ////////////////////////////////////////////////////////////////////////////

    /** @type {!TestResults} */
    var results = new TestResults('turnOn/OffAuto', 4);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public toggleAuto Auto
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -------------------------------------------------
     * Public Auto (toggleAuto)
     * -------------------------------------------------
     * @desc Tests aIV.debug().turnOn/OffAuto.
     * @type {function}
     */
    var toggleAuto = function() {

      testToggleOne();
      testToggleTwoString();
      testToggleTwoArr();
      testToggleTwoStrings();

      // Save the results
      app.results.push(results);
    };

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private toggleAuto Autos
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ---------------------------------------------------
     * Private Auto (testToggleOne)
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

      consoleInst = aIV.console.create('Tests.toggleAuto.testToggleOne');

      consoleInst.turnOnAuto('groups');
      pass = consoleInst.getAuto('groups');

      consoleInst.turnOffAuto('groups');
      fail = consoleInst.getAuto('groups');

      if (!pass || fail) {
        errorMsg = 'Debug.proto.turnOn/OffAuto failed to toggle one method';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Auto (testToggleTwoString)
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

      consoleInst = aIV.console.create('Tests.toggleAuto.testToggleTwoString');

      consoleInst.turnOnAuto('groups timers');
      pass = consoleInst.getAuto('groups');
      pass = pass && consoleInst.getAuto('timers');

      consoleInst.turnOffAuto('groups timers');
      fail = consoleInst.getAuto('groups');
      fail = fail || consoleInst.getAuto('timers');

      if (!pass || fail) {
        errorMsg = 'Debug.proto.turnOn/OffAuto failed to toggle two types ';
        errorMsg += 'with a spaced string';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Auto (testToggleTwoArr)
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

      consoleInst = aIV.console.create('Tests.toggleAuto.testToggleTwoArr');

      consoleInst.turnOnAuto([ 'groups', 'timers' ]);
      pass = consoleInst.getAuto('groups');
      pass = pass && consoleInst.getAuto('timers');

      consoleInst.turnOffAuto([ 'groups', 'timers' ]);
      fail = consoleInst.getAuto('groups');
      fail = fail || consoleInst.getAuto('timers');

      if (!pass || fail) {
        errorMsg = 'Debug.proto.turnOn/OffAuto failed to toggle two types ';
        errorMsg += 'with an array of strings';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Auto (testToggleTwoStrings)
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

      consoleInst = aIV.console.create('Tests.toggleAuto.testToggleTwoStrings');

      consoleInst.turnOnAuto('groups', 'timers');
      pass = consoleInst.getAuto('groups');
      pass = pass && consoleInst.getAuto('timers');

      consoleInst.turnOffAuto('groups', 'timers');
      fail = consoleInst.getAuto('groups');
      fail = fail || consoleInst.getAuto('timers');

      if (!pass || fail) {
        errorMsg = 'Debug.proto.turnOn/OffAuto failed to toggle two types ';
        errorMsg += 'with two string arguments';
        results.addError(errorMsg);
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The toggleAuto Module
    ////////////////////////////////////////////////////////////////////////////

    return toggleAuto;

  })();

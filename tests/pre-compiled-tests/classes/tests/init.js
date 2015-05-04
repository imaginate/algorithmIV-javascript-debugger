  /**
   * -------------------------------------------------
   * Public Method (Tests.init)
   * -------------------------------------------------
   * @desc Tests aIV.debug().init.
   * @type {function}
   */
  Tests.init = (function setupTests_init() {

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private init Variables
    ////////////////////////////////////////////////////////////////////////////

    /** @type {!TestResults} */
    var results = new TestResults('Debug.proto.init', 4);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public init Method
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -------------------------------------------------
     * Public Method (init)
     * -------------------------------------------------
     * @desc Tests aIV.debug().init.
     * @type {function}
     */
    var init = function() {

      testLog();
      testLogWithArgs();
      testLogWithArgsArr();

      testLogMsg();

      // Save the results
      app.results.push(results);
    };

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private init Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ---------------------------------------------------
     * Private Method (testLog)
     * ---------------------------------------------------
     * @type {function}
     */
    var testLog = function() {

      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create('Tests.init.testLog');

      fail = consoleInst.init('testMethod');

      if (fail) {
        errorMsg = 'Debug.proto.init failed to log';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testLogWithArgs)
     * ---------------------------------------------------
     * @type {function}
     */
    var testLogWithArgs = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create('Tests.init.testLogWithArgs');

      pass = consoleInst.init('testMethod', 1, 'string');

      fail = consoleInst.init('testMethod', 's', 'string');

      if (!pass || fail) {
        errorMsg = 'Debug.proto.init failed to log with arguments';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testLogWithArgsArr)
     * ---------------------------------------------------
     * @type {function}
     */
    var testLogWithArgsArr = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create('Tests.init.testLogWithArgsArr');

      pass = consoleInst.init([ 'testMethod', 1, 'string' ]);

      fail = consoleInst.init([ 'testMethod', 's', 'string' ]);

      if (!pass || fail) {
        errorMsg = 'Debug.proto.init failed to log with arguments array';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testLogMsg)
     * ---------------------------------------------------
     * @type {function}
     */
    var testLogMsg = function() {

      /** @type {string} */
      var errorMsg;
      /** @type {string} */
      var choiceMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create('Tests.init.testLogMsg');

      choiceMsg = 'Verify logs. The following messages should have ';
      choiceMsg += 'been logged to the console:<br />';
      choiceMsg += '"CALL: Tests.start.testLogMsg.testMethod()"<br />';
      choiceMsg += '"ARGS: Tests.init.testLogMsg.testMethod() | ';
      choiceMsg += 'Error: Incorrect argument data type."<br />';
      choiceMsg += '"CALL: Tests.start.testLogMsg.testMethod(5)"';
      errorMsg = 'Debug.proto.init logged an incorrect message';
      app.addChoice(choiceMsg, results, errorMsg, function() {
        consoleInst.init('testMethod');
        consoleInst.init('testMethod', 5, 'string');
      });
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The init Module
    ////////////////////////////////////////////////////////////////////////////

    return init;

  })();

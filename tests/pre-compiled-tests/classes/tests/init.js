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
      var log;
      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;
      /** @type {!MockConsole} */
      var consoleMock;

      consoleInst = aIV.console.create('Tests.init.testLogMsg');
      consoleMock = new MockConsole();

      consoleInst.init('testMethod');
      consoleInst.init('testMethod', 5, 'string');

      consoleMock.reset();

      log = 'LOG: CALL: Tests.start.testLogMsg.testMethod()';
      pass = (consoleMock.logs[0] === log);

      log = 'ERROR: ARGS: Tests.init.testLogMsg.testMethod() | ';
      log += 'Error: Incorrect argument data type.';
      pass = pass && (consoleMock.logs[1] === log);

      log = 'LOG: CALL: Tests.start.testLogMsg.testMethod(%s) 5';
      pass = pass && (consoleMock.logs[2] === log);

      if (!pass) {
        errorMsg = 'Debug.proto.init logged an incorrect message';
        results.addError(errorMsg);
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The init Module
    ////////////////////////////////////////////////////////////////////////////

    return init;

  })();

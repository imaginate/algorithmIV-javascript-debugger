  /**
   * -------------------------------------------------
   * Public Method (Tests.start)
   * -------------------------------------------------
   * @desc Tests aIV.debug().start.
   * @type {function}
   */
  Tests.start = (function setupTests_start() {

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private start Variables
    ////////////////////////////////////////////////////////////////////////////

    /** @type {!TestResults} */
    var results = new TestResults('Debug.proto.start', 4);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public start Method
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -------------------------------------------------
     * Public Method (start)
     * -------------------------------------------------
     * @desc Tests aIV.debug().start.
     * @type {function}
     */
    var start = function() {

      testLog();
      testLogWithArgs();
      testLogWithArgsArr();

      testLogMsg();

      // Save the results
      app.results.push(results);
    };

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private start Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ---------------------------------------------------
     * Private Method (testLog)
     * ---------------------------------------------------
     * @type {function}
     */
    var testLog = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create('Tests.start.testLog');

      pass = consoleInst.start('testMethod');

      if (!pass) {
        errorMsg = 'Debug.proto.start failed to log';
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
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create('Tests.start.testLogWithArgs');

      pass = consoleInst.start('testMethod', 5, [ 5 ]);

      if (!pass) {
        errorMsg = 'Debug.proto.start failed to log with arguments';
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
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create('Tests.start.testLogWithArgsArr');

      pass = consoleInst.start([ 'testMethod', 5, [ 5 ] ]);

      if (!pass) {
        errorMsg = 'Debug.proto.start failed to log with arguments array';
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

      consoleInst = aIV.console.create('Tests.start.testLogMsg');
      consoleMock = new MockConsole();

      consoleInst.start('testMethod', 5);

      consoleMock.reset();

      log = 'LOG: CALL: Tests.start.testLogMsg.testMethod(%s) 5';
      pass = (consoleMock.logs[0] === log);

      if (!pass) {
        errorMsg = 'Debug.proto.start logged an incorrect message';
        results.addError(errorMsg);
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The start Module
    ////////////////////////////////////////////////////////////////////////////

    return start;

  })();

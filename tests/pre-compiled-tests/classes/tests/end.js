  /**
   * -------------------------------------------------
   * Public Method (Tests.end)
   * -------------------------------------------------
   * @desc Tests aIV.debug().end.
   * @type {function}
   */
  Tests.end = (function setupTests_end() {

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private end Variables
    ////////////////////////////////////////////////////////////////////////////

    /** @type {!TestResults} */
    var results = new TestResults('Debug.proto.end', 4);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public end Method
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -------------------------------------------------
     * Public Method (end)
     * -------------------------------------------------
     * @desc Tests aIV.debug().end.
     * @type {function}
     */
    var end = function() {

      testLog();
      testLogWithReturn();
      testLogWithArr();

      testLogMsg();

      // Save the results
      app.results.push(results);
    };

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private end Methods
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

      consoleInst = aIV.console.create('Tests.end.testLog');

      pass = consoleInst.end('testMethod');

      if (!pass) {
        errorMsg = 'Debug.proto.end failed to log';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testLogWithReturn)
     * ---------------------------------------------------
     * @type {function}
     */
    var testLogWithReturn = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create('Tests.end.testLogWithReturn');

      pass = consoleInst.end('testMethod', 5);

      if (!pass) {
        errorMsg = 'Debug.proto.end failed to log with return value';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testLogWithArr)
     * ---------------------------------------------------
     * @type {function}
     */
    var testLogWithArr = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create('Tests.end.testLogWithArr');

      pass = consoleInst.end([ 'testMethod', 5 ]);

      if (!pass) {
        errorMsg = 'Debug.proto.end failed to log with array';
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

      consoleInst = aIV.console.create('Tests.end.testLogMsg');
      consoleMock = new MockConsole();

      consoleInst.end('testMethod', 5);

      consoleMock.reset();

      log = 'LOG: END: Tests.end.testLogMsg.testMethod() | return= %s 5';
      pass = (consoleMock.logs[0] === log);

      if (!pass) {
        errorMsg = 'Debug.proto.end logged an incorrect message';
        results.addError(errorMsg);
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The end Module
    ////////////////////////////////////////////////////////////////////////////

    return end;

  })();

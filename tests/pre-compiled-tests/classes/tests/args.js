  /**
   * -------------------------------------------------
   * Public Method (Tests.args)
   * -------------------------------------------------
   * @desc Tests aIV.debug().args.
   * @type {function}
   */
  Tests.args = (function setupTests_args() {

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private args Variables
    ////////////////////////////////////////////////////////////////////////////

    /** @type {!TestResults} */
    var results = new TestResults('Debug.proto.args', 3);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public args Method
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -------------------------------------------------
     * Public Method (args)
     * -------------------------------------------------
     * @desc Tests aIV.debug().args.
     * @type {function}
     */
    var args = function() {

      testLog();
      testLogWithArr();

      testLogMsg();

      // Save the results
      app.results.push(results);
    };

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private args Methods
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
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create('Tests.args.testLog');

      pass = consoleInst.args('testMethod', 1, 'string');

      fail = consoleInst.args('testMethod', 's', 'string');

      if (!pass || fail) {
        errorMsg = 'Debug.proto.args failed to log';
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
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create('Tests.args.testLogWithArr');

      pass = consoleInst.args([ 'testMethod', 1, 'string' ]);

      fail = consoleInst.args([ 'testMethod', 's', 'string' ]);

      if (!pass || fail) {
        errorMsg = 'Debug.proto.args failed to log with array';
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

      consoleInst = aIV.console.create('Tests.args.testLogMsg');
      consoleMock = new MockConsole();

      consoleInst.args('testMethod', 5, 'string');

      consoleMock.reset();

      log = 'ERROR: ARGS: Tests.args.testLogMsg.testMethod() | ';
      log += 'Error: Incorrect argument data type.';
      pass = (consoleMock.logs[0] === log);

      if (!pass) {
        errorMsg = 'Debug.proto.args logged an incorrect message';
        results.addError(errorMsg);
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The args Module
    ////////////////////////////////////////////////////////////////////////////

    return args;

  })();

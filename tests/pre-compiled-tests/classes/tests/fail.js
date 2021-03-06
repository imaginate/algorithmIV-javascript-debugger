  /**
   * -------------------------------------------------
   * Public Method (Tests.fail)
   * -------------------------------------------------
   * @desc Tests aIV.debug().fail.
   * @type {function}
   */
  Tests.fail = (function setupTests_fail() {

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private fail Variables
    ////////////////////////////////////////////////////////////////////////////

    /** @type {!TestResults} */
    var results = new TestResults('Debug.proto.fail', 5);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public fail Method
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -------------------------------------------------
     * Public Method (fail)
     * -------------------------------------------------
     * @desc Tests aIV.debug().fail.
     * @type {function}
     */
    var fail = function() {

      testLog();
      testLogWithArgs();
      testLogWithArgsArr();
      testLogWithFunc();

      testLogMsg();

      // Save the results
      app.results.push(results);
    };

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private fail Methods
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

      consoleInst = aIV.console.create('Tests.fail.testLog');

      fail = consoleInst.fail('testMethod', true, 'Message');

      if (fail) {
        errorMsg = 'Debug.proto.fail failed to log';
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

      consoleInst = aIV.console.create('Tests.fail.testLogWithArgs');

      pass = consoleInst.fail('testMethod', 0, '5 should be $$', 5);

      fail = consoleInst.fail('testMethod', 1, '5 should be $$', 5);

      if (!pass || fail) {
        errorMsg = 'Debug.proto.fail failed to log with arguments';
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

      consoleInst = aIV.console.create('Tests.fail.testLogWithArgsArr');

      pass = consoleInst.fail([ 'testMethod', 0, '5 should be $$', 5 ]);

      fail = consoleInst.fail([ 'testMethod', 1, '5 should be $$', 5 ]);

      if (!pass || fail) {
        errorMsg = 'Debug.proto.fail failed to log with arguments array';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testLogWithFunc)
     * ---------------------------------------------------
     * @type {function}
     */
    var testLogWithFunc = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {function(): boolean} */
      var passFunc;
      /** @type {function(): boolean} */
      var failFunc;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create('Tests.fail.testLogWithFunc');
      passFunc = function() { return true; };
      failFunc = function() { return false; };

      pass = consoleInst.fail('testMethod', failFunc, 'Message');

      fail = consoleInst.fail('testMethod', passFunc, 'Message');

      if (!pass || fail) {
        errorMsg = 'Debug.proto.fail failed to log with function';
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

      consoleInst = aIV.console.create('Tests.fail.testLogMsg');
      consoleMock = new MockConsole();

      consoleInst.fail('testMethod', false, '5 was $$', 6);

      consoleMock.reset();

      log = 'ERROR: FAIL: Tests.fail.testLogMsg.testMethod() | ';
      log += '5 was %s 6';
      pass = (consoleMock.logs[0] === log);

      if (!pass) {
        errorMsg = 'Debug.proto.fail logged an incorrect message';
        results.addError(errorMsg);
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The fail Module
    ////////////////////////////////////////////////////////////////////////////

    return fail;

  })();

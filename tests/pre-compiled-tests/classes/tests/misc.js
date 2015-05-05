  /**
   * -------------------------------------------------
   * Public Method (Tests.misc)
   * -------------------------------------------------
   * @desc Tests aIV.debug().misc.
   * @type {function}
   */
  Tests.misc = (function setupTests_misc() {

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private misc Variables
    ////////////////////////////////////////////////////////////////////////////

    /** @type {!TestResults} */
    var results = new TestResults('Debug.proto.misc', 4);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public misc Method
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -------------------------------------------------
     * Public Method (misc)
     * -------------------------------------------------
     * @desc Tests aIV.debug().misc.
     * @type {function}
     */
    var misc = function() {

      testLog();
      testLogWithArgs();
      testLogWithArgsArr();

      testLogMsg();

      // Save the results
      app.results.push(results);
    };

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private misc Methods
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

      consoleInst = aIV.console.create('Tests.misc.testLog');

      pass = consoleInst.misc('testMethod', 'a message');

      if (!pass) {
        errorMsg = 'Debug.proto.misc failed to log';
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

      consoleInst = aIV.console.create('Tests.misc.testLogWithArgs');

      pass = consoleInst.misc('testMethod', 'a msg with the number $$', 5);

      if (!pass) {
        errorMsg = 'Debug.proto.misc failed to log with arguments';
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

      consoleInst = aIV.console.create('Tests.misc.testLogWithArgsArr');

      pass = consoleInst.misc([ 'testMethod', 'a msg with the number $$', 5 ]);

      if (!pass) {
        errorMsg = 'Debug.proto.misc failed to log with an array of arguments';
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

      consoleInst = aIV.console.create('Tests.misc.testLogMsg');
      consoleMock = new MockConsole();

      consoleInst.misc('testMethod', 'A message with the number $$', 5);

      consoleMock.reset();

      log = 'LOG: MISC: Tests.misc.testLogMsg.testMethod() | ';
      log += 'A message with the number %s 5';
      pass = (consoleMock.logs[0] === log);

      if (!pass) {
        errorMsg = 'Debug.proto.misc logged an incorrect message';
        results.addError(errorMsg);
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The misc Module
    ////////////////////////////////////////////////////////////////////////////

    return misc;

  })();

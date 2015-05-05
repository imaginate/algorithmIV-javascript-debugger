  /**
   * -------------------------------------------------
   * Public Method (Tests.group)
   * -------------------------------------------------
   * @desc Tests aIV.debug().group.
   * @type {function}
   */
  Tests.group = (function setupTests_group() {

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private group Variables
    ////////////////////////////////////////////////////////////////////////////

    /** @type {!TestResults} */
    var results = new TestResults('Debug.proto.group', 5);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public group Method
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -------------------------------------------------
     * Public Method (group)
     * -------------------------------------------------
     * @desc Tests aIV.debug().group.
     * @type {function}
     */
    var group = function() {

      testLog();
      testLogWithArr();
      testLogWithArgs();
      testLogWithArgsArr();

      testLogMsg();

      // Save the results
      app.results.push(results);
    };

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private group Methods
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

      consoleInst = aIV.console.create('Tests.group.testLog');

      pass = consoleInst.group('testMethod', 'end');

      if (!pass) {
        errorMsg = 'Debug.proto.group failed to work';
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

      consoleInst = aIV.console.create('Tests.group.testLogWithArr');

      pass = consoleInst.group([ 'testMethod', 'open' ]);

      if (!pass) {
        errorMsg = 'Debug.proto.group failed to work with array';
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

      consoleInst = aIV.console.create('Tests.group.testLogWithArgs');

      pass = consoleInst.group('testMethod', 'open', 'testNumber= $$', 5);

      if (!pass) {
        errorMsg = 'Debug.proto.group failed to work with arguments';
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

      consoleInst = aIV.console.create('Tests.group.testLogWithArgsArr');

      pass = consoleInst.group([ 'testMethod', 'coll', 'testNumber= $$', 5 ]);

      if (!pass) {
        errorMsg = 'Debug.proto.group failed to work with an array ';
        errorMsg += 'with arguments';
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

      consoleInst = aIV.console.create('Tests.group.testLogMsg');
      consoleMock = new MockConsole();

      consoleInst.group('testMethod', 'open', 'testNumber= $$', 5);
      consoleInst.misc('testMethod', 'A test log message.');
      consoleInst.group('testMethod', 'end');

      consoleMock.reset();

      log = 'OPEN GROUP: GROUP: Tests.group.testLogMsg.testMethod() | ';
      log += 'testNumber= %s 5';
      pass = (consoleMock.logs[0] === log);

      log = 'LOG: MISC: Tests.group.testLogMsg.testMethod() | ';
      log += 'A test log message.';
      pass = pass && (consoleMock.logs[1] === log);

      log = 'CLOSE GROUP';
      pass = pass && (consoleMock.logs[2] === log);

      if (!pass) {
        errorMsg = 'Debug.proto.group logged an incorrect message';
        results.addError(errorMsg);
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The group Module
    ////////////////////////////////////////////////////////////////////////////

    return group;

  })();

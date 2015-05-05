  /**
   * -------------------------------------------------
   * Public Method (Tests.state)
   * -------------------------------------------------
   * @desc Tests aIV.debug().state.
   * @type {function}
   */
  Tests.state = (function setupTests_state() {

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private state Variables
    ////////////////////////////////////////////////////////////////////////////

    /** @type {!TestResults} */
    var results = new TestResults('Debug.proto.state', 3);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public state Method
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -------------------------------------------------
     * Public Method (state)
     * -------------------------------------------------
     * @desc Tests aIV.debug().state.
     * @type {function}
     */
    var state = function() {

      testLog();
      testLogWithArr();
      testLogMsg();

      // Save the results
      app.results.push(results);
    };

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private state Methods
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

      consoleInst = aIV.console.create('Tests.state.testLog');

      pass = consoleInst.state('testMethod', 'testNumber= $$', 5, 'blah');

      if (!pass) {
        errorMsg = 'Debug.proto.state failed to log';
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

      consoleInst = aIV.console.create('Tests.state.testLogWithArr');

      pass = consoleInst.state([ 'testMethod', 'testNumber= $$', 5, 'blah' ]);

      if (!pass) {
        errorMsg = 'Debug.proto.state failed to log with an array';
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

      consoleInst = aIV.console.create('Tests.state.testLogMsg');
      consoleMock = new MockConsole();

      consoleInst.state('testMethod', 'testNumber= $$', 5, 'empty');

      consoleMock.reset();

      log = 'LOG: STATE: Tests.state.testLogMsg.testMethod() | ';
      log += 'testNumber= %s; unknownVar1= %s 5 empty';
      pass = (consoleMock.logs[0] === log);

      if (!pass) {
        errorMsg = 'Debug.proto.state logged an incorrect message';
        results.addError(errorMsg);
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The state Module
    ////////////////////////////////////////////////////////////////////////////

    return state;

  })();

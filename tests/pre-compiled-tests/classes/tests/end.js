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
      var errorMsg;
      /** @type {string} */
      var choiceMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create('Tests.end.testLogMsg');

      choiceMsg = 'Verify a log. The following message should have ';
      choiceMsg += 'been logged to the console:<br />';
      choiceMsg += '"END: Tests.end.testLogMsg.testMethod() | return= 5"';
      errorMsg = 'Debug.proto.end logged an incorrect message';
      app.addChoice(choiceMsg, results, errorMsg, function() {
        consoleInst.end('testMethod', 5);
      });
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The end Module
    ////////////////////////////////////////////////////////////////////////////

    return end;

  })();

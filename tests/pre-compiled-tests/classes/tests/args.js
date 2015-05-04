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
      var errorMsg;
      /** @type {string} */
      var choiceMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create('Tests.args.testLogMsg');

      choiceMsg = 'Verify a log. The following message should have ';
      choiceMsg += 'been logged to the console:<br />';
      choiceMsg += '"ARGS: Tests.args.testLogMsg.testMethod() | ';
      choiceMsg += 'Error: Incorrect argument data type."';
      errorMsg = 'Debug.proto.args logged an incorrect message';
      app.addChoice(choiceMsg, results, errorMsg, function() {
        consoleInst.args('testMethod', 5, 'string');
      });
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The args Module
    ////////////////////////////////////////////////////////////////////////////

    return args;

  })();

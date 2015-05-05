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
      var errorMsg;
      /** @type {string} */
      var choiceMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create('Tests.misc.testLogMsg');

      choiceMsg = '<strong>Verify a log. The following message should have ';
      choiceMsg += 'been logged to the console:</strong><br /><br />';
      choiceMsg += '"MISC: Tests.misc.testLogMsg.testMethod() | ';
      choiceMsg += 'A message with the number 5"';
      errorMsg = 'Debug.proto.misc logged an incorrect message';
      app.addChoice(choiceMsg, results, errorMsg, function() {
        consoleInst.misc('testMethod', 'A message with the number $$', 5);
      });
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The misc Module
    ////////////////////////////////////////////////////////////////////////////

    return misc;

  })();

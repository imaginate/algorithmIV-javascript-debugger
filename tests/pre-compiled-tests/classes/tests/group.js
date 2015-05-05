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
      var errorMsg;
      /** @type {string} */
      var choiceMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create('Tests.group.testLogMsg');

      choiceMsg = '<strong>Verify a log group and a log. The following group ';
      choiceMsg += 'and log should have been created in the console:</strong>';
      choiceMsg += '<br /><br />';
      choiceMsg += '"GROUP: Tests.group.testLogMsg.testMethod() | ';
      choiceMsg += 'testNumber= 5"<br /><br />';
      choiceMsg += '"MISC: Tests.group.testLogMsg.testMethod() | ';
      choiceMsg += 'A test log message."';
      errorMsg = 'Debug.proto.group logged an incorrect message';
      app.addChoice(choiceMsg, results, errorMsg, function() {
        consoleInst.group('testMethod', 'open', 'testNumber= $$', 5);
        consoleInst.misc('testMethod', 'A test log message.');
        consoleInst.group('testMethod', 'end');
      });
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The group Module
    ////////////////////////////////////////////////////////////////////////////

    return group;

  })();

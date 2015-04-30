  /**
   * -------------------------------------------------
   * Public Method (Tests.createInstance)
   * -------------------------------------------------
   * @desc Checks aIV.utils.createInstance method.
   * @type {function}
   */
  Tests.createInstance = (function setupTestsCreateInstance() {

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private createInstance Variables
    ////////////////////////////////////////////////////////////////////////////

    /** @type {!TestResults} */
    var results = new TestResults('Tests.createInstance');

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public createInstance Method
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -------------------------------------------------
     * Public Method (createInstance)
     * -------------------------------------------------
     * @desc Checks aIV.utils.createInstance method.
     * @type {function}
     */
    var createInstance = function() {

      testInitInstance();
      testRecallInstance();

      // Save the results
      app.results.push(results);
    };

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private createInstance Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ---------------------------------------------------
     * Private Method (testInitInstance)
     * ---------------------------------------------------
     * @type {function}
     */
    var testInitInstance = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create('Tests.checkInstances');

      pass = Object.prototype.toString.call(consoleInst) === '[object Debug]';

      if (!pass) {
        errorMsg = 'createInstance failed to create a Debug instance';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testRecallInstance)
     * ---------------------------------------------------
     * @type {function}
     */
    var testRecallInstance = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst1;
      /** @type {!Debug} */
      var consoleInst2;

      consoleInst1 = aIV.console.create('Tests.checkInstances');
      consoleInst2 = aIV.console.create({
        classTitle    : 'Tests.checkInstances',
        turnOffMethods: 'misc'
      });

      pass = consoleInst1.misc('test1', 'Instance Test 1');
      pass = pass && consoleInst2.misc('test2', 'Instance Test 2');

      consoleInst1.setMethod('misc', false);

      fail = consoleInst1.misc('test3', 'Instance Test 3');
      fail = fail || consoleInst2.misc('test4', 'Instance Test 4');

      if (!pass || fail) {
        errorMsg = 'createInstance failed to toggle misc correctly ';
        errorMsg += 'across instances';
        results.addError(errorMsg);
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The createInstance Module
    ////////////////////////////////////////////////////////////////////////////

    return createInstance;

  })();

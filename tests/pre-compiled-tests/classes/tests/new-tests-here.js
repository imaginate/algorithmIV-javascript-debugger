
// Replace all occurances of methodName with
// the name of the method you are testing

  /**
   * -------------------------------------------------
   * Public Method (Tests.methodName)
   * -------------------------------------------------
   * @desc Checks aIV.utils.methodName method.
   * @type {function}
   */
  Tests.methodName = (function setupTestsMethodName() {

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private methodName Variables
    ////////////////////////////////////////////////////////////////////////////

    /** @type {!TestResults} */
    var results = new TestResults('Tests.methodName');

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public methodName Method
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -------------------------------------------------
     * Public Method (methodName)
     * -------------------------------------------------
     * @desc Checks aIV.utils.methodName method.
     * @type {function}
     */
    var methodName = function() {

      // Call your tests
      testSomething();

      // Save the results
      app.results.push(results);
    };

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private methodName Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ---------------------------------------------------
     * Private Method (testSomething)
     * ---------------------------------------------------
     * @type {function}
     */
    var testSomething = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;
      /** @type {string} */
      var something;

      pass = aIV.utils.methodName(something);

      if (!pass) {
        errorMsg = 'methodName failed to do something';
        results.addError(errorMsg);
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The methodName Module
    ////////////////////////////////////////////////////////////////////////////

// Replace the next line with: return methodName;
    return function() {};

  })();

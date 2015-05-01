DIRECTIONS FOR NEW TESTS                       |
---------------------------------------------- |
1. Create a new JavaScript file inside the     |
   "tests/pre-compiled-tests/classes/tests"    |
   folder.                                     |
2. Name the new file the name of the method    |
   you are testing (methodName.js).            |
3. Copy and paste the below provided           |
   JavaScript into the new file.               |
4. Replace all occurances of "methodName"      |
   with the name of the method you are         |
   testing.                                    |
5. Add your tests.                             |
------------------------------------------------

/****************************** COPY BELOW HERE *******************************/

  /**
   * -------------------------------------------------
   * Public Method (Tests.methodName)
   * -------------------------------------------------
   * @desc Checks [add description here].
   * @type {function}
   */
  Tests.methodName = (function setupTests_methodName() {

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

    return methodName;

  })();

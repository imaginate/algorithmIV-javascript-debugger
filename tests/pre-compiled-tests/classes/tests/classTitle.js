  /**
   * -------------------------------------------------
   * Public Method (Tests.classTitle)
   * -------------------------------------------------
   * @desc Checks aIV.utils.classTitle method.
   * @type {function}
   */
  Tests.classTitle = (function setupTestsClassTitle() {

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private classTitle Variables
    ////////////////////////////////////////////////////////////////////////////

    /** @type {!TestResults} */
    var results = new TestResults('Tests.classTitle');

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public classTitle Method
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -------------------------------------------------
     * Public Method (classTitle)
     * -------------------------------------------------
     * @desc Checks aIV.utils.classTitle method.
     * @type {function}
     */
    var classTitle = function() {

      testAsProp();
      testAsString();
      testAsBlank();

      // Save the results
      app.results.push(results);
    };

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private classTitle Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ---------------------------------------------------
     * Private Method (testAsProp)
     * ---------------------------------------------------
     * @type {function}
     */
    var testAsProp = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create({
        classTitle: 'Tests.classTitle.testAsProp'
      });

      pass = (consoleInst.classTitle === 'Tests.classTitle.testAsProp.');

      if (!pass) {
        errorMsg = 'classTitle failed to setup the title with an object property';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testAsString)
     * ---------------------------------------------------
     * @type {function}
     */
    var testAsString = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create('Tests.classTitle.testAsString');

      pass = (consoleInst.classTitle === 'Tests.classTitle.testAsString.');

      if (!pass) {
        errorMsg = 'classTitle failed to setup the title with a string';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testAsBlank)
     * ---------------------------------------------------
     * @type {function}
     */
    var testAsBlank = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create();

      pass = (consoleInst.classTitle === 'unknown.');

      if (!pass) {
        errorMsg = 'classTitle failed to setup an unknown title';
        results.addError(errorMsg);
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The classTitle Module
    ////////////////////////////////////////////////////////////////////////////

    return classTitle;

  })();

  /**
   * -------------------------------------------------
   * Public Method (Tests.createInstance)
   * -------------------------------------------------
   * @desc Tests the aIV.console.create method's functionality.
   * @type {function}
   */
  Tests.createInstance = (function setupTests_createInstance() {

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private createInstance Variables
    ////////////////////////////////////////////////////////////////////////////

    /** @type {!TestResults} */
    var results = new TestResults('aIV.console.create');

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public createInstance Method
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -------------------------------------------------
     * Public Method (createInstance)
     * -------------------------------------------------
     * @desc Tests aIV.console.create.
     * @type {function}
     */
    var createInstance = function() {

      // Ensure the Debug object instance creation occurs correctly
      testOneInstanceCreate();
      testTwoInstanceCreateSame();
      testTwoInstanceCreateDifferent();

      // The remaining tests ensure that aIV.console.create
      // is reading and using its params correctly

      // Test the classTitle param
      testClassTitleAsProp();
      testClassTitleAsString();
      testClassTitleAsBlank();

      // Test the turnOffMethods param
      testTurnOffMethodsOne();
      testTurnOffMethodsAll();
      testTurnOffMethodsTwo();
      testTurnOffMethodsTwoArr();

      // Test the addBreakpoints param
      testAddBreakpointsOne();
      testAddBreakpointsAll();
      testAddBreakpointsTwo();
      testAddBreakpointsTwoArr();

      // Test the auto insert native console methods params
      testTurnOnGroups();
      testTurnOnProfiles();
      testTurnOnTimers();

      // Save the results
      app.results.push(results);
    };

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private createInstance Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ---------------------------------------------------
     * Private Method (testOneInstanceCreate)
     * ---------------------------------------------------
     * @type {function}
     */
    var testOneInstanceCreate = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create('createInst.testOneInstanceCreate');

      pass = Object.prototype.toString.call(consoleInst) === '[object Debug]';

      if (!pass) {
        errorMsg = 'aIV.console.create failed to create a Debug instance';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testTwoInstanceCreateSame)
     * ---------------------------------------------------
     * @type {function}
     */
    var testTwoInstanceCreateSame = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;
      /** @type {string} */
      var classTitle;
      /** @type {!Debug} */
      var consoleInst1;
      /** @type {!Debug} */
      var consoleInst2;

      classTitle = 'createInst.testTwoInstanceCreateSame';

      consoleInst1 = aIV.console.create(classTitle);
      consoleInst2 = aIV.console.create({
        classTitle    : classTitle,
        turnOffMethods: 'misc'
      });

      pass = consoleInst1.getMethod('misc');
      pass = pass && consoleInst2.getMethod('misc');

      consoleInst1.setMethod('misc', false);

      fail = consoleInst1.getMethod('misc');
      fail = fail || consoleInst2.getMethod('misc');

      if (!pass || fail) {
        errorMsg = 'aIV.console.create incorrectly created a new Debug ';
        errorMsg += 'instance when it should have retrieved an existing one';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testTwoInstanceCreateDifferent)
     * ---------------------------------------------------
     * @type {function}
     */
    var testTwoInstanceCreateDifferent = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;
      /** @type {string} */
      var classTitle;
      /** @type {!Debug} */
      var consoleInst1;
      /** @type {!Debug} */
      var consoleInst2;

      classTitle = 'createInst.testTwoInstanceCreateDifferent';
      consoleInst1 = aIV.console.create(classTitle);
      consoleInst2 = aIV.console.create(classTitle + '2');

      pass = consoleInst1.getMethod('misc');
      consoleInst1.setMethod('misc', false);
      fail = consoleInst1.getMethod('misc');

      pass = pass && consoleInst2.getMethod('misc');
      consoleInst2.setMethod('misc', false);
      fail = fail || consoleInst2.getMethod('misc');

      if (!pass || fail) {
        errorMsg = 'aIV.console.create failed to create two separate Debug ';
        errorMsg += 'instances correctly';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testClassTitleAsProp)
     * ---------------------------------------------------
     * @type {function}
     */
    var testClassTitleAsProp = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;
      /** @type {string} */
      var classTitle;
      /** @type {!Debug} */
      var consoleInst;

      classTitle = 'createInst.testClassTitleAsProp';

      consoleInst = aIV.console.create({
        classTitle: classTitle
      });

      classTitle += '.';

      pass = (consoleInst.classTitle === classTitle);

      if (!pass) {
        errorMsg = 'aIV.console.create({ classTitle: \'name\' }) failed to ';
        errorMsg += 'correctly setup the class title';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testClassTitleAsString)
     * ---------------------------------------------------
     * @type {function}
     */
    var testClassTitleAsString = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;
      /** @type {string} */
      var classTitle;
      /** @type {!Debug} */
      var consoleInst;

      classTitle = 'createInst.testClassTitleAsString';

      consoleInst = aIV.console.create(classTitle);

      classTitle += '.';

      pass = (consoleInst.classTitle === classTitle);

      if (!pass) {
        errorMsg = 'aIV.console.create(\'name\') failed to correctly setup the ';
        errorMsg += 'class title';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testClassTitleAsBlank)
     * ---------------------------------------------------
     * @type {function}
     */
    var testClassTitleAsBlank = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create();

      pass = (consoleInst.classTitle === 'unknown.');

      if (!pass) {
        errorMsg = 'aIV.console.create() failed to correctly setup the ';
        errorMsg += '\'unknown\' class title';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testTurnOffMethodsOne)
     * ---------------------------------------------------
     * @type {function}
     */
    var testTurnOffMethodsOne = function() {

      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create({
        classTitle    : 'createInst.testTurnOffMethodsOne',
        turnOffMethods: 'misc'
      });

      fail = consoleInst.getMethod('misc');

      if (fail) {
        errorMsg = 'aIV.console.create({ turnOffMethods: \'misc\' }) failed to ';
        errorMsg = 'turn off the instance\'s misc method';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testTurnOffMethodsAll)
     * ---------------------------------------------------
     * @type {function}
     */
    var testTurnOffMethodsAll = function() {

      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create({
        classTitle    : 'createInst.testTurnOffMethodsAll',
        turnOffMethods: 'all'
      });

      fail = consoleInst.getMethod('init');
      fail = fail || consoleInst.getMethod('start');
      fail = fail || consoleInst.getMethod('end');
      fail = fail || consoleInst.getMethod('args');
      fail = fail || consoleInst.getMethod('fail');
      fail = fail || consoleInst.getMethod('group');
      fail = fail || consoleInst.getMethod('state');
      fail = fail || consoleInst.getMethod('misc');

      if (fail) {
        errorMsg = 'aIV.console.create({ turnOffMethods: \'all\' }) failed to ';
        errorMsg = 'turn off all of the instance\'s methods';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testTurnOffMethodsTwo)
     * ---------------------------------------------------
     * @type {function}
     */
    var testTurnOffMethodsTwo = function() {

      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create({
        classTitle    : 'createInst.testTurnOffMethodsTwo',
        turnOffMethods: 'end misc'
      });

      fail = consoleInst.getMethod('end');
      fail = fail || consoleInst.getMethod('misc');

      if (fail) {
        errorMsg = 'aIV.console.create({ turnOffMethods: \'end misc\' }) ';
        errorMsg = 'failed to turn off the instance\'s end and misc method';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testTurnOffMethodsTwoArr)
     * ---------------------------------------------------
     * @type {function}
     */
    var testTurnOffMethodsTwoArr = function() {

      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create({
        classTitle    : 'createInst.testTurnOffMethodsTwoArr',
        turnOffMethods: [ 'end', 'misc' ]
      });

      fail = consoleInst.getMethod('end');
      fail = fail || consoleInst.getMethod('misc');

      if (fail) {
        errorMsg = "aIV.console.create({ turnOffMethods: [ 'end', 'misc' ] }) ";
        errorMsg = 'failed to turn off the instance\'s end and misc method';
        results.addError(errorMsg);
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The createInstance Module
    ////////////////////////////////////////////////////////////////////////////

    return createInstance;

  })();

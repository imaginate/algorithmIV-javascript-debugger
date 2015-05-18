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
    var results = new TestResults('aIV.console.create', 18);

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
      testOpenGroups();
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
      /** @type {strings} */
      var props;
      /** @type {number} */
      var i;

      consoleInst = aIV.console.create('createInst.testOneInstanceCreate');

      props = String('classTitle getMethod getBreakpoint getAuto ' +
                     'setMethod setBreakpoint setAuto').split(' ');

      pass = true;
      i = props.length;
      while (i--) {
        pass = pass && hasOwnProp(consoleInst, props[i]);
      }

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
        classTitle: classTitle
      });

      pass = (consoleInst1 === consoleInst2);

      if (!pass) {
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

      fail = (consoleInst1 === consoleInst2);

      if (fail) {
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
      var pass;
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

      pass = consoleInst.getMethod('init');
      pass = pass && consoleInst.getMethod('start');
      pass = pass && consoleInst.getMethod('end');
      pass = pass && consoleInst.getMethod('args');
      pass = pass && consoleInst.getMethod('fail');
      pass = pass && consoleInst.getMethod('group');
      pass = pass && consoleInst.getMethod('state');

      fail = consoleInst.getMethod('misc');

      if (!pass || fail) {
        errorMsg = 'aIV.console.create({ turnOffMethods: \'misc\' }) failed to ';
        errorMsg += 'turn off the instance\'s misc method';
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
        errorMsg += 'turn off all of the instance\'s methods';
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
      var pass;
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

      pass = consoleInst.getMethod('init');
      pass = pass && consoleInst.getMethod('start');
      pass = pass && consoleInst.getMethod('args');
      pass = pass && consoleInst.getMethod('fail');
      pass = pass && consoleInst.getMethod('group');
      pass = pass && consoleInst.getMethod('state');

      fail = consoleInst.getMethod('end');
      fail = fail || consoleInst.getMethod('misc');

      if (!pass || fail) {
        errorMsg = 'aIV.console.create({ turnOffMethods: \'end misc\' }) ';
        errorMsg += 'failed to turn off the instance\'s end and misc method';
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
      var pass;
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

      pass = consoleInst.getMethod('init');
      pass = pass && consoleInst.getMethod('start');
      pass = pass && consoleInst.getMethod('args');
      pass = pass && consoleInst.getMethod('fail');
      pass = pass && consoleInst.getMethod('group');
      pass = pass && consoleInst.getMethod('state');

      fail = consoleInst.getMethod('end');
      fail = fail || consoleInst.getMethod('misc');

      if (!pass || fail) {
        errorMsg = "aIV.console.create({ turnOffMethods: [ 'end', 'misc' ] }) ";
        errorMsg += 'failed to turn off the instance\'s end and misc method';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testAddBreakpointsOne)
     * ---------------------------------------------------
     * @type {function}
     */
    var testAddBreakpointsOne = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create({
        classTitle    : 'createInst.testAddBreakpointsOne',
        addBreakpoints: 'misc'
      });

      pass = consoleInst.getBreakpoint('misc');

      fail = consoleInst.getBreakpoint('init');
      fail = fail || consoleInst.getBreakpoint('start');
      fail = fail || consoleInst.getBreakpoint('end');
      fail = fail || consoleInst.getBreakpoint('args');
      fail = fail || consoleInst.getBreakpoint('fail');
      fail = fail || consoleInst.getBreakpoint('group');
      fail = fail || consoleInst.getBreakpoint('state');

      if (!pass || fail) {
        errorMsg = 'aIV.console.create({ addBreakpoints: \'misc\' }) failed to ';
        errorMsg += 'add a breakpoint for the instance\'s misc method';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testAddBreakpointsAll)
     * ---------------------------------------------------
     * @type {function}
     */
    var testAddBreakpointsAll = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create({
        classTitle    : 'createInst.testAddBreakpointsAll',
        addBreakpoints: 'all'
      });

      pass = consoleInst.getBreakpoint('init');
      pass = pass && consoleInst.getBreakpoint('start');
      pass = pass && consoleInst.getBreakpoint('end');
      pass = pass && consoleInst.getBreakpoint('args');
      pass = pass && consoleInst.getBreakpoint('fail');
      pass = pass && consoleInst.getBreakpoint('group');
      pass = pass && consoleInst.getBreakpoint('state');
      pass = pass && consoleInst.getBreakpoint('misc');

      if (!pass) {
        errorMsg = 'aIV.console.create({ addBreakpoints: \'all\' }) failed to ';
        errorMsg += 'add breakpoints for all of the instance\'s methods';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testAddBreakpointsTwo)
     * ---------------------------------------------------
     * @type {function}
     */
    var testAddBreakpointsTwo = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create({
        classTitle    : 'createInst.testAddBreakpointsTwo',
        addBreakpoints: 'end misc'
      });

      pass = consoleInst.getBreakpoint('end');
      pass = pass && consoleInst.getBreakpoint('misc');

      fail = consoleInst.getBreakpoint('init');
      fail = fail || consoleInst.getBreakpoint('start');
      fail = fail || consoleInst.getBreakpoint('args');
      fail = fail || consoleInst.getBreakpoint('fail');
      fail = fail || consoleInst.getBreakpoint('group');
      fail = fail || consoleInst.getBreakpoint('state');

      if (!pass || fail) {
        errorMsg = 'aIV.console.create({ addBreakpoints: \'end misc\' }) ';
        errorMsg += 'failed to add a breakpoint for the instance\'s ';
        errorMsg += 'end and misc method';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testAddBreakpointsTwoArr)
     * ---------------------------------------------------
     * @type {function}
     */
    var testAddBreakpointsTwoArr = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create({
        classTitle    : 'createInst.testAddBreakpointsTwoArr',
        addBreakpoints: [ 'end', 'misc' ]
      });

      pass = consoleInst.getBreakpoint('end');
      pass = pass && consoleInst.getBreakpoint('misc');

      fail = consoleInst.getBreakpoint('init');
      fail = fail || consoleInst.getBreakpoint('start');
      fail = fail || consoleInst.getBreakpoint('args');
      fail = fail || consoleInst.getBreakpoint('fail');
      fail = fail || consoleInst.getBreakpoint('group');
      fail = fail || consoleInst.getBreakpoint('state');

      if (!pass || fail) {
        errorMsg = "aIV.console.create({ addBreakpoints: [ 'end', 'misc' ] }) ";
        errorMsg += 'failed to add a breakpoint for the instance\'s ';
        errorMsg += 'end and misc method';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testTurnOnGroups)
     * ---------------------------------------------------
     * @type {function}
     */
    var testTurnOnGroups = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create({
        classTitle  : 'createInst.testTurnOnGroups',
        turnOnGroups: true
      });

      pass = consoleInst.getAuto('groups');

      if (!pass) {
        errorMsg = 'aIV.console.create({ turnOnGroups: true }) failed to ';
        errorMsg += 'turn on the instance\'s auto groups';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testOpenGroups)
     * ---------------------------------------------------
     * @type {function}
     */
    var testOpenGroups = function() {

      /** @type {string} */
      var log;
      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst1;
      /** @type {!Debug} */
      var consoleInst2;
      /** @type {!MockConsole} */
      var consoleMock;

      consoleInst1 = aIV.console.create({
        classTitle  : 'createInst.testOpenGroups1',
        turnOnGroups: true,
        openGroups  : true
      });
      consoleInst2 = aIV.console.create({
        classTitle  : 'createInst.testOpenGroups2',
        turnOnGroups: true,
        openGroups  : false
      });
      consoleMock = new MockConsole();

      consoleInst1.start('testMethod');
      consoleInst1.end('testMethod');
      consoleInst2.start('testMethod');
      consoleInst2.end('testMethod');

      consoleMock.reset();

      log = 'OPEN GROUP: GROUP: createInst.testOpenGroups1.testMethod';
      pass = (consoleMock.logs[0] === log);

      log = 'COLL GROUP: GROUP: createInst.testOpenGroups2.testMethod';
      pass = pass && (consoleMock.logs[4] === log);

      if (!pass) {
        errorMsg = 'aIV.console.create({ openGroups: true }) failed to ';
        errorMsg += 'automate groups correctly';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testTurnOnProfiles)
     * ---------------------------------------------------
     * @type {function}
     */
    var testTurnOnProfiles = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create({
        classTitle    : 'createInst.testTurnOnProfiles',
        turnOnProfiles: true
      });

      pass = consoleInst.getAuto('profiles');

      if (!pass) {
        errorMsg = 'aIV.console.create({ turnOnProfiles: true }) failed to ';
        errorMsg += 'turn on the instance\'s auto profiles';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testTurnOnTimers)
     * ---------------------------------------------------
     * @type {function}
     */
    var testTurnOnTimers = function() {

      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create({
        classTitle  : 'createInst.testTurnOnTimers',
        turnOnTimers: true
      });

      pass = consoleInst.getAuto('timers');

      if (!pass) {
        errorMsg = 'aIV.console.create({ turnOnTimers: true }) failed to ';
        errorMsg += 'turn on the instance\'s auto timers';
        results.addError(errorMsg);
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The createInstance Module
    ////////////////////////////////////////////////////////////////////////////

    return createInstance;

  })();

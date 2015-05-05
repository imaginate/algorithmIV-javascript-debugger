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
      var log;
      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;
      /** @type {!MockConsole} */
      var consoleMock;

      consoleInst = aIV.console.create('Tests.args.testLogMsg');
      consoleMock = new MockConsole();

      consoleInst.args('testMethod', 5, 'string');

      consoleMock.reset();

      log = 'ERROR: ARGS: Tests.args.testLogMsg.testMethod() | ';
      log += 'Error: Incorrect argument data type.';
      pass = (consoleMock.logs[0] === log);

      if (!pass) {
        errorMsg = 'Debug.proto.args logged an incorrect message';
        results.addError(errorMsg);
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The args Module
    ////////////////////////////////////////////////////////////////////////////

    return args;

  })();
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
    var results = new TestResults('aIV.console.create', 17);

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
      var log;
      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;
      /** @type {!MockConsole} */
      var consoleMock;

      consoleInst = aIV.console.create('Tests.end.testLogMsg');
      consoleMock = new MockConsole();

      consoleInst.end('testMethod', 5);

      consoleMock.reset();

      log = 'LOG: END: Tests.end.testLogMsg.testMethod() | return= %s 5';
      pass = (consoleMock.logs[0] === log);

      if (!pass) {
        errorMsg = 'Debug.proto.end logged an incorrect message';
        results.addError(errorMsg);
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The end Module
    ////////////////////////////////////////////////////////////////////////////

    return end;

  })();
  /**
   * -------------------------------------------------
   * Public Method (Tests.fail)
   * -------------------------------------------------
   * @desc Tests aIV.debug().fail.
   * @type {function}
   */
  Tests.fail = (function setupTests_fail() {

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private fail Variables
    ////////////////////////////////////////////////////////////////////////////

    /** @type {!TestResults} */
    var results = new TestResults('Debug.proto.fail', 5);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public fail Method
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -------------------------------------------------
     * Public Method (fail)
     * -------------------------------------------------
     * @desc Tests aIV.debug().fail.
     * @type {function}
     */
    var fail = function() {

      testLog();
      testLogWithArgs();
      testLogWithArgsArr();
      testLogWithFunc();

      testLogMsg();

      // Save the results
      app.results.push(results);
    };

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private fail Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ---------------------------------------------------
     * Private Method (testLog)
     * ---------------------------------------------------
     * @type {function}
     */
    var testLog = function() {

      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create('Tests.fail.testLog');

      fail = consoleInst.fail('testMethod', true, 'Message');

      if (fail) {
        errorMsg = 'Debug.proto.fail failed to log';
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
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create('Tests.fail.testLogWithArgs');

      pass = consoleInst.fail('testMethod', 0, '5 should be $$', 5);

      fail = consoleInst.fail('testMethod', 1, '5 should be $$', 5);

      if (!pass || fail) {
        errorMsg = 'Debug.proto.fail failed to log with arguments';
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
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create('Tests.fail.testLogWithArgsArr');

      pass = consoleInst.fail([ 'testMethod', 0, '5 should be $$', 5 ]);

      fail = consoleInst.fail([ 'testMethod', 1, '5 should be $$', 5 ]);

      if (!pass || fail) {
        errorMsg = 'Debug.proto.fail failed to log with arguments array';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testLogWithFunc)
     * ---------------------------------------------------
     * @type {function}
     */
    var testLogWithFunc = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {function(): boolean} */
      var passFunc;
      /** @type {function(): boolean} */
      var failFunc;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create('Tests.fail.testLogWithFunc');
      passFunc = function() { return true; };
      failFunc = function() { return false; };

      pass = consoleInst.fail('testMethod', failFunc, 'Message');

      fail = consoleInst.fail('testMethod', passFunc, 'Message');

      if (!pass || fail) {
        errorMsg = 'Debug.proto.fail failed to log with function';
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
      var log;
      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;
      /** @type {!MockConsole} */
      var consoleMock;

      consoleInst = aIV.console.create('Tests.fail.testLogMsg');
      consoleMock = new MockConsole();

      consoleInst.fail('testMethod', false, '5 was $$', 6);

      consoleMock.reset();

      log = 'ERROR: FAIL: Tests.fail.testLogMsg.testMethod() | ';
      log += '5 was %s 6';
      pass = (consoleMock.logs[0] === log);

      if (!pass) {
        errorMsg = 'Debug.proto.fail logged an incorrect message';
        results.addError(errorMsg);
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The fail Module
    ////////////////////////////////////////////////////////////////////////////

    return fail;

  })();
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

      pass = consoleInst.group('testMethod', 'coll');
      pass = pass && consoleInst.group('testMethod', 'end');

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
      pass = pass && consoleInst.group([ 'testMethod', 'end' ]);

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

      pass = consoleInst.group('testMethod', 'coll', 'testNumber= $$', 5);
      pass = pass && consoleInst.group('testMethod', 'end');

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
      pass = pass && consoleInst.group([ 'testMethod', 'end' ]);

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
      var log;
      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;
      /** @type {!MockConsole} */
      var consoleMock;

      consoleInst = aIV.console.create('Tests.group.testLogMsg');
      consoleMock = new MockConsole();

      consoleInst.group('testMethod', 'open', 'testNumber= $$', 5);
      consoleInst.misc('testMethod', 'A test log message.');
      consoleInst.group('testMethod', 'end');

      consoleMock.reset();

      log = 'OPEN GROUP: GROUP: Tests.group.testLogMsg.testMethod() | ';
      log += 'testNumber= %s 5';
      pass = (consoleMock.logs[0] === log);

      log = 'LOG: MISC: Tests.group.testLogMsg.testMethod() | ';
      log += 'A test log message.';
      pass = pass && (consoleMock.logs[1] === log);

      log = 'CLOSE GROUP';
      pass = pass && (consoleMock.logs[2] === log);

      if (!pass) {
        errorMsg = 'Debug.proto.group logged an incorrect message';
        results.addError(errorMsg);
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The group Module
    ////////////////////////////////////////////////////////////////////////////

    return group;

  })();
  /**
   * -------------------------------------------------
   * Public Method (Tests.init)
   * -------------------------------------------------
   * @desc Tests aIV.debug().init.
   * @type {function}
   */
  Tests.init = (function setupTests_init() {

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private init Variables
    ////////////////////////////////////////////////////////////////////////////

    /** @type {!TestResults} */
    var results = new TestResults('Debug.proto.init', 4);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public init Method
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -------------------------------------------------
     * Public Method (init)
     * -------------------------------------------------
     * @desc Tests aIV.debug().init.
     * @type {function}
     */
    var init = function() {

      testLog();
      testLogWithArgs();
      testLogWithArgsArr();

      testLogMsg();

      // Save the results
      app.results.push(results);
    };

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private init Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ---------------------------------------------------
     * Private Method (testLog)
     * ---------------------------------------------------
     * @type {function}
     */
    var testLog = function() {

      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create('Tests.init.testLog');

      fail = consoleInst.init('testMethod');

      if (fail) {
        errorMsg = 'Debug.proto.init failed to log';
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
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create('Tests.init.testLogWithArgs');

      pass = consoleInst.init('testMethod', 1, 'string');

      fail = consoleInst.init('testMethod', 's', 'string');

      if (!pass || fail) {
        errorMsg = 'Debug.proto.init failed to log with arguments';
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
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create('Tests.init.testLogWithArgsArr');

      pass = consoleInst.init([ 'testMethod', 1, 'string' ]);

      fail = consoleInst.init([ 'testMethod', 's', 'string' ]);

      if (!pass || fail) {
        errorMsg = 'Debug.proto.init failed to log with arguments array';
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
      var log;
      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;
      /** @type {!MockConsole} */
      var consoleMock;

      consoleInst = aIV.console.create('Tests.init.testLogMsg');
      consoleMock = new MockConsole();

      consoleInst.init('testMethod');
      consoleInst.init('testMethod', 5, 'string');

      consoleMock.reset();

      log = 'LOG: CALL: Tests.init.testLogMsg.testMethod()';
      pass = (consoleMock.logs[0] === log);

      log = 'ERROR: ARGS: Tests.init.testLogMsg.testMethod() | ';
      log += 'Error: Incorrect argument data type.';
      pass = pass && (consoleMock.logs[1] === log);

      log = 'LOG: CALL: Tests.init.testLogMsg.testMethod(%s) 5';
      pass = pass && (consoleMock.logs[2] === log);

      if (!pass) {
        errorMsg = 'Debug.proto.init logged an incorrect message';
        results.addError(errorMsg);
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The init Module
    ////////////////////////////////////////////////////////////////////////////

    return init;

  })();
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
      var log;
      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;
      /** @type {!MockConsole} */
      var consoleMock;

      consoleInst = aIV.console.create('Tests.misc.testLogMsg');
      consoleMock = new MockConsole();

      consoleInst.misc('testMethod', 'A message with the number $$', 5);

      consoleMock.reset();

      log = 'LOG: MISC: Tests.misc.testLogMsg.testMethod() | ';
      log += 'A message with the number %s 5';
      pass = (consoleMock.logs[0] === log);

      if (!pass) {
        errorMsg = 'Debug.proto.misc logged an incorrect message';
        results.addError(errorMsg);
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The misc Module
    ////////////////////////////////////////////////////////////////////////////

    return misc;

  })();
  /**
   * -------------------------------------------------
   * Public Method (Tests.start)
   * -------------------------------------------------
   * @desc Tests aIV.debug().start.
   * @type {function}
   */
  Tests.start = (function setupTests_start() {

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private start Variables
    ////////////////////////////////////////////////////////////////////////////

    /** @type {!TestResults} */
    var results = new TestResults('Debug.proto.start', 4);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public start Method
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -------------------------------------------------
     * Public Method (start)
     * -------------------------------------------------
     * @desc Tests aIV.debug().start.
     * @type {function}
     */
    var start = function() {

      testLog();
      testLogWithArgs();
      testLogWithArgsArr();

      testLogMsg();

      // Save the results
      app.results.push(results);
    };

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private start Methods
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

      consoleInst = aIV.console.create('Tests.start.testLog');

      pass = consoleInst.start('testMethod');

      if (!pass) {
        errorMsg = 'Debug.proto.start failed to log';
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

      consoleInst = aIV.console.create('Tests.start.testLogWithArgs');

      pass = consoleInst.start('testMethod', 5, [ 5 ]);

      if (!pass) {
        errorMsg = 'Debug.proto.start failed to log with arguments';
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

      consoleInst = aIV.console.create('Tests.start.testLogWithArgsArr');

      pass = consoleInst.start([ 'testMethod', 5, [ 5 ] ]);

      if (!pass) {
        errorMsg = 'Debug.proto.start failed to log with arguments array';
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
      var log;
      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;
      /** @type {!MockConsole} */
      var consoleMock;

      consoleInst = aIV.console.create('Tests.start.testLogMsg');
      consoleMock = new MockConsole();

      consoleInst.start('testMethod', 5);

      consoleMock.reset();

      log = 'LOG: CALL: Tests.start.testLogMsg.testMethod(%s) 5';
      pass = (consoleMock.logs[0] === log);

      if (!pass) {
        errorMsg = 'Debug.proto.start logged an incorrect message';
        results.addError(errorMsg);
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The start Module
    ////////////////////////////////////////////////////////////////////////////

    return start;

  })();
  /**
   * -------------------------------------------------
   * Public Method (Tests.state)
   * -------------------------------------------------
   * @desc Tests aIV.debug().state.
   * @type {function}
   */
  Tests.state = (function setupTests_state() {

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private state Variables
    ////////////////////////////////////////////////////////////////////////////

    /** @type {!TestResults} */
    var results = new TestResults('Debug.proto.state', 3);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public state Method
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -------------------------------------------------
     * Public Method (state)
     * -------------------------------------------------
     * @desc Tests aIV.debug().state.
     * @type {function}
     */
    var state = function() {

      testLog();
      testLogWithArr();
      testLogMsg();

      // Save the results
      app.results.push(results);
    };

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private state Methods
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

      consoleInst = aIV.console.create('Tests.state.testLog');

      pass = consoleInst.state('testMethod', 'testNumber= $$', 5, 'blah');

      if (!pass) {
        errorMsg = 'Debug.proto.state failed to log';
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

      consoleInst = aIV.console.create('Tests.state.testLogWithArr');

      pass = consoleInst.state([ 'testMethod', 'testNumber= $$', 5, 'blah' ]);

      if (!pass) {
        errorMsg = 'Debug.proto.state failed to log with an array';
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
      var log;
      /** @type {boolean} */
      var pass;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;
      /** @type {!MockConsole} */
      var consoleMock;

      consoleInst = aIV.console.create('Tests.state.testLogMsg');
      consoleMock = new MockConsole();

      consoleInst.state('testMethod', 'testNumber= $$', 5, 'empty');

      consoleMock.reset();

      log = 'LOG: STATE: Tests.state.testLogMsg.testMethod() | ';
      log += 'testNumber= %s; unnamedVar1= %s 5 empty';
      pass = (consoleMock.logs[0] === log);

      if (!pass) {
        errorMsg = 'Debug.proto.state logged an incorrect message';
        results.addError(errorMsg);
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The state Module
    ////////////////////////////////////////////////////////////////////////////

    return state;

  })();
  /**
   * -------------------------------------------------
   * Public Auto (Tests.toggleAuto)
   * -------------------------------------------------
   * @desc Tests aIV.debug().turnOn/OffAuto.
   * @type {function}
   */
  Tests.toggleAuto = (function setupTests_toggleAuto() {

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private toggleAuto Variables
    ////////////////////////////////////////////////////////////////////////////

    /** @type {!TestResults} */
    var results = new TestResults('turnOn/OffAuto', 4);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public toggleAuto Auto
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -------------------------------------------------
     * Public Auto (toggleAuto)
     * -------------------------------------------------
     * @desc Tests aIV.debug().turnOn/OffAuto.
     * @type {function}
     */
    var toggleAuto = function() {

      testToggleOne();
      testToggleTwoString();
      testToggleTwoArr();
      testToggleTwoStrings();

      // Save the results
      app.results.push(results);
    };

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private toggleAuto Autos
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ---------------------------------------------------
     * Private Auto (testToggleOne)
     * ---------------------------------------------------
     * @type {function}
     */
    var testToggleOne = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create('Tests.toggleAuto.testToggleOne');

      consoleInst.turnOnAuto('groups');
      pass = consoleInst.getAuto('groups');

      consoleInst.turnOffAuto('groups');
      fail = consoleInst.getAuto('groups');

      if (!pass || fail) {
        errorMsg = 'Debug.proto.turnOn/OffAuto failed to toggle one method';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Auto (testToggleTwoString)
     * ---------------------------------------------------
     * @type {function}
     */
    var testToggleTwoString = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create('Tests.toggleAuto.testToggleTwoString');

      consoleInst.turnOnAuto('groups timers');
      pass = consoleInst.getAuto('groups');
      pass = pass && consoleInst.getAuto('timers');

      consoleInst.turnOffAuto('groups timers');
      fail = consoleInst.getAuto('groups');
      fail = fail || consoleInst.getAuto('timers');

      if (!pass || fail) {
        errorMsg = 'Debug.proto.turnOn/OffAuto failed to toggle two types ';
        errorMsg += 'with a spaced string';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Auto (testToggleTwoArr)
     * ---------------------------------------------------
     * @type {function}
     */
    var testToggleTwoArr = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create('Tests.toggleAuto.testToggleTwoArr');

      consoleInst.turnOnAuto([ 'groups', 'timers' ]);
      pass = consoleInst.getAuto('groups');
      pass = pass && consoleInst.getAuto('timers');

      consoleInst.turnOffAuto([ 'groups', 'timers' ]);
      fail = consoleInst.getAuto('groups');
      fail = fail || consoleInst.getAuto('timers');

      if (!pass || fail) {
        errorMsg = 'Debug.proto.turnOn/OffAuto failed to toggle two types ';
        errorMsg += 'with an array of strings';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Auto (testToggleTwoStrings)
     * ---------------------------------------------------
     * @type {function}
     */
    var testToggleTwoStrings = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create('Tests.toggleAuto.testToggleTwoStrings');

      consoleInst.turnOnAuto('groups', 'timers');
      pass = consoleInst.getAuto('groups');
      pass = pass && consoleInst.getAuto('timers');

      consoleInst.turnOffAuto('groups', 'timers');
      fail = consoleInst.getAuto('groups');
      fail = fail || consoleInst.getAuto('timers');

      if (!pass || fail) {
        errorMsg = 'Debug.proto.turnOn/OffAuto failed to toggle two types ';
        errorMsg += 'with two string arguments';
        results.addError(errorMsg);
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The toggleAuto Module
    ////////////////////////////////////////////////////////////////////////////

    return toggleAuto;

  })();
  /**
   * -------------------------------------------------
   * Public Method (Tests.toggleBreakpoint)
   * -------------------------------------------------
   * @desc Tests aIV.debug().add/removeBreakpoint.
   * @type {function}
   */
  Tests.toggleBreakpoint = (function setupTests_toggleBreakpoint() {

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private toggleBreakpoint Variables
    ////////////////////////////////////////////////////////////////////////////

    /** @type {!TestResults} */
    var results = new TestResults('add/removeBreakpoint', 4);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public toggleBreakpoint Method
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -------------------------------------------------
     * Public Method (toggleBreakpoint)
     * -------------------------------------------------
     * @desc Tests aIV.debug().add/removeBreakpoint.
     * @type {function}
     */
    var toggleBreakpoint = function() {

      testToggleOne();
      testToggleTwoString();
      testToggleTwoArr();
      testToggleTwoStrings();

      // Save the results
      app.results.push(results);
    };

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private toggleBreakpoint Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ---------------------------------------------------
     * Private Method (testToggleOne)
     * ---------------------------------------------------
     * @type {function}
     */
    var testToggleOne = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create({
        classTitle    : 'Tests.toggleBreakpoint.testToggleOne',
        addBreakpoints: 'all'
      });

      consoleInst.removeBreakpoint('end');
      fail = consoleInst.getBreakpoint('end');

      consoleInst.addBreakpoint('end');
      pass = consoleInst.getBreakpoint('end');

      if (!pass || fail) {
        errorMsg = 'Debug.proto.add/removeBreakpoint failed to toggle one method';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testToggleTwoString)
     * ---------------------------------------------------
     * @type {function}
     */
    var testToggleTwoString = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create({
        classTitle    : 'Tests.toggleBreakpoint.testToggleTwoString',
        addBreakpoints: 'all'
      });

      consoleInst.removeBreakpoint('end init');
      fail = consoleInst.getBreakpoint('end');
      fail = fail || consoleInst.getBreakpoint('init');

      consoleInst.addBreakpoint('end init');
      pass = consoleInst.getBreakpoint('end');
      pass = pass && consoleInst.getBreakpoint('init');

      if (!pass || fail) {
        errorMsg = 'Debug.proto.add/removeBreakpoint failed to toggle two methods ';
        errorMsg += 'with a spaced string';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testToggleTwoArr)
     * ---------------------------------------------------
     * @type {function}
     */
    var testToggleTwoArr = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create({
        classTitle    : 'Tests.toggleBreakpoint.testToggleTwoArr',
        addBreakpoints: 'all'
      });

      consoleInst.removeBreakpoint([ 'end', 'init' ]);
      fail = consoleInst.getBreakpoint('end');
      fail = fail || consoleInst.getBreakpoint('init');

      consoleInst.addBreakpoint([ 'end', 'init' ]);
      pass = consoleInst.getBreakpoint('end');
      pass = pass && consoleInst.getBreakpoint('init');

      if (!pass || fail) {
        errorMsg = 'Debug.proto.add/removeBreakpoint failed to toggle two methods ';
        errorMsg += 'with an array of strings';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testToggleTwoStrings)
     * ---------------------------------------------------
     * @type {function}
     */
    var testToggleTwoStrings = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create({
        classTitle    : 'Tests.toggleBreakpoint.testToggleTwoStrings',
        addBreakpoints: 'all'
      });

      consoleInst.removeBreakpoint('end', 'init');
      fail = consoleInst.getBreakpoint('end');
      fail = fail || consoleInst.getBreakpoint('init');

      consoleInst.addBreakpoint('end', 'init');
      pass = consoleInst.getBreakpoint('end');
      pass = pass && consoleInst.getBreakpoint('init');

      if (!pass || fail) {
        errorMsg = 'Debug.proto.add/removeBreakpoint failed to toggle two methods ';
        errorMsg += 'with two string arguments';
        results.addError(errorMsg);
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The toggleBreakpoint Module
    ////////////////////////////////////////////////////////////////////////////

    return toggleBreakpoint;

  })();
  /**
   * -------------------------------------------------
   * Public Method (Tests.toggleMethod)
   * -------------------------------------------------
   * @desc Tests aIV.debug().turnOn/OffMethod.
   * @type {function}
   */
  Tests.toggleMethod = (function setupTests_toggleMethod() {

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private toggleMethod Variables
    ////////////////////////////////////////////////////////////////////////////

    /** @type {!TestResults} */
    var results = new TestResults('turnOn/OffMethod', 4);

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public toggleMethod Method
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -------------------------------------------------
     * Public Method (toggleMethod)
     * -------------------------------------------------
     * @desc Tests aIV.debug().turnOn/OffMethod.
     * @type {function}
     */
    var toggleMethod = function() {

      testToggleOne();
      testToggleTwoString();
      testToggleTwoArr();
      testToggleTwoStrings();

      // Save the results
      app.results.push(results);
    };

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Private toggleMethod Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ---------------------------------------------------
     * Private Method (testToggleOne)
     * ---------------------------------------------------
     * @type {function}
     */
    var testToggleOne = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create({
        classTitle    : 'Tests.toggleMethod.testToggleOne',
        turnOffMethods: 'all'
      });

      consoleInst.turnOnMethod('end');
      pass = consoleInst.getMethod('end');

      consoleInst.turnOffMethod('end');
      fail = consoleInst.getMethod('end');

      if (!pass || fail) {
        errorMsg = 'Debug.proto.turnOn/OffMethod failed to toggle one method';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testToggleTwoString)
     * ---------------------------------------------------
     * @type {function}
     */
    var testToggleTwoString = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create({
        classTitle    : 'Tests.toggleMethod.testToggleTwoString',
        turnOffMethods: 'all'
      });

      consoleInst.turnOnMethod('end init');
      pass = consoleInst.getMethod('end');
      pass = pass && consoleInst.getMethod('init');

      consoleInst.turnOffMethod('end init');
      fail = consoleInst.getMethod('end');
      fail = fail || consoleInst.getMethod('init');

      if (!pass || fail) {
        errorMsg = 'Debug.proto.turnOn/OffMethod failed to toggle two methods ';
        errorMsg += 'with a spaced string';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testToggleTwoArr)
     * ---------------------------------------------------
     * @type {function}
     */
    var testToggleTwoArr = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create({
        classTitle    : 'Tests.toggleMethod.testToggleTwoArr',
        turnOffMethods: 'all'
      });

      consoleInst.turnOnMethod([ 'end', 'init' ]);
      pass = consoleInst.getMethod('end');
      pass = pass && consoleInst.getMethod('init');

      consoleInst.turnOffMethod([ 'end', 'init' ]);
      fail = consoleInst.getMethod('end');
      fail = fail || consoleInst.getMethod('init');

      if (!pass || fail) {
        errorMsg = 'Debug.proto.turnOn/OffMethod failed to toggle two methods ';
        errorMsg += 'with an array of strings';
        results.addError(errorMsg);
      }
    };

    /**
     * ---------------------------------------------------
     * Private Method (testToggleTwoStrings)
     * ---------------------------------------------------
     * @type {function}
     */
    var testToggleTwoStrings = function() {

      /** @type {boolean} */
      var pass;
      /** @type {boolean} */
      var fail;
      /** @type {string} */
      var errorMsg;
      /** @type {!Debug} */
      var consoleInst;

      consoleInst = aIV.console.create({
        classTitle    : 'Tests.toggleMethod.testToggleTwoStrings',
        turnOffMethods: 'all'
      });

      consoleInst.turnOnMethod('end', 'init');
      pass = consoleInst.getMethod('end');
      pass = pass && consoleInst.getMethod('init');

      consoleInst.turnOffMethod('end', 'init');
      fail = consoleInst.getMethod('end');
      fail = fail || consoleInst.getMethod('init');

      if (!pass || fail) {
        errorMsg = 'Debug.proto.turnOn/OffMethod failed to toggle two methods ';
        errorMsg += 'with two string arguments';
        results.addError(errorMsg);
      }
    };

    ////////////////////////////////////////////////////////////////////////////
    // The End Of The toggleMethod Module
    ////////////////////////////////////////////////////////////////////////////

    return toggleMethod;

  })();

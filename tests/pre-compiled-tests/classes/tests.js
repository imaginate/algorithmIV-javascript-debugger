  /**
   * -----------------------------------------------------
   * Public Class (Tests)
   * -----------------------------------------------------
   * @desc The tests to run.
   * @type {!Object<string, function>}
   */
  var Tests = {};

  /**
   * -------------------------------------------------
   * Public Method (Tests.checkClassTitle)
   * -------------------------------------------------
   * @desc Checks the setting of the classTitle property.
   * @type {function}
   */
  Tests.checkClassTitle = function() {

    /** @type {!TestResults} */
    var results;
    /** @type {string} */
    var msg;
    /** @type {!Object} */
    var tests;

    results = new TestResults('Tests.checkClassTitle');;

    // Setup for the tests
    tests = {
      prop: aIV.console.create({
        classTitle: 'Tests.checkClassTitle.prop'
      }),
      str : aIV.console.create('Tests.checkClassTitle.str'),
      none: aIV.console.create()
    };

    // Run the tests
    if (tests.prop.classTitle !== 'Tests.checkClassTitle.prop.') {
      msg = 'Tests.checkClassTitle evaluation failed: ';
      msg += tests.prop.classTitle + ' !== Tests.checkClassTitle.prop.';
      results.addError(msg);
    }

    if (tests.str.classTitle !== 'Tests.checkClassTitle.str.') {
      msg = 'Tests.checkClassTitle evaluation failed: ';
      msg += tests.str.classTitle + ' !== Tests.checkClassTitle.str.';
      results.addError(msg);
    }

    if (tests.none.classTitle !== 'unknown.') {
      msg = 'Tests.checkClassTitle evaluation failed: ';
      msg += tests.none.classTitle + ' !== unknown.';
      results.addError(msg);
    }

    // Save the results
    app.results.push(results);
  };

  /**
   * -------------------------------------------------
   * Public Method (Tests.checkTurnOffMethods)
   * -------------------------------------------------
   * @desc Checks the setting of the turnOffMethods param.
   * @type {function}
   */
  Tests.checkTurnOffMethods = function() {

    /** @type {!TestResults} */
    var results;
    /** @type {string} */
    var msg;
    /** @type {!Object} */
    var tests;

    results = new TestResults('Tests.checkTurnOffMethods');;

    // Setup for the tests
    tests = {
      all: aIV.console.create({
        classTitle    : 'Tests.checkTurnOffMethods.all',
        turnOffMethods: 'all'
      }),
      str: aIV.console.create({
        classTitle    : 'Tests.checkTurnOffMethods.str',
        turnOffMethods: 'fail state'
      }),
      arr: aIV.console.create({
        classTitle    : 'Tests.checkTurnOffMethods.arr',
        turnOffMethods: [ 'fail', 'state' ]
      })
    };

    // Run the tests
    if (tests.all.getMethod('start') ||
        tests.all.getMethod('args')  ||
        tests.all.getMethod('fail')  ||
        tests.all.getMethod('group') ||
        tests.all.getMethod('state') ||
        tests.all.getMethod('misc')) {
      msg = 'Tests.turnOffMethods.all failed: no types should be on';
      results.addError(msg);
    }

    if (!tests.str.getMethod('start') ||
        !tests.str.getMethod('args')  ||
        tests.str.getMethod('fail')   ||
        !tests.str.getMethod('group') ||
        tests.str.getMethod('state')  ||
        !tests.str.getMethod('misc')) {
      msg = "Tests.turnOffMethods.str failed: only 'fail' and 'state'";
      msg += ' should be off';
      results.addError(msg);
    }

    if (!tests.arr.getMethod('start') ||
        !tests.arr.getMethod('args')  ||
        tests.arr.getMethod('fail')   ||
        !tests.arr.getMethod('group') ||
        tests.arr.getMethod('state')  ||
        !tests.arr.getMethod('misc')) {
      msg = "Tests.turnOffMethods.arr failed: only 'fail' and 'state'";
      msg += ' should be off';
      results.addError(msg);
    }

    // Save the results
    app.results.push(results);
  };

  /**
   * -------------------------------------------------
   * Public Method (Tests.checkAddBreakpoints)
   * -------------------------------------------------
   * @desc Checks the setting of the addBreakpoints param.
   * @type {function}
   */
  Tests.checkAddBreakpoints = function() {

    /** @type {!TestResults} */
    var results;
    /** @type {string} */
    var msg;
    /** @type {!Object} */
    var tests;

    results = new TestResults('Tests.checkAddBreakpoints');;

    // Setup for the tests
    tests = {
      all: aIV.console.create({
        classTitle    : 'Tests.checkAddBreakpoints.all',
        addBreakpoints: 'all'
      }),
      str: aIV.console.create({
        classTitle    : 'Tests.checkAddBreakpoints.str',
        addBreakpoints: 'fail state'
      }),
      arr: aIV.console.create({
        classTitle    : 'Tests.checkAddBreakpoints.arr',
        addBreakpoints: [ 'fail', 'state' ]
      })
    };

    // Run the tests
    if (!tests.all.getBreakpoint('start') ||
        !tests.all.getBreakpoint('args')  ||
        !tests.all.getBreakpoint('fail')  ||
        !tests.all.getBreakpoint('group') ||
        !tests.all.getBreakpoint('state') ||
        !tests.all.getBreakpoint('misc')) {
      msg = 'Tests.addBreakpoints.all failed: no debuggers should be off';
      results.addError(msg);
    }

    if (tests.str.getBreakpoint('start')  ||
        tests.str.getBreakpoint('args')   ||
        !tests.str.getBreakpoint('fail')  ||
        tests.str.getBreakpoint('group')  ||
        !tests.str.getBreakpoint('state') ||
        tests.str.getBreakpoint('misc')) {
      msg = "Tests.addBreakpoints.str failed: only 'fail' and 'state'";
      msg += ' should be on';
      results.addError(msg);
    }

    if (tests.str.getBreakpoint('start')  ||
        tests.str.getBreakpoint('args')   ||
        !tests.str.getBreakpoint('fail')  ||
        tests.str.getBreakpoint('group')  ||
        !tests.str.getBreakpoint('state') ||
        tests.arr.getBreakpoint('misc')) {
      msg = "Tests.addBreakpoints.arr failed: only 'fail' and 'state'";
      msg += ' should be on';
      results.addError(msg);
    }

    // Save the results
    app.results.push(results);
  };

  /**
   * -------------------------------------------------
   * Public Method (Tests.checkInstances)
   * -------------------------------------------------
   * @desc Checks that instances are not created twice for the same class.
   * @type {function}
   */
  Tests.checkInstances = function() {

    /** @type {!TestResults} */
    var results;
    /** @type {string} */
    var choiceMsg;
    /** @type {string} */
    var errorMsg;
    /** @type {!Object} */
    var tests;
    /** @type {boolean} */
    var pass;

    results = new TestResults('Tests.checkInstances');;

    // Setup for the tests
    tests = {
      first : aIV.console.create('Tests.checkInstances'),
      second: aIV.console.create({
        classTitle    : 'Tests.checkInstances',
        turnOffMethods: 'misc'
      })
    };

    // Run the tests
    pass = tests.first.misc('test1', 'Instance Test 1');
    pass = pass && tests.second.misc('test2', 'Instance Test 2');
    if (!pass) {
      errorMsg = 'Tests.checkInstances failed: A misc log failed when turned on';
      results.addError(errorMsg);
    }

    tests.first.setMethod('misc', false);
    pass = tests.first.misc('test3', 'Instance Test 3');
    pass = pass || tests.second.misc('test4', 'Instance Test 4');
    if (pass) {
      errorMsg = 'Tests.checkInstances failed: A misc log failed when turned off';
      results.addError(errorMsg);
    }

    // Save the results
    app.results.push(results);
  };

  /**
   * -------------------------------------------------
   * Public Method (Tests.checkStart)
   * -------------------------------------------------
   * @desc Checks Debug.start method.
   * @type {function}
   */
  Tests.checkStart = function() {

    /** @type {!TestResults} */
    var results;
    /** @type {string} */
    var choiceMsg;
    /** @type {string} */
    var errorMsg;
    /** @type {!Object} */
    var tests;
    /** @type {boolean} */
    var pass;

    results = new TestResults('Tests.checkStart');;

    // Setup for the tests
    tests = aIV.console.create('Tests.checkStart');

    // Run the tests
    pass = tests.start('testMethod');
    if (!pass) {
      errorMsg = 'Tests.checkStart failed: Did not log';
      results.addError(errorMsg);
    }

    pass = tests.start('testMethod', 5, [ 5 ]);
    if (!pass) {
      errorMsg = 'Tests.checkStart failed: Did not log with arguments';
      results.addError(errorMsg);
    }

    pass = tests.start([ 'testMethod', 5, [ 5 ] ]);
    if (!pass) {
      errorMsg = 'Tests.checkStart failed: Did not log with array argument';
      results.addError(errorMsg);
    }

    choiceMsg = 'Verify that the start log message is correct. The following ';
    choiceMsg += 'message should have been logged to the console:';
    choiceMsg += ' "START: Tests.checkStart.testMethod()"';
    errorMsg = 'Tests.checkStart failed: Log message incorrect';
    app.addChoice(choiceMsg, results, errorMsg, function() {
      tests.start('testMethod');
    });

    // Save the results
    app.results.push(results);
  };

  /**
   * -------------------------------------------------
   * Public Method (Tests.checkArgs)
   * -------------------------------------------------
   * @desc Checks Debug.args method.
   * @type {function}
   */
  Tests.checkArgs = function() {

    /** @type {!TestResults} */
    var results;
    /** @type {string} */
    var choiceMsg;
    /** @type {string} */
    var errorMsg;
    /** @type {!Object} */
    var tests;
    /** @type {boolean} */
    var pass;
    /** @type {boolean} */
    var fail;

    results = new TestResults('Tests.checkArgs');;

    // Setup for the tests
    tests = aIV.console.create('Tests.checkArgs');

    // Basic check
    pass = tests.args('testMethod', 's', 'string');
    pass = pass && tests.args([ 'testMethod', 's', 'string' ]);
    fail = tests.args('testMethod', 1, 'string');
    fail = fail || tests.args([ 'testMethod', 1, 'string' ]);
    if (pass || !fail) {
      errorMsg = 'Tests.checkArgs failed: Did not log';
      results.addError(errorMsg);
    }

    // Check the log message
    choiceMsg = 'Verify that the fail log message is correct. The following ';
    choiceMsg += 'message should have been logged to the console:';
    choiceMsg += ' "FAIL: Tests.checkFail.testMethod() | Test error."';
    errorMsg = 'Tests.checkFail failed: Log message incorrect';
    app.addChoice(choiceMsg, results, errorMsg, function() {
      tests.fail('testMethod', false, 'Test error.');
    });

    // Save the results
    app.results.push(results);
  };

  /**
   * -------------------------------------------------
   * Public Method (Tests.checkGroup)
   * -------------------------------------------------
   * @desc Checks Debug.group method.
   * @type {function}
   */
  Tests.checkGroup = function() {

    /** @type {!TestResults} */
    var results;
    /** @type {string} */
    var choiceMsg;
    /** @type {string} */
    var errorMsg;
    /** @type {!Object} */
    var tests;

    results = new TestResults('Tests.checkGroup');;

    // Setup for the tests
    tests = aIV.console.create('Tests.checkGroup');

    // Run the tests
    choiceMsg = '"GROUP: Tests.checkGroup.testMethod()" ';
    choiceMsg += 'should be an open console group.';
    errorMsg = 'debug.group failed to start an open group';
    app.addChoice(choiceMsg, results, errorMsg, function() {
      tests.group('testMethod', 'open', 'This group should be open.');
      console.log('A child log of testMethod\'s group.');
      tests.group('testMethod', 'end');
    });

    choiceMsg = '"GROUP: Tests.checkGroup.testMethod()" ';
    choiceMsg += 'should be a collapsed console group.';
    errorMsg = 'debug.group failed to start a collapsed group';
    app.addChoice(choiceMsg, results, errorMsg, function() {
      tests.group('testMethod', 'coll', 'This group should be collapsed.');
      console.log('A child log of testMethod\'s group.');
      tests.group('testMethod', 'end');
    });

    choiceMsg = 'The following message should have been logged to the console:';
    choiceMsg += '"GROUP: Tests.checkGroup.testMethod() |';
    choiceMsg += ' Args: number= 5, object= jsObjRef"';
    errorMsg = 'debug.group failed to add the vars correctly to the message';
    app.addChoice(choiceMsg, results, errorMsg, function() {
      /** @type {string} */
      var msg;

      msg = 'Args: number= $$, object= $$';
      tests.group('testMethod', 'coll', msg, 5, [ 5 ]);
      tests.group('testMethod', 'end');
    });

    // Save the results
    app.results.push(results);
  };

  /**
   * -------------------------------------------------
   * Public Method (Tests.checkState)
   * -------------------------------------------------
   * @desc Checks Debug.state method.
   * @type {function}
   */
  Tests.checkState = function() {

    /** @type {!TestResults} */
    var results;
    /** @type {string} */
    var choiceMsg;
    /** @type {string} */
    var errorMsg;
    /** @type {!Object} */
    var tests;
    /** @type {boolean} */
    var pass;

    results = new TestResults('Tests.checkState');;

    // Setup for the tests
    tests = aIV.console.create('Tests.checkState');

    // Run the tests
    pass = tests.state('testMethod');
    if (pass) {
      errorMsg = 'Tests.checkState failed: Argument checks failed to catch error';
      results.addError(errorMsg);
    }

    pass = tests.state('testMethod', 'number= $$, object= $$', 5, [ 5 ]);
    if (!pass) {
      errorMsg = 'Tests.checkState failed: Did not log when it should have';
      results.addError(errorMsg);
    }

    // Check the log message
    choiceMsg = 'Verify that the state log message is correct. The following';
    choiceMsg += ' message should have been logged to the console: "STATE:';
    choiceMsg += ' Tests.checkState.testMethod() | number= 5, object= jsObjRef"';
    errorMsg = 'Tests.checkState failed: Message was logged incorrectly';
    app.addChoice(choiceMsg, results, errorMsg, function() {
      tests.state('testMethod', 'number= $$, object= $$', 5, [ 5 ]);
    });

    // Save the results
    app.results.push(results);
  };

  /**
   * -------------------------------------------------
   * Public Method (Tests.checkMisc)
   * -------------------------------------------------
   * @desc Checks Debug.misc method.
   * @type {function}
   */
  Tests.checkMisc = function() {

    /** @type {!TestResults} */
    var results;
    /** @type {string} */
    var choiceMsg;
    /** @type {string} */
    var errorMsg;
    /** @type {!Object} */
    var tests;
    /** @type {boolean} */
    var pass;

    results = new TestResults('Tests.checkMisc');;

    // Setup for the tests
    tests = aIV.console.create('Tests.checkMisc');

    // Run the tests
    pass = tests.misc('testMethod');
    if (pass) {
      errorMsg = 'Tests.checkMisc failed: Argument checks failed to catch error';
      results.addError(errorMsg);
    }

    pass = tests.misc('testMethod', 'The log message.');
    if (!pass) {
      errorMsg = 'Tests.checkMisc failed: Did not log when it should have';
      results.addError(errorMsg);
    }

    // Check the log message
    choiceMsg = 'Verify that the misc log message is correct. The following';
    choiceMsg += ' message should have been logged to the console: "MISC:';
    choiceMsg += ' Tests.checkMisc.testMethod() | Args: number= 5, object= jsObjRef"';
    errorMsg = 'Tests.checkMisc failed: Message was logged incorrectly';
    app.addChoice(choiceMsg, results, errorMsg, function() {
      tests.misc('testMethod', 'Args: number= $$, object= $$', 5, [ 5 ]);
    });

    // Save the results
    app.results.push(results);
  };

  /**
   * -------------------------------------------------
   * Public Method (Tests.checkTurnOnMethod)
   * -------------------------------------------------
   * @desc Checks Debug.turnOnMethod method.
   * @type {function}
   */
  Tests.checkTurnOnMethod = function() {

    /** @type {!TestResults} */
    var results;
    /** @type {boolean} */
    var before;
    /** @type {boolean} */
    var after;
    /** @type {string} */
    var errorMsg;
    /** @type {!Object} */
    var tests;

    results = new TestResults('Tests.checkTurnOnMethod');;

    // Setup for the tests
    tests = aIV.console.create({
      classTitle    : 'Tests.checkTurnOnMethod',
      turnOffMethods: 'all'
    });

    // Run the tests
    before = tests.getMethod('misc');
    tests.turnOnMethod('misc');
    after = tests.getMethod('misc');
    if (before || !after) {
      errorMsg = 'debug.turnOnMethod failed to turn on one type';
      results.addError(errorMsg);
    }
    tests.setMethod('misc', false);

    before = tests.getMethod('start') && tests.getMethod('misc');
    tests.turnOnMethod('start misc');
    after = tests.getMethod('start') && tests.getMethod('misc');
    if (before || !after) {
      errorMsg = 'debug.turnOnMethod failed to turn on two types with a string';
      results.addError(errorMsg);
    }
    tests.setMethod('all', false);

    before = tests.getMethod('start') && tests.getMethod('misc');
    tests.turnOnMethod([ 'start', 'misc' ]);
    after = tests.getMethod('start') && tests.getMethod('misc');
    if (before || !after) {
      errorMsg = 'debug.turnOnMethod failed to turn on two types with an array';
      results.addError(errorMsg);
    }
    tests.setMethod('all', false);

    before = tests.getMethod('start') && tests.getMethod('misc');
    tests.turnOnMethod('all');
    after = tests.getMethod('start') && tests.getMethod('misc');
    if (before || !after) {
      errorMsg = 'debug.turnOnMethod failed to turn on all types';
      results.addError(errorMsg);
    }

    // Save the results
    app.results.push(results);
  };

  /**
   * -------------------------------------------------
   * Public Method (Tests.checkTurnOffMethod)
   * -------------------------------------------------
   * @desc Checks Debug.turnOffMethod method.
   * @type {function}
   */
  Tests.checkTurnOffMethod = function() {

    /** @type {!TestResults} */
    var results;
    /** @type {boolean} */
    var before;
    /** @type {boolean} */
    var after;
    /** @type {string} */
    var errorMsg;
    /** @type {!Object} */
    var tests;

    results = new TestResults('Tests.checkTurnOffMethod');;

    // Setup for the tests
    tests = aIV.console.create('Tests.checkTurnOffMethod');

    // Run the tests
    before = tests.getMethod('misc');
    tests.turnOffMethod('misc');
    after = tests.getMethod('misc');
    if (!before || after) {
      errorMsg = 'debug.turnOffMethod failed to turn off one type';
      results.addError(errorMsg);
    }
    tests.setMethod('misc', true);

    before = tests.getMethod('start') && tests.getMethod('misc');
    tests.turnOffMethod('start misc');
    after = tests.getMethod('start') && tests.getMethod('misc');
    if (!before || after) {
      errorMsg = 'debug.turnOffMethod failed to turn off two types with a string';
      results.addError(errorMsg);
    }
    tests.setMethod('all', true);

    before = tests.getMethod('start') && tests.getMethod('misc');
    tests.turnOffMethod([ 'start', 'misc' ]);
    after = tests.getMethod('start') && tests.getMethod('misc');
    if (!before || after) {
      errorMsg = 'debug.turnOffMethod failed to turn off two types with an array';
      results.addError(errorMsg);
    }
    tests.setMethod('all', true);

    before = tests.getMethod('start') && tests.getMethod('misc');
    tests.turnOffMethod('all');
    after = tests.getMethod('start') && tests.getMethod('misc');
    if (!before || after) {
      errorMsg = 'debug.turnOffMethod failed to turn off all types';
      results.addError(errorMsg);
    }

    // Save the results
    app.results.push(results);
  };

  /**
   * -------------------------------------------------
   * Public Method (Tests.checkAddBreakpoint)
   * -------------------------------------------------
   * @desc Checks Debug.addBreakpoint method.
   * @type {function}
   */
  Tests.checkAddBreakpoint = function() {

    /** @type {!TestResults} */
    var results;
    /** @type {boolean} */
    var before;
    /** @type {boolean} */
    var after;
    /** @type {string} */
    var errorMsg;
    /** @type {!Object} */
    var tests;

    results = new TestResults('Tests.checkAddBreakpoint');

    // Setup for the tests
    tests = aIV.console.create('Tests.checkAddBreakpoint');

    // Run the tests
    before = tests.getBreakpoint('misc');
    tests.addBreakpoint('misc');
    after = tests.getBreakpoint('misc');
    if (before || !after) {
      errorMsg = 'debug.addBreakpoint failed to turn on one type';
      results.addError(errorMsg);
    }
    tests.setBreakpoint('misc', false);

    before = tests.getBreakpoint('start') && tests.getBreakpoint('misc');
    tests.addBreakpoint('start misc');
    after = tests.getBreakpoint('start') && tests.getBreakpoint('misc');
    if (before || !after) {
      errorMsg = 'debug.addBreakpoint failed to turn on two ';
      errorMsg += 'types with a string';
      results.addError(errorMsg);
    }
    tests.setBreakpoint('all', false);

    before = tests.getBreakpoint('start') && tests.getBreakpoint('misc');
    tests.addBreakpoint([ 'start', 'misc' ]);
    after = tests.getBreakpoint('start') && tests.getBreakpoint('misc');
    if (before || !after) {
      errorMsg = 'debug.addBreakpoint failed to turn on two ';
      errorMsg += 'types with an array';
      results.addError(errorMsg);
    }
    tests.setBreakpoint('all', false);

    before = tests.getBreakpoint('start') && tests.getBreakpoint('misc');
    tests.addBreakpoint('all');
    after = tests.getBreakpoint('start') && tests.getBreakpoint('misc');
    if (before || !after) {
      errorMsg = 'debug.addBreakpoint failed to turn on all types';
      results.addError(errorMsg);
    }

    // Save the results
    app.results.push(results);
  };

  /**
   * -------------------------------------------------
   * Public Method (Tests.checkRemoveBreakpoint)
   * -------------------------------------------------
   * @desc Checks Debug.removeBreakpoint method.
   * @type {function}
   */
  Tests.checkRemoveBreakpoint = function() {

    /** @type {!TestResults} */
    var results;
    /** @type {boolean} */
    var before;
    /** @type {boolean} */
    var after;
    /** @type {string} */
    var errorMsg;
    /** @type {!Object} */
    var tests;

    results = new TestResults('Tests.checkRemoveBreakpoint');;

    // Setup for the tests
    tests = aIV.console.create({
      classTitle    : 'Tests.checkRemoveBreakpoint',
      addBreakpoints: 'all'
    });

    // Run the tests
    before = tests.getBreakpoint('misc');
    tests.removeBreakpoint('misc');
    after = tests.getBreakpoint('misc');
    if (!before || after) {
      errorMsg = 'debug.removeBreakpoint failed to turn off one type';
      results.addError(errorMsg);
    }
    tests.setBreakpoint('misc', true);

    before = tests.getBreakpoint('start') && tests.getBreakpoint('misc');
    tests.removeBreakpoint('start misc');
    after = tests.getBreakpoint('start') && tests.getBreakpoint('misc');
    if (!before || after) {
      errorMsg = 'debug.removeBreakpoint failed to turn off two ';
      errorMsg += 'types with a string';
      results.addError(errorMsg);
    }
    tests.setBreakpoint('all', true);

    before = tests.getBreakpoint('start') && tests.getBreakpoint('misc');
    tests.removeBreakpoint([ 'start', 'misc' ]);
    after = tests.getBreakpoint('start') && tests.getBreakpoint('misc');
    if (!before || after) {
      errorMsg = 'debug.removeBreakpoint failed to turn off two ';
      errorMsg += 'types with an array';
      results.addError(errorMsg);
    }
    tests.setBreakpoint('all', true);

    before = tests.getBreakpoint('start') && tests.getBreakpoint('misc');
    tests.removeBreakpoint('all');
    after = tests.getBreakpoint('start') && tests.getBreakpoint('misc');
    if (!before || after) {
      errorMsg = 'debug.removeBreakpoint failed to turn off all types';
      results.addError(errorMsg);
    }

    // Save the results
    app.results.push(results);
  };

  /**
   * -------------------------------------------------
   * Public Method (Tests.checkConsoleSet)
   * -------------------------------------------------
   * @desc Checks aIV.console.set method.
   * @type {function}
   */
  Tests.checkConsoleSet = function() {

    /** @type {!TestResults} */
    var results;
    /** @type {string} */
    var msg;
    /** @type {!Object} */
    var tests;

    results = new TestResults('Tests.checkConsoleSet');

    // Setup for the tests
    aIV.console.set({
      turnOffMethods: 'all',
      addBreakpoints: 'all'
    });
    tests = {
      all : aIV.console.create('Tests.checkConsoleSet.all'),
      none: aIV.console.create({
        classTitle    : 'Tests.checkConsoleSet.none',
        turnOffMethods: 'none',
        addBreakpoints: 'none'
      })
    };

    // Run the tests
    if (tests.all.getMethod('start') ||
        tests.all.getMethod('args')  ||
        tests.all.getMethod('fail')  ||
        tests.all.getMethod('group') ||
        tests.all.getMethod('state') ||
        tests.all.getMethod('misc')) {
      msg = 'Tests.checkConsoleSet.all failed: no types should be on';
      results.addError(msg);
    }

    if (!tests.all.getBreakpoint('start') ||
        !tests.all.getBreakpoint('args')  ||
        !tests.all.getBreakpoint('fail')  ||
        !tests.all.getBreakpoint('group') ||
        !tests.all.getBreakpoint('state') ||
        !tests.all.getBreakpoint('misc')) {
      msg = 'Tests.checkConsoleSet.all failed: all debuggers should be on';
      results.addError(msg);
    }

    if (!tests.none.getMethod('start') ||
        !tests.none.getMethod('args')  ||
        !tests.none.getMethod('fail')  ||
        !tests.none.getMethod('group') ||
        !tests.none.getMethod('state') ||
        !tests.none.getMethod('misc')) {
      msg = 'Tests.checkConsoleSet.none failed: all types should be on';
      results.addError(msg);
    }

    if (tests.none.getBreakpoint('start') ||
        tests.none.getBreakpoint('args')  ||
        tests.none.getBreakpoint('fail')  ||
        tests.none.getBreakpoint('group') ||
        tests.none.getBreakpoint('state') ||
        tests.none.getBreakpoint('misc')) {
      msg = 'Tests.checkConsoleSet.none failed: no debuggers should be on';
      results.addError(msg);
    }

    // Reset the config before continuing
    //aIV.console.reset();
    aIV.console.set({
      turnOffMethods: '',
      addBreakpoints: 'none'
    });

    // Save the results
    app.results.push(results);
  };

  // Deep freeze Tests
  (function(Tests) {

    /** @type {string} */
    var prop;

    Object.freeze(Tests);

    for (prop in Tests) {
      if ( hasOwnProp(Tests, prop) ) {
        Object.freeze(Tests[ prop ]);
      }
    }
  })(Tests);

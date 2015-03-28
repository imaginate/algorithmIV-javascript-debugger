  /**
   * -----------------------------------------------------
   * Public Class (Tests)
   * -----------------------------------------------------
   * @desc The tests to run.
   * @struct
   */
  var Tests = {};

  /**
   * -------------------------------------------------
   * Public Method (Tests.checkClassTitle)
   * -------------------------------------------------
   * @desc Checks the setting of the classTitle property.
   * @type {function()}
   */
  Tests.checkClassTitle = function() {

    /** @type {TestResults} */
    var results;
    /** @type {boolean} */
    var result;
    /** @type {string} */
    var msg;
    /** @type {Object} */
    var tests;

    results = new TestResults('checkClassTitle');
    Object.freeze(results);

    result = true;

    // Setup for the tests
    tests = {
      prop: aIV.debug({ classTitle: 'Tests.checkClassTitle.prop' }),
      str : aIV.debug('Tests.checkClassTitle.str'),
      none: aIV.debug()
    };

    // Run the tests
    if (tests.prop.classTitle !== 'Tests.checkClassTitle.prop.') {
      result = false;
      msg = 'Tests.checkClassTitle evaluation failed, ';
      msg += tests.prop.classTitle + ' !== Tests.checkClassTitle.prop.';
      results.addError(msg);
    }

    if (tests.str.classTitle !== 'Tests.checkClassTitle.str.') {
      result = false;
      msg = 'Tests.checkClassTitle evaluation failed, ';
      msg += tests.str.classTitle + ' !== Tests.checkClassTitle.str.';
      results.addError(msg);
    }

    if (tests.none.classTitle !== 'unknown.') {
      result = false;
      msg = 'Tests.checkClassTitle evaluation failed, ';
      msg += tests.none.classTitle + ' !== unknown.';
      results.addError(msg);
    }

    // Save the results
    results.setResult(result);
    app.results.push(results);
  };

  /**
   * -------------------------------------------------
   * Public Method (Tests.checkTurnOffTypes)
   * -------------------------------------------------
   * @desc Checks the setting of the turnOffTypes param.
   * @type {function()}
   */
  Tests.checkTurnOffTypes = function() {

    /** @type {TestResults} */
    var results;
    /** @type {boolean} */
    var result;
    /** @type {string} */
    var msg;
    /** @type {Object} */
    var tests;

    results = new TestResults('checkTurnOffTypes');
    Object.freeze(results);

    result = true;

    // Setup for the tests
    tests = {
      all: aIV.debug({
        classTitle  : 'checkTurnOffTypes.tests.all',
        turnOffTypes: 'all'
      }),
      str: aIV.debug({
        classTitle  : 'checkTurnOffTypes.tests.str',
        turnOffTypes: 'fail state'
      }),
      arr: aIV.debug({
        classTitle  : 'checkTurnOffTypes.tests.arr',
        turnOffTypes: [ 'fail', 'state' ]
      })
    };

    // Run the tests
    if (tests.all.getType('start') ||
        tests.all.getType('args')  ||
        tests.all.getType('fail')  ||
        tests.all.getType('group') ||
        tests.all.getType('state') ||
        tests.all.getType('misc')) {
      result = false;
      msg = 'The turnOffTypes \'all\' value failed to turn ';
      msg += 'off all the types.';
      results.addError(msg);
    }

    if (!tests.str.getType('start') ||
        !tests.str.getType('args')  ||
        tests.str.getType('fail')   ||
        !tests.str.getType('group') ||
        tests.str.getType('state')  ||
        !tests.str.getType('misc')) {
      result = false;
      msg = 'The turnOffTypes \'fail state\' value failed to turn ';
      msg += 'off the correct types.';
      results.addError(msg);
    }

    if (!tests.arr.getType('start') ||
        !tests.arr.getType('args')  ||
        tests.arr.getType('fail')   ||
        !tests.arr.getType('group') ||
        tests.arr.getType('state')  ||
        !tests.arr.getType('misc')) {
      result = false;
      msg = 'The turnOffTypes [ \'fail\', \'state\' ] value failed to ';
      msg += 'turn off the correct types.';
      results.addError(msg);
    }

    // Save the results
    results.setResult(result);
    app.results.push(results);
  };

  /**
   * -------------------------------------------------
   * Public Method (Tests.checkTurnOnDebuggers)
   * -------------------------------------------------
   * @desc Checks the setting of the turnOnDebuggers param.
   * @type {function()}
   */
  Tests.checkTurnOnDebuggers = function() {

    /** @type {TestResults} */
    var results;
    /** @type {boolean} */
    var result;
    /** @type {string} */
    var msg;
    /** @type {Object} */
    var tests;

    results = new TestResults('checkTurnOnDebuggers');
    Object.freeze(results);

    result = true;

    // Setup for the tests
    tests = {
      all: aIV.debug({
        classTitle     : 'checkTurnOnDebuggers.tests.all',
        turnOnDebuggers: 'all'
      }),
      str: aIV.debug({
        classTitle     : 'checkTurnOnDebuggers.tests.str',
        turnOnDebuggers: 'fail state'
      }),
      arr: aIV.debug({
        classTitle     : 'checkTurnOnDebuggers.tests.arr',
        turnOnDebuggers: [ 'fail', 'state' ]
      })
    };

    // Run the tests
    if (!tests.all.getBugger('start') ||
        !tests.all.getBugger('args')  ||
        !tests.all.getBugger('fail')  ||
        !tests.all.getBugger('group') ||
        !tests.all.getBugger('state') ||
        !tests.all.getBugger('misc')) {
      result = false;
      msg = 'The turnOnDebuggers \'all\' value failed to turn ';
      msg += 'on all the debuggers.';
      results.addError(msg);
    }

    if (tests.str.getBugger('start')  ||
        tests.str.getBugger('args')   ||
        !tests.str.getBugger('fail')  ||
        tests.str.getBugger('group')  ||
        !tests.str.getBugger('state') ||
        tests.str.getBugger('misc')) {
      result = false;
      msg = 'The turnOnDebuggers \'fail state\' value failed to turn ';
      msg += 'on the correct debuggers.';
      results.addError(msg);
    }

    if (tests.str.getBugger('start')  ||
        tests.str.getBugger('args')   ||
        !tests.str.getBugger('fail')  ||
        tests.str.getBugger('group')  ||
        !tests.str.getBugger('state') ||
        tests.arr.getBugger('misc')) {
      result = false;
      msg = 'The turnOnDebuggers [ \'fail\', \'state\' ] value failed to ';
      msg += 'turn on the correct debuggers.';
      results.addError(msg);
    }

    // Save the results
    results.setResult(result);
    app.results.push(results);
  };

  /**
   * -------------------------------------------------
   * Public Method (Tests.checkInstances)
   * -------------------------------------------------
   * @desc Checks .
   * @type {function()}
   */
  Tests.checkInstances = function() {

    /** @type {TestResults} */
    var results;
    /** @type {string} */
    var choice;
    /** @type {string} */
    var msg;
    /** @type {Object} */
    var tests;

    results = new TestResults('checkInstances');
    Object.freeze(results);

    // Setup for the tests
    tests = {
      first : aIV.debug('checkInstances.tests'),
      second: aIV.debug({
        classTitle  : 'checkInstances.tests',
        turnOffTypes: 'misc'
      })
    };

    // Run the tests
    choice = 'Did test1 and test2 get logged?';
    msg = 'checkInstances.tests.first failed.';
    app.addChoice(choice, results, msg, function() {
      tests.first.misc('test1', 'Test 1 - This log should be shown.');
      tests.second.misc('test2', 'Test 2 - This log should be shown.');
    });

    choice = 'Did test3 and test4 NOT get logged?';
    msg = 'checkInstances.tests.second failed.';
    app.addChoice(choice, results, msg, function() {
      tests.first.setType('misc', false);
      tests.first.misc('test3', 'Test 3 - This log should NOT be shown.');
      tests.second.misc('test4', 'Test 4 - This log should NOT be shown.');
    });

    // Save the results
    app.results.push(results);
  };

  Object.freeze(Tests);

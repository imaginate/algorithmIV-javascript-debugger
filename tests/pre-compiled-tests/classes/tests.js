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

    results = new TestResults('Tests.checkClassTitle');
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
      msg = 'Tests.checkClassTitle evaluation failed: ';
      msg += tests.prop.classTitle + ' !== Tests.checkClassTitle.prop.';
      results.addError(msg);
    }

    if (tests.str.classTitle !== 'Tests.checkClassTitle.str.') {
      result = false;
      msg = 'Tests.checkClassTitle evaluation failed: ';
      msg += tests.str.classTitle + ' !== Tests.checkClassTitle.str.';
      results.addError(msg);
    }

    if (tests.none.classTitle !== 'unknown.') {
      result = false;
      msg = 'Tests.checkClassTitle evaluation failed: ';
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

    results = new TestResults('Tests.checkTurnOffTypes');
    Object.freeze(results);

    result = true;

    // Setup for the tests
    tests = {
      all: aIV.debug({
        classTitle  : 'Tests.checkTurnOffTypes.all',
        turnOffTypes: 'all'
      }),
      str: aIV.debug({
        classTitle  : 'Tests.checkTurnOffTypes.str',
        turnOffTypes: 'fail state'
      }),
      arr: aIV.debug({
        classTitle  : 'Tests.checkTurnOffTypes.arr',
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
      msg = 'Tests.turnOffTypes.all failed: no types should be on';
      results.addError(msg);
    }

    if (!tests.str.getType('start') ||
        !tests.str.getType('args')  ||
        tests.str.getType('fail')   ||
        !tests.str.getType('group') ||
        tests.str.getType('state')  ||
        !tests.str.getType('misc')) {
      result = false;
      msg = "Tests.turnOffTypes.str failed: only 'fail' and 'state'";
      msg += ' should be off';
      results.addError(msg);
    }

    if (!tests.arr.getType('start') ||
        !tests.arr.getType('args')  ||
        tests.arr.getType('fail')   ||
        !tests.arr.getType('group') ||
        tests.arr.getType('state')  ||
        !tests.arr.getType('misc')) {
      result = false;
      msg = "Tests.turnOffTypes.arr failed: only 'fail' and 'state'";
      msg += ' should be off';
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

    results = new TestResults('Tests.checkTurnOnDebuggers');
    Object.freeze(results);

    result = true;

    // Setup for the tests
    tests = {
      all: aIV.debug({
        classTitle     : 'Tests.checkTurnOnDebuggers.all',
        turnOnDebuggers: 'all'
      }),
      str: aIV.debug({
        classTitle     : 'Tests.checkTurnOnDebuggers.str',
        turnOnDebuggers: 'fail state'
      }),
      arr: aIV.debug({
        classTitle     : 'Tests.checkTurnOnDebuggers.arr',
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
      msg = 'Tests.turnOnDebuggers.all failed: no debuggers should be off';
      results.addError(msg);
    }

    if (tests.str.getBugger('start')  ||
        tests.str.getBugger('args')   ||
        !tests.str.getBugger('fail')  ||
        tests.str.getBugger('group')  ||
        !tests.str.getBugger('state') ||
        tests.str.getBugger('misc')) {
      result = false;
      msg = "Tests.turnOnDebuggers.str failed: only 'fail' and 'state'";
      msg += ' should be on';
      results.addError(msg);
    }

    if (tests.str.getBugger('start')  ||
        tests.str.getBugger('args')   ||
        !tests.str.getBugger('fail')  ||
        tests.str.getBugger('group')  ||
        !tests.str.getBugger('state') ||
        tests.arr.getBugger('misc')) {
      result = false;
      msg = "Tests.turnOnDebuggers.arr failed: only 'fail' and 'state'";
      msg += ' should be on';
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

    results = new TestResults('Tests.checkInstances');
    Object.freeze(results);

    // Setup for the tests
    tests = {
      first : aIV.debug('Tests.checkInstances'),
      second: aIV.debug({
        classTitle  : 'Tests.checkInstances',
        turnOffTypes: 'misc'
      })
    };

    // Run the tests
    choice = 'Instance Test 1 and 2 should have been logged to the console.';
    msg = 'checkInstances.tests.first failed.';
    app.addChoice(choice, results, msg, function() {
      tests.first.misc('test1', 'Instance Test 1');
      tests.second.misc('test2', 'Instance Test 2');
    });

    choice = 'Instance Test 3 and 4 should NOT have been logged to the console.';
    msg = 'checkInstances.tests.second failed.';
    app.addChoice(choice, results, msg, function() {
      tests.first.setType('misc', false);
      tests.first.misc('test3', 'Instance Test 3');
      tests.second.misc('test4', 'Instance Test 4');
    });

    // Save the results
    app.results.push(results);
  };

  Object.freeze(Tests);

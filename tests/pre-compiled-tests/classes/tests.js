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
    /** @type {string} */
    var msg;
    /** @type {Object} */
    var tests;

    results = new TestResults('Tests.checkClassTitle');
    Object.freeze(results);

    // Setup for the tests
    tests = {
      prop: aIV.debug({ classTitle: 'Tests.checkClassTitle.prop' }),
      str : aIV.debug('Tests.checkClassTitle.str'),
      none: aIV.debug()
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
   * Public Method (Tests.checkTurnOffTypes)
   * -------------------------------------------------
   * @desc Checks the setting of the turnOffTypes param.
   * @type {function()}
   */
  Tests.checkTurnOffTypes = function() {

    /** @type {TestResults} */
    var results;
    /** @type {string} */
    var msg;
    /** @type {Object} */
    var tests;

    results = new TestResults('Tests.checkTurnOffTypes');
    Object.freeze(results);

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
      msg = 'Tests.turnOffTypes.all failed: no types should be on';
      results.addError(msg);
    }

    if (!tests.str.getType('start') ||
        !tests.str.getType('args')  ||
        tests.str.getType('fail')   ||
        !tests.str.getType('group') ||
        tests.str.getType('state')  ||
        !tests.str.getType('misc')) {
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
      msg = "Tests.turnOffTypes.arr failed: only 'fail' and 'state'";
      msg += ' should be off';
      results.addError(msg);
    }

    // Save the results
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
    /** @type {string} */
    var msg;
    /** @type {Object} */
    var tests;

    results = new TestResults('Tests.checkTurnOnDebuggers');
    Object.freeze(results);

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
      msg = 'Tests.turnOnDebuggers.all failed: no debuggers should be off';
      results.addError(msg);
    }

    if (tests.str.getBugger('start')  ||
        tests.str.getBugger('args')   ||
        !tests.str.getBugger('fail')  ||
        tests.str.getBugger('group')  ||
        !tests.str.getBugger('state') ||
        tests.str.getBugger('misc')) {
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
      msg = "Tests.turnOnDebuggers.arr failed: only 'fail' and 'state'";
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
   * @desc Checks that instances are not created twice for the
   *   same class.
   * @type {function()}
   */
  Tests.checkInstances = function() {

    /** @type {TestResults} */
    var results;
    /** @type {string} */
    var choiceMsg;
    /** @type {string} */
    var errorMsg;
    /** @type {Object} */
    var tests;
    /** @type {boolean} */
    var pass;

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
    pass = tests.first.misc('test1', 'Instance Test 1');
    pass = pass && tests.second.misc('test2', 'Instance Test 2');
    if (!pass) {
      errorMsg = 'Tests.checkInstances failed: A misc log failed when turned on';
      results.addError(errorMsg);
    }

    tests.first.setType('misc', false);
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
   * @type {function()}
   */
  Tests.checkStart = function() {

    /** @type {TestResults} */
    var results;
    /** @type {string} */
    var choiceMsg;
    /** @type {string} */
    var errorMsg;
    /** @type {Object} */
    var tests;
    /** @type {boolean} */
    var pass;

    results = new TestResults('Tests.checkStart');
    Object.freeze(results);

    // Setup for the tests
    tests = aIV.debug('Tests.checkStart');

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
   * @type {function()}
   */
  Tests.checkArgs = function() {

    /** @type {TestResults} */
    var results;
    /** @type {string} */
    var choiceMsg;
    /** @type {string} */
    var errorMsg;
    /** @type {Object} */
    var tests;
    /** @type {boolean} */
    var pass;
    /** @type {boolean} */
    var fail;
    /** @type {HTMLElement} */
    var elem;
    /** @type {Object} */
    var testMap;

    elem = document.createElement('div');

    results = new TestResults('Tests.checkArgs');
    Object.freeze(results);

    // Setup for the tests
    tests = aIV.debug('Tests.checkArgs');

    // Run the tests on 'string', 'number', 'boolean', 'object',
    // 'function', 'elem', 'undefined', 'array', 'strings', 
    // 'numbers', 'booleans', 'objects', 'functions', 'arrays',
    // 'elems', 'stringMap', 'numberMap', 'booleanMap', 'objectMap',
    // 'functionMap', 'arrayMap', 'elemMap', null, '!', '|', and '='

    // String check
    pass = tests.args('testMethod', 's', 'string');
    pass = pass && tests.args([ 'testMethod', 's', 'string' ]);
    fail = tests.args('testMethod', 1, 'string');
    fail = fail || tests.args([ 'testMethod', 1, 'string' ]);
    if (pass || !fail) {
      errorMsg = 'Tests.checkArgs failed: string check failed';
      results.addError(errorMsg);
    }

    // Number check
    pass = tests.args('testMethod', 1, 'number');
    pass = pass && tests.args([ 'testMethod', 1, 'number' ]);
    fail = tests.args('testMethod', '1', 'number');
    fail = fail || tests.args([ 'testMethod', '1', 'number' ]);
    if (pass || !fail) {
      errorMsg = 'Tests.checkArgs failed: number check failed';
      results.addError(errorMsg);
    }

    // Boolean check
    pass = tests.args('testMethod', true, 'boolean');
    pass = pass && tests.args([ 'testMethod', false, 'boolean' ]);
    fail = tests.args('testMethod', 's', 'boolean');
    fail = fail || tests.args([ 'testMethod', 's', 'boolean' ]);
    if (pass || !fail) {
      errorMsg = 'Tests.checkArgs failed: boolean check failed';
      results.addError(errorMsg);
    }

    // Object check
    pass = tests.args('testMethod', {}, 'object');
    pass = pass && tests.args([ 'testMethod', {}, 'object' ]);
    fail = tests.args('testMethod', 's', 'object');
    fail = fail || tests.args([ 'testMethod', 1, 'object' ]);
    if (pass || !fail) {
      errorMsg = 'Tests.checkArgs failed: object check failed';
      results.addError(errorMsg);
    }

    // Function check
    pass = tests.args('testMethod', function(){}, 'function');
    pass = pass && tests.args([ 'testMethod', function(){}, 'function' ]);
    fail = tests.args('testMethod', 's', 'function');
    fail = fail || tests.args([ 'testMethod', {}, 'function' ]);
    if (pass || !fail) {
      errorMsg = 'Tests.checkArgs failed: function check failed';
      results.addError(errorMsg);
    }

    // Element check
    pass = tests.args('testMethod', elem, 'elem');
    pass = pass && tests.args([ 'testMethod',  elem, 'elem' ]);
    fail = tests.args('testMethod', {}, 'elem');
    fail = fail || tests.args([ 'testMethod', 5, 'elem' ]);
    if (pass || !fail) {
      errorMsg = 'Tests.checkArgs failed: elem check failed';
      results.addError(errorMsg);
    }

    // Undefined check
    pass = tests.args('testMethod', undefined, 'undefined');
    pass = pass && tests.args([ 'testMethod', undefined, 'undefined' ]);
    fail = tests.args('testMethod', {}, 'undefined');
    fail = fail || tests.args([ 'testMethod', 's', 'undefined' ]);
    if (pass || !fail) {
      errorMsg = 'Tests.checkArgs failed: undefined check failed';
      results.addError(errorMsg);
    }

    // Array check
    pass = tests.args('testMethod', [], 'array');
    pass = pass && tests.args([ 'testMethod', [], 'array' ]);
    fail = tests.args('testMethod', {}, 'array');
    fail = fail || tests.args([ 'testMethod', 1, 'array' ]);
    if (pass || !fail) {
      errorMsg = 'Tests.checkArgs failed: array check failed';
      results.addError(errorMsg);
    }

    // Strings check
    pass = tests.args('testMethod', [ 's' ], 'strings');
    pass = pass && tests.args([ 'testMethod', [ 's' ], 'strings' ]);
    fail = tests.args('testMethod', [ 1 ], 'strings');
    fail = fail || tests.args([ 'testMethod', {}, 'strings' ]);
    if (pass || !fail) {
      errorMsg = 'Tests.checkArgs failed: strings check failed';
      results.addError(errorMsg);
    }

    // Numbers check
    pass = tests.args('testMethod', [ 1, 5 ], 'numbers');
    pass = pass && tests.args([ 'testMethod', [], 'numbers' ]);
    fail = tests.args('testMethod', [ 1, 's' ], 'numbers');
    fail = fail || tests.args([ 'testMethod', {}, 'numbers' ]);
    if (pass || !fail) {
      errorMsg = 'Tests.checkArgs failed: numbers check failed';
      results.addError(errorMsg);
    }

    // Booleans check
    pass = tests.args('testMethod', [ false ], 'booleans');
    pass = pass && tests.args([ 'testMethod', [ true ], 'booleans' ]);
    fail = tests.args('testMethod', [ 's' ], 'booleans');
    fail = fail || tests.args([ 'testMethod', {}, 'booleans' ]);
    if (pass || !fail) {
      errorMsg = 'Tests.checkArgs failed: booleans check failed';
      results.addError(errorMsg);
    }

    // Functions check
    pass = tests.args('testMethod', [ function(){} ], 'functions');
    pass = pass && tests.args([ 'testMethod', [ function(){} ], 'functions' ]);
    fail = tests.args('testMethod', [ function(){}, 1 ], 'functions');
    fail = fail || tests.args([ 'testMethod', [ {} ], 'functions' ]);
    if (pass || !fail) {
      errorMsg = 'Tests.checkArgs failed: functions check failed';
      results.addError(errorMsg);
    }

    // Objects check
    pass = tests.args('testMethod', [ {} ], 'objects');
    pass = pass && tests.args([ 'testMethod', [ {} ], 'objects' ]);
    fail = tests.args('testMethod', [ 1 ], 'objects');
    fail = fail || tests.args([ 'testMethod', {}, 'objects' ]);
    if (pass || !fail) {
      errorMsg = 'Tests.checkArgs failed: objects check failed';
      results.addError(errorMsg);
    }

    // Arrays check
    pass = tests.args('testMethod', [ [ 1 ] ], 'arrays');
    pass = pass && tests.args([ 'testMethod', [ [] ], 'arrays' ]);
    fail = tests.args('testMethod', [ [], 1 ], 'arrays');
    fail = fail || tests.args([ 'testMethod', [ {} ], 'arrays' ]);
    if (pass || !fail) {
      errorMsg = 'Tests.checkArgs failed: arrays check failed';
      results.addError(errorMsg);
    }

    // Elements check
    pass = tests.args('testMethod', [ elem ], 'elems');
    pass = pass && tests.args([ 'testMethod',  [ elem ], 'elems' ]);
    fail = tests.args('testMethod', [ {} ], 'elems');
    fail = fail || tests.args([ 'testMethod', 5, 'elems' ]);
    if (pass || !fail) {
      errorMsg = 'Tests.checkArgs failed: elems check failed';
      results.addError(errorMsg);
    }

    // String Map check
    testMap = { slot1: 'str', slot2: 'str' };
    pass = tests.args('testMethod', testMap, 'stringMap');
    pass = pass && tests.args([ 'testMethod',  {}, 'stringMap' ]);
    testMap = { slot1: 'str', slot2: 1 };
    fail = tests.args('testMethod', testMap, 'stringMap');
    fail = fail || tests.args([ 'testMethod', 5, 'stringMap' ]);
    if (pass || !fail) {
      errorMsg = 'Tests.checkArgs failed: stringMap check failed';
      results.addError(errorMsg);
    }

    // Number Map check
    testMap = { slot1: 1, slot2: 5 };
    pass = tests.args('testMethod', testMap, 'numberMap');
    pass = pass && tests.args([ 'testMethod',  {}, 'numberMap' ]);
    testMap = { slot1: 5, slot2: 'str' };
    fail = tests.args('testMethod', testMap, 'numberMap');
    fail = fail || tests.args([ 'testMethod', 5, 'numberMap' ]);
    if (pass || !fail) {
      errorMsg = 'Tests.checkArgs failed: numberMap check failed';
      results.addError(errorMsg);
    }

    // Boolean Map check
    testMap = { slot1: false, slot2: true };
    pass = tests.args('testMethod', testMap, 'booleanMap');
    pass = pass && tests.args([ 'testMethod',  {}, 'booleanMap' ]);
    testMap = { slot1: true, slot2: 'str' };
    fail = tests.args('testMethod', testMap, 'booleanMap');
    fail = fail || tests.args([ 'testMethod', 5, 'booleanMap' ]);
    if (pass || !fail) {
      errorMsg = 'Tests.checkArgs failed: booleanMap check failed';
      results.addError(errorMsg);
    }

    // Object Map check
    testMap = { slot1: {}, slot2: {} };
    pass = tests.args('testMethod', testMap, 'objectMap');
    pass = pass && tests.args([ 'testMethod',  {}, 'objectMap' ]);
    testMap = { slot1: {}, slot2: 'str' };
    fail = tests.args('testMethod', testMap, 'objectMap');
    fail = fail || tests.args([ 'testMethod', 5, 'objectMap' ]);
    if (pass || !fail) {
      errorMsg = 'Tests.checkArgs failed: objectMap check failed';
      results.addError(errorMsg);
    }

    // Function Map check
    testMap = { slot1: function(){}, slot2: function(){} };
    pass = tests.args('testMethod', testMap, 'functionMap');
    pass = pass && tests.args([ 'testMethod',  {}, 'functionMap' ]);
    testMap = { slot1: {}, slot2: function(){} };
    fail = tests.args('testMethod', testMap, 'functionMap');
    fail = fail || tests.args([ 'testMethod', 5, 'functionMap' ]);
    if (pass || !fail) {
      errorMsg = 'Tests.checkArgs failed: functionMap check failed';
      results.addError(errorMsg);
    }

    // Array Map check
    testMap = { slot1: [ 1 ], slot2: [] };
    pass = tests.args('testMethod', testMap, 'arrayMap');
    pass = pass && tests.args([ 'testMethod',  {}, 'arrayMap' ]);
    testMap = { slot1: {}, slot2: [] };
    fail = tests.args('testMethod', testMap, 'arrayMap');
    fail = fail || tests.args([ 'testMethod', 5, 'arrayMap' ]);
    if (pass || !fail) {
      errorMsg = 'Tests.checkArgs failed: arrayMap check failed';
      results.addError(errorMsg);
    }

    // Element Map check
    testMap = { slot1: elem, slot2: elem };
    pass = tests.args('testMethod', testMap, 'elemMap');
    pass = pass && tests.args([ 'testMethod',  {}, 'elemMap' ]);
    testMap = { slot1: {}, slot2: elem };
    fail = tests.args('testMethod', testMap, 'elemMap');
    fail = fail || tests.args([ 'testMethod', 5, 'elemMap' ]);
    if (pass || !fail) {
      errorMsg = 'Tests.checkArgs failed: elemMap check failed';
      results.addError(errorMsg);
    }

    // Null check
    pass = tests.args('testMethod', 's', 'string');
    pass = pass && tests.args('testMethod', null, 'string');
    pass = pass && tests.args([ 'testMethod', 's', 'string' ]);
    pass = pass && tests.args([ 'testMethod', null, 'string' ]);
    fail = tests.args('testMethod', 1, 'string');
    fail = fail || tests.args('testMethod', undefined, 'string');
    if (pass || !fail) {
      errorMsg = 'Tests.checkArgs failed: null check failed';
      results.addError(errorMsg);
    }

    // ! check
    pass = tests.args('testMethod', 's', '!string');
    pass = pass && tests.args([ 'testMethod', 's', '!string' ]);
    fail = tests.args('testMethod', null, '!string');
    fail = fail || tests.args([ 'testMethod', null, '!string' ]);
    if (pass || !fail) {
      errorMsg = 'Tests.checkArgs failed: ! check failed';
      results.addError(errorMsg);
    }

    // | check
    pass = tests.args('testMethod', 's', 'string|number');
    pass = pass && tests.args([ 'testMethod', 1, 'string|number' ]);
    fail = tests.args('testMethod', true, 'string|number');
    fail = fail || tests.args([ 'testMethod', {}, 'string|number' ]);
    if (pass || !fail) {
      errorMsg = 'Tests.checkArgs failed: | check failed';
      results.addError(errorMsg);
    }

    // = check
    pass = tests.args('testMethod', undefined, 'number=');
    pass = pass && tests.args([ 'testMethod', undefined, 'number=' ]);
    fail = tests.args('testMethod', {}, 'number=');
    fail = fail || tests.args([ 'testMethod', 's', 'number=' ]);
    if (pass || !fail) {
      errorMsg = 'Tests.checkArgs failed: = check failed';
      results.addError(errorMsg);
    }

    // Check the log message
    choiceMsg = 'Verify that the args log message is correct. The following ';
    choiceMsg += 'message should have been logged to the console:';
    choiceMsg += ' "ARGS: Tests.checkArgs.testMethod() | Error: Incorrect';
    choiceMsg += ' argument data type."';
    errorMsg = 'Tests.checkArgs failed: Log message incorrect';
    app.addChoice(choiceMsg, results, errorMsg, function() {
      tests.args('testMethod', 1, 'string');
    });

    // Save the results
    app.results.push(results);
  };

  /**
   * -------------------------------------------------
   * Public Method (Tests.checkFail)
   * -------------------------------------------------
   * @desc Checks Debug.fail method.
   * @type {function()}
   */
  Tests.checkFail = function() {

    /** @type {TestResults} */
    var results;
    /** @type {string} */
    var choiceMsg;
    /** @type {string} */
    var errorMsg;
    /** @type {Object} */
    var tests;
    /** @type {boolean} */
    var pass;
    /** @type {boolean} */
    var fail;
    /** @type {function(): boolean} */
    var testFunction;

    results = new TestResults('Tests.checkFail');
    Object.freeze(results);

    // Setup for the tests
    tests = aIV.debug('Tests.checkFail');

    // Run the tests
    pass = tests.fail('testMethod', true, 'Pass');
    pass = pass && tests.fail([ 'testMethod', true, 'Pass' ]);
    fail = tests.fail('testMethod', false, 'Fail');
    fail = fail || tests.fail([ 'testMethod', false, 'Fail' ]);
    if (pass || !fail) {
      errorMsg = 'Tests.checkFail failed: boolean check failed';
      results.addError(errorMsg);
    }

    pass = tests.fail('testMethod', 1, 'Pass');
    pass = pass && tests.fail([ 'testMethod', {}, 'Pass' ]);
    fail = tests.fail('testMethod', 0, 'Fail');
    fail = fail || tests.fail([ 'testMethod', null, 'Fail' ]);
    if (pass || !fail) {
      errorMsg = 'Tests.checkFail failed: conversion check failed';
      results.addError(errorMsg);
    }

    testFunction = function() { return true; };
    pass = tests.fail('testMethod', testFunction(), 'Pass');
    pass = pass && tests.fail([ 'testMethod', testFunction, 'Pass' ]);
    testFunction = function() { return false; };
    fail = tests.fail('testMethod', testFunction(), 'Fail');
    fail = fail || tests.fail([ 'testMethod', testFunction, 'Fail' ]);
    if (pass || !fail) {
      errorMsg = 'Tests.checkFail failed: function check failed';
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
   * @type {function()}
   */
  Tests.checkGroup = function() {

    /** @type {TestResults} */
    var results;
    /** @type {string} */
    var choiceMsg;
    /** @type {string} */
    var errorMsg;
    /** @type {Object} */
    var tests;

    results = new TestResults('Tests.checkGroup');
    Object.freeze(results);

    // Setup for the tests
    tests = aIV.debug('Tests.checkGroup');

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
   * @type {function()}
   */
  Tests.checkState = function() {

    /** @type {TestResults} */
    var results;
    /** @type {string} */
    var choiceMsg;
    /** @type {string} */
    var errorMsg;
    /** @type {Object} */
    var tests;
    /** @type {boolean} */
    var pass;

    results = new TestResults('Tests.checkState');
    Object.freeze(results);

    // Setup for the tests
    tests = aIV.debug('Tests.checkState');

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
   * @type {function()}
   */
  Tests.checkMisc = function() {

    /** @type {TestResults} */
    var results;
    /** @type {string} */
    var choiceMsg;
    /** @type {string} */
    var errorMsg;
    /** @type {Object} */
    var tests;
    /** @type {boolean} */
    var pass;

    results = new TestResults('Tests.checkMisc');
    Object.freeze(results);

    // Setup for the tests
    tests = aIV.debug('Tests.checkMisc');

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
   * Public Method (Tests.checkTurnOn)
   * -------------------------------------------------
   * @desc Checks Debug.turnOn method.
   * @type {function()}
   */
  Tests.checkTurnOn = function() {

    /** @type {TestResults} */
    var results;
    /** @type {boolean} */
    var before;
    /** @type {boolean} */
    var after;
    /** @type {string} */
    var errorMsg;
    /** @type {Object} */
    var tests;

    results = new TestResults('Tests.checkTurnOn');
    Object.freeze(results);

    // Setup for the tests
    tests = aIV.debug({
      classTitle  : 'Tests.checkTurnOn',
      turnOffTypes: 'all'
    });

    // Run the tests
    before = tests.getType('misc');
    tests.turnOn('misc');
    after = tests.getType('misc');
    if (before || !after) {
      errorMsg = 'debug.turnOn failed to turn on one type';
      results.addError(errorMsg);
    }
    tests.setType('misc', false);

    before = tests.getType('start') && tests.getType('misc');
    tests.turnOn('start misc');
    after = tests.getType('start') && tests.getType('misc');
    if (before || !after) {
      errorMsg = 'debug.turnOn failed to turn on two types with a string';
      results.addError(errorMsg);
    }
    tests.setType('all', false);

    before = tests.getType('start') && tests.getType('misc');
    tests.turnOn([ 'start', 'misc' ]);
    after = tests.getType('start') && tests.getType('misc');
    if (before || !after) {
      errorMsg = 'debug.turnOn failed to turn on two types with an array';
      results.addError(errorMsg);
    }
    tests.setType('all', false);

    before = tests.getType('start') && tests.getType('misc');
    tests.turnOn('all');
    after = tests.getType('start') && tests.getType('misc');
    if (before || !after) {
      errorMsg = 'debug.turnOn failed to turn on all types';
      results.addError(errorMsg);
    }

    // Save the results
    app.results.push(results);
  };

  /**
   * -------------------------------------------------
   * Public Method (Tests.checkTurnOff)
   * -------------------------------------------------
   * @desc Checks Debug.turnOff method.
   * @type {function()}
   */
  Tests.checkTurnOff = function() {

    /** @type {TestResults} */
    var results;
    /** @type {boolean} */
    var before;
    /** @type {boolean} */
    var after;
    /** @type {string} */
    var errorMsg;
    /** @type {Object} */
    var tests;

    results = new TestResults('Tests.checkTurnOff');
    Object.freeze(results);

    // Setup for the tests
    tests = aIV.debug('Tests.checkTurnOff');

    // Run the tests
    before = tests.getType('misc');
    tests.turnOff('misc');
    after = tests.getType('misc');
    if (!before || after) {
      errorMsg = 'debug.turnOff failed to turn off one type';
      results.addError(errorMsg);
    }
    tests.setType('misc', true);

    before = tests.getType('start') && tests.getType('misc');
    tests.turnOff('start misc');
    after = tests.getType('start') && tests.getType('misc');
    if (!before || after) {
      errorMsg = 'debug.turnOff failed to turn off two types with a string';
      results.addError(errorMsg);
    }
    tests.setType('all', true);

    before = tests.getType('start') && tests.getType('misc');
    tests.turnOff([ 'start', 'misc' ]);
    after = tests.getType('start') && tests.getType('misc');
    if (!before || after) {
      errorMsg = 'debug.turnOff failed to turn off two types with an array';
      results.addError(errorMsg);
    }
    tests.setType('all', true);

    before = tests.getType('start') && tests.getType('misc');
    tests.turnOff('all');
    after = tests.getType('start') && tests.getType('misc');
    if (!before || after) {
      errorMsg = 'debug.turnOff failed to turn off all types';
      results.addError(errorMsg);
    }

    // Save the results
    app.results.push(results);
  };

  /**
   * -------------------------------------------------
   * Public Method (Tests.checkTurnOnDebugger)
   * -------------------------------------------------
   * @desc Checks Debug.turnOnDebugger method.
   * @type {function()}
   */
  Tests.checkTurnOnDebugger = function() {

    /** @type {TestResults} */
    var results;
    /** @type {boolean} */
    var before;
    /** @type {boolean} */
    var after;
    /** @type {string} */
    var errorMsg;
    /** @type {Object} */
    var tests;

    results = new TestResults('Tests.checkTurnOnDebugger');
    Object.freeze(results);

    // Setup for the tests
    tests = aIV.debug('Tests.checkTurnOnDebugger');

    // Run the tests
    before = tests.getBugger('misc');
    tests.turnOnDebugger('misc');
    after = tests.getBugger('misc');
    if (before || !after) {
      errorMsg = 'debug.turnOnDebugger failed to turn on one type';
      results.addError(errorMsg);
    }
    tests.setBugger('misc', false);

    before = tests.getBugger('start') && tests.getBugger('misc');
    tests.turnOnDebugger('start misc');
    after = tests.getBugger('start') && tests.getBugger('misc');
    if (before || !after) {
      errorMsg = 'debug.turnOnDebugger failed to turn on two ';
      errorMsg += 'types with a string';
      results.addError(errorMsg);
    }
    tests.setBugger('all', false);

    before = tests.getBugger('start') && tests.getBugger('misc');
    tests.turnOnDebugger([ 'start', 'misc' ]);
    after = tests.getBugger('start') && tests.getBugger('misc');
    if (before || !after) {
      errorMsg = 'debug.turnOnDebugger failed to turn on two ';
      errorMsg += 'types with an array';
      results.addError(errorMsg);
    }
    tests.setBugger('all', false);

    before = tests.getBugger('start') && tests.getBugger('misc');
    tests.turnOnDebugger('all');
    after = tests.getBugger('start') && tests.getBugger('misc');
    if (before || !after) {
      errorMsg = 'debug.turnOnDebugger failed to turn on all types';
      results.addError(errorMsg);
    }

    // Save the results
    app.results.push(results);
  };

  /**
   * -------------------------------------------------
   * Public Method (Tests.checkTurnOffDebugger)
   * -------------------------------------------------
   * @desc Checks Debug.turnOffDebugger method.
   * @type {function()}
   */
  Tests.checkTurnOffDebugger = function() {

    /** @type {TestResults} */
    var results;
    /** @type {boolean} */
    var before;
    /** @type {boolean} */
    var after;
    /** @type {string} */
    var errorMsg;
    /** @type {Object} */
    var tests;

    results = new TestResults('Tests.checkTurnOffDebugger');
    Object.freeze(results);

    // Setup for the tests
    tests = aIV.debug({
      classTitle     : 'Tests.checkTurnOffDebugger',
      turnOnDebuggers: 'all'
    });

    // Run the tests
    before = tests.getBugger('misc');
    tests.turnOffDebugger('misc');
    after = tests.getBugger('misc');
    if (!before || after) {
      errorMsg = 'debug.turnOffDebugger failed to turn off one type';
      results.addError(errorMsg);
    }
    tests.setBugger('misc', true);

    before = tests.getBugger('start') && tests.getBugger('misc');
    tests.turnOffDebugger('start misc');
    after = tests.getBugger('start') && tests.getBugger('misc');
    if (!before || after) {
      errorMsg = 'debug.turnOffDebugger failed to turn off two ';
      errorMsg += 'types with a string';
      results.addError(errorMsg);
    }
    tests.setBugger('all', true);

    before = tests.getBugger('start') && tests.getBugger('misc');
    tests.turnOffDebugger([ 'start', 'misc' ]);
    after = tests.getBugger('start') && tests.getBugger('misc');
    if (!before || after) {
      errorMsg = 'debug.turnOffDebugger failed to turn off two ';
      errorMsg += 'types with an array';
      results.addError(errorMsg);
    }
    tests.setBugger('all', true);

    before = tests.getBugger('start') && tests.getBugger('misc');
    tests.turnOffDebugger('all');
    after = tests.getBugger('start') && tests.getBugger('misc');
    if (!before || after) {
      errorMsg = 'debug.turnOffDebugger failed to turn off all types';
      results.addError(errorMsg);
    }

    // Save the results
    app.results.push(results);
  };

  /**
   * -------------------------------------------------
   * Public Method (Tests.checkSetConfig)
   * -------------------------------------------------
   * @desc Checks the setting of the debug module configuration.
   * @type {function}
   */
  Tests.checkSetConfig = function() {

    /** @type {TestResults} */
    var results;
    /** @type {string} */
    var msg;
    /** @type {Object} */
    var tests;

    results = new TestResults('Tests.checkSetConfig');
    Object.freeze(results);

    // Setup for the tests
    aIV.debug.setConfig({
      turnOffTypes   : 'all',
      turnOnDebuggers: 'all'
    });
    tests = {
      all : aIV.debug('Tests.checkSetConfig.all'),
      none: aIV.debug({
        classTitle     : 'Tests.checkSetConfig.none',
        turnOffTypes   : 'none',
        turnOnDebuggers: 'none'
      })
    };

    // Run the tests
    if (tests.all.getType('start') ||
        tests.all.getType('args')  ||
        tests.all.getType('fail')  ||
        tests.all.getType('group') ||
        tests.all.getType('state') ||
        tests.all.getType('misc')) {
      msg = 'Tests.checkSetConfig.all failed: no types should be on';
      results.addError(msg);
    }

    if (!tests.all.getBugger('start') ||
        !tests.all.getBugger('args')  ||
        !tests.all.getBugger('fail')  ||
        !tests.all.getBugger('group') ||
        !tests.all.getBugger('state') ||
        !tests.all.getBugger('misc')) {
      msg = 'Tests.checkSetConfig.all failed: all debuggers should be on';
      results.addError(msg);
    }

    if (!tests.none.getType('start') ||
        !tests.none.getType('args')  ||
        !tests.none.getType('fail')  ||
        !tests.none.getType('group') ||
        !tests.none.getType('state') ||
        !tests.none.getType('misc')) {
      msg = 'Tests.checkSetConfig.none failed: all types should be on';
      results.addError(msg);
    }

    if (tests.none.getBugger('start') ||
        tests.none.getBugger('args')  ||
        tests.none.getBugger('fail')  ||
        tests.none.getBugger('group') ||
        tests.none.getBugger('state') ||
        tests.none.getBugger('misc')) {
      msg = 'Tests.checkSetConfig.none failed: no debuggers should be on';
      results.addError(msg);
    }

    // Reset the config before continuing
    aIV.debug.setConfig({
      turnOffTypes   : '',
      turnOnDebuggers: ''
    });

    // Save the results
    app.results.push(results);
  };

  Object.freeze(Tests);

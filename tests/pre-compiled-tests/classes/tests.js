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
    choiceMsg = 'Instance Test 1 and 2 should have been logged';
    choiceMsg += ' to the console.';
    errorMsg = 'checkInstances.tests.first failed';
    app.addChoice(choiceMsg, results, errorMsg, function() {
      tests.first.misc('test1', 'Instance Test 1');
      tests.second.misc('test2', 'Instance Test 2');
    });

    choiceMsg = 'Instance Test 3 and 4 should NOT have been logged';
    choiceMsg += ' to the console.';
    errorMsg = 'checkInstances.tests.second failed';
    app.addChoice(choiceMsg, results, errorMsg, function() {
      tests.first.setType('misc', false);
      tests.first.misc('test3', 'Instance Test 3');
      tests.second.misc('test4', 'Instance Test 4');
    });

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

    results = new TestResults('Tests.checkStart');
    Object.freeze(results);

    // Setup for the tests
    tests = aIV.debug('Tests.checkStart');

    // Run the tests
    choiceMsg = 'The following message should have been logged to the console:';
    choiceMsg += ' "START: Tests.checkStart.testMethod()"';
    errorMsg = 'debug.start did not log properly';
    app.addChoice(choiceMsg, results, errorMsg, function() {
      tests.start('testMethod');
    });

    choiceMsg = 'The following message should have been logged to the console:';
    choiceMsg += ' "START: Tests.checkStart.testMethod(5, jsObjRef)"';
    errorMsg = 'debug.start did not log properly with arguments';
    app.addChoice(choiceMsg, results, errorMsg, function() {
      tests.start('testMethod', 5, [ 5 ]);
    });

    choiceMsg = 'The following message should have been logged to the console:';
    choiceMsg += ' "START: Tests.checkStart.testMethod(5, jsObjRef)"';
    errorMsg = 'debug.start did not log properly with arguments given as array';
    app.addChoice(choiceMsg, results, errorMsg, function() {
      tests.start([ 'testMethod', 5, [ 5 ] ]);
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

    results = new TestResults('Tests.checkArgs');
    Object.freeze(results);

    // Setup for the tests
    tests = aIV.debug('Tests.checkArgs');

    // Run the tests on 'string', 'number', 'boolean', 'object',
    // 'elem', 'undefined', 'array', 'strings', 'numbers',
    // 'booleans', 'objects', 'elems', null, '!', '|', and '='
    choiceMsg = 'Two error messages should have been logged.';
    errorMsg = "debug.args 'string' check failed";
    app.addChoice(choiceMsg, results, errorMsg, function() {
      tests.args('testMethod', 's', 'string');
      tests.args('testMethod', 1, 'string');
      tests.args([ 'testMethod', 's', 'string' ]);
      tests.args([ 'testMethod', 1, 'string' ]);
    });

    choiceMsg = 'Two error messages should have been logged.';
    errorMsg = "debug.args 'number' check failed";
    app.addChoice(choiceMsg, results, errorMsg, function() {
      tests.args('testMethod', '1', 'number');
      tests.args('testMethod', 1, 'number');
      tests.args([ 'testMethod', '1', 'number' ]);
      tests.args([ 'testMethod', 1, 'number' ]);
    });

    choiceMsg = 'Two error messages should have been logged.';
    errorMsg = "debug.args 'boolean' check failed";
    app.addChoice(choiceMsg, results, errorMsg, function() {
      tests.args('testMethod', 's', 'boolean');
      tests.args('testMethod', true, 'boolean');
      tests.args([ 'testMethod', 's', 'boolean' ]);
      tests.args([ 'testMethod', false, 'boolean' ]);
    });

    choiceMsg = 'Two error messages should have been logged.';
    errorMsg = "debug.args 'object' check failed";
    app.addChoice(choiceMsg, results, errorMsg, function() {
      tests.args('testMethod', 's', 'object');
      tests.args('testMethod', {}, 'object');
      tests.args([ 'testMethod', {}, 'object' ]);
      tests.args([ 'testMethod', 1, 'object' ]);
    });

    choiceMsg = 'Two error messages should have been logged.';
    errorMsg = "debug.args 'elem' check failed";
    app.addChoice(choiceMsg, results, errorMsg, function() {
      /** @type {HTMLElement} */
      var elem;

      elem = document.createElement('div');

      tests.args('testMethod', {}, 'elem');
      tests.args('testMethod', elem, 'elem');
      tests.args([ 'testMethod', 5, 'elem' ]);
      tests.args([ 'testMethod',  elem, 'elem' ]);
    });

    choiceMsg = 'Two error messages should have been logged.';
    errorMsg = "debug.args 'undefined' check failed";
    app.addChoice(choiceMsg, results, errorMsg, function() {
      tests.args('testMethod', {}, 'undefined');
      tests.args('testMethod', undefined, 'undefined');
      tests.args([ 'testMethod', 's', 'undefined' ]);
      tests.args([ 'testMethod', undefined, 'undefined' ]);
    });

    choiceMsg = 'Two error messages should have been logged.';
    errorMsg = "debug.args 'array' check failed";
    app.addChoice(choiceMsg, results, errorMsg, function() {
      tests.args('testMethod', [], 'array');
      tests.args('testMethod', {}, 'array');
      tests.args([ 'testMethod', [], 'array' ]);
      tests.args([ 'testMethod', 1, 'array' ]);
    });

    choiceMsg = 'Two error messages should have been logged.';
    errorMsg = "debug.args 'strings' check failed";
    app.addChoice(choiceMsg, results, errorMsg, function() {
      tests.args('testMethod', [ 's' ], 'strings');
      tests.args('testMethod', [ 1 ], 'strings');
      tests.args([ 'testMethod', [ 's' ], 'strings' ]);
      tests.args([ 'testMethod', {}, 'strings' ]);
    });

    choiceMsg = 'Two error messages should have been logged.';
    errorMsg = "debug.args 'numbers' check failed";
    app.addChoice(choiceMsg, results, errorMsg, function() {
      tests.args('testMethod', [ 1, 's' ], 'numbers');
      tests.args('testMethod', [ 1, 5 ], 'numbers');
      tests.args([ 'testMethod', [ 5 ], 'numbers' ]);
      tests.args([ 'testMethod', {}, 'numbers' ]);
    });

    choiceMsg = 'Two error messages should have been logged.';
    errorMsg = "debug.args 'booleans' check failed";
    app.addChoice(choiceMsg, results, errorMsg, function() {
      tests.args('testMethod', [ 's' ], 'booleans');
      tests.args('testMethod', [ false ], 'booleans');
      tests.args([ 'testMethod', [ true ], 'booleans' ]);
      tests.args([ 'testMethod', {}, 'booleans' ]);
    });

    choiceMsg = 'Two error messages should have been logged.';
    errorMsg = "debug.args 'objects' check failed";
    app.addChoice(choiceMsg, results, errorMsg, function() {
      tests.args('testMethod', [ {} ], 'objects');
      tests.args('testMethod', [ 1 ], 'objects');
      tests.args([ 'testMethod', [ {} ], 'objects' ]);
      tests.args([ 'testMethod', {}, 'objects' ]);
    });

    choiceMsg = 'Two error messages should have been logged.';
    errorMsg = "debug.args 'elems' check failed";
    app.addChoice(choiceMsg, results, errorMsg, function() {
      /** @type {HTMLElement} */
      var elem;

      elem = document.createElement('div');

      tests.args('testMethod', [ {} ], 'elems');
      tests.args('testMethod', [ elem ], 'elems');
      tests.args([ 'testMethod', 5, 'elems' ]);
      tests.args([ 'testMethod',  [ elem ], 'elems' ]);
    });

    choiceMsg = 'Two error messages should have been logged.';
    errorMsg = "debug.args null check failed";
    app.addChoice(choiceMsg, results, errorMsg, function() {
      tests.args('testMethod', 's', 'string');
      tests.args('testMethod', null, 'string');
      tests.args('testMethod', 1, 'string');
      tests.args('testMethod', undefined, 'string');
      tests.args([ 'testMethod', 's', 'string' ]);
      tests.args([ 'testMethod', null, 'string' ]);
    });

    choiceMsg = 'Two error messages should have been logged.';
    errorMsg = "debug.args '!' check failed";
    app.addChoice(choiceMsg, results, errorMsg, function() {
      tests.args('testMethod', 's', '!string');
      tests.args('testMethod', null, '!string');
      tests.args([ 'testMethod', 's', '!string' ]);
      tests.args([ 'testMethod', null, '!string' ]);
    });

    choiceMsg = 'Two error messages should have been logged.';
    errorMsg = "debug.args '|' check failed";
    app.addChoice(choiceMsg, results, errorMsg, function() {
      tests.args('testMethod', 's', 'string|number');
      tests.args('testMethod', true, 'string|number');
      tests.args([ 'testMethod', {}, 'string|number' ]);
      tests.args([ 'testMethod', 1, 'string|number' ]);
    });

    choiceMsg = 'Two error messages should have been logged.';
    errorMsg = "debug.args '=' check failed";
    app.addChoice(choiceMsg, results, errorMsg, function() {
      tests.args('testMethod', {}, 'number=');
      tests.args('testMethod', undefined, 'number=');
      tests.args([ 'testMethod', 's', 'number=' ]);
      tests.args([ 'testMethod', undefined, 'number=' ]);
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

    results = new TestResults('Tests.checkFail');
    Object.freeze(results);

    // Setup for the tests
    tests = aIV.debug('Tests.checkFail');

    // Run the tests
    choiceMsg = 'Two error messages should have been logged.';
    errorMsg = 'debug.fail boolean evaluation failed';
    app.addChoice(choiceMsg, results, errorMsg, function() {
      tests.fail('testMethod', true, 'This log should NOT be shown.');
      tests.fail('testMethod', false, 'This log should be shown.');
      tests.fail([ 'testMethod', true, 'This log should NOT be shown.' ]);
      tests.fail([ 'testMethod', false, 'This log should be shown.' ]);
    });

    choiceMsg = 'Two error messages should have been logged.';
    errorMsg = 'debug.fail number|object evaluation failed';
    app.addChoice(choiceMsg, results, errorMsg, function() {
      tests.fail('testMethod', 1, 'This log should NOT be shown.');
      tests.fail('testMethod', 0, 'This log should be shown.');
      tests.fail([ 'testMethod', {}, 'This log should NOT be shown.' ]);
      tests.fail([ 'testMethod', null, 'This log should be shown.' ]);
    });

    choiceMsg = 'Two error messages should have been logged.';
    errorMsg = 'debug.fail function evaluation failed';
    app.addChoice(choiceMsg, results, errorMsg, function() {
      /** @return {boolean} */
      var pass = function() {
        return true;
      };
      /** @return {boolean} */
      var fail = function() {
        return false;
      };

      tests.fail('testMethod', pass(), 'This log should NOT be shown.');
      tests.fail('testMethod', fail(), 'This log should be shown.');
      tests.fail([ 'testMethod', pass, 'This log should NOT be shown.' ]);
      tests.fail([ 'testMethod', fail, 'This log should be shown.' ]);
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

    results = new TestResults('Tests.checkState');
    Object.freeze(results);

    // Setup for the tests
    tests = aIV.debug('Tests.checkState');

    // Run the tests
    choiceMsg = 'A debugger instance and a console log, "A debug.state ';
    choiceMsg += 'method\'s arg(s) was wrong.", should have appeared.';
    errorMsg = 'debug.state failed to check the given args correctly';
    app.addChoice(choiceMsg, results, errorMsg, function() {
      tests.state('testMethod');
    });

    choiceMsg = 'The following message should have been logged to the console:';
    choiceMsg += '"STATE: Tests.checkState.testMethod() |';
    choiceMsg += ' number= 5, object= jsObjRef"';
    errorMsg = 'debug.state failed to add the vars correctly to the message';
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

    results = new TestResults('Tests.checkMisc');
    Object.freeze(results);

    // Setup for the tests
    tests = aIV.debug('Tests.checkMisc');

    // Run the tests
    choiceMsg = 'The following message should have been logged to the console:';
    choiceMsg += '"MISC: Tests.checkMisc.testMethod() | Lorem ipsum!"';
    errorMsg = 'debug.misc failed to log a basic message';
    app.addChoice(choiceMsg, results, errorMsg, function() {
      tests.misc('testMethod', 'Lorem ipsum!');
    });

    choiceMsg = 'The following message should have been logged to the console:';
    choiceMsg += '"MISC: Tests.checkMisc.testMethod() |';
    choiceMsg += ' Args: number= 5, object= jsObjRef"';
    errorMsg = 'debug.state failed to add the vars correctly to the message';
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
    /** @type {string} */
    var choiceMsg;
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
    choiceMsg = 'The following message should have been logged to the console ';
    choiceMsg += 'only ONCE: "PASS TEST - This log should be shown."';
    errorMsg = 'debug.turnOn failed to turn on one type';
    app.addChoice(choiceMsg, results, errorMsg, function() {
      tests.start('testMethod', 'FAIL TEST - This log should NOT be shown.');
      tests.misc('testMethod', 'FAIL TEST - This log should NOT be shown.');
      tests.turnOn('misc');
      tests.start('testMethod', 'FAIL TEST - This log should NOT be shown.');
      tests.misc('testMethod', 'PASS TEST - This log should be shown.');
    }, function() {
      tests.setType('misc', false);
    });

    choiceMsg = 'The following message should have been logged to the console ';
    choiceMsg += 'only TWICE: "PASS TEST - This log should be shown.';
    errorMsg = 'debug.turnOn failed to turn on two types with a string';
    app.addChoice(choiceMsg, results, errorMsg, function() {
      tests.start('testMethod', 'FAIL TEST - This log should NOT be shown.');
      tests.misc('testMethod', 'FAIL TEST - This log should NOT be shown.');
      tests.turnOn('start misc');
      tests.start('testMethod', 'PASS TEST - This log should be shown.');
      tests.misc('testMethod', 'PASS TEST - This log should be shown.');
    }, function() {
      tests.setType('all', false);
    });

    choiceMsg = 'The following message should have been logged to the console ';
    choiceMsg += 'only TWICE: "PASS TEST - This log should be shown.';
    errorMsg = 'debug.turnOn failed to turn on two types with an array';
    app.addChoice(choiceMsg, results, errorMsg, function() {
      tests.start('testMethod', 'FAIL TEST - This log should NOT be shown.');
      tests.misc('testMethod', 'FAIL TEST - This log should NOT be shown.');
      tests.turnOn([ 'start', 'misc' ]);
      tests.start('testMethod', 'PASS TEST - This log should be shown.');
      tests.misc('testMethod', 'PASS TEST - This log should be shown.');
    }, function() {
      tests.setType('all', false);
    });

    choiceMsg = 'The following message should have been logged to the console ';
    choiceMsg += 'only TWICE: "PASS TEST - This log should be shown.';
    errorMsg = 'debug.turnOn failed to turn on all types';
    app.addChoice(choiceMsg, results, errorMsg, function() {
      tests.start('testMethod', 'FAIL TEST - This log should NOT be shown.');
      tests.misc('testMethod', 'FAIL TEST - This log should NOT be shown.');
      tests.turnOn('all');
      tests.start('testMethod', 'PASS TEST - This log should be shown.');
      tests.misc('testMethod', 'PASS TEST - This log should be shown.');
    });

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
    /** @type {string} */
    var choiceMsg;
    /** @type {string} */
    var errorMsg;
    /** @type {Object} */
    var tests;

    results = new TestResults('Tests.checkTurnOff');
    Object.freeze(results);

    // Setup for the tests
    tests = aIV.debug('Tests.checkTurnOff');

    // Run the tests
    choiceMsg = 'The following message should have been logged to the console ';
    choiceMsg += 'THRICE: "PASS TEST - This log should be shown."';
    errorMsg = 'debug.turnOff failed to turn off one type';
    app.addChoice(choiceMsg, results, errorMsg, function() {
      tests.start('testMethod', 'PASS TEST - This log should be shown.');
      tests.misc('testMethod', 'PASS TEST - This log should be shown.');
      tests.turnOff('misc');
      tests.start('testMethod', 'PASS TEST - This log should be shown.');
      tests.misc('testMethod', 'FAIL TEST - This log should NOT be shown.');
    }, function() {
      tests.setType('misc', true);
    });

    choiceMsg = 'The following message should have been logged to the console ';
    choiceMsg += 'TWICE: "PASS TEST - This log should be shown.';
    errorMsg = 'debug.turnOff failed to turn off two types with a string';
    app.addChoice(choiceMsg, results, errorMsg, function() {
      tests.start('testMethod', 'PASS TEST - This log should be shown.');
      tests.misc('testMethod', 'PASS TEST - This log should be shown.');
      tests.turnOff('start misc');
      tests.start('testMethod', 'FAIL TEST - This log should NOT be shown.');
      tests.misc('testMethod', 'FAIL TEST - This log should NOT be shown.');
    }, function() {
      tests.setType('all', true);
    });

    choiceMsg = 'The following message should have been logged to the console ';
    choiceMsg += 'TWICE: "PASS TEST - This log should be shown.';
    errorMsg = 'debug.turnOff failed to turn off two types with an array';
    app.addChoice(choiceMsg, results, errorMsg, function() {
      tests.start('testMethod', 'PASS TEST - This log should be shown.');
      tests.misc('testMethod', 'PASS TEST - This log should be shown.');
      tests.turnOff([ 'start', 'misc' ]);
      tests.start('testMethod', 'FAIL TEST - This log should NOT be shown.');
      tests.misc('testMethod', 'FAIL TEST - This log should NOT be shown.');
    }, function() {
      tests.setType('all', true);
    });

    choiceMsg = 'The following message should have been logged to the console ';
    choiceMsg += 'TWICE: "PASS TEST - This log should be shown.';
    errorMsg = 'debug.turnOff failed to turn off all types';
    app.addChoice(choiceMsg, results, errorMsg, function() {
      tests.start('testMethod', 'PASS TEST - This log should be shown.');
      tests.misc('testMethod', 'PASS TEST - This log should be shown.');
      tests.turnOn('all');
      tests.start('testMethod', 'FAIL TEST - This log should NOT be shown.');
      tests.misc('testMethod', 'FAIL TEST - This log should NOT be shown.');
    });

    // Save the results
    app.results.push(results);
  };

  Object.freeze(Tests);

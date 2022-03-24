/* Algorithm IV Debugger (v1.1.2) (imagineadamsmith@gmail.com)
 * Section: JS Example Use
 * Author: Adam Smith (adamsmith@youlum.com)
 * Copyright (c) 2022 Adam A Smith (github.com/imaginate)
 * The Apache License (www.apache.org/licenses/LICENSE-2.0) */

window.aIV.example = function () {

////////////////////////////////////////////////////////////////////////////////
// THE EXAMPLE CLASS
////////////////////////////////////////////////////////////////////////////////

/**
 * -----------------------------------------------------
 * Public Class (Example)
 * -----------------------------------------------------
 * @desc An example class for the debugger.
 * @param {string} name
 * @param {boolean} check
 * @constructor
 */
var Example = function(name, check) {

  /**
   * ---------------------------------------------------
   * Public Property (Example.debug)
   * ---------------------------------------------------
   * @desc An aIV debugger.
   * @type {Debug}
   */
  this.debug = aIV.debug('Example');

  // Log the start of a new instance of Example
  this.debug.start('init', name, check);

  // Verify the new instances arguments 
  this.debug.args('init', name, 'string', check, 'boolean');

  /**
   * ----------------------------------------------- 
   * Public Method (Example.getCheck)
   * -----------------------------------------------
   * @desc Gets the check.
   * @return {boolean}
   */
  this.getCheck = function() {

    // Start this method
    this.debug.start('getCheck');

    // End this method
    this.debug.end('getCheck', check);

    return check;
  };

  /**
   * ----------------------------------------------- 
   * Public Method (Example.getName)
   * -----------------------------------------------
   * @desc Gets the name.
   * @return {string}
   */
  this.getName = function() {

    // Start this method
    this.debug.start('getName');

    // End this method
    this.debug.end('getName', name);

    return name;
  };

  // End this method
  this.debug.end('init');
};

Example.prototype.constructor = Example;

/**
 * ----------------------------------------------- 
 * Public Method (Example.prototype.report)
 * -----------------------------------------------
 * @desc Reports the name of passing checks.
 * @return {string}
 */
Example.prototype.report = function() {

  // Start this method
  this.debug.start('report');

  /** @type {string} */
  var name;
  /** @type {boolean} */
  var check;
  /** @type {string} */
  var result;

  name = this.getName();
  check = this.getCheck();

  // Catch failed reports 
  this.debug.fail('report', check, '$$\'s report failed.', name);

  result = name + ' => ' + ( (check) ? 'Pass' : 'Fail' );

  // End this method
  this.debug.end('report', result);

  return result;
};

////////////////////////////////////////////////////////////////////////////////
// THE EXAMPLE LOGIC
////////////////////////////////////////////////////////////////////////////////

(function testLogic() {

  /** @type {{ test1: Example, test2: Example }} */
  var example = {};
  /** @type {string} */
  var name;
  /** @type {boolean} */
  var check;

  // You can set the default settings for your debug instances
  aIV.debug.set({
    addBreakpoints: 'none',
    turnOnGroups  : true,
    openGroups    : true,
    turnOnTimers  : true
  });

  // When the Example constructor is called its debug methods create a new
  // console group (debug.group), log its start (debug.start), check its
  // arguments (debug.args), and end the group (debug.group)
  example.test1 = new Example('Test 1', true);
  example.test2 = new Example('Test 2', false);

  // Start the testLogic examples
  example.test1.debug.start('testLogic');

  // debug.args will catch the incorrect argument type and log an error
  name = 1;
  example.test1.debug.args('testLogic', name, 'string');

  // debug.args can check for more complex types (first check passes and the
  // second check fails)
  name = [ 'name', 'name' ];
  example.test1.debug.args('testLogic', name, 'strings');
  name = [ 1, 1 ];
  example.test1.debug.args('testLogic', name, 'strings');

  // debug.state shares the state of variables at any moment
  name = 'Test 1';
  check = true;
  example.test1.debug.state('testLogic', 'name= $$, check= $$', name, check);

  // You can turn off methods with debug.turnOff or in the constructor
  example.test1.debug.turnOffMethod('misc');
  example.test1.debug.misc('testLogic', 'This message is NOT logged.');

  // You can turn on methods with debug.turnOn (all methods are turned on by
  // default)
  example.test1.debug.turnOnMethod('misc');
  example.test1.debug.misc('testLogic', 'This message is logged.');

  // You can request that any method insert a debugger instance after their logs
  // with debug.turnOnDebugger or in the constructor
  example.test1.debug.addBreakpoint('misc');
  example.test1.debug.misc('testLogic', 'A debugger instance should appear.');

  // You can remove debugger instances with debug.turnOffDebugger (all debugger
  // instances are turned off by default)
  example.test1.debug.removeBreakpoint('misc');
  example.test1.debug.misc('testLogic', 'A debugger instance should NOT appear.');

  // You can add varaiables easily to your log messages with $$
  example.test1.debug.misc('testLogic', 'This log recorded $$\'s name.', name);

  // The following is an example of catching a bad report from an instance of
  // the example class that could create a bug in a full app (debug.fail creates
  // an error log for the 'Test 2' report)
  example.test1.report();
  example.test2.report();

  // End the testLogic examples
  example.test1.debug.end('testLogic');

})();

////////////////////////////////////////////////////////////////////////////////

};
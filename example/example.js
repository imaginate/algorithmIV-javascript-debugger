window.aIV.example = function () {

////////////////////////////////////////////////////////////////////////////////
// THE EXAMPLE CLASS
////////////////////////////////////////////////////////////////////////////////

/**
 * -----------------------------------------------------
 * Public Class (Example)
 * -----------------------------------------------------
 * @desc An example class for the repo readme.
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

  // Start a collapsed console group
  this.debug.group('init', 'open', 'name= $$, check= $$', name, check);

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

    // Log the start of this method
    this.debug.start('getCheck');

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

    // Log the start of this method
    this.debug.start('getName');

    return name;
  };

  // Close the open console group
  this.debug.group('init', 'end');
};

// Ensure constructor is set to this class.
Example.prototype.constructor = Example;

/**
 * ----------------------------------------------- 
 * Public Method (Example.prototype.report)
 * -----------------------------------------------
 * @desc Reports the name of passing checks.
 * @return {string}
 */
Example.prototype.report = function() {

  // Log the start of this method
  this.debug.start('report');

  /** @type {string} */
  var name;
  /** @type {boolean} */
  var check;

  name = this.getName();
  check = this.getCheck();

  // Catch failed reports 
  this.debug.fail('report', check, '$$\'s report failed.', name);

  return name + ' => ' + ( (check) ? 'Pass' : 'Fail' );
};

////////////////////////////////////////////////////////////////////////////////
// THE EXAMPLE LOGIC
////////////////////////////////////////////////////////////////////////////////

/** @type {{ test1: Example, test2: Example, test3: Example }} */
var example = {};
/** @type {string} */
var name;
/** @type {boolean} */
var check;

// When the Example constructor is called its debug methods create a new
// console group (debug.group), log its start (debug.start), check its
// arguments (debug.args), and end the group (debug.group)
example.test1 = new Example('Test 1', true);
example.test2 = new Example('Test 2', false);

// debug.args will catch the incorrect argument type and log an error
name = 1;
example.test1.debug.args('logic', name, 'string');

// debug.args can check for more complex types (first check passes and the
// second check fails)
name = [ 'name', 'name' ];
example.test1.debug.args('logic', name, 'strings');
name = [ 1, 1 ];
example.test1.debug.args('logic', name, 'strings');

// debug.state shares the state of variables at any moment
name = 'Test 1';
check = true;
example.test1.debug.state('logic', 'name= $$, check= $$', name, check);

// You can turn off methods with debug.turnOff or in the constructor
example.test1.debug.turnOff('misc');
example.test1.debug.misc('logic', 'This message is NOT logged.');

// You can turn on methods with debug.turnOn (all methods are turned on by
// default)
example.test1.debug.turnOn('misc');
example.test1.debug.misc('logic', 'This message is logged.');

// You can request that any method insert a debugger instance after their logs
// with debug.turnOnDebugger or in the constructor
example.test1.debug.turnOnDebugger('misc');
example.test1.debug.misc('logic', 'A debugger instance should appear.');

// You can remove debugger instances with debug.turnOffDebugger (all debugger
// instances are turned off by default)
example.test1.debug.turnOffDebugger('misc');
example.test1.debug.misc('logic', 'A debugger instance should NOT appear.');

// You can add varaiables easily to your log messages with $$
example.test1.debug.misc('logic', 'This log recorded $$\'s name.', name);

// The following is an example of catching a bad report from an instance of the
// example class that could create a bug in a full app (debug.fail creates an
// error log for the 'Test 2' report)
example.test1.report();
example.test2.report();

////////////////////////////////////////////////////////////////////////////////

};
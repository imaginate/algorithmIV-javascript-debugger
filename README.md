#Make Debugging Your JavaScript Easy

####Algorithm IV's debugger is a JavaScript object constructor that has six different methods that log messages, errors, and more to your console. It makes managing a JavaScript project with multiple classes much simpler by implementing a clear and organized structure to every log made!

##Getting Started
To use the debugger simply download [algorithmIV-debug.min.js](https://github.com/imaginate/algorithmIV-javascript-debugger/tree/master/src/algorithmIV-debug.min.js), add ```<script src="algorithmIV-debug.min.js"></script>``` to the ```<head>``` of your HTML, and use ```aIV.debug()``` to create as many objects as you desire. 

##Contributing
See [CONTRIBUTING.md](https://github.com/imaginate/algorithmIV-javascript-debugger/tree/master/CONTRIBUTING.md).

##Example
To see the debugger in action visit [Algorithm IV's Question Manager](https://github.com/imaginate/algorithmIV/tree/version1.1.0/test/app-core) or view the [unit tests](https://github.com/imaginate/algorithmIV-javascript-debugger/tree/master/tests/pre-compiled-tests/classes/Tests.js).
```javascript
/**
 * -----------------------------------------------------
 * Public Class (Example)
 * -----------------------------------------------------
 * @desc An example class for the repo readme.
 * @param {string} name
 * @constructor
 */
var Example = function(name) {

  /**
   * ---------------------------------------------------
   * Private Property (Example._debug)
   * ---------------------------------------------------
   * @desc An aIV debugger.
   * @type {Debug}
   */
  this._debug = aIV.debug('Example');

  // Start a collapsed console group
  this._debug.group('init', 'coll', 'name= $$', name);

  // Log the start of a new instance of Example
  this._debug.start('init', name);

  // Verify the new instances arguments 
  this._debug.args('init', name, 'string');

  /**
   * ----------------------------------------------- 
   * Protected Property (check)
   * -----------------------------------------------
   * @desc A random check.
   * @type {boolean}
   */
  var check;

  /**
   * ----------------------------------------------- 
   * Public Method (Example.report)
   * -----------------------------------------------
   * @desc Reports the name of passing checks.
   * @return {string}
   */
  this.report = function() {

    // Log the start of this method
    this._debug.start('report');

    // Make certain a report was not requested without a passing check 
    this._debug.fail('report', check, '$$\'s report failed.', name);

    return name;
  };

  /**
   * ----------------------------------------------- 
   * Public Method (Example.set)
   * -----------------------------------------------
   * @desc Sets the check.
   * @param {boolean} val
   */
  this.set = function(val) {

    // Log the start of this method
    this._debug.start('set');

    // Verify the arguments 
    this._debug.args('set', val, 'boolean');

    check = val;

    // Keep a record of the state
    this._debug.state('set', 'name= $$, check= $$', name, val);
  };

  // Close the open console group
  this._debug.group('init', 'end');
};
```
--
![Algorithm IV Logo](http://www.algorithmiv.com/images/aIV-icon.png)

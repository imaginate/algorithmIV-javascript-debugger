#Make Debugging Your JavaScript Easy!

####Algorithm IV's debugger is a console wrapper that fixes cross-browser console issues and provides a set of new console methods that make your console more powerful. It will allow you to reduce the amount of time and code it takes to find a bug, automatically insert breakpoints, profiles, and timers, and switch everything on or off with one command. With proper use you will know and control the actions of every JavaScript method in your code base!


##Why aIV.debug?

- **The Original Motivation:** The original reason I built aIV.debug was because I wanted to avoid wasting time inserting and removing console logs for every front-end JavaScript bug. The problem was leaving logs in the code base could create messy code and organizing the large volume of logs that are produced by any project containing more than a couple  of methods and classes was difficult. Repetitive code had to be removed and a **short simple API** had to be created. Shortcuts like adding the **flexibility to turn log groups on or off** on a whim and **automatically inserting breakpoints, timers, and profiles** without hassle were a must. With a bit of work Algorithm IV's debugger has now accomplished it all and more!

- **The Future Gets Even Better:** What is really exciting is what I have learned, and the ideas I have had throughout the course of this project. At the moment aIV.debug is scheduled to add a **cross-browser compatible console and profiler** with sweet extras like a more **intuitive and flexible UI and log output options** as well as a unique **unit and end-to-end testing framework** that will integrate with the logging system to further reduce code and give you even more code secrets! I hope this helps make your JavaScript projects easier!


##Getting Started
- Download [algorithmIV-debug.min.js](https://github.com/imaginate/algorithmIV-javascript-debugger/blob/master/src/algorithmIV-debug.min.js)
- Add algorithmIV-debug.min.js to your HTML head
```html
<html>
    <head>
        ...
        <script src="algorithmIV-debug.min.js"></script>
        ...
    </head>
    <body>...</body>
</html>
```
- Use aIV.debug.set(settings) to change the default settings
```javascript
aIV.debug.set({
  turnOffMethods: 'start',
  addBreakpoints: 'all'
});
```
- Use aIV.debug(classTitle) to create as many debug object instances as you need
```javascript
var debug = aIV.debug({
  classTitle    : 'Example',
  turnOffMethods: 'state',
  addBreakpoints: 'fail',
  turnOnTimers  : true
});
```
- Note that this debugger works best in [Chrome](https://www.google.com/chrome/) especially with large volumes of logs


##The Methods
Each debug object has the following methods for logging to the console:

|           | example calls                                                                  |
| :-------: | :----------------------------------------------------------------------------- |
| **init**  | debugInstance.init(methodName, methodArg1, typeForMethodArg1, ...)             |
| **start** | debugInstance.start(methodName, methodArg1, methodArg2, ...)                   |
| **end**   | debugInstance.end(methodName, methodReturnValue)                               |
| **args**  | debugInstance.args(methodName, methodArg1, typeForMethodArg1, ...)             |
| **fail**  | debugInstance.fail(methodName, truthyValue, errorMessage, optionalVar1, ...)   |
| **group** | debugInstance.group(methodName, groupType, optionalMessage, optionalVar1, ...) |
| **state** | debugInstance.state(methodName, logMessage, var1, var2, ...)                   |
| **misc**  | debugInstance.misc(methodName, logMessage, optionalVar1, ...)                  |

Plus the following methods for disabling logs and automatically adding debugger breakpoints, groups, profiles, and timers:

|                      | example calls                                   |
| :------------------: | :---------------------------------------------- |
| **turnOnMethod**     | debugInstance.turnOnMethod(debugMethodName)     |
| **turnOffMethod**    | debugInstance.turnOffMethod(debugMethodName)    |
| **addBreakpoint**    | debugInstance.addBreakpoint(debugMethodName)    |
| **removeBreakpoint** | debugInstance.removeBreakpoint(debugMethodName) |
| **turnOnAuto**       | debugInstance.turnOnAuto(automationType)        |
| **turnOffAuto**      | debugInstance.turnOffAuto(automationType)       |


##Contributing
See [CONTRIBUTING.md](https://github.com/imaginate/algorithmIV-javascript-debugger/blob/master/CONTRIBUTING.md).


##Example
To see the debugger in live projects visit [Algorithm IV's Question Manager](https://github.com/imaginate/algorithmIV-question-manager/blob/master/tests/algorithmIV-app.js) or view this debugger's [unit tests](https://github.com/imaginate/algorithmIV-javascript-debugger/tree/master/tests/pre-compiled-tests/classes/tests).

The following example is broken into three parts:
- [The Example Class](#class)
- [The Example Logic](#logic)
- [A Screenshot of the Example's Console Logs](#logs)

###<a name="class"></a>The Example Class
```javascript
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
```

###<a name="logic"></a>The Example Logic
```javascript
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

// The following is an example of catching a bad report from an instance of the
// example class that could create a bug in a full app (debug.fail creates an
// error log for the 'Test 2' report)
example.test1.report();
example.test2.report();

// End the testLogic examples
example.test1.debug.end('testLogic');
```

###<a name="logs"></a>A Screenshot of the Example's Console Logs
<a href="https://github.com/imaginate/algorithmIV-javascript-debugger/tree/master/example/console-logs-screenshot.jpg"><img src="http://www.algorithmiv.com/images/debugger-console-logs-screenshot.jpg" alt="Screenshot of the Example's Console Logs" /></a>


##Contact Us
- [Open an issue](https://github.com/imaginate/algorithmIV-javascript-debugger/issues) on this GitHub repository
- Send an email to [learn@algorithmiv.com](mailto:learn@algorithmiv.com)


--
**Happy Developing,**

<a href="http://www.algorithmiv.com"><img src="http://www.algorithmiv.com/images/aIV-logo.png" alt="Algorithm IV Logo" /></a>
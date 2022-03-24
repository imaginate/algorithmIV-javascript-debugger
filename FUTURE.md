# The Future - Algorithm IV Developer Tools

**This file shares the vision for the [Algorithm IV Debugger](https://github.com/imaginate/algorithmIV-javascript-debugger) project. Your thoughts and suggestions as a developer would be highly appreciated!**

## Overview

### Build Schedule
- **[Console](#console)** ~ A JavaScript Console (e.g. <a href="https://developer.chrome.com/devtools#console" target="_blank">Chrome Console</a> or <a href="http://getfirebug.com" target="_blank">Firebug</a>).
- **[Profiler](#profiler)** ~ A JavaScript Performance Profiler (e.g. <a href="https://developer.chrome.com/devtools#javascript-performance" target="_blank">Chrome Profiler</a> or <a href="https://developer.mozilla.org/en-US/docs/Tools/Profiler" target="_blank">FireFox Profiler</a>).
- **[Testing Framework](#test)** ~ A JavaScript & DOM unit, integration, & end-to-end testing framework (e.g. <a href="http://jasmine.github.io/" target="_blank">Jasmine</a> and <a href="http://mochajs.org/" target="_blank">Mocha</a>).

Note: Each tool is meant for use on a **web browser**.

### Build Requirements
- Cross-Browser Compatible
- Clean & Simple UI / API
- Intuitive UI / API

### Build Goals
- Maintain the same console, profiler, & testing experience across every browser.
- Gain more insight into the actions of every JavaScript action with minimal effort.
- Test the actions of private JavaScript functions without inserting tests into your code base.
- Run unit, integration, or end-to-end tests with the same API & test structure.

### Example Code
- **[Native Console API](#ex-native-console)**
- **[Adding Start & End Calls](#ex-start-end)**
- **[Adding Repair Calls](#ex-repair)**
- **[Writing Tests](#ex-tests)**

### Conclusion
- **[Share Your Insight](#share)**
- **[Become A Core Contributor](#contribute)**
- **[Final Words](#final)**

<br />
## <a name="console"></a>Console

### Build Steps: Capturing Logs & Errors
- Create an object called ``` aIV.logs ``` to manage the logs.
- <a href="http://www.reigndropsfall.net/2010/06/15/monkey-patching/" target="_blank">Monkey patch</a> the [native Console methods](#ex-native-console) and the <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error" target="_blank">native Error objects</a> to add each log and error to ``` aIV.logs ``` before completing their original functionality.

### Build Steps: Sharing Logs & Errors
- Open a <a href="http://www.quirksmode.org/js/popup.html" target="_blank">new window</a> in the browser.
- Load the Console's initial <a href="https://developer.mozilla.org/en-US/docs/Using_the_W3C_DOM_Level_1_Core" target="_blank">DOM tree</a> to the new window.
- Add a listener to ``` aIV.logs ``` to update the new window with each new log.
- Attach <a href="https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener" target="_blank">event listeners</a> to <a href="https://developer.mozilla.org/en-US/docs/Web/API/Element" target="_blank">DOM elements</a> inside the new window to provide interactive log management.

### User Experience
- **Basic Use** ~ The same as the [native Console API](#ex-native-console) and the <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error" target="_blank">native Error API</a> except that it lacks the ability to log <a href="https://developer.mozilla.org/en-US/docs/Web/API/console#Stack_traces" target="_blank">stack traces</a>.
- **Stack Traces** ~ Logging stack traces will require user added [start and end methods](#ex-start-end).

<br />
## <a name="profiler"></a>Profiler

### Build Steps: Capturing Profiles
- Create an object called ``` aIV.profiles ``` to manage the profiles.
- Add logic to the <a href="https://github.com/imaginate/algorithmIV-javascript-debugger/blob/86710137/src/pre-compiled-parts/public-api.js" target="_blank">aIV.debug</a> methods, <a href="https://github.com/imaginate/algorithmIV-javascript-debugger/blob/cef372b0/src/pre-compiled-parts/classes/debug/logging-methods.js#L119-145" target="_blank">start</a> and <a href="https://github.com/imaginate/algorithmIV-javascript-debugger/blob/cef372b0/src/pre-compiled-parts/classes/debug/logging-methods.js#L206-231" target="_blank">end</a>, that captures each JavaScript call's statistics and saves the information to ``` aIV.profiles ```.

### Build Steps: Sharing Profiles
- Load the Profiler's initial <a href="https://developer.mozilla.org/en-US/docs/Using_the_W3C_DOM_Level_1_Core" target="_blank">DOM tree</a> into the window created for the aIV Console as a separate dynamic section.
- Add a listener to ``` aIV.profiles ``` to update the Profiler's section with each new profile.
- Attach <a href="https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener" target="_blank">event listeners</a> to <a href="https://developer.mozilla.org/en-US/docs/Web/API/Element" target="_blank">DOM elements</a> inside the Profiler's section to provide interactive profile management

### User Experience
- **Basic Use** ~ The Profiler will require user added [start and end methods](#ex-start-end).

<br />
## <a name="test"></a>Testing Framework

### Build Steps: Running Tests
Details to come.

### Build Steps: Sharing Results
Details to come.

### User Experience
- **Basic Use** ~ All tests will require user added [start and end methods](#ex-start-end).
- **Advanced Use** ~ Testing any sequence of methods will require user added [repair methods](#ex-repair) to avoid returning incorrect test results.
- **Writing Tests** ~ The [first draft for the tests API](#ex-tests).

<br />
## Example Code

### <a name="ex-native-console"></a>Native Console API
See the Console documentation from [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Console), [Chrome](https://developer.chrome.com/devtools/docs/console-api), [Apple](https://developer.apple.com/library/mac/documentation/AppleApplications/Conceptual/Safari_Developer_Guide/Console/Console.html#//apple_ref/doc/uid/TP40007874-CH6-SW8), and [MSDN](https://msdn.microsoft.com/en-us/library/hh772169(v=vs.85).aspx) for all of the methods available.

```javascript
console.group(label);
console.log(messageOrVariable);
console.error(messageOrVariable);
console.warn(messageOrVariable);
console.assert(truthyExpression, messageOrVariable);
console.groupEnd();
```

### <a name="ex-start-end"></a>Adding Start & End Calls
User added [aIV.debug](https://github.com/imaginate/algorithmIV-javascript-debugger/blob/86710137/src/pre-compiled-parts/public-api.js) methods, [start](https://github.com/imaginate/algorithmIV-javascript-debugger/blob/cef372b0/src/pre-compiled-parts/classes/debug/logging-methods.js#L119-145) and [end](https://github.com/imaginate/algorithmIV-javascript-debugger/blob/cef372b0/src/pre-compiled-parts/classes/debug/logging-methods.js#L206-231), are vital to the success of this project. Although they add functionality such as a log of the values for each call's arguments and return, the following functionality depends on them:
- Stack Traces
- Profiles
- Unit, Integration, & End-to-End Tests

```javascript
ExampleClass = function() {
  this.debug = aIV.debug('ExampleClass');
  this.debug.start('init');
  ...
  this.debug.end('init');
};

ExampleClass.prototype.exampleMethod = function(arg1, arg2) {
  this.debug.start('exampleMethod', arg1, arg2);
  ...
  this.debug.end('exampleMethod', result);
  return result;
};
```

### <a name="ex-repair"></a>Adding Repair Calls
User added ``` aIV.repair ``` calls will be necessary to assess any sequence of method calls independent of the success of their preceding and helper methods (e.g. Assuming ``` exampleFunc ``` uses ``` helperFunc ``` and ``` helperFunc ``` returns an incorrect value, ``` aIV.repair ``` will ensure that the return value of ``` helperFunc ``` is corrected before passing it on to ``` exampleFunc ``` thus avoiding an incorrect test result for ``` exampleFunc ```).

```javascript
ExampleClass = function() {
  this.debug = aIV.debug('ExampleClass');
  this.debug.start('init');
  ...
  this.debug.end('init');
};

ExampleClass.prototype.exampleMethod = function(arg1, arg2) {
  this.debug.start('exampleMethod ', arg1, arg2);
  aIV.repair && arg1 = aIV.repair[0];
  aIV.repair && arg2 = aIV.repair[1];
  ...
  // Additional checkpoints to test intermediate portions
  // of a method may be added whenever desired
  this.debug.checkpoint('exampleMethod ', var1);
  aIV.repair && var1 = aIV.repair[0];
  ...
  this.debug.end('exampleMethod ', result);
  aIV.repair && result = aIV.repair[0];
  return result;
};
```

### <a name="ex-tests"></a>Writing Tests
The ``` aIV.tests ``` API's first draft.

```javascript
/** @type {!Object<string, function>} */
var $T = aIV.tests;

// Define a test
$T.declare('The Test Title', 'An optional description.', function() {

  // Prepare the test environment
  $T.setup('optional.html/js', optionalFunction);

  // Test a single public/private function call that should be called within
  // the call stack sequence started by the below invoke method (watch calls
  // will be tested in the order they are called - meaning that until the first
  // method being watched is called subsequent watches will not be evaluated)
  $T.watch('Class.method', function() {
    $T.mockAjax(pass_or_fail, returnedValue, timeForTimeout);
    $T.expect(ErrorConstructor_or_errorMessage_or_thrownValue);
    $T.args(value_or_typeArg1ShouldBe, value_or_typeArg2ShouldBe);
    $T.checkpoint(value_or_typeVarShouldBe);
    $T.result(value_or_typeResultShouldBe);
    $T.limit(executionTimeLimit);
  });

  // Test all subsequent public/private function calls for a specific method
  $T.watchAll('Class.method', function() {
    // Same options as the above $T.watch example
  });

  // Start the test
  $T.invoke('An Optional Title', function() {
    // Call the initial public method that will start the test
  }, function() {
    // Same options as the above $T.watch example
  });

  // Closes the test window if one exists
  $T.teardown();
});
```

<br />
## Conclusion

### <a name="share"></a>Share Your Insight
Your insight is needed to help decide how this project will develop. Please go to https://gist.github.com/imaginate/0856a2945d5dd7805257 and leave your feedback, question, or response as a comment on the Gist.

### <a name="contribute"></a>Become A Core Contributor
I will need a core group of contributors to help make Algorithm IV Dev Tools an awesome reality! If you are interested please send an email to imagineadamsmith@gmail.com with the following information:
- Your interest in the project
- Your development preferences
- Your available time to develop
- A link to your GitHub profile

### <a name="final"></a>Final Words
Thank you for spending the time to read this outline and share your thoughts! If you like my work and want to talk about anything unrelated to this project, you can email me at imagineadamsmith@gmail.com. All the best!

<br />
--
**[Adam Smith](https://github.com/imaginate)**

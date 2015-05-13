# The Future - Algorithm IV Developer Tools

**This file shares the vision for the [Algorithm IV's Debugger](https://github.com/imaginate/algorithmIV-javascript-debugger) project. Your thoughts and suggestions as a developer would be highly appreciated!**

## Overview

### Build Schedule
- **[Console](#console)** ~ A JavaScript Console (e.g. [Chrome Console](https://developer.chrome.com/devtools#console) or [Firebug](http://getfirebug.com/)).
- **[Profiler](#profiler)** ~ A JavaScript Performance Profiler (e.g. [Chrome Profiler](https://developer.chrome.com/devtools#javascript-performance) or [FireFox Profiler](https://developer.mozilla.org/en-US/docs/Tools/Profiler)).
- **[Testing Framework](#test)** ~ A JavaScript & DOM unit, integration, & end-to-end testing framework (e.g. [Jasmine](http://jasmine.github.io/) and [Mocha](http://mochajs.org/)).

Note: Each tool is meant for a **web browser** and primarily **front-end** portions of projects.

### Build Requirements
- Cross-Browser Compatible
- Clean & Simple UI / API
- Intuitive UI / API

### Build Goals
- Maintain the same console, profiler, & testing experience across every browser.
- Gain more insight into the actions of every JavaScript action with minimal effort.
- Test the actions of private JavaScript functions without inserting tests into your code base.
- Run unit, integration, or end-to-end tests with the same API & test structure.

### Conclusion
- **[Project Impacts](#impact)**
- **[Share Your Insight](#share)**
- **[Become A Core Contributor](#contribute)**
- **[Final Words](#final)**

<br />
## <a name="console"></a>Console

### Build Steps: Capturing Logs
- Add ``` aIV.logs ``` to manage the logs
- [Monkey patch](http://www.reigndropsfall.net/2010/06/15/monkey-patching/) the original [console](https://developer.mozilla.org/en-US/docs/Web/API/Console) methods to add each log to ``` aIV.logs ```

### Build Steps: Sharing Logs
- Open a [new window](http://www.quirksmode.org/js/popup.html)
- Load the aIV console's initial [DOM elements](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
- Add a listener to ``` aIV.logs ``` which adds each new log
- Attach [event listeners](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) to the new window to provide interactive log management

### User Experience
- **The Basics** ~ The same as the native console API.

```javascript
console.log(message);
```

- **The Call Stack** ~ Adding call stacks to logged errors will require the user to add [start](https://github.com/imaginate/algorithmIV-javascript-debugger/blob/cef372b0/src/pre-compiled-parts/classes/debug/logging-methods.js#L119-145) and [end](https://github.com/imaginate/algorithmIV-javascript-debugger/blob/cef372b0/src/pre-compiled-parts/classes/debug/logging-methods.js#L206-231) API calls to each method. Note that the existence of the API calls also allows the user to add more automated functionality without adding any more calls (e.g. log the start & end values, insert breakpoints, analyze the execution time, & run tests).

```javascript
Construct = function() {
  this.debug = aIV.debug('Construct');
  ...
};

Construct.prototype.method = function(arg1, arg2) {
  this.debug.start('method', arg1, arg2);
  ...
  this.debug.end('method', result);
  return result;
};
```

<br />
## <a name="profiler"></a>Profiler

### Build Steps: Capturing Profiles
- Add ``` aIV.profiles ``` to manage the profiles
- For the [aIV.console/debug](https://github.com/imaginate/algorithmIV-javascript-debugger/blob/86710137/src/pre-compiled-parts/public-api.js) methods, [start](https://github.com/imaginate/algorithmIV-javascript-debugger/blob/cef372b0/src/pre-compiled-parts/classes/debug/logging-methods.js#L119-145) and [end](https://github.com/imaginate/algorithmIV-javascript-debugger/blob/cef372b0/src/pre-compiled-parts/classes/debug/logging-methods.js#L206-231), add logic that captures each calls statistics and saves the information to ``` aIV.profiles ```

### Build Steps: Sharing Profiles
- Retrieve the aIV console window
- Load a new tab capable of being shown or hidden via JS in the console window
- Add a listener to ``` aIV.profiles ``` which adds each new profile and its details
- Attach [event listeners](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) to the new tab in the console window to provide interactive profile management

### User Experience
This Profiler requires the user to add [start](https://github.com/imaginate/algorithmIV-javascript-debugger/blob/cef372b0/src/pre-compiled-parts/classes/debug/logging-methods.js#L119-145) and [end](https://github.com/imaginate/algorithmIV-javascript-debugger/blob/cef372b0/src/pre-compiled-parts/classes/debug/logging-methods.js#L206-231) API calls to each method to run effectively. Note that the existence of the API calls also allows the user to add more automated functionality without adding any more calls (e.g. log the start & end values, insert breakpoints, & run tests).
```javascript
Construct = function() {
  this.debug = aIV.debug('Construct');
  ...
};

Construct.prototype.method = function(arg1, arg2) {
  this.debug.start('method', arg1, arg2);
  ...
  this.debug.end('method', result);
  return result;
};
```

<br />
## <a name="test"></a>Testing Framework
Details coming soon.

<br />
## Conclusion


### <a name="impact"></a>Project Impacts
Details coming soon.


### <a name="share"></a>Share Your Insight
Details coming soon.


### <a name="contribute"></a>Become A Core Contributor
Details coming soon.


### <a name="final"></a>Final Words
Details coming soon.


--
**[Adam Smith](https://github.com/imaginate)**

<a href="http://www.algorithmiv.com"><img src="http://www.algorithmiv.com/images/aIV-logo.png" alt="Algorithm IV Logo" /></a>
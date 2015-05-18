#Make Debugging Your JavaScript Easy!

####Algorithm IV's debugger is a console wrapper that fixes cross-browser console issues and provides a set of new console methods that make your console more powerful. It will allow you to reduce the amount of time and code it takes to find a bug, automatically insert breakpoints, profiles, and timers, and switch everything on or off with one command. With proper use you will know and control the actions of every JavaScript method in your code base!


##Why aIV.debug?

- **The Original Motivation:** The original reason I built aIV.debug was because I wanted to avoid wasting time inserting and removing console logs for every front-end JavaScript bug. The problem was leaving logs in the code base could create messy code and organizing the large volume of logs that are produced by any project containing more than a couple  of methods and classes was difficult. Repetitive code had to be removed and a **short simple API** had to be created. Shortcuts like adding the **flexibility to turn log groups on or off** on a whim and **automatically inserting breakpoints, timers, and profiles** without hassle were a must. With a bit of work Algorithm IV's Debugger has now accomplished it all and more!

- **Algorithm IV Dev Tools:** What is really exciting is [where this project is going](https://github.com/imaginate/algorithmIV-javascript-debugger/blob/c0a18f2445e5ee/FUTURE.md)! This Debugger is scheduled to transform into [Algorithm IV Developer Tools](https://github.com/imaginate/algorithmIV-javascript-debugger/blob/c0a18f2445e5ee/FUTURE.md) which adds a **cross-browser compatible console, profiler, and testing framework** that plans to make front-end JavaScript testing and debugging easier than ever! If you are a JavaScript developer **your opinions are needed**!! Please [read the outline](https://github.com/imaginate/algorithmIV-javascript-debugger/blob/c0a18f2445e5ee/FUTURE.md) and [share your thoughts](https://gist.github.com/imaginate/0856a2945d5dd7805257).


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
- Use [aIV.debug.set](https://github.com/imaginate/algorithmIV-javascript-debugger/blob/e6f4e24865509d/src/pre-compiled-parts/public-api.js#L60-103) and [aIV.debug.reset](https://github.com/imaginate/algorithmIV-javascript-debugger/blob/e6f4e24865509d/src/pre-compiled-parts/public-api.js#L105-114) to change the default settings
```javascript
aIV.debug.set({
  turnOffMethods: 'start',
  addBreakpoints: 'all'
});
aIV.debug.reset('errorBreakpoints', 'openGroups');
aIV.debug.reset(); // Resets all options
```
- Use [aIV.debug](https://github.com/imaginate/algorithmIV-javascript-debugger/blob/e6f4e24865509d/src/pre-compiled-parts/public-api.js#L21-58) to create as many debug object instances as you need
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
| **[init](https://github.com/imaginate/algorithmIV-javascript-debugger/blob/cef372b06bf5805df639c872ed9a4c39b07ec5d6/src/pre-compiled-parts/classes/debug/logging-methods.js#L1-30)**  | debugInstance.init(methodName, methodArg1, typeForMethodArg1, ...)             |
| **[start](https://github.com/imaginate/algorithmIV-javascript-debugger/blob/cef372b06bf5805df639c872ed9a4c39b07ec5d6/src/pre-compiled-parts/classes/debug/logging-methods.js#L119-145)** | debugInstance.start(methodName, methodArg1, methodArg2, ...)                   |
| **[end](https://github.com/imaginate/algorithmIV-javascript-debugger/blob/cef372b06bf5805df639c872ed9a4c39b07ec5d6/src/pre-compiled-parts/classes/debug/logging-methods.js#L206-231)**   | debugInstance.end(methodName, methodReturnValue)                               |
| **[args](https://github.com/imaginate/algorithmIV-javascript-debugger/blob/cef372b06bf5805df639c872ed9a4c39b07ec5d6/src/pre-compiled-parts/classes/debug/logging-methods.js#L280-308)**  | debugInstance.args(methodName, methodArg1, typeForMethodArg1, ...)             |
| **[fail](https://github.com/imaginate/algorithmIV-javascript-debugger/blob/cef372b06bf5805df639c872ed9a4c39b07ec5d6/src/pre-compiled-parts/classes/debug/logging-methods.js#L371-418)**  | debugInstance.fail(methodName, truthyValue, errorMessage, optionalVar1, ...)   |
| **[group](https://github.com/imaginate/algorithmIV-javascript-debugger/blob/cef372b06bf5805df639c872ed9a4c39b07ec5d6/src/pre-compiled-parts/classes/debug/logging-methods.js#L483-524)** | debugInstance.group(methodName, groupType, optionalMessage, optionalVar1, ...) |
| **[state](https://github.com/imaginate/algorithmIV-javascript-debugger/blob/cef372b06bf5805df639c872ed9a4c39b07ec5d6/src/pre-compiled-parts/classes/debug/logging-methods.js#L617-651)** | debugInstance.state(methodName, logMessage, var1, var2, ...)                   |
| **[misc](https://github.com/imaginate/algorithmIV-javascript-debugger/blob/cef372b06bf5805df639c872ed9a4c39b07ec5d6/src/pre-compiled-parts/classes/debug/logging-methods.js#L709-743)**  | debugInstance.misc(methodName, logMessage, optionalVar1, ...)                  |

Plus the following methods for disabling logs and automatically adding debugger breakpoints, groups, profiles, and timers:

|                      | example calls                                   |
| :------------------: | :---------------------------------------------- |
| **[turnOnMethod](https://github.com/imaginate/algorithmIV-javascript-debugger/blob/cef372b06bf5805df639c872ed9a4c39b07ec5d6/src/pre-compiled-parts/classes/debug/controlling-methods.js#L1-24)**     | debugInstance.turnOnMethod(debugMethodName)     |
| **[turnOffMethod](https://github.com/imaginate/algorithmIV-javascript-debugger/blob/cef372b06bf5805df639c872ed9a4c39b07ec5d6/src/pre-compiled-parts/classes/debug/controlling-methods.js#L56-79)**    | debugInstance.turnOffMethod(debugMethodName)    |
| **[addBreakpoint](https://github.com/imaginate/algorithmIV-javascript-debugger/blob/cef372b06bf5805df639c872ed9a4c39b07ec5d6/src/pre-compiled-parts/classes/debug/controlling-methods.js#L111-134)**    | debugInstance.addBreakpoint(debugMethodName)    |
| **[removeBreakpoint](https://github.com/imaginate/algorithmIV-javascript-debugger/blob/cef372b06bf5805df639c872ed9a4c39b07ec5d6/src/pre-compiled-parts/classes/debug/controlling-methods.js#L166-189)** | debugInstance.removeBreakpoint(debugMethodName) |
| **[turnOnAuto](https://github.com/imaginate/algorithmIV-javascript-debugger/blob/cef372b06bf5805df639c872ed9a4c39b07ec5d6/src/pre-compiled-parts/classes/debug/controlling-methods.js#L221-244)**       | debugInstance.turnOnAuto(automationType)        |
| **[turnOffAuto](https://github.com/imaginate/algorithmIV-javascript-debugger/blob/cef372b06bf5805df639c872ed9a4c39b07ec5d6/src/pre-compiled-parts/classes/debug/controlling-methods.js#L267-290)**      | debugInstance.turnOffAuto(automationType)       |


##Contributing
See our [guide to contributing](https://github.com/imaginate/algorithmIV-javascript-debugger/blob/master/CONTRIBUTING.md).


##Example
To see the debugger in live projects visit [Algorithm IV's Question Manager](https://github.com/imaginate/algorithmIV-question-manager/blob/master/tests/algorithmIV-app.js) or view this debugger's [unit tests](https://github.com/imaginate/algorithmIV-javascript-debugger/tree/master/tests/pre-compiled-tests/classes/tests).

- [View The Example Class](https://github.com/imaginate/algorithmIV-javascript-debugger/blob/fd68019ad7fcc71ff302e44fa63d28b54e9f70da/example/example.js#L9-112)
- [View The Example Logic](https://github.com/imaginate/algorithmIV-javascript-debugger/blob/fd68019ad7fcc71ff302e44fa63d28b54e9f70da/example/example.js#L114-190)

###<a name="logs"></a>A Screenshot of the Example's Console Logs
<a href="https://github.com/imaginate/algorithmIV-javascript-debugger/tree/master/example/console-logs-screenshot.jpg"><img src="http://www.algorithmiv.com/images/aIV-debugger-console-logs-screenshot.jpg" alt="Screenshot of the Example's Console Logs" /></a>


##Contact Us
- [Open an issue](https://github.com/imaginate/algorithmIV-javascript-debugger/issues) on this GitHub repository
- Send an email to [learn@algorithmiv.com](mailto:learn@algorithmiv.com)


--
**Happy Developing,**

<a href="http://www.algorithmiv.com"><img src="http://www.algorithmiv.com/images/aIV-logo.png" alt="Algorithm IV Logo" /></a>
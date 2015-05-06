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
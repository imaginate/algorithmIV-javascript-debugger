# Algorithm IV Dev Tools: The Future

**This Gist is an attempt to share [my](https://github.com/imaginate) vision for [Algorithm IV's Dev Tools](https://github.com/imaginate/algorithmIV-javascript-debugger) project.**

## Overview

### Build Schedule
- [Console](#console)
- [Profiler](#profiler)
- [Tester](#tester)

### Build Requirements
- Cross-Browser
- Clean & Simple UI / API
- Intuitive UI / API
- Aesthetically Pleasing UI

### Conclusion
- [Overall Project Impacts](#impact)
- [Share Your Insight](#share)
- [Become A Core Contributor](#contribute)
- [Final Words](#final)


## <a name="console"></a>Console

### Purpose
- Maintain the same console experience across every browser
- Improve the management of logs

### Capturing Logs
- Add ``` aIV.logs ``` to manage the logs
- [Monkey patch](http://www.reigndropsfall.net/2010/06/15/monkey-patching/) the original [console](https://developer.mozilla.org/en-US/docs/Web/API/Console) methods to add each log to ``` aIV.logs ```

### Sharing Logs
- Open a [new window](http://www.quirksmode.org/js/popup.html)
- Load the aIV console's initial [DOM elements](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
- Add a listener to ``` aIV.logs ``` which adds each new log
- Attach [event listeners](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) to the new window to provide interactive log management


## <a name="profiler"></a>Profiler

### Purpose
- Maintain the same profiling experience across every browser
- Add a cross-browser compatible profiler for older browsers (as far as I am aware this does not exist)
- Improve the management of profiles

### Capturing Profiles
- Add ``` aIV.profiles ``` to manage the profiles
- For the [aIV.console/debug](https://github.com/imaginate/algorithmIV-javascript-debugger/blob/86710137/src/pre-compiled-parts/public-api.js) methods, [start](https://github.com/imaginate/algorithmIV-javascript-debugger/blob/cef372b0/src/pre-compiled-parts/classes/debug/logging-methods.js#L119-145) and [end](https://github.com/imaginate/algorithmIV-javascript-debugger/blob/cef372b0/src/pre-compiled-parts/classes/debug/logging-methods.js#L206-231), add logic that captures each calls statistics and saves the information to ``` aIV.profiles ```

### Sharing Profiles
- Retrieve the aIV console window
- Load a new tab capable of being shown or hidden via JS in the console window
- Add a listener to ``` aIV.profiles ``` which adds each new profile and its details
- Attach [event listeners](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) to the new tab in the console window to provide interactive profile management


## <a name="tester"></a>Tester
Details coming soon.


## <a name="impact"></a>Overall Project Impacts
Details coming soon.


## <a name="share"></a>Share Your Insight
Details coming soon.


## <a name="contribute"></a>Become A Core Contributor
Details coming soon.


## <a name="final"></a>Final Words
Details coming soon.


--
**[Adam Smith](https://github.com/imaginate)**

<a href="http://www.algorithmiv.com"><img src="http://www.algorithmiv.com/images/aIV-logo.png" alt="Algorithm IV Logo" /></a>
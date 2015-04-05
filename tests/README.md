#Improving & Testing The Debugger

####Welcome to the spot where all new development and unit testing for aIV.debug occurs. This readme will explain how to [explore](#explore), [add](#add), and [run](#run) our tests.


##<a name="explore"></a>Explore Our Tests
- **[tests/pre-compiled-debug](https://github.com/imaginate/algorithmIV-javascript-debugger/tree/master/tests/pre-compiled-debug)** ~ All new development for the debugger is located here.
- **[tests/pre-compiled-tests](https://github.com/imaginate/algorithmIV-javascript-debugger/tree/master/tests/pre-compiled-tests)** ~ All tests for the debugger are located here.
- **[algorithmIV-debug.js](https://github.com/imaginate/algorithmIV-javascript-debugger/blob/master/tests/algorithmIV-debug.js)** ~ The compiled debugger script.
- **[algorithmIV-tests.js](https://github.com/imaginate/algorithmIV-javascript-debugger/blob/master/tests/algorithmIV-debug.js)** ~ The compiled tests script.
- **[run-tests.html](https://github.com/imaginate/algorithmIV-javascript-debugger/blob/master/tests/run-tests.html)** ~ Initializes and reports the results of the debugger's tests.


##<a name="add"></a>Add Or Improve Our Tests
- Fork and clone the repo
- Create a new branch for your additions
- Add or edit unit tests in **[tests/pre-compiled-tests/classes/tests.js](https://github.com/imaginate/algorithmIV-javascript-debugger/blob/master/tests/pre-compiled-testsclasses/tests.js)**.
- Ensure any new tests are included in the init routine located in **[App.prototype.runTests](https://github.com/imaginate/algorithmIV-javascript-debugger/blob/e05c3806325013af5b03c2c7f68726d34138bdc2/tests/pre-compiled-tests/classes/app.js#L90-94)**.
- Compile the tests module using the commands found in **[compile/compile-commands.txt](https://github.com/imaginate/algorithmIV-javascript-debugger/blob/e05c3806325013af5b03c2c7f68726d34138bdc2/compile/compile-commands.txt#L41-78)**.
- **[Run the tests](#run)** and debug your additions until all tests are passing.


##<a name="run"></a>Run
- Load **[tests/run-tests.html](https://github.com/imaginate/algorithmIV-javascript-debugger/blob/master/tests/run-tests.html)** in a modern browser.
- Open your console.
- Click "Start Tests".
- Follow the directions until the results are shown.


##Contact Us
- **[Open an issue](https://github.com/imaginate/algorithmIV-javascript-debugger/issues)** on GitHub.
- Send an email to **[learn@algorithmiv.com](mailto:learn@algorithmiv.com)**.

--
**Thanks for being a part of the aIV team,**

<a href="http://www.algorithmiv.com"><img src="http://www.algorithmiv.com/images/aIV-logo.png" alt="Algorithm IV Logo" /></a>
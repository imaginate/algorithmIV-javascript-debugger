#Join The Debugging Crew

####All contributors are welcome!


##Directions
First steps:
- Fork and clone the repo
- Create a new branch for your additions
- Add your code to [tests/pre-compiled-debug/](https://github.com/imaginate/algorithmIV-javascript-debugger/tree/master/tests/pre-compiled-debug)
- Compile the debug module using the commands found in [compile/compile-commands.txt](https://github.com/imaginate/algorithmIV-javascript-debugger/blob/e05c3806325013af5b03c2c7f68726d34138bdc2/compile/compile-commands.txt#L8-39)

If new functionality has been added or more detailed tests are needed:
- Add or update unit tests in [tests/pre-compiled-tests/classes/tests.js](https://github.com/imaginate/algorithmIV-javascript-debugger/blob/master/tests/pre-compiled-testsclasses/tests.js)
- Ensure any new tests are included in the init routine located in [App.prototype.runTests](https://github.com/imaginate/algorithmIV-javascript-debugger/blob/e05c3806325013af5b03c2c7f68726d34138bdc2/tests/pre-compiled-tests/classes/app.js#L90-94)
- Compile the tests module using the commands found in [compile/compile-commands.txt](https://github.com/imaginate/algorithmIV-javascript-debugger/blob/e05c3806325013af5b03c2c7f68726d34138bdc2/compile/compile-commands.txt#L41-78)

Final steps:
- Load [tests/run-tests.html](https://github.com/imaginate/algorithmIV-javascript-debugger/blob/master/tests/run-tests.html) in a modern browser
- Open your console
- Click "Start Tests"
- Follow the directions until the results are shown
- Fix any bugs that are found
- Submit a pull request


##Pointers
- Follow the coding conventions you see in the existing code (see [Google's style guide](https://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml?showone=Code_formatting#Code_formatting) for similar conventions)
- Know and use [JSDoc3](http://usejsdoc.org/) with [Closure Compiler specific syntax](https://developers.google.com/closure/compiler/)
- Ensure that all unit tests are passing before submitting a pull request


##Contact
- [Open an issue](https://github.com/imaginate/algorithmIV-javascript-debugger/issues) on GitHub
- Send emails to [learn@algorithmiv.com](mailto:learn@algorithmiv.com)


--
**Thanks for being a part of the aIV team,**

<a href="http://www.algorithmiv.com"><img src="http://www.algorithmiv.com/images/aIV-logo.png" alt="Algorithm IV Logo" /></a>
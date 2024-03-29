/**
 * -----------------------------------------------------------------------------
 * Algorithm IV Debugger Tests (v1.1.4)
 * -----------------------------------------------------------------------------
 * @file The module used to run all unit tests for aIV's debugger.
 * @module aIVConsoleTests
 * @version 1.1.4
 * @author Adam Smith [imagineadamsmith@gmail.com]{@link mailto:imagineadamsmith@gmail.com}
 * @copyright 2022 Adam A Smith [github.com/imaginate]{@link https://github.com/imaginate}
 * @license The Apache License [www.apache.org/licenses/LICENSE-2.0]{@link http://www.apache.org/licenses/LICENSE-2.0}
 * @desc More details about the module for aIV.tests:
 * <ol>
 *   <li>annotations: 
 *       [See Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
 *       and [See JSDoc3]{@link http://usejsdoc.org/}
 *   </li>
 *   <li>contributing: 
 *       [See the guideline]{@link https://github.com/imaginate/algorithmIV-javascript-debugger/blob/master/CONTRIBUTING.md}
 *   </li>
 * </ol>
 */

/**
 * -----------------------------------------------------------------------------
 * Pre-Defined JSDoc Types
 * -----------------------------------------------------------------------------
 * @typedef {*} val
 * @typedef {Array<*>} vals
 * @typedef {Array<string>} strings
 * @typedef {Array<number>} numbers
 * @typedef {Array<Object>} objects
 * @typedef {Array<boolean>} booleans
 */

////////////////////////////////////////////////////////////////////////////////
// The Public API
////////////////////////////////////////////////////////////////////////////////

;(function setupTheTestsPublicAPI(testsModuleAPI, undefined) {
  "use strict";

/* -----------------------------------------------------------------------------
 * The Public API (public-api.js)
 * -------------------------------------------------------------------------- */
// insert-public-api

})(

////////////////////////////////////////////////////////////////////////////////
// The Tests Module
////////////////////////////////////////////////////////////////////////////////

(function setupTheTestsModule(undefined) {
  "use strict"; 

/* -----------------------------------------------------------------------------
 * The Tests Module API (module-api.js)
 * -------------------------------------------------------------------------- */
// insert-module-api

/* -----------------------------------------------------------------------------
 * The Public Module Variables (module-vars.js)
 * -------------------------------------------------------------------------- */
// insert-module-vars

/* -----------------------------------------------------------------------------
 * The Public Module Methods (module-methods.js)
 * -------------------------------------------------------------------------- */
// insert-module-methods

/* -----------------------------------------------------------------------------
 * The App Class (classes/app.js)
 * -------------------------------------------------------------------------- */
// insert-app

/* -----------------------------------------------------------------------------
 * The MockConsole Class (classes/mock-console.js)
 * -------------------------------------------------------------------------- */
// insert-mock-console

/* -----------------------------------------------------------------------------
 * The Elems Class (classes/elems.js)
 * -------------------------------------------------------------------------- */
// insert-elems

/* -----------------------------------------------------------------------------
 * The Test Results Class (classes/test-results.js)
 * -------------------------------------------------------------------------- */
// insert-test-results

/* -----------------------------------------------------------------------------
 * Construct The Tests Class (classes/tests-construct.js)
 * -------------------------------------------------------------------------- */
// insert-tests-construct

/* -----------------------------------------------------------------------------
 * The Unit Tests (classes/tests/*.js) (classes/tests-methods.js)
 * -------------------------------------------------------------------------- */
// insert-tests-methods

/* -----------------------------------------------------------------------------
 * Deep Freeze The Tests Class
 * -------------------------------------------------------------------------- */

  freezeObj(Tests, true);

////////////////////////////////////////////////////////////////////////////////
// The Tests Module End
////////////////////////////////////////////////////////////////////////////////

  return testsModuleAPI;

})());
/** @preserve blank line for custom compile (sed scripting) */

/**
 * -----------------------------------------------------------------------------
 * Algorithm IV Debugger (v1.1.0)
 * -----------------------------------------------------------------------------
 * @file Algorithm IV's debugger is a console wrapper that fixes cross-browser
 *   console issues and provides a set of new console methods that make your
 *   console more powerful. Reduce the amount of time and code it takes to find
 *   a bug, automatically insert breakpoints, profiles, and timers, and switch
 *   everything on or off with one command. With proper use you will know and
 *   control the actions of every JavaScript method in your code base!
 * @module aIVConsole
 * @version 1.1.0
 * @author Adam Smith ({@link adamsmith@youlum.com})
 * @copyright 2015 Adam A Smith ([github.com/imaginate]{@link https://github.com/imaginate})
 * @license The MIT License ([algorithmiv.com/docs/license]{@link http://algorithmiv.com/docs/license})
 * @desc More details about aIV.debug's module:
 * <ol>
 *   <li>annotations: 
 *       [See Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/}
 *       and [See JSDoc3]{@link http://usejsdoc.org/}
 *   </li>
 *   <li>contributing: 
 *       [See our guideline]{@link https://github.com/imaginate/algorithmIV-javascript-debugger/blob/master/CONTRIBUTING.md}
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
// The JavaScript Polyfills
////////////////////////////////////////////////////////////////////////////////

;(function setupThePolyfills(window, document, undefined) {
  "use strict";

/* -----------------------------------------------------------------------------
 * The Object Polyfills (polyfills/object.js)
 * -------------------------------------------------------------------------- */

/* -----------------------------------------------------------------------------
 * The Array Polyfills (polyfills/array.js)
 * -------------------------------------------------------------------------- */

})(window, document);

////////////////////////////////////////////////////////////////////////////////
// The Public API
////////////////////////////////////////////////////////////////////////////////

(function setupThePublicAPI(window, debugModuleAPI) {
  "use strict";

/* -----------------------------------------------------------------------------
 * The Public API (public-api.js)
 * -------------------------------------------------------------------------- */

})(window,

////////////////////////////////////////////////////////////////////////////////
// The Debug Module
////////////////////////////////////////////////////////////////////////////////

(function setupTheDebugModule(window, document, undefined) {
  "use strict";

/* -----------------------------------------------------------------------------
 * The Debug Module API (module-api.js)
 * -------------------------------------------------------------------------- */


/* -----------------------------------------------------------------------------
 * The Public Module Variables (module-vars.js)
 * -------------------------------------------------------------------------- */


/* -----------------------------------------------------------------------------
 * The Public Module Methods (module-methods.js)
 * -------------------------------------------------------------------------- */


/* -----------------------------------------------------------------------------
 * The ErrorMessages Class (classes/error-messages.js)
 * -------------------------------------------------------------------------- */


/* -----------------------------------------------------------------------------
 * The RegExps Class (classes/reg-exps.js)
 * -------------------------------------------------------------------------- */


/* -----------------------------------------------------------------------------
 * The Debug Class Constructor (classes/debug/constructor.js)
 * -------------------------------------------------------------------------- */


/* -----------------------------------------------------------------------------
 * The Debug Class Logging Methods (classes/debug/logging-methods.js)
 * -------------------------------------------------------------------------- */


/* -----------------------------------------------------------------------------
 * The Debug Class Controlling Methods (classes/debug/controlling-methods.js)
 * -------------------------------------------------------------------------- */


/* -----------------------------------------------------------------------------
 * The Debug Class Helper Methods (classes/debug/helper-methods.js)
 * -------------------------------------------------------------------------- */


////////////////////////////////////////////////////////////////////////////////
// The Debug Module End
////////////////////////////////////////////////////////////////////////////////

  return debugModuleAPI;

})(window, document));
/** @preserve blank line */

/**
 * -----------------------------------------------------------------------------
 * Algorithm IV Debugger (v1.1.3)
 * -----------------------------------------------------------------------------
 * @file Algorithm IV's debugger is a console wrapper that fixes cross-browser
 *   console issues and provides a set of new console methods that make your
 *   console more powerful. It will allow you to reduce the amount of time and
 *   code it takes to find a bug, automatically insert breakpoints, profiles,
 *   and timers, and switch everything on or off with one command. With proper
 *   use you will know and control the actions of every JavaScript method in
 *   your code base!
 * @module aIVConsole
 * @version 1.1.3
 * @author Adam Smith ({@link adamsmith@youlum.com})
 * @copyright 2015 Adam A Smith ([github.com/imaginate]{@link https://github.com/imaginate})
 * @license The Apache License ([algorithmiv.com/docs/license]{@link http://algorithmiv.com/docs/license})
 * @desc More details about aIV.console:
 * <ol>
 *   <li>annotations: 
 *       [See Closure Compiler specific JSDoc]{@link https://developers.google.com/closure/compiler/docs/js-for-compiler}
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
// The Dependencies
////////////////////////////////////////////////////////////////////////////////

/* -----------------------------------------------------------------------------
 * Algorithm IV JavaScript Shortcuts (dependencies/algorithmIV-utils.min.js)
 * -------------------------------------------------------------------------- */

/* Algorithm IV JavaScript Polyfills (v0.0.1) (learn@algorithmiv.com)
 * Author: Adam Smith (adamsmith@youlum.com)
 * Copyright (c) 2015 Adam A Smith (github.com/imaginate)
 * The Apache License (algorithmiv.com/docs/license) */
(function(h,m,n){h.console=h.console||{};(function(a,b){a.log||(a.log=b);a.error||(a.error=a.log);a.assert||(a.assert=function(b){var c;if(!b)return c=1<arguments.length?Array.prototype.slice.call(arguments,1):["A console.assert call failed."],a.error.apply(this,c)});a.clear||(a.clear=b);a.count||(a.count=b);a.debug||(a.debug=a.log);a.dir||(a.dir=a.log);a.dirxml||(a.dirxml=a.log);a.exception||(a.exception=a.error);a.group||(a.group=b);a.groupCollapsed||(a.groupCollapsed=a.group);a.groupEnd||(a.groupEnd=
b);a.info||(a.info=a.log);a.markTimeline||(a.markTimeline=a.timeStamp?a.timeStamp:b);a.profile||(a.profile=b);a.profileEnd||(a.profileEnd=b);a.table||(a.table=b);a.time||(a.time=b);a.timeEnd||(a.timeEnd=b);a.timeline||(a.timeline=b);a.timelineEnd||(a.timelineEnd=b);a.timeStamp||(a.timeStamp=a.markTimeline);a.trace||(a.trace=a.log);a.warn||(a.warn=a.error);(function(b,c,f,h){var d,k,l,g;if(b)if(l=["assert","error","info","log","warn"],g=["clear","dir","profile","profileEnd"],g=l.concat(g),c)for(d=
g.length;d--;)k=a[g[d]],a[g[d]]=c.call(k,a);else for(d=l.length;d--;)k=a[l[d]],f.call(k,a,h.call(arguments))})("object"===typeof a.log,Function.prototype.bind,Function.prototype.call,Array.prototype.slice)})(h.console,function(){});Object.keys||(Object.keys=function(){var a,b;a=!{toString:null}.propertyIsEnumerable("toString");b="toString toLocaleString valueOf hasOwnProperty isPrototypeOf propertyIsEnumerable constructor".split(" ");return function(e){var c,f;if(!e||"object"!==typeof e&&"function"!==
typeof e)throw new TypeError("An Object.keys call received an invalid object parameter. Note: It only accepts non-null objects and functions.");f=[];for(c in e)e.hasOwnProperty(c)&&f.push(c);if(a)for(c=b.length;c--;)e.hasOwnProperty(b[c])&&f.push(b[c]);return f}}());Object.freeze||(Object.freeze=function(a){if(!a||"object"!==typeof a&&"function"!==typeof a)throw new TypeError("An Object.freeze call received an invalid object parameter. Note: It only accepts non-null objects and functions.");return a});
try{Object.freeze(function(){})}catch(p){Object.freeze=function(a){return function(b){return"function"===typeof b?b:a(b)}}(Object.freeze)}Object.isFrozen||(Object.isFrozen=function(a){if(!a||"object"!==typeof a&&"function"!==typeof a)throw new TypeError("An Object.isFrozen call received an invalid object parameter. Note: It only accepts non-null objects and functions.");return!0});Array.isArray||(Array.isArray=function(a){return"[object Array]"===Object.prototype.toString.call(a)})})(window,document);

/* Algorithm IV JavaScript Shortcuts (v1.0.4) (learn@algorithmiv.com)
 * Author: Adam Smith (adamsmith@youlum.com)
 * Copyright (c) 2015 Adam A Smith (github.com/imaginate)
 * The Apache License (algorithmiv.com/docs/license) */
(function(u,n){u.aIV=u.aIV||{};aIV.utils=aIV.utils||n})(window,function(u,n,y){var e={},f={checkArgsErrorMsg:"A function call had an invalid parameter data type.",getElemByClassRoot:n,getElemsByClassRoot:n,getElemByTagRoot:n,getElemsByTagRoot:n,types:{checkArgsErrorMsg:"string|function",getElemByClassRoot:"!(Document|Element)",getElemsByClassRoot:"!(Document|Element)",getElemByTagRoot:"!(Document|Element)",getElemsByTagRoot:"!(Document|Element)"}};Object.freeze(f);Object.freeze(f.types);var m={checkArgsErrorMsg:f.checkArgsErrorMsg,
getElemByClassRoot:f.getElemByClassRoot,getElemsByClassRoot:f.getElemsByClassRoot,getElemByTagRoot:f.getElemByTagRoot,getElemsByTagRoot:f.getElemsByTagRoot};e.checkType=function(){var b=/^string$|^number$|^boolean$|^function$|^undefined$/,a=/^string$|^number$|^boolean$|^object$|^function$|^undefined$/,c=/^elem$|^element$|^document$/,e=/^array$|^strings$|^numbers$|^booleans$|^objects$|^arrays$|^elems$|^elements$|^functions$/,z=/^stringmap$|^numbermap$|^booleanmap$|^objectmap$|^arraymap$|^functionmap$|^elemmap$|^elementmap$/,
k=/\!/,m=/\?/,l=/\=/,n=/\*/,f=function(a,b){return null===a?!1:typeof a===b},u=function(a,b){return a&&f(a,"object")&&a.nodeType?a.nodeType==={elem:1,element:1,document:9}[b]:!1};return function(h,d,r){var p,v,q,g;if(!f(d,"string"))throw new TypeError("An aIV.utils.checkType call received an invalid (a non-string) type parameter.");if(p=n.test(d)){if(1<d.length)throw h="An aIV.utils.checkType call received an invalid type string. When using an asterisk, '*', no other values should be given as the asterisk guarantees the check will ",
h+="pass.",Error(h);return!0}if(p=h===y&&l.test(d))g=!0;else{g=d;var t;t=(q=null===h)?k.test(g):!0;q&&m.test(g)&&(t=!t);g=t}q=p||!g||k.test(d)?!1:m.test(d);p=p||q&&g;if(!r||!p)if(d=d.toLowerCase(),d=d.replace(w.exceptLowerAlphaAndPipe,""),v=d.split("|"),!r)for(d=v,t=!0,r=d.length;t&&r--;)if(t=w.allDataTypes.test(d[r]),!t)throw h=void 0,h="An aIV.utils.checkType call received an invalid type ",h+="string. The value '"+d[r]+"' was incorrect. ",h+="Check aIV.utils.checkType's documentation for a ",h+=
"list of acceptable type strings.",Error(h);if(!p){if(null===h){h=v;p=q;d=!1;for(v=h.length;!d&&v--;)g||(p=!b.test(h[v])),d=p;h=d}else{p=v;g=!1;for(v=p.length;!g&&v--;){d=p[v];if("any"===d){g=!0;break}if(a.test(d))g=f(h,d);else if(c.test(d))g=u(h,d);else if(e.test(d))if(g=h,t=q=r=void 0,Array.isArray(g))if("array"===d)g=!0;else{d=d.slice(0,-1);t="array"===d?Array.isArray:c.test(d)?u:f;q=!0;for(r=g.length;q&&r--;)q=t(g[r],d);g=q}else g=!1;else if(z.test(d))if(g=h,t=q=r=void 0,f(g,"object")){d=d.slice(0,
-3);t="array"===d?Array.isArray:c.test(d)?u:f;q=!0;for(r in g)if(g.hasOwnProperty(r)&&(q=t(g[r],d),!q))break;g=q}else g=!1}h=g}p=h}return p}}();e.isValidTypeString=function(b){var a,c;if("string"!==typeof b)throw new TypeError("An aIV.utils.isValidTypeString call received an invalid (a non-string) typeString parameter.");b=b.toLowerCase();b=b.replace(w.exceptLowerAlphaAndPipe,"");c=b.split("|");a=!0;for(b=c.length;a&&b--;)a=w.allDataTypes.test(c[b]);return a};e.checkArgs=function(){var b=e.checkType,
a=e.isValidTypeString;return function(){var c,e,f,k,n,l,u;e=arguments.length;if(2>e||e%2)throw Error("An aIV.utils.checkArgs call was missing parameters.");n=Array.prototype.slice.call(arguments,0);l=!0;for(c=-1;++c<e;)if(c%2){k=n[c];u=(u=b(k,"string",!0))&&a(k);if(!u)throw l=void 0,l="An aIV.utils.checkArgs call received an invalid type ",l+="string. The value '"+k+"' was incorrect. ",l+="Check aIV.utils.checkType's documentation for a ",l+="list of acceptable type strings.",Error(l);l=l&&b(f,k,
!0)}else f=n[c];if(!l&&(k=m.checkArgsErrorMsg,(k=b(k,"string")?k:k())&&b(k,"string")))throw new TypeError(k);return l}}();e.getTypeOf=function(){var b=e.checkType;return function(a){var c;c=typeof a;"object"===c&&b(a,"document|element|array")&&(c=null===a?"null":Array.isArray(a)?"array":1===a.nodeType?"element":"document");return c}}();e.freezeObj=function(){var b=function(a){var c;Object.freeze(a);for(c in a)a.hasOwnProperty(c)&&a[c]&&("object"===typeof a[c]||"function"===typeof a[c])&&b(a[c])};
return function(a,c){if(!a||"object"!==typeof a&&"function"!==typeof a)throw new TypeError("An aIV.utils.freezeObj call received an invalid obj parameter.");"boolean"!==typeof c&&(c=!1);c?b(a):Object.freeze(a);return a}}();e.hasOwnProp=function(b,a){var c;if(!b||"object"!==typeof b&&"function"!==typeof b)throw new TypeError("An aIV.utils.hasOwnProp call received an invalid obj parameter.");if(!a||"string"!==typeof a)throw c="An aIV.utils.hasOwnProp call received an invalid prop parameter.",new TypeError(c);
return b.hasOwnProperty(a)};var w={allDataTypes:/^any$|^string$|^number$|^boolean$|^object$|^array$|^function$|^elem$|^element$|^undefined$|^null$|^document$|^strings$|^numbers$|^booleans$|^objects$|^arrays$|^elems$|^elements$|^functions$|^stringmap$|^numbermap$|^booleanmap$|^objectmap$|^arraymap$|^functionmap$|^elemmap$|^elementmap$/,exceptLowerAlphaAndPipe:/[^a-z\|]/g};e.freezeObj(w,!0);e.getElemById=function(b){if(!b||"string"!==typeof b)throw new TypeError("An aIV.utils.getElemById call received an invalid id parameter (should be a string).");
b=n.getElementById(b);if(!b)throw b="An aIV.utils.getElemById call received an invalid id parameter (i.e. no element with the id was found).",new RangeError(b);return b};e.getElemByClass=function(b,a,c){if(!b||"string"!==typeof b)throw new TypeError("An aIV.utils.getElemByClass call received an invalid class name parameter.");a="number"!==typeof a||-1>a?0:Math.floor(a);c&&"object"===typeof c&&(c instanceof Element||c instanceof Document)||(c=m.getElemByClassRoot);b=c.getElementsByClassName?c.getElementsByClassName(b):
x.getElementsByClassNameAlt(b,c);if(0>a||a>=b.length)a=b.length-1;a=b[a];if(!a)throw a="An aIV.utils.getElemByClass call received an invalid class name parameter ",a+="(i.e. no element with the class name was found).",new RangeError(a);return a};e.getElemsByClass=function(b,a){if(!b||"string"!==typeof b)throw new TypeError("An aIV.utils.getElemsByClass call received an invalid class name parameter.");a&&"object"===typeof a&&(a instanceof Element||a instanceof Document)||(a=m.getElemsByClassRoot);
return a.getElementsByClassName?a.getElementsByClassName(b):x.getElementsByClassNameAlt(b,a)};e.getElemByTag=function(b,a,c){if(!b||"string"!==typeof b)throw new TypeError("An aIV.utils.getElemByTag call received an invalid tag name parameter.");a="number"!==typeof a||-1>a?0:Math.floor(a);c&&"object"===typeof c&&(c instanceof Element||c instanceof Document)||(c=m.getElemByTagRoot);b=c.getElementsByTagName(b);if(0>a||a>=b.length)a=b.length-1;a=b[a];if(!a)throw a="An aIV.utils.getElemByTag call received an invalid tag name parameter ",
a+="(i.e. no element with the tag name was found).",new RangeError(a);return a};e.getElemsByTag=function(b,a){if(!b||"string"!==typeof b)throw new TypeError("An aIV.utils.getElemsByTag call received an invalid tag name parameter.");a&&"object"===typeof a&&(a instanceof Element||a instanceof Document)||(a=m.getElemsByTagRoot);return a.getElementsByTagName(b)};e.makeElem=function(b){var a;b&&"string"===typeof b?(a=b,b=null):b&&"object"===typeof b?b.hasOwnProperty("tag")&&b.tag&&"string"===typeof b.tag?
a=b.tag:b.hasOwnProperty("tagName")&&b.tagName&&"string"===typeof b.tagName&&(a=b.tagName):b=null;a||(a="div");a=n.createElement(a);b&&(b.hasOwnProperty("text")&&b.text&&"string"===typeof b.text&&(a.textContent?a.textContent=b.text:a.innerText=b.text),b.hasOwnProperty("html")&&b.html&&"string"===typeof b.html&&(a.innerHTML=b.html),b.hasOwnProperty("id")&&b.id&&"string"===typeof b.id&&(a.id=b.id),b.hasOwnProperty("className")&&b.className&&"string"===typeof b.className&&(a.className=b.className));
return a};e.setElemText=function(b,a){var c;if(!(b&&"object"===typeof b&&b instanceof Element))throw new TypeError("An aIV.utils.setElemText call received an invalid elem parameter (should be a DOM Element).");if(!a||"string"!==typeof a)throw c="An aIV.utils.setElemText call received an invalid text parameter (should be a string).",new TypeError(c);b.textContent?b.textContent=a:b.innerText=a;return b};e.addElemText=function(b,a){var c;if(!(b&&"object"===typeof b&&b instanceof Element))throw new TypeError("An aIV.utils.addElemText call received an invalid elem parameter (should be a DOM Element).");
if(!a||"string"!==typeof a)throw c="An aIV.utils.addElemText call received an invalid text parameter (should be a string).",new TypeError(c);b.textContent?b.textContent+=a:b.innerText+=a;return b};var x={getElementsByClassNameAlt:function(b,a){var c,e,f,k,m,l;if(a.querySelectorAll)k=a.querySelectorAll("."+b);else if(n.evaluate)for(k=[],f='"'+(" "+b+" ")+'")]',c=n.evaluate(f,a,null,0,null),f=c.iterateNext();f;)k.push(f),f=c.iterateNext();else for(l=new RegExp("(^|s)"+b+"(s|$)"),m=a.getElementsByTagName("*"),
k=[],e=m.length,c=-1;++c<e;)f=m[c],l.test(f.className)&&k.push(f);return k}};e.freezeObj(x,!0);e.set=function(){var b=e.checkType;return function(a){var c;if(!a||"object"!==typeof a)throw new TypeError("An aIV.utils.set call received an invalid settings parameter (should be an object).");for(c in m)if(m.hasOwnProperty(c)&&a.hasOwnProperty(c))if(b(a[c],f.types[c]))m[c]=a[c];else throw a=void 0,a="An aIV.utils.set call received an invalid "+c,a+=" settings parameter (should be a "+f.types[c],a+=").",
new TypeError(a);return!0}}();e.reset=function(){var b,a,c;b=(b=arguments.length)?1<b?Array.prototype.slice.call(arguments,0):Array.isArray(arguments[0])?arguments[0]:[arguments[0]]:Object.keys(m);if(!e.checkType(b,"!strings"))throw new TypeError("An aIV.utils.reset call received an invalid setting parameter (should be a string or an array of strings).");for(c=b.length;c--;)a=b[c],m.hasOwnProperty(a)&&(m[a]=f[a]);return!0};e.freezeObj(e,!0);return e}(window,document));

////////////////////////////////////////////////////////////////////////////////
// The Public API
////////////////////////////////////////////////////////////////////////////////

(function setupTheDebugPublicAPI(window, debugModuleAPI) {
  "use strict";

/* -----------------------------------------------------------------------------
 * The Public API (public-api.js)
 * -------------------------------------------------------------------------- */

  /**
   * ---------------------------------------------------------------
   * Global Object (aIV)
   * ---------------------------------------------------------------
   * @desc Holds the public API for aIV's apps, tools, and libraries.
   * @struct
   * @global
   */
  window.aIV = window.aIV || {};

  /**
   * ---------------------------------------------------------------
   * Global Object (aIV.console)
   * ---------------------------------------------------------------
   * @desc Holds the public API for aIV's console.
   * @struct
   * @global
   */
  aIV.console = debugModuleAPI.console;

  /**
   * ---------------------------------------------------------------
   * Global Method (aIV.console.create) (SAME AS aIV.debug)
   * ---------------------------------------------------------------
   * @desc Creates or retrieves an instance of aIV's Debug class.
   * @param {?(string|Object)=} settings - A string of the Debug instance's
   *   class name or an object with the Debug instance's settings.
   * @param {string=} settings.classTitle - The Debug instance's class name.
   * @param {string=} settings.className - The same as settings.classTitle.
   * @param {!(string|strings)=} settings.turnOffMethods - Contains the methods
   *   to disable for this Debug instance. The options are 'all', 'none',
   *   'init', 'start', 'end', 'args', 'fail', 'group', 'state', and 'misc'.
   *   This setting does override the module defaults.
   * @param {!(string|strings)=} settings.turnOffTypes - The same as
   *   settings.turnOffMethods. Maintains backward compatibility.
   * @param {!(string|strings)=} settings.addBreakpoints - Contains the methods
   *   to add debugger breakpoints to for this Debug instance. The options are
   *   'all', 'none', 'init', 'start', 'end', 'args', 'fail', 'group', 'state',
   *   and 'misc'. This setting does override the module defaults.
   * @param {!(string|strings)=} settings.turnOnDebuggers - The same as
   *   settings.addBreakpoints. Maintains backward compatibility.
   * @param {boolean=} settings.turnOnGroups - Enables/disables automatic
   *   grouping of all logs, timers, and profiles between every start and end
   *   method for this Debug instance.
   * @param {boolean=} settings.openGroups - For enabled automatic log grouping
   *   determines whether groups should be open or collapsed for this Debug
   *   instance (i.e. if turnOnGroups is enabled then openGroups controls
   *   whether the auto log groups are open or collapsed).
   * @param {boolean=} settings.turnOnProfiles - Enables/disables automatic
   *   profiling for all logic between every start and end method for this
   *   Debug instance.
   * @param {boolean=} settings.turnOnTimers - Enables/disables automatic
   *   timing for all logic between every start and end method for this
   *   Debug instance.
   * @return {!Debug} A new or existing Debug object.
   * @global
   */
  aIV.console.create = debugModuleAPI.init;

  /**
   * ---------------------------------------------------------------
   * Global Method (aIV.console.set) (SAME AS aIV.debug.set)
   * ---------------------------------------------------------------
   * @desc Allows you to configure the default settings for each new Debug class
   *   instance and enable/disable inserted breakpoints for user errors that
   *   occur upon any Debug class method call (e.g. if you forget to add the
   *   method's name to a debug.start call an error will be logged and if
   *   errorBreakpoints is enabled a debugger breakpoint will be inserted
   *   after the error has been logged).
   * @param {!Object} settings - The Debug module's settings.
   * @param {boolean=} settings.errorBreakpoints - Controls if
   *   debugger breakpoints are inserted when any Debug class method call
   *   encounters an error.
   * @param {boolean=} settings.errorDebuggers - The same as
   *   settings.errorBreakpoints.
   * @param {string=} settings.classTitle - The default class title.
   * @param {string=} settings.className - The same as settings.classTitle.
   * @param {!(string|strings)=} settings.turnOffMethods - The default methods
   *   to disable for all new Debug instances created after this call.
   * @param {!(string|strings)=} settings.turnOffTypes - The same as
   *   settings.turnOffMethods. Maintains backward compatibility.
   * @param {!(string|strings)=} settings.addBreakpoints - The default
   *   methods to add debugger breakpoints to for all new Debug instances
   *   created after this call.
   * @param {!(string|strings)=} settings.turnOnDebuggers - The same as
   *   settings.addBreakpoints. Maintains backward compatibility.
   * @param {boolean=} settings.turnOnGroups - The default setting for automatic
   *   grouping of all logs, timers, and profiles between every start and end
   *   method.
   * @param {boolean=} settings.openGroups - The default open or collapsed
   *   setting for automatic log grouping (i.e. if turnOnGroups is enabled then
   *   openGroups determines if the auto log groups are open or collapsed).
   * @param {boolean=} settings.turnOnProfiles - The default setting for
   *   automatic profiling for all logic between every start and end method.
   * @param {boolean=} settings.turnOnTimers - The default setting for automatic
   *   timing for all logic between every start and end method.
   * @param {boolean=} settings.formatElementsAsObj - Controls whether elements
   *   are logged as JavaScript objects or DOM elements. For more details on the
   *   differences between the two logging styles (specifier '%o' vs '%O')
   *   [see Google's Console API Reference]{@link https://developer.chrome.com/devtools/docs/console-api#consolelogobject-object}.
   * @global
   */
  aIV.console.set = debugModuleAPI.set;

  /**
   * ---------------------------------------------------------------
   * Global Method (aIV.debug) (SAME AS aIV.console.create)
   * ---------------------------------------------------------------
   * @desc The same as {@link aIV.console.create}.
   * @type {function(!Object)}
   * @global
   */
  aIV.debug = debugModuleAPI.init;

  /**
   * ---------------------------------------------------------------
   * Global Method (aIV.debug.set) (SAME AS aIV.console.set)
   * ---------------------------------------------------------------
   * @desc The same as {@link aIV.console.set}.
   * @type {function(!Object)}
   * @global
   */
  aIV.debug.set = debugModuleAPI.set;

  /**
   * ---------------------------------------------------------------
   * Global Method (aIV.debug.setConfig) (SAME AS aIV.console.set)
   * ---------------------------------------------------------------
   * @desc The same as {@link aIV.console.set}. Maintains backward
   *   compatibility.
   * @type {function(!Object)}
   * @global
   */
  aIV.debug.setConfig = debugModuleAPI.set;

})(window,

////////////////////////////////////////////////////////////////////////////////
// The Debug Module
////////////////////////////////////////////////////////////////////////////////

(function setupTheDebugModule(window, document, undefined) {
  "use strict";

/* -----------------------------------------------------------------------------
 * The Debug Module API (module-api.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Variable (debugModuleAPI)
   * -----------------------------------------------------
   * @desc Holds the module's public properties and methods.
   * @type {!Object<string, function>}
   * @struct
   */
  var debugModuleAPI = {};


  /**
   * -----------------------------------------------------
   * Public Object (debugModuleAPI.console)
   * -----------------------------------------------------
   * @desc The container for aIV's console.
   * @type {!Object<string, function(*)>}
   */
  debugModuleAPI.console = {};

  /**
   * -----------------------------------------------------
   * Public Method (debugModuleAPI.init)
   * -----------------------------------------------------
   * @desc Creates or retrieves an instance of the Debug class.
   * @param {?(string|Object)=} settings - A string of the Debug instance's
   *   class name or an object with the Debug instance's settings.
   * @param {string=} settings.classTitle - The Debug instance's class name.
   * @param {string=} settings.className - The same as settings.classTitle.
   * @param {!(string|strings)=} settings.turnOffMethods - Contains the methods
   *   to disable for this Debug instance. The options are 'all', 'none',
   *   'init', 'start', 'end', 'args', 'fail', 'group', 'state', and 'misc'.
   *   This setting does override the module defaults.
   * @param {!(string|strings)=} settings.turnOffTypes - The same as
   *   settings.turnOffMethods. Maintains backward compatibility.
   * @param {!(string|strings)=} settings.addBreakpoints - Contains the methods
   *   to add debugger breakpoints to for this Debug instance. The options are
   *   'all', 'none', 'init', 'start', 'end', 'args', 'fail', 'group', 'state',
   *   and 'misc'. This setting does override the module defaults.
   * @param {!(string|strings)=} settings.turnOnDebuggers - The same as
   *   settings.addBreakpoints. Maintains backward compatibility.
   * @param {boolean=} settings.turnOnGroups - Enables/disables automatic
   *   grouping of all logs, timers, and profiles between every start and end
   *   method for this Debug instance.
   * @param {boolean=} settings.openGroups - For enabled automatic log grouping
   *   determines whether groups should be open or collapsed for this Debug
   *   instance (i.e. if turnOnGroups is enabled then openGroups controls
   *   whether the auto log groups are open or collapsed).
   * @param {boolean=} settings.turnOnProfiles - Enables/disables automatic
   *   profiling for all logic between every start and end method for this
   *   Debug instance.
   * @param {boolean=} settings.turnOnTimers - Enables/disables automatic
   *   timing for all logic between every start and end method for this
   *   Debug instance.
   * @return {!Debug} A new or existing Debug object.
   */
  debugModuleAPI.init = function(settings) {

    /** @type {string} */
    var classTitle;

    // Catch incorrect data types for settings
    if ( !checkType(settings, '?(string|object)') ) {
      settings = null;
    }

    // Setup classTitle
    classTitle = Debug.defaults.classTitle;
    if ( checkType(settings, 'string') ) {
      classTitle = settings;
      settings = null;
    }

    // Correct any old/alternate properties used
    if (settings) {
      settings = Debug.replaceOldSettings(settings);
      if (settings.classTitle && checkType(settings.classTitle, 'string')) {
        classTitle = settings.classTitle;
      }
    }

    // Create a new Debug instance
    if ( !hasOwnProp(debugInstances, classTitle) ) {
      makeNewDebugInst(classTitle, settings);
    }

    return debugInstances[ classTitle ];
  };

  /**
   * -----------------------------------------------------
   * Public Method (debugModuleAPI.set)
   * -----------------------------------------------------
   * @desc Allows you to configure the default settings for each new Debug class
   *   instance and enable/disable inserted breakpoints for user errors that
   *   occur upon any Debug class method call (e.g. if you forget to add the
   *   method's name to a debug.start call an error will be logged and if
   *   errorBreakpoints is enabled a debugger breakpoint will be inserted
   *   after the error has been logged).
   * @param {!Object} settings - The Debug module's settings.
   * @param {boolean=} settings.errorBreakpoints - Controls if
   *   debugger breakpoints are inserted when any Debug class method call
   *   encounters an error.
   * @param {boolean=} settings.errorDebuggers - The same as
   *   settings.errorBreakpoints.
   * @param {string=} settings.classTitle - The default class title.
   * @param {string=} settings.className - The same as settings.classTitle.
   * @param {!(string|strings)=} settings.turnOffMethods - The default methods
   *   to disable for all new Debug instances created after this call.
   * @param {!(string|strings)=} settings.turnOffTypes - The same as
   *   settings.turnOffMethods. Maintains backward compatibility.
   * @param {!(string|strings)=} settings.addBreakpoints - The default
   *   methods to add debugger breakpoints to for all new Debug instances
   *   created after this call.
   * @param {!(string|strings)=} settings.turnOnDebuggers - The same as
   *   settings.addBreakpoints. Maintains backward compatibility.
   * @param {boolean=} settings.turnOnGroups - The default setting for automatic
   *   grouping of all logs, timers, and profiles between every start and end
   *   method.
   * @param {boolean=} settings.openGroups - The default open or collapsed
   *   setting for automatic log grouping (i.e. if turnOnGroups is enabled then
   *   openGroups determines if the auto log groups are open or collapsed).
   * @param {boolean=} settings.turnOnProfiles - The default setting for
   *   automatic profiling for all logic between every start and end method.
   * @param {boolean=} settings.turnOnTimers - The default setting for automatic
   *   timing for all logic between every start and end method.
   * @param {boolean=} settings.formatElementsAsObj - Controls whether elements
   *   are logged as JavaScript objects or DOM elements. For more details on the
   *   differences between the two logging styles (specifier '%o' vs '%O')
   *   [see Google's Console API Reference]{@link https://developer.chrome.com/devtools/docs/console-api#consolelogobject-object}.
   */
  debugModuleAPI.set = (function setup_set() {

    /** @type {!Object} */
    var defaultTypes;
    /** @type {string} */
    var propName;
    /** @type {!Object<string, function(*)>} */
    var setters;

    setters = {};

    // Setup the non-default setters
    setters.errorBreakpoints = function(newVal) {
      if ( checkType(newVal, 'boolean') ) {
        errorBreakpoints = newVal;
      }
    };
    setters.formatElementsAsObj = function(newVal) {
      if ( checkType(newVal, 'boolean') ) {
        Debug.formatElementsAsObj = newVal;
      }
    };

    // Setup the default setters
    defaultTypes = Debug_DEFAULT_TYPES;
    for (propName in defaultTypes) {
      if ( hasOwnProp(defaultTypes, propName) ) {
        setters[ propName ] = (function(propName, propType) {
          return function setADebugDefault(propVal) {
            if ( checkType(propVal, propType) ) {
              if ( checkType(propVal, '!strings') ) {
                propVal = propVal.join(' ');
              }
              Debug.defaults[ propName ] = propVal;
            }
          };
        })(propName, defaultTypes[ propName ]);
      }
    }

    return function set(settings) {

      /** @type {string} */
      var propName;
      /** @type {*} */
      var propVal;

      if ( checkType(settings, '!object') ) {

        // Replace any old property names with the correct property name
        if (hasOwnProp(settings, 'errorDebuggers') &&
            !hasOwnProp(settings, 'errorBreakpoints')) {
          settings.errorBreakpoints = settings.errorDebuggers;
        }
        settings = Debug.replaceOldSettings(settings);

        // Set each new setting
        for (propName in settings) {
          if (hasOwnProp(settings, propName) &&
              hasOwnProp(setters, propName)) {
            propVal = settings[ propName ];
            setters[ propName ](propVal);
          }
        }
      }
      else {
        Errors.setConsoleTypeError( getTypeOf(settings) );
        insertErrorBreakpoint();
      }
    };
  })();

  /**
   * -----------------------------------------------------
   * Public Method (debugModuleAPI.reset)
   * -----------------------------------------------------
   * @desc Allows you to reset any of the settings for the debugger.
   * @param {...(string|strings)=} setting - A setting to reset.
   * @return {boolean} The success of the new settings update.
   */
  debugModuleAPI.reset = (function setup_reset() {

    /** @type {string} */
    var propName;
    /** @type {!Object<string, function>} */
    var setters;

    setters = {};

    // Setup the non-default setters
    setters.errorBreakpoints = function() {
      errorBreakpoints = true;
    };
    setters.formatElementsAsObj = function() {
      Debug.formatElementsAsObj = true;
    };

    // Setup the default setters
    for (propName in Debug_DEFAULTS) {
      if ( hasOwnProp(Debug_DEFAULTS, propName) ) {
        setters[ propName ] = (function(propName) {
          return function resetADebugDefault() {
            Debug.defaults[ propName ] = Debug_DEFAULTS[ propName ];
          };
        })(propName);
      }
    }

    return function reset() {

      /** @type {!Array<string>} */
      var args;
      /** @type {string} */
      var prop;
      /** @type {number} */
      var len;
      /** @type {number} */
      var i;

      len  = arguments.length;
      args = ( (!len) ?
        null : (len > 1) ?
          Array.prototype.slice.call(arguments, 0) : (Array.isArray(arguments[0])) ?
            arguments[0] : [ arguments[0] ]
      );
      args = makeResetString(args);

      if (args) {
        // Reset each value
        i = args.length;
        while (i--) {
          prop = args[i];
          setters[ prop ]();
        }
      }
      else {
        Errors.resetConsoleTypeError();
        insertErrorBreakpoint();
      }

      return !!args;
    };
  })();

/* -----------------------------------------------------------------------------
 * The Public Module Variables (module-vars.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Variable (debugInstances)
   * -----------------------------------------------------
   * @desc Saves a reference to all of the created Debug instances.
   * @type {!Object<string, !Debug>}
   */
  var debugInstances = {};

  /**
   * ----------------------------------------------- 
   * Public Variable (errorBreakpoints)
   * -----------------------------------------------
   * @desc Controls whether debugger breakpoints are included with error logs.
   * @type {boolean}
   */
  var errorBreakpoints = true;

  /**
   * -----------------------------------------------
   * Public Variable (Debug_DEFAULTS)
   * -----------------------------------------------
   * @desc The original default settings for a new Debug instance.
   * @type {!{
   *   classTitle    : string,
   *   turnOffMethods: string,
   *   addBreakpoints: string,
   *   turnOnGroups  : boolean,
   *   openGroups    : boolean,
   *   turnOnProfiles: boolean,
   *   turnOnTimers  : boolean
   * }}
   */
  var Debug_DEFAULTS = {
    classTitle    : 'unknown',
    turnOffMethods: 'none',
    addBreakpoints: 'args fail',
    turnOnGroups  : true,
    openGroups    : false,
    turnOnProfiles: false,
    turnOnTimers  : false
  };

  /**
   * -----------------------------------------------
   * Public Variable (Debug_DEFAULT_TYPES)
   * -----------------------------------------------
   * @desc The data types for each settings property.
   * @type {!Object<string, string>}
   */
  var Debug_DEFAULT_TYPES = {
    classTitle    : 'string',
    turnOffMethods: 'string|!strings',
    addBreakpoints: 'string|!strings',
    turnOnGroups  : 'boolean',
    openGroups    : 'boolean',
    turnOnProfiles: 'boolean',
    turnOnTimers  : 'boolean'
  };

/* -----------------------------------------------------------------------------
 * The Public Module Methods (module-methods.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Method (makeNewDebugInst)
   * -----------------------------------------------------
   * @desc Creates a new Debug object instance. For more details about the
   *   parameters [see debugModuleAPI.init]{@link debugModuleAPI#init}.
   * @param {string} classTitle
   * @param {Object} settings
   * @param {(string|!strings)=} settings.turnOffMethods
   * @param {(string|!strings)=} settings.addBreakpoints
   * @param {boolean=} settings.turnOnGroups
   * @param {boolean=} settings.openGroups
   * @param {boolean=} settings.turnOnProfiles
   * @param {boolean=} settings.turnOnTimers
   */
  function makeNewDebugInst(classTitle, settings) {

    /** @type {!Object} */
    var defaultTypes;
    /** @type {!Object} */
    var newSettings;
    /** @type {!Object} */
    var defaults;
    /** @type {string} */
    var propName;
    /** @type {*} */
    var propVal;

    newSettings = {};
    defaults = Debug.defaults;

    // Set the new instance's settings to the defaults
    for (propName in defaults) {
      if ( hasOwnProp(defaults, propName) ) {
        newSettings[ propName ] = defaults[ propName ];
      }
    }

    // Update the new instance's settings with any local settings
    if (settings) {
      defaultTypes = Debug_DEFAULT_TYPES;
      for (propName in settings) {
        if (hasOwnProp(settings, propName) && hasOwnProp(defaults, propName)) {
          propVal = settings[ propName ];
          if ( checkType(propVal, defaultTypes[ propName ]) ) {
            if ( checkType(propVal, '!strings') ) {
              propVal = propVal.join(' ');
            }
            newSettings[ propName ] = propVal;
          }
        }
      }
    }

    // Update the new instance's class title
    newSettings.classTitle = classTitle;

    // Setup and save the new Debug instance
    debugInstances[ classTitle ] = new Debug(newSettings);
  };

  /**
   * -----------------------------------------------------
   * Public Method (insertErrorBreakpoint)
   * -----------------------------------------------------
   * @desc Handles whether a debugger breakpoint is inserted for an error.
   * @return {boolean} Whether a breakpoint was inserted.
   */
  function insertErrorBreakpoint() {

    if (errorBreakpoints) {
      debugger;
    }

    return errorBreakpoints;
  };

  /**
   * ---------------------------------------------------
   * Public Method (freezeObj)
   * ---------------------------------------------------
   * @desc A shortcut for the Object.freeze method with a deep freeze option.
   * @param {!(Object|function)} obj - The object to freeze.
   * @param {boolean=} deep - Deep freeze the object. The default is false.
   * @return {!(Object|function)} The frozen object.
   */
  var freezeObj = aIV.utils.freezeObj;

  /**
   * ---------------------------------------------------
   * Public Method (hasOwnProp)
   * ---------------------------------------------------
   * @desc A shortcut for the Object.prototype.hasOwnProperty method.
   * @param {!(Object|function)} obj - The object to check.
   * @param {string} prop - The property to check.
   * @return {boolean} The result of the check.
   */
  var hasOwnProp = aIV.utils.hasOwnProp;

  /**
   * ---------------------------------------------------
   * Public Method (checkType)
   * ---------------------------------------------------
   * @desc Checks a value's data type against the given optional types.
   * @param {*} val - The value to be evaluated.
   * @param {string} type - A string of the data types to evaluate the value
   *   against. For a complete list of acceptable strings
   *   [see aIV.utils.checkType]{@link https://github.com/imaginate/algorithmIV-javascript-shortcuts/blob/master/src/pre-compiled-parts/js-methods/checkType.js}.
   * @param {boolean=} noTypeValCheck - If true skips the data type string checks.
   *   The default is false. Use to avoid duplicating checks.
   * @return {boolean} The evaluation result.
   */
  var checkType = aIV.utils.checkType;

  /**
   * ---------------------------------------------------
   * Public Method (isValidTypeString)
   * ---------------------------------------------------
   * @desc Evaluates whether a string is a valid data type string.
   * @param {string} type - The string to evaluate.
   * @return {boolean} The evaluation result.
   */
  var isValidTypeString = aIV.utils.isValidTypeString;

  /**
   * ---------------------------------------------------
   * Public Method (getTypeOf)
   * ---------------------------------------------------
   * @desc A shortcut for the native typeof operator that additionally
   *   distinguishes null, array, document, and element types from an
   *   object type.
   * @param {*} val - The value to get the typeof.
   * @return {string} The value's type.
   */
  var getTypeOf = aIV.utils.getTypeOf;

  /**
   * -----------------------------------------------------
   * Public Method (makeResetString)
   * -----------------------------------------------------
   * @desc Makes an array of strings representing each value to be reset.
   * @param {Array<string>=} settings - The settings to reset.
   * @return {Array<string>} The array of strings to reset.
   */
  var makeResetString = (function setup_makeResetString() {

    /** @type {!Object<string, string>} */
    var props;
    /** @type {string} */
    var propName;

    // A hash map of propName => propName
    props = {
      errorBreakpoints   : 'errorBreakpoints',
      errorDebuggers     : 'errorBreakpoints',
      className          : 'classTitle',
      turnOffTypes       : 'turnOffMethods',
      turnOnDebuggers    : 'addBreakpoints',
      formatElementsAsObj: 'formatElementsAsObj'
    };

    for (propName in Debug_DEFAULTS) {
      if ( hasOwnProp(Debug_DEFAULTS, propName) ) {
        props[ propName ] = propName;
      }
    }

    return function makeResetString(settings) {

      /** @type {!Array<string>} */
      var result;
      /** @type {string} */
      var prop;
      /** @type {number} */
      var len;
      /** @type {number} */
      var i;

      if ( checkType(settings, '?null=') ) {
        result = [];
        // Add all props to the result
        for (prop in props) {
          if ( hasOwnProp(props, prop) ) {
            result.push(props[ prop ]);
          }
        }
      }
      else {
        if ( checkType(settings, '!strings') ) {
          result = [];
          // Add the correct props to the result
          i = settings.length;
          while (i--) {
            prop = args[i];
            if ( hasOwnProp(props, prop) ) {
              result.push(props[ prop ]);
            }
          }
        }
        else {
          result = null;
        }
      }

      return result;
    };
  })();

/* -----------------------------------------------------------------------------
 * The Errors Class (classes/errors.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Class (Errors)
   * -----------------------------------------------------
   * @desc Throws all of the Errors for the debugger.
   * @type {!Object<string, function>}
   * @struct
   */
  var Errors = {};

  /**
   * -----------------------------------------------------
   * Public Method (Errors.setConsoleTypeError)
   * -----------------------------------------------------
   * @desc Throws a TypeError for an invalid settings param in aIV.console.set.
   * @param {string} settingsType - The invalid data type for the settings param.
   */
  Errors.setConsoleTypeError = function(settingsType) {

    /** @type {string} */
    var message;

    message = 'An aIV.console.set call was missing a valid object for the new ';
    message += 'settings parameter (the first and only parameter). It should ';
    message += 'be an object with string => value pairs that match the module ';
    message += 'properties you want to set and their new value (e.g. property ';
    message += '=> value). The invalid settings data type was \'';
    message += settingsType + '\'';

    throw new TypeError(message);
  };

  /**
   * -----------------------------------------------------
   * Public Method (Errors.resetConsoleTypeError)
   * -----------------------------------------------------
   * @desc Throws a TypeError for an invalid setting param in aIV.console.reset.
   * @type {function}
   */
  Errors.resetConsoleTypeError = function() {

    /** @type {string} */
    var message;

    message = 'An aIV.console.reset call received an invalid setting ';
    message += 'parameter (should be a string or an array of strings).';

    throw new TypeError(message);
  };

  /**
   * -----------------------------------------------------
   * Public Method (Errors.invalidGetName)
   * -----------------------------------------------------
   * @desc Creates an error message for an invalid method/type name
   *   parameter in a Debug get method.
   * @param {string} method - The name of the method that failed.
   * @param {string} name - The user's method/type name parameter.
   * @return {string} The error message.
   */
  Errors.invalidGetName = function(method, name) {

    /** @type {string} */
    var message;

    message = 'An aIV.console ' + method + ' call was missing a valid method ';
    message += 'or type name parameter (the first parameter). It should be a ';
    message += 'string of the method/type name that ' + method + ' is to get. ';
    message += 'The invalid name was \'' + name + '\'.';

    return message;
  };

  /**
   * -----------------------------------------------------
   * Public Method (Errors.missingMethodName)
   * -----------------------------------------------------
   * @desc Creates an error message for a missing method name
   *   parameter in a Debug logging method.
   * @param {string} method - The name of the method that failed.
   * @param {*} methodName - The user's method name parameter.
   * @return {string} The error message.
   */
  Errors.missingMethodName = function(method, methodName) {

    /** @type {string} */
    var message;

    message = 'An aIV.console ' + method + ' call was missing a valid method ';
    message += 'name parameter (the first parameter). It should be a string ';
    message += 'of the method\'s name that ' + method + ' is recording. The ';
    message += 'invalid method name parameter\'s data type follows: ';
    message += (methodName === null) ? 'null' : typeof methodName;

    return message;
  };

  /**
   * -----------------------------------------------------
   * Public Method (Errors.missingTypeStrings)
   * -----------------------------------------------------
   * @desc Creates an error message for missing type string parameters
   *   in a Debug logging method.
   * @param {string} method - The name of the method that failed.
   * @return {string} The error message.
   */
  Errors.missingTypeStrings = function(method) {

    /** @type {string} */
    var message;

    message = 'An aIV.console ' + method + ' call was missing valid data ';
    message += 'type strings to use for testing arguments. For all arguments ';
    message += 'you should include a string of each argument\'s possible data ';
    message += 'types (e.g. \'!string|object\') as a parameter immediately ';
    message += 'following the argument parameter.';

    return message;
  };

  /**
   * -----------------------------------------------------
   * Public Method (Errors.missingTestArgs)
   * -----------------------------------------------------
   * @desc Creates an error message for missing type string parameters
   *   in a Debug logging method.
   * @return {string} The error message.
   */
  Errors.missingTestArgs = function() {

    /** @type {string} */
    var message;

    message = 'An aIV.console args call was missing arguments to test. ';
    message += 'The args method requires that at least one argument be ';
    message += 'tested. After the first parameter (the method name), the ';
    message += 'second parameter should be an argument to test, and the ';
    message += 'third parameter should be a string of the argument\'s ';
    message += 'optional data types. You can include as many pairs of ';
    message += 'arguments and optional data types as you like.';

    return message;
  };

  /**
   * -----------------------------------------------------
   * Public Method (Errors.invalidGroupType)
   * -----------------------------------------------------
   * @desc Creates an error message for an invalid console group type
   *   in a Debug logging method.
   * @param {*} groupType - The invalid group type.
   * @return {string} The error message.
   */
  Errors.invalidGroupType = function(groupType) {

    /** @type {string} */
    var message;

    message = 'An aIV.console group call was given an incorrect group ';
    message += 'type value for its second parameter. The  group\'s data ';
    message += 'type was \'';
    message += (groupType === null) ? 'null' : typeof groupType;
    message += '\',  and its value converted to a string was \'';
    message += groupType + '\'. It should be either \'open\', \'coll\', ';
    message += 'or \'end\'.';

    return message;
  };

  /**
   * -----------------------------------------------------
   * Public Method (Errors.missingErrorMessage)
   * -----------------------------------------------------
   * @desc Creates an error message for a missing error message parameter
   *   in a Debug logging method.
   * @param {string} logMessage - The log message.
   * @return {string} The error message.
   */
  Errors.missingErrorMessage = function(logMessage) {

    /** @type {string} */
    var message;

    message = 'An aIV.console fail call was missing a valid log message ';
    message += 'parameter (its third parameter). It should be a string ';
    message += 'of the error message to log upon test failure. The ';
    message += 'invalid message\'s data type was \'';
    message += (logMessage === null) ? 'null' : typeof logMessage;
    message += '\'';

    return message;
  };

  /**
   * -----------------------------------------------------
   * Public Method (Errors.missingStateValues)
   * -----------------------------------------------------
   * @desc Creates an error message for missing values in a Debug.proto.state
   *   call.
   * @return {string} The error message.
   */
  Errors.missingStateValues = function() {

    /** @type {string} */
    var message;

    message = 'An aIV.console state call was missing a state to log. After ';
    message += 'the first parameter (the method name), the second parameter ';
    message += 'should be a log message with $$ in the places where you would ';
    message += 'like the variable states to be inserted. The remaining ';
    message += 'parameters should be the variables to capture.';

    return message;
  };

  /**
   * -----------------------------------------------------
   * Public Method (Errors.missingLogMessage)
   * -----------------------------------------------------
   * @desc Creates an error message for a missing log message parameter
   *   in a Debug logging method.
   * @param {string} logMessage - The log message.
   * @return {string} The error message.
   */
  Errors.missingLogMessage = function(logMessage) {

    /** @type {string} */
    var message;

    message = 'An aIV.console misc call was missing a valid log message ';
    message += 'parameter (its second parameter). It should be a string ';
    message += 'of the message to log. The invalid message\'s data type ';
    message += 'was \'';
    message += (logMessage === null) ? 'null' : typeof logMessage;
    message += '\'';

    return message;
  };

  /**
   * -----------------------------------------------------
   * Public Method (Errors.invalidSetName)
   * -----------------------------------------------------
   * @desc Creates an error message for an invalid method/type name
   *   parameter in a Debug controlling method.
   * @param {string} method - The name of the method that failed.
   * @param {*} name - The user's method/type name parameter.
   * @return {string} The error message.
   */
  Errors.invalidSetName = function(method, name) {

    /** @type {string} */
    var message;

    message = 'An aIV.console ' + method + ' call was missing a valid method ';
    message += 'or type name parameter. It should be either a string or array ';
    message += 'of strings of the method/type name that ' + method + ' is to ';
    message += 'update. The invalid names follow: ' + name;

    return message;
  };

  freezeObj(Errors, true);

/* -----------------------------------------------------------------------------
 * The Debug Class Constructor (classes/debug/constructor.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Class (Debug)
   * -----------------------------------------------------
   * @desc Contains the debugging properties and methods.
   * @param {!Object<string, (string|boolean)>} settings - The class settings.
   * @param {string} settings.classTitle - The name of the class.
   * @param {string} settings.turnOffMethods - The class methods to disable. If
   *   'all' is provided then all methods are disabled.
   * @param {string} settings.addBreakpoints - The methods to add debugger
   *   breakpoints to. If 'all' is provided then breakpoints are added to all
   *   methods.
   * @param {boolean} settings.turnOnGroups - Enables/disables automatic
   *   grouping of all logs, timers, and profiles between every start and end
   *   method.
   * @param {boolean} settings.openGroups - For enabled automatic log grouping
   *   determines whether groups should be open or collapsed for this Debug
   *   instance (i.e. if turnOnGroups is enabled then openGroups controls
   *   whether the auto log groups are open or collapsed).
   * @param {boolean} settings.turnOnProfiles - Enables/disables automatic
   *   profiling for all logic between every start and end method.
   * @param {boolean} settings.turnOnTimers - Enables/disables automatic
   *   timing for all logic between every start and end method.
   * @constructor
   */
  var Debug = function(settings) {

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ---------------------------------------------------
     * Public Property (Debug.classTitle)
     * ---------------------------------------------------
     * @desc The class name for this instance.
     * @type {string}
     */
    this.classTitle = settings.classTitle + '.';

    /**
     * ---------------------------------------------------
     * Public Property (Debug.openGroups)
     * ---------------------------------------------------
     * @desc Whether auto log groups should be open or collapsed.
     * @type {boolean}
     */
    this.openGroups = settings.openGroups;

    ////////////////////////////////////////////////////////////////////////////
    // Define The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -----------------------------------------------------
     * Protected Property (methods)
     * -----------------------------------------------------
     * @desc Allows disabling of specific methods per class instance.
     *   <ol>
     *     <li>start: Logs the start of every method.</li>
     *     <li>end: Logs the end of every method.</li>
     *     <li>args: Evaluations that assert method's arguments and
     *         log error messages when they are incorrect.</li>
     *     <li>fail: Applies custom evaluations and logs errors when
     *         they occur.</li>
     *     <li>group: Groups console logs and shares any supplied
     *         properties.</li>
     *     <li>state: Logs the state of the supplied properties.</li>
     *     <li>misc: Logs a custom message and properties.</li>
     *   </ol>
     * @type {{
     *   init : boolean,
     *   start: boolean,
     *   end  : boolean,
     *   args : boolean,
     *   fail : boolean,
     *   group: boolean,
     *   state: boolean,
     *   misc : boolean
     * }}
     * @private
     */
    var methods;

    /**
     * -----------------------------------------------------
     * Protected Property (breakpoints)
     * -----------------------------------------------------
     * @desc Allows disabling of debugger breakpoints for specific methods.
     * @type {{
     *   init : boolean,
     *   start: boolean,
     *   end  : boolean,
     *   args : boolean,
     *   fail : boolean,
     *   group: boolean,
     *   state: boolean,
     *   misc : boolean
     * }}
     * @private
     */
    var breakpoints;

    /**
     * -----------------------------------------------------
     * Protected Property (groups)
     * -----------------------------------------------------
     * @desc Allows automatic grouping of all logs, timers, and profiles between
     *   every start and end method.
     * @type {boolean}
     * @private
     */
    var groups;

    /**
     * -----------------------------------------------------
     * Protected Property (profiles)
     * -----------------------------------------------------
     * @desc Allows automatic profiling for all logic between every start and
     *   end method.
     * @type {boolean}
     * @private
     */
    var profiles;

    /**
     * -----------------------------------------------------
     * Protected Property (timers)
     * -----------------------------------------------------
     * @desc Allows automatic timing for all logic between every start and end
     *   method.
     * @type {boolean}
     * @private
     */
    var timers;

    ////////////////////////////////////////////////////////////////////////////
    // Setup The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    settings.turnOffMethods = settings.turnOffMethods.toLowerCase();
    settings.addBreakpoints = settings.addBreakpoints.toLowerCase();

    methods = {
      init :  !/init|all/.test(settings.turnOffMethods),
      start: !/start|all/.test(settings.turnOffMethods),
      end  :   !/end|all/.test(settings.turnOffMethods),
      args :  !/args|all/.test(settings.turnOffMethods),
      fail :  !/fail|all/.test(settings.turnOffMethods),
      group: !/group|all/.test(settings.turnOffMethods),
      state: !/state|all/.test(settings.turnOffMethods),
      misc :  !/misc|all/.test(settings.turnOffMethods)
    };

    breakpoints = {
      init :  /init|all/.test(settings.addBreakpoints),
      start: /start|all/.test(settings.addBreakpoints),
      end  :   /end|all/.test(settings.addBreakpoints),
      args :  /args|all/.test(settings.addBreakpoints),
      fail :  /fail|all/.test(settings.addBreakpoints),
      group: /group|all/.test(settings.addBreakpoints),
      state: /state|all/.test(settings.addBreakpoints),
      misc :  /misc|all/.test(settings.addBreakpoints)
    };

    groups   = settings.turnOnGroups;
    profiles = settings.turnOnProfiles;
    timers   = settings.turnOnTimers;

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ---------------------------------------------------
     * Public Method (Debug.getMethod)
     * ---------------------------------------------------
     * @desc Gets a method's current value for whether it is active.
     * @param {string} method - The method value to get.
     * @return {boolean} The method's current enabled/disabled state.
     * @return {(boolean|undefined)} The method's current enabled/disabled
     *   state or undefined for an error.
     */
    this.getMethod = function(method) {

      if (!checkType(method, 'string') ||  !hasOwnProp(methods, method)) {
        console.error( Errors.invalidGetName('getMethod', method) );
        insertErrorBreakpoint();
        return;
      }

      return methods[ method ];
    };

    /**
     * ---------------------------------------------------
     * Public Method (Debug.getBreakpoint)
     * ---------------------------------------------------
     * @desc Gets a method's current value for whether it has added debugger
     *   breakpoints.
     * @param {string} method - The method value to get.
     * @return {(boolean|undefined)} The method's current breakpoint addition
     *   enabled/disabled state or undefined for an error.
     */
    this.getBreakpoint = function(method) {

      if (!checkType(method, 'string') || !hasOwnProp(breakpoints, method)) {
        console.error( Errors.invalidGetName('getBreakpoint', method) );
        insertErrorBreakpoint();
        return;
      }

      return breakpoints[ method ];
    };

    /**
     * ---------------------------------------------------
     * Public Method (Debug.getAuto)
     * ---------------------------------------------------
     * @desc Gets the current automated value for groups, profiles, and timers.
     * @param {string} prop - The automated type value to get.
     * @return {boolean} The automated type's current enabled/disabled state.
     */
    this.getAuto = function(prop) {

      /** @type {Object<string, boolean>} */
      var props;

      props = {
        groups  : groups,
        profiles: profiles,
        timers  : timers
      };

      if (!checkType(prop, 'string') || !hasOwnProp(props, prop)) {
        console.error( Errors.invalidGetName('getAuto', prop) );
        insertErrorBreakpoint();
        return;
      }

      return props[ prop ];
    };

    /**
     * ---------------------------------------------------
     * Public Method (Debug.setMethod)
     * ---------------------------------------------------
     * @desc Sets a method's active state.
     * @param {string} method - The method state to set.
     * @param {boolean} val - The new state.
     * @return {boolean} Indicates whether correct arguments were given.
     */
    this.setMethod = function(method, val) {

      if (!checkType(method, 'string') || !checkType(val, 'boolean')) {
        return false;
      }

      method = method.toLowerCase();

      if (!hasOwnProp(methods, method) && method !== 'all') {
        return false;
      }

      if (method === 'all') {
        for (method in methods) {
          if ( hasOwnProp(methods, method) ) {
            methods[ method ] = val;
          }
        }
      }
      else {
        methods[ method ] = val;
      }

      return true;
    };

    /**
     * ---------------------------------------------------
     * Public Method (Debug.setBreakpoint)
     * ---------------------------------------------------
     * @desc Sets a method's added breakpoints state.
     * @param {string} method - The method state to set.
     * @param {boolean} val - The new state.
     * @return {boolean} Indicates whether correct arguments were given.
     */
    this.setBreakpoint = function(method, val) {

      if (!checkType(method, 'string') || !checkType(val, 'boolean')) {
        return false;
      }

      method = method.toLowerCase();

      if (!hasOwnProp(breakpoints, method) && method !== 'all') {
        return false;
      }

      if (method === 'all') {
        for (method in breakpoints) {
          if ( hasOwnProp(breakpoints, method) ) {
            breakpoints[ method ] = val;
          }
        }
      }
      else {
        breakpoints[ method ] = val;
      }

      return true;
    };

    /**
     * ---------------------------------------------------
     * Public Method (Debug.setAuto)
     * ---------------------------------------------------
     * @desc Sets the current automated value for groups, profiles, and timers.
     * @param {string} prop - The automated type value to set.
     * @param {boolean} val - The new automated value.
     * @return {boolean} Indicates whether correct arguments were given.
     */
    this.setAuto = function(prop, val) {

      /** @type {Object<string, function(boolean)>} */
      var props;

      props = {
        groups  : function(val) { groups   = val; },
        profiles: function(val) { profiles = val; },
        timers  : function(val) { timers   = val; }
      };

      if (!checkType(prop, 'string') || !checkType(val, 'boolean')) {
        return false;
      }

      prop = prop.toLowerCase();

      if (!hasOwnProp(props, prop) && prop !== 'all') {
        return false;
      }

      if (prop === 'all') {
        for (prop in props) {
          if ( hasOwnProp(props, prop) ) {
            props[ prop ](val);
          }
        }
      }
      else {
        props[ prop ](val);
      }

      return true;
    };

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

    // Deep freeze this class instance
    freezeObj(this, true);
  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

  Debug.prototype.constructor = Debug;

/* -----------------------------------------------------------------------------
 * The Debug Class Logging Methods (classes/debug/logging-methods.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.init)
   * -----------------------------------------------------
   * @desc Used to log the start of a method, check for incorrect argument
   *   data types, and insert any automated actions.
   * @param {!(string|vals)} methodName - The name of the method or an array
   *   of all the parameters for this method (in the correct order).
   * @param {...val=} val - Each argument passed to the method.
   * @param {...string=} type -  Each passed argument's data type. To review
   *   the input options available
   *   [see the checkType helper method]{@link checkType}.
   * @return {boolean} Whether the method made two logs or not.
   * @example
   *   // Create an aIV.console class instance
   *   Example.prototype.constructor = function Example() {
   *     this.console = aIV.console.create('Example');
   *   };
   *   
   *   // Calling init with multiple params
   *   Example.prototype.paramsMethod = function(arg1, arg2) {
   *     this.console.init('paramsMethod', arg1, 'object', arg2, 'number=');
   *   };
   *   
   *   // Calling init with an array
   *   Example.prototype.arrayMethod = function(arg1, arg2) {
   *     var arr = [ 'arrayMethod', arg1, 'object', arg2, 'number=' ];
   *     this.console.init(arr);
   *   };
   */
  Debug.prototype.init = function(methodName) {

    /** @type {number} */
    var len;
    /** @type {!vals} */
    var args;
    /** @type {boolean} */
    var pass;
    /** @type {string} */
    var message;

    // Setup the variables
    if ( checkType(methodName, '!string|array') ) {
      if ( checkType(methodName, 'string') ) {
        args = ( (arguments.length > 1) ?
          Array.prototype.slice.call(arguments, 1) : []
        );
      }
      else {
        args = (methodName.length > 1) ? methodName.slice(1) : [];
        methodName = methodName[0];
      }
    }

    // Test the method name
    if ( !checkType(methodName, 'string') ) {
      console.error( Errors.missingMethodName('init', methodName) );
      insertErrorBreakpoint();
      return;
    }

    // Save a length reference
    len = args.length;

    // Test for each argument's data type string
    if (len) {
      if ((len % 2) || !Debug.checkArgsDataTypeStrings(args)) {
        console.error( Errors.missingTypeStrings('init') );
        insertErrorBreakpoint();
        return;
      }
    }

    // Check whether this method has been turned off
    if ( !this.getMethod('init') ) {
      Debug.handleAuto.call(this, 'groups', methodName);
      Debug.handleAuto.call(this, 'profiles', methodName);
      Debug.handleAuto.call(this, 'timers', methodName);
      return false;
    }

    // Insert auto grouping
    Debug.handleAuto.call(this, 'groups', methodName);

    // Test the arguments
    pass = (len) ? Debug.testArgTypes(args) : true;

    // Log an args error message and insert a debugger breakpoint
    if (!pass) {
      message = 'ARGS: ' + this.classTitle + methodName + '() | ';
      message += 'Error: Incorrect argument data type.';
      console.error(message);
      Debug.insertBreakpoint.call(this, 'init args');
    }

    // Remove the data type strings
    if (len) {
      args = Debug.stripArgTypeStrings(args);
    }

    // Prepare the call log message and arguments
    message = 'CALL: ' + this.classTitle + methodName;
    message += '(' + Debug.makeSubstituteStrings(args) + ')';
    args.unshift(message);

    // Log the call message
    console.log.apply(console, args);

    // Insert a debugger breakpoint
    Debug.insertBreakpoint.call(this, 'init');

    // Insert auto profiling and timing
    Debug.handleAuto.call(this, 'profiles', methodName);
    Debug.handleAuto.call(this, 'timers', methodName);

    return !pass;
  };

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.start)
   * -----------------------------------------------------
   * @desc Used to log the start of a method and insert any automated actions.
   * @param {!(string|vals)} methodName - The name of the method or an array
   *   of all the parameters for this method (in the correct order).
   * @param {...val=} val - Each argument passed to the method in order of
   *   appearance.
   * @return {boolean} Whether a log was made.
   * @example
   *   // Create an aIV.console class instance
   *   Example.prototype.constructor = function Example() {
   *     this.console = aIV.console.create('Example');
   *   };
   *   
   *   // Calling start with multiple params
   *   Example.prototype.paramsMethod = function(arg1, arg2) {
   *     this.console.start('paramsMethod', arg1, arg2);
   *   };
   *   
   *   // Calling start with an array
   *   Example.prototype.arrayMethod = function(arg1, arg2) {
   *     var arr = [ 'arrayMethod', arg1, arg2 ];
   *     this.console.start(arr);
   *   };
   */
  Debug.prototype.start = function(methodName) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;
    /** @type {!vals} */
    var args;
    /** @type {string} */
    var message;

    // Setup the variables
    if ( checkType(methodName, '!string|array') ) {
      if ( checkType(methodName, 'string') ) {
        args = ( (arguments.length > 1) ?
          Array.prototype.slice.call(arguments, 1) : []
        );
      }
      else {
        args = (methodName.length > 1) ? methodName.slice(1) : [];
        methodName = methodName[0];
      }
    }

    // Test the method name before executing
    if ( !checkType(methodName, 'string') ) {
      console.error( Errors.missingMethodName('start', methodName) );
      insertErrorBreakpoint();
      return;
    }

    // Check whether this method has been turned off
    if ( !this.getMethod('start') ) {
      Debug.handleAuto.call(this, 'groups', methodName);
      Debug.handleAuto.call(this, 'profiles', methodName);
      Debug.handleAuto.call(this, 'timers', methodName);
      return false;
    }

    // Insert auto grouping
    Debug.handleAuto.call(this, 'groups', methodName);

    // Prepare the call log message and arguments
    message = 'CALL: ' + this.classTitle + methodName;
    message += '(' + Debug.makeSubstituteStrings(args) + ')';
    args.unshift(message);

    // Log the start message
    console.log.apply(console, args);

    // Insert a debugger breakpoint
    Debug.insertBreakpoint.call(this, 'start');

    // Insert auto profiling and timing
    Debug.handleAuto.call(this, 'profiles', methodName);
    Debug.handleAuto.call(this, 'timers', methodName);

    return true;
  };

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.end)
   * -----------------------------------------------------
   * @desc Used to log the end of a method and insert any automated actions.
   * @param {!(string|vals)} methodName - The name of the method or an array
   *   of all the parameters for this method (in the correct order).
   * @param {val=} returnVal - The return value for the method.
   * @return {boolean} Whether a log was made.
   * @example
   *   // Create an aIV.console class instance
   *   Example.prototype.constructor = function Example() {
   *     this.console = aIV.console.create('Example');
   *   };
   *   
   *   // Calling end with multiple params
   *   Example.prototype.paramsMethod = function() {
   *     this.console.end('paramsMethod', returnVal);
   *   };
   *   
   *   // Calling end with an array
   *   Example.prototype.arrayMethod = function() {
   *     var arr = [ 'arrayMethod', returnVal ];
   *     this.console.end(arr);
   *   };
   */
  Debug.prototype.end = function(methodName, returnVal) {

    /** @type {string} */
    var message;

    // Setup the variables
    if ( checkType(methodName, '!array') ) {
      if (methodName.length > 1) {
        returnVal = methodName[1];
      }
      methodName = methodName[0];
    }

    // Test the method name before executing
    if ( !checkType(methodName, 'string') ) {
      console.error( Errors.missingMethodName('end', methodName) );
      insertErrorBreakpoint();
      return;
    }

    // Check whether this method has been turned off
    if ( !this.getMethod('end') ) {
      Debug.handleAuto.call(this, 'timers', methodName, true);
      Debug.handleAuto.call(this, 'profiles', methodName, true);
      Debug.handleAuto.call(this, 'groups', methodName, true);
      return false;
    }

    // Prepare the console message
    message = 'END: ' + this.classTitle + methodName + '() | ';
    message += 'return= ' + Debug.getSubstituteString(returnVal);

    // Log the end message
    console.log(message, returnVal);

    // Insert a debugger breakpoint
    Debug.insertBreakpoint.call(this, 'end');

    // Insert auto profiling and timing
    Debug.handleAuto.call(this, 'timers', methodName, true);
    Debug.handleAuto.call(this, 'profiles', methodName, true);

    // Insert auto grouping
    Debug.handleAuto.call(this, 'groups', methodName, true);

    return true;
  };

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.args)
   * -----------------------------------------------------
   * @desc Used to catch undesired argument data types.
   * @param {!(string|vals)} methodName - The name of the method or an array
   *   with all the parameters for this method (in the correct order).
   * @param {...val=} val - Each argument passed to the method.
   * @param {...string=} type -  Each argument's data type. To review
   *   the input options available
   *   [see the checkType helper method]{@link checkType}.
   * @return {boolean} Whether a log was made.
   * @example
   *   // Create an aIV.console class instance
   *   Example.prototype.constructor = function Example() {
   *     this.console = aIV.console.create('Example');
   *   };
   *   
   *   // Calling args with multiple params
   *   Example.prototype.paramsMethod = function(arg1, arg2) {
   *     this.console.args('paramsMethod', arg1, 'object', arg2, 'number=');
   *   };
   *   
   *   // Calling args with an array
   *   Example.prototype.arrayMethod = function(arg1, arg2) {
   *     var arr = [ 'arrayMethod', arg1, 'object', arg2, 'number=' ];
   *     this.console.args(arr);
   *   };
   */
  Debug.prototype.args = function(methodName) {

    /** @type {!vals} */
    var args;
    /** @type {string} */
    var message;

    // Setup the variables
    if ( checkType(methodName, '!string|array') ) {
      if ( checkType(methodName, 'string') ) {
        args = ( (arguments.length > 1) ?
          Array.prototype.slice.call(arguments, 1) : []
        );
      }
      else {
        args = (methodName.length > 1) ? methodName.slice(1) : [];
        methodName = methodName[0];
      }
    }

    // Test the method name
    if ( !checkType(methodName, 'string') ) {
      console.error( Errors.missingMethodName('args', methodName) );
      insertErrorBreakpoint();
      return;
    }

    // Test for arguments
    if (args.length < 2) {
      console.error( Errors.missingTestArgs() );
      insertErrorBreakpoint();
      return;
    }

    // Test each argument's data type string
    if ((args.length % 2) || !Debug.checkArgsDataTypeStrings(args)) {
      console.error( Errors.missingTypeStrings('args') );
      insertErrorBreakpoint();
      return;
    }

    // Check whether this method has been turned off
    if ( !this.getMethod('args') ) {
      return false;
    }

    // If test passes end this method
    if ( Debug.testArgTypes(args) ) {
      return false;
    }

    // Prepare and log the error message
    message = 'ARGS: ' + this.classTitle + methodName + '() | ';
    message += 'Error: Incorrect argument data type.';
    console.error(message);

    // Insert a debugger breakpoint
    Debug.insertBreakpoint.call(this, 'args');

    return true;
  };

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.fail)
   * -----------------------------------------------------
   * @desc Used to catch failures within a method. Comparable to console.assert.
   * @param {!(string|vals)} methodName - The name of the method or an array
   *   of all the parameters for this method (in correct order).
   * @param {val=} pass - The test to run. If this value is a function it runs
   *   it, converts its return to a boolean, and uses the result. Otherwise it
   *   converts it to a boolean. If the resulting boolean value is false then it
   *   logs an error.
   * @param {string=} message - The message to log if test fails. Use two
   *   consecutive dollar signs to include variable values in the message
   *   (e.g. This string, '... numberVar is $$ and  objectVar is $$', will
   *   be automatically converted to '... numberVar is %i, objectVar is %O').
   * @param {...val=} val - Any values to include in the error message.
   * @return {boolean} Whether a log was made.
   * @example
   *   // Create an aIV.console class instance
   *   Example.prototype.constructor = function Example() {
   *     this.console = aIV.console.create('Example');
   *   };
   *   
   *   Example.prototype.exampleMethod = function() {
   *     // An important variable
   *     var exampleVar = 'A random value';
   *     
   *     // A function that tests the value of exampleVar
   *     var testFunc = (function(exampleVar) {
   *       return function testFunc() {
   *         return (exampleVar.length > 20);
   *       };
   *     })(exampleVar);
   *     
   *     // The message to log on an error
   *     var errorMsg = 'Example error message exampleVar was $$.';
   *     
   *     // Calling fail with multiple params and a test function
   *     this.console.fail('exampleMethod', testFunc, errorMsg, exampleVar);
   *     
   *     // A test boolean value for exampleVar
   *     var testValue = (exampleVar.length > 20);
   *     
   *     // Calling fail with an array and a boolean test value
   *     var arr = [ 'exampleMethod', testValue, errorMsg, exampleVar ];
   *     this.console.fail(arr);
   *   };
   */
  Debug.prototype.fail = function(methodName, pass, message) {

    /** @type {!vals} */
    var args;

    // Setup the variables
    if ( checkType(methodName, '!string|array') ) {
      if ( checkType(methodName, 'string') ) {
        pass = ( checkType(pass, 'function') ) ? !!pass() : !!pass;
        args = ( (arguments.length > 3) ?
          Array.prototype.slice.call(arguments, 3) : []
        );
      }
      else {
        pass = methodName[1];
        pass = ( checkType(pass, 'function') ) ? !!pass() : !!pass;
        message = methodName[2];
        args = (methodName.length > 3) ? methodName.slice(3) : [];
        methodName = methodName[0];
      }
    }

    // Test the method name
    if ( !checkType(methodName, 'string') ) {
      console.error( Errors.missingMethodName('fail', methodName) );
      insertErrorBreakpoint();
      return;
    }

    // Test the error message
    if ( !checkType(message, 'string') ) {
      console.error( Errors.missingErrorMessage(message) );
      insertErrorBreakpoint();
      return false;
    }

    // Check whether this method has been turned off
    if ( !this.getMethod('fail') ) {
      return false;
    }

    // If test passes end this method
    if (pass) {
      return false;
    }

    // Prepare the message
    if (args.length) {
      message = Debug.insertSubstituteStrings(message, args);
    }
    message = 'FAIL: ' + this.classTitle + methodName + '() | ' + message;

    // Prepare the error log's arguments
    args.unshift(message);

    // Log the error
    console.error.apply(console, args);

    // Insert a debugger breakpoint
    Debug.insertBreakpoint.call(this, 'fail');

    return true;
  };

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.group)
   * -----------------------------------------------------
   * @desc Used to group console messages.
   * @param {(string|vals)} methodName - The name of the method or an array
   *   of all the parameters for this method (in the correct order).
   * @param {string=} groupType - The type of console group method to use. The
   *   options are: 'open'= console.group() | 'coll'= console.groupCollapsed()
   *   | 'end'= console.groupEnd(). The default value is 'open'.
   * @param {string=} message - A message to add to an open group call. Use two
   *   consecutive dollar signs to include variable values in the message
   *   (e.g. This string, '... numberVar is $$ and  objectVar is $$', will
   *   be automatically converted to '... numberVar is %i, objectVar is %O').
   * @param {...val=} val - Any values to include in the log message.
   * @return {boolean} Whether a group was opened/closed or not (i.e. action
   *   vs no action).
   * @example
   *   // Create an aIV.console class instance
   *   Example.prototype.constructor = function Example() {
   *     this.console = aIV.console.create('Example');
   *   };
   *   
   *   Example.prototype.exMethod = function() {
   *     // Important variables
   *     var exVar1 = 'A random value 1';
   *     var exVar2 = 'A random value 2';
   *     
   *     // The message to log
   *     var groupMsg = 'Lorem ipsem exVar1 is $$. | exVar2= $$';
   *     
   *     // Calling open group with multiple params
   *     this.console.group('exMethod', 'open', groupMsg, exVar1, exVar2);
   *     
   *     // Calling collapsed group with an array
   *     var arr = [ 'exMethod', 'coll', groupMsg, exVar1, exVar2 ];
   *     this.console.group(arr);
   *     
   *     // Calling close group
   *     this.console.group('exMethod', 'end');
   *   };
   */
  Debug.prototype.group = function(methodName, groupType, message) {

    /** @type {Object<string, string>} */
    var groupTypes;
    /** @type {!vals} */
    var args;

    groupTypes = {
      open: 'open',
      coll: 'coll',
      end : 'end'
    };

    // Setup the variables
    if ( checkType(methodName, '!string|array') ) {

      if ( checkType(methodName, 'string') ) {

        if ( checkType(groupType, 'undefined') ) {
          groupType = 'open';
        }
        if ( checkType(message, 'undefined') ) {
          message = '';
        }
        args = ( (arguments.length > 3) ?
          Array.prototype.slice.call(arguments, 3) : []
        );
      }
      else {
        groupType = (methodName.length > 1) ? methodName[1] : 'open';
        message = (methodName.length > 2) ? methodName[2] : '';
        args = (methodName.length > 3) ? methodName.slice(3) : [];
        methodName = methodName[0];
      }

      if ( !checkType(message, 'string') ) {
        args.unshift(message);
        message = '';
      }
    }

    // Test the method name
    if ( !checkType(methodName, 'string') ) {
      console.error( Errors.missingMethodName('group', methodName) );
      insertErrorBreakpoint();
      return;
    }

    // Test the group type
    if (!checkType(groupType, 'string') || !hasOwnProp(groupTypes, groupType)) {
      console.error( Errors.invalidGroupType(groupType) );
      insertErrorBreakpoint();
      return;
    }

    // Check whether this method has been turned off
    if ( !this.getMethod('group') ) {
      return false;
    }

    // Check for end group type
    if (groupType === 'end') {
      console.groupEnd();
      return true;
    }

    // Prepare the message
    if (message || args.length) {
      if (args.length) {
        message = Debug.insertSubstituteStrings(message, args);
      }
      message = ' | ' + message;
    }
    message = 'GROUP: ' + this.classTitle + methodName + '()' + message;

    // Prepare the group's arguments
    args.unshift(message);

    // Open a console group
    if (groupType === 'coll') {
      console.groupCollapsed.apply(console, args);
    }
    else {
      console.group.apply(console, args);
    }

    // Insert a debugger breakpoint
    Debug.insertBreakpoint.call(this, 'group');

    return true;
  };

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.state)
   * -----------------------------------------------------
   * @desc Used to log the state of a variable or property.
   * @param {!(string|vals)} methodName - The name of the method or an array
   *   of all the parameters for this method (in the correct order).
   * @param {string=} message - A log message that shares a state. Use two
   *   consecutive dollar signs to include variable values in the message
   *   (e.g. This string, '... numberVar is $$ and  objectVar is $$', will
   *   be automatically converted to '... numberVar is %i, objectVar is %O').
   * @param {...val=} val - The value's state to log.
   * @return {boolean} Whether a log was made.
   * @example
   *   // Create an aIV.console class instance
   *   Example.prototype.constructor = function Example() {
   *     this.console = aIV.console.create('Example');
   *   };
   *   
   *   Example.prototype.exMethod = function() {
   *     // Important variables
   *     var exVar1 = 'A random value 1';
   *     var exVar2 = 'A random value 2';
   *     
   *     // The message to log
   *     var stateMsg = 'Lorem ipsem exVar1 is $$ and exVar2= $$.';
   *     
   *     // Calling state with multiple params
   *     this.console.state('exMethod', stateMsg, exVar1, exVar2);
   *     
   *     // Calling state with an array
   *     var arr = [ 'exMethod', stateMsg, exVar1, exVar2 ];
   *     this.console.state(arr);
   *   };
   */
  Debug.prototype.state = function(methodName, message) {

    /** @type {!vals} */
    var args;

    // Setup the variables
    if ( checkType(methodName, '!string|array') ) {
      if ( checkType(methodName, 'string') ) {
        args = ( (arguments.length > 2) ?
          Array.prototype.slice.call(arguments, 2) : []
        );
      }
      else {
        message = (methodName.length > 1) ? methodName[1] : '';
        args = (methodName.length > 2) ? methodName.slice(2) : [];
        methodName = methodName[0];
      }

      if ( !checkType(message, 'string') ) {
        args.unshift(message);
        message = '';
      }
    }

    // Test the method name
    if ( !checkType(methodName, 'string') ) {
      console.error( Errors.missingMethodName('state', methodName) );
      insertErrorBreakpoint();
      return;
    }

    // Test the remaining arguments
    if (!args.length) {
      console.error( Errors.missingStateValues() );
      insertErrorBreakpoint();
      return;
    }

    // Check whether this method has been turned off
    if ( !this.getMethod('state') ) {
      return false;
    }

    // Prepare the message and arguments
    message = Debug.insertSubstituteStrings(message, args);
    message = 'STATE: ' + this.classTitle + methodName + '() | ' + message;
    args.unshift(message);

    // Log the state
    console.log.apply(console, args);

    // Insert a debugger breakpoint
    Debug.insertBreakpoint.call(this, 'state');

    return true;
  };

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.misc)
   * -----------------------------------------------------
   * @desc Used to make a custom console log.
   * @param {!(string|vals)} methodName - The name of the method or an
   *   array of all the parameters (in the correct order).
   * @param {string=} message - The log message. Use two consecutive
   *   dollar signs to include variable values in the message (e.g. This
   *   string, '... numberVar is $$ and  objectVar is $$', will be
   *   automatically converted to '... numberVar is %i, objectVar is %O').
   * @param {...val=} val - Any values to include in the log.
   * @return {boolean} Whether a log was made.
   * @example
   *   // Create an aIV.console class instance
   *   Example.prototype.constructor = function Example() {
   *     this.console = aIV.console.create('Example');
   *   };
   *   
   *   Example.prototype.exMethod = function() {
   *     // Important variables
   *     var exVar1 = 'A random value 1';
   *     var exVar2 = 'A random value 2';
   *     
   *     // The message to log
   *     var miscMsg = 'Lorem ipsem | exVar1= $$, exVar2= $$';
   *     
   *     // Calling misc with multiple params
   *     this.console.misc('exMethod', miscMsg, exVar1, exVar2);
   *     
   *     // Calling misc with an array
   *     var arr = [ 'exMethod', miscMsg, exVar1, exVar2 ];
   *     this.console.misc(arr);
   *   };
   */
  Debug.prototype.misc = function(methodName, message) {

    /** @type {!vals} */
    var args;

    // Setup the variables
    if ( checkType(methodName, '!string|array') ) {
      if ( checkType(methodName, 'string') ) {
        args = ( (arguments.length > 2) ?
          Array.prototype.slice.call(arguments, 2) : []
        );
      }
      else {
        message = (methodName.length > 1) ? methodName[1] : '';
        args = (methodName.length > 2) ? methodName.slice(2) : [];
        methodName = methodName[0];
      }

      if ( !checkType(message, 'string') ) {
        args.unshift(message);
        message = '';
      }
    }

    // Test the method name
    if ( !checkType(methodName, 'string') ) {
      console.error( Errors.missingMethodName('misc', methodName) );
      insertErrorBreakpoint();
      return;
    }

    // Test the log message
    if (!message && !args.length) {
      console.error( Errors.missingLogMessage(message) );
      insertErrorBreakpoint();
      return;
    }

    // Check whether this method has been turned off
    if ( !this.getMethod('misc') ) {
      return false;
    }

    // Prepare the message and arguments
    if (args.length) {
      message = Debug.insertSubstituteStrings(message, args);
    }
    message = 'MISC: ' + this.classTitle + methodName + '() | ' + message;
    args.unshift(message);

    // Log the misc message
    console.log.apply(console, args);

    // Insert a debugger breakpoint
    Debug.insertBreakpoint.call(this, 'misc');

    return true;
  };

/* -----------------------------------------------------------------------------
 * The Debug Class Controlling Methods (classes/debug/controlling-methods.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.turnOnMethod)
   * -----------------------------------------------------
   * @desc Used to enable any methods that are disabled.
   * @param {...!(string|strings)} method - The method to enable.
   *   If 'all' is provided then all methods are enabled.
   * @return {boolean} The update's success (if error return false).
   * @example
   *   // Create an aIV.console class instance
   *   Example.prototype.constructor = function Example() {
   *     this.console = aIV.console.create('Example');
   *   };
   *   
   *   Example.prototype.exMethod = function() {
   *     
   *     // Calling turnOnMethod with multiple params
   *     this.console.turnOnMethod('start', 'state');
   *     
   *     // Calling turnOnMethod with an array
   *     var arr = [ 'start', 'state' ];
   *     this.console.turnOnMethod(arr);
   *   };
   */
  Debug.prototype.turnOnMethod = function(method) {

    /** @type {!Debug} */
    var that;
    /** @type {function} */
    var setter;

    that = this;
    setter = function(method) {
      return that.setMethod(method, true);
    };

    if (arguments.length > 1) {
      method = Array.prototype.slice.call(arguments, 0).join(' ');
    }
    else if ( checkType(method, '!strings') ) {
      method = method.join(' ');
    }

    return Debug.handleToggle('turnOnMethod', setter, method);
  };

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.turnOn)
   * -----------------------------------------------------
   * @desc The same as {@link Debug.prototype.turnOnMethod}.
   * @type {function( ...!(string|strings) ): boolean}
   */
  Debug.prototype.turnOn = Debug.prototype.turnOnMethod;

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.turnOffMethod)
   * -----------------------------------------------------
   * @desc Used to disable any methods that are enabled.
   * @param {...!(string|strings)} method - The method to disable.
   *   If 'all' is provided then all methods are disabled.
   * @return {boolean} The update's success (if error return false).
   * @example
   *   // Create an aIV.console class instance
   *   Example.prototype.constructor = function Example() {
   *     this.console = aIV.console.create('Example');
   *   };
   *   
   *   Example.prototype.exMethod = function() {
   *     
   *     // Calling turnOffMethod with multiple params
   *     this.console.turnOffMethod('args', 'fail');
   *     
   *     // Calling turnOffMethod with an array
   *     var arr = [ 'args', 'fail' ];
   *     this.console.turnOffMethod(arr);
   *   };
   */
  Debug.prototype.turnOffMethod = function(method) {

    /** @type {!Debug} */
    var that;
    /** @type {function} */
    var setter;

    that = this;
    setter = function(method) {
      return that.setMethod(method, false);
    };

    if (arguments.length > 1) {
      method = Array.prototype.slice.call(arguments, 0).join(' ');
    }
    else if ( checkType(method, '!strings') ) {
      method = method.join(' ');
    }

    return Debug.handleToggle('turnOffMethod', setter, method);
  };

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.turnOff)
   * -----------------------------------------------------
   * @desc The same as {@link Debug.prototype.turnOffMethod}.
   * @type {function( ...!(string|strings) ): boolean}
   */
  Debug.prototype.turnOff = Debug.prototype.turnOffMethod;

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.addBreakpoint)
   * -----------------------------------------------------
   * @desc Used to add debugger breakpoints to methods.
   * @param {...!(string|strings)} method - The method to add to.
   *   If 'all' is provided then all methods will add breakpoints.
   * @return {boolean} The update's success (if error return false).
   * @example
   *   // Create an aIV.console class instance
   *   Example.prototype.constructor = function Example() {
   *     this.console = aIV.console.create('Example');
   *   };
   *   
   *   Example.prototype.exMethod = function() {
   *     
   *     // Calling addBreakpoint with multiple params
   *     this.console.addBreakpoint('args', 'fail');
   *     
   *     // Calling addBreakpoint with an array
   *     var arr = [ 'args', 'fail' ];
   *     this.console.addBreakpoint(arr);
   *   };
   */
  Debug.prototype.addBreakpoint = function(method) {

    /** @type {!Debug} */
    var that;
    /** @type {function} */
    var setter;

    that = this;
    setter = function(method) {
      return that.setBreakpoint(method, true);
    };

    if (arguments.length > 1) {
      method = Array.prototype.slice.call(arguments, 0).join(' ');
    }
    else if ( checkType(method, '!strings') ) {
      method = method.join(' ');
    }

    return Debug.handleToggle('addBreakpoint', setter, method);
  };

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.turnOnDebugger)
   * -----------------------------------------------------
   * @desc The same as {@link Debug.prototype.addBreakpoint}.
   * @type {function( ...!(string|strings) ): boolean}
   */
  Debug.prototype.turnOnDebugger = Debug.prototype.addBreakpoint;

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.removeBreakpoint)
   * -----------------------------------------------------
   * @desc Used to remove debugger breakpoints from methods.
   * @param {...!(string|strings)} method - The method to remove from.
   *   If 'all' is provided then all methods will not add breakpoints.
   * @return {boolean} The update's success (if error return false).
   * @example
   *   // Create an aIV.console class instance
   *   Example.prototype.constructor = function Example() {
   *     this.console = aIV.console.create('Example');
   *   };
   *   
   *   Example.prototype.exMethod = function() {
   *     
   *     // Calling removeBreakpoint with multiple params
   *     this.console.removeBreakpoint('start', 'state');
   *     
   *     // Calling removeBreakpoint with an array
   *     var arr = [ 'start', 'state' ];
   *     this.console.removeBreakpoint(arr);
   *   };
   */
  Debug.prototype.removeBreakpoint = function(method) {

    /** @type {!Debug} */
    var that;
    /** @type {function} */
    var setter;

    that = this;
    setter = function(method) {
      return that.setBreakpoint(method, false);
    };

    if (arguments.length > 1) {
      method = Array.prototype.slice.call(arguments, 0).join(' ');
    }
    else if ( checkType(method, '!strings') ) {
      method = method.join(' ');
    }

    return Debug.handleToggle('removeBreakpoint', setter, method);
  };

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.turnOffDebugger)
   * -----------------------------------------------------
   * @desc The same as {@link Debug.prototype.removeBreakpoint}.
   * @type {function( ...!(string|strings) ): boolean}
   */
  Debug.prototype.turnOffDebugger = Debug.prototype.removeBreakpoint;

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.turnOnAuto)
   * -----------------------------------------------------
   * @desc Used to enable any automations that are disabled.
   * @param {...!(string|strings)} type - The type to enable.
   *   If 'all' is provided then all automations are enabled.
   * @return {boolean} The update's success (if error return false).
   * @example
   *   // Create an aIV.console class instance
   *   Example.prototype.constructor = function Example() {
   *     this.console = aIV.console.create('Example');
   *   };
   *   
   *   Example.prototype.exMethod = function() {
   *     
   *     // Calling turnOnAuto with multiple params
   *     this.console.turnOnAuto('groups', 'timers');
   *     
   *     // Calling turnOnAuto with an array
   *     var arr = [ 'groups', 'timers' ];
   *     this.console.turnOnAuto(arr);
   *   };
   */
  Debug.prototype.turnOnAuto = function(type) {

    /** @type {!Debug} */
    var that;
    /** @type {function} */
    var setter;

    that = this;
    setter = function(type) {
      return that.setAuto(type, true);
    };

    if (arguments.length > 1) {
      type = Array.prototype.slice.call(arguments, 0).join(' ');
    }
    else if ( checkType(type, '!strings') ) {
      type = type.join(' ');
    }

    return Debug.handleToggle('turnOnAuto', setter, type);
  };

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.turnOffAuto)
   * -----------------------------------------------------
   * @desc Used to disable any automations that are enabled.
   * @param {...!(string|strings)} type - The type to disable.
   *   If 'all' is provided then all automations are disabled.
   * @return {boolean} The update's success (if error return false).
   * @example
   *   // Create an aIV.console class instance
   *   Example.prototype.constructor = function Example() {
   *     this.console = aIV.console.create('Example');
   *   };
   *   
   *   Example.prototype.exMethod = function() {
   *     
   *     // Calling turnOffAuto with multiple params
   *     this.console.turnOffAuto('groups', 'timers');
   *     
   *     // Calling turnOffAuto with an array
   *     var arr = [ 'groups', 'timers' ];
   *     this.console.turnOffAuto(arr);
   *   };
   */
  Debug.prototype.turnOffAuto = function(type) {

    /** @type {!Debug} */
    var that;
    /** @type {function} */
    var setter;

    that = this;
    setter = function(type) {
      return that.setAuto(type, false);
    };

    if (arguments.length > 1) {
      type = Array.prototype.slice.call(arguments, 0).join(' ');
    }
    else if ( checkType(type, '!strings') ) {
      type = type.join(' ');
    }

    return Debug.handleToggle('turnOffAuto', setter, type);
  };

/* -----------------------------------------------------------------------------
 * The Debug Class Helper Properties (classes/debug/helper-properties.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------
   * Public Property (Debug.defaults)
   * -----------------------------------------------
   * @desc Sets default settings for all instances of the debugger. Note that
   *   if local settings are provided upon a new instance call they will be used
   *   instead of the default settings.
   * @type {!{
   *   classTitle    : string,
   *   turnOffMethods: string,
   *   addBreakpoints: string,
   *   turnOnGroups  : boolean,
   *   openGroups    : boolean,
   *   turnOnProfiles: boolean,
   *   turnOnTimers  : boolean
   * }}
   */
  Debug.defaults = {
    classTitle    : Debug_DEFAULTS.classTitle,
    turnOffMethods: Debug_DEFAULTS.turnOffMethods,
    addBreakpoints: Debug_DEFAULTS.addBreakpoints,
    turnOnGroups  : Debug_DEFAULTS.turnOnGroups,
    openGroups    : Debug_DEFAULTS.openGroups,
    turnOnProfiles: Debug_DEFAULTS.turnOnProfiles,
    turnOnTimers  : Debug_DEFAULTS.turnOnTimers
  };

  /**
   * The automated actions object hash map.
   * @typedef {!{
   *   msgTitle : string,
   *   startFunc: function(string),
   *   endFunc  : function(string=)
   * }} autoMap
   */
  /**
   * -----------------------------------------------
   * Public Property (Debug.autoSettings)
   * -----------------------------------------------
   * @desc The settings for the automated debugger actions.
   * @type {!{
   *   groups  : autoMap,
   *   profiles: autoMap,
   *   timers  : autoMap
   * }}
   */
  Debug.autoSettings = {};
  Debug.autoSettings.groups = {
    msgTitle : 'GROUP',
    startFunc: function(label, openGroup) {
      if (openGroup) {
        console.group(label);
      }
      else {
        console.groupCollapsed(label);
      }
    },
    endFunc: function() {
      console.groupEnd();
    }
  };
  Debug.autoSettings.profiles = {
    msgTitle : 'PROFILE',
    startFunc: function(label) {
      console.profile(label);
    },
    endFunc: function() {
      console.profileEnd();
    }
  };
  Debug.autoSettings.timers = {
    msgTitle : 'TIME',
    startFunc: function(label) {
      console.time(label);
    },
    endFunc: function(label) {
      console.timeEnd(label);
    }
  };

  /**
   * ----------------------------------------------- 
   * Public Property (Debug.formatElementsAsObj)
   * -----------------------------------------------
   * @desc Controls whether logged DOM elements are shown as expandable
   *   objects or elements.
   * @type {boolean}
   */
  Debug.formatElementsAsObj = true;

/* -----------------------------------------------------------------------------
 * The Debug Class Helper Methods (classes/debug/helper-methods.js)
 * -------------------------------------------------------------------------- */

  /**
   * -----------------------------------------------
   * Public Property (Debug.replaceOldSettings)
   * -----------------------------------------------
   * @desc Handles moving old setting properties to the correct namespace.
   * @param {!Object} settings
   * @param {string=} settings.classTitle
   * @param {string=} settings.className
   * @param {(string|!strings)=} settings.turnOffMethods
   * @param {(string|!strings)=} settings.turnOffTypes
   * @param {(string|!strings)=} settings.addBreakpoints
   * @param {(string|!strings)=} settings.turnOnDebuggers
   * @param {boolean=} settings.turnOnGroups
   * @param {boolean=} settings.openGroups
   * @param {boolean=} settings.turnOnProfiles
   * @param {boolean=} settings.turnOnTimers
   * @return {!Object} The corrected settings object.
   */
  Debug.replaceOldSettings = (function setup_replaceOldSettings() {

    /** @type {!Object<string, string>} */
    var props;

    // A hash map of oldProp => newProp
    props = {
      className      : 'classTitle',
      turnOffTypes   : 'turnOffMethods',
      turnOnDebuggers: 'addBreakpoints'
    };

    return function replaceOldSettings(settings) {

      /** @type {string} */
      var oldProp;
      /** @type {string} */
      var newProp;

      // Check the settings for any old properties & correct them
      for (oldProp in props) {
        if (hasOwnProp(props, oldProp) && hasOwnProp(settings, oldProp)) {
          newProp = props[ oldProp ];
          if ( !hasOwnProp(settings, newProp) ) {
            settings[ newProp ] = settings[ oldProp ];
          }
        }
      }

      return settings;
    };
  })();

  /**
   * -----------------------------------------------------
   * Public Method (Debug.insertBreakpoint)
   * -----------------------------------------------------
   * @desc Handles whether a debugger breakpoint is inserted for every
   *   logging method.
   * @this {!Debug}
   * @param {string} method - The name of the method to insert for.
   * @return {boolean} Whether a breakpoint was inserted.
   */
  Debug.insertBreakpoint = (function() {

    /** @type {!RegExp} */
    var space;

    space = /\s/;

    return function insertBreakpoint(method) {

      /** @type {number} */
      var i;
      /** @type {boolean} */
      var pass;
      /** @type {strings} */
      var methods;

      methods = ( ( space.test(method) ) ?
        method.split(' ') : [ method ]
      );
      pass = false;

      i = methods.length;
      while (i--) {
        method = methods[i];
        pass = this.getBreakpoint(method);
        if (pass) {
          debugger;
          break;
        }
      }

      return pass;
    };
  })();

  /**
   * -----------------------------------------------------
   * Public Method (Debug.handleAuto)
   * -----------------------------------------------------
   * @desc Handles the automated actions for a logging method.
   * @this {!Debug}
   * @param {string} type - The type of automation to handle.
   * @param {string} methodName - The name of the user's method to log.
   * @param {boolean=} end - Controls whether the automation should start
   *   or end. The default value is false.
   * @return {boolean} The automation's success (i.e. whether an action
   *   was made).
   */
  Debug.handleAuto = function(type, methodName, end) {

    /** @type {boolean} */
    var pass;
    /** @type {string} */
    var label;

    pass = this.getAuto(type);

    if (pass) {

      label = Debug.autoSettings[ type ].msgTitle + ': ';
      label += this.classTitle + methodName;

      if (end) {
        Debug.autoSettings[ type ].endFunc(label);
      }
      else {
        Debug.autoSettings[ type ].startFunc(label, this.openGroups);
      }
    }

    return pass;
  };

  /**
   * -----------------------------------------------------
   * Public Method (Debug.handleToggle)
   * -----------------------------------------------------
   * @desc Handles the turn on/off actions for a Debug controlling method.
   * @param {string} callerName - The name of the caller method.
   * @param {function} setter - The setter to use.
   * @param {string} type - The type or method name to toggle.
   * @return {boolean} The toggle's success (i.e. whether an action was made).
   */
  Debug.handleToggle = function(callerName, setter, type) {

    /** @type {!strings} */
    var args;
    /** @type {number} */
    var len;
    /** @type {number} */
    var i;
    /** @type {!(string|strings)} */
    var errors;

    // Ensure invalid type names do not exist
    if ( !checkType(type, 'string') ) {
      console.error( Errors.invalidSetName(callerName, type) );
      insertErrorBreakpoint();
      return;
    }

    // Toggle the values & save any errors
    args = type.split(' ');
    len = args.length;
    i = -1;
    while (++i < len) {
      if ( !setter(args[i]) ) {
        if (!errors) {
          errors = [];
        }
        errors.push("'" + args[i] + "'");
      }
    }
    if (errors) {
      errors = errors.join(', ');
    }

    // Report any errors
    if (errors) {
      console.error( Errors.invalidSetName(callerName, errors) );
      insertErrorBreakpoint();
      return;
    }

    return true;
  };

  /**
   * ---------------------------------------------------
   * Public Method (Debug.getSubstituteString)
   * ---------------------------------------------------
   * @desc Gets the correct substitution string for the given value.
   * @param {val} val - The value to be evaluated.
   * @return {string} The correct substitution string.
   */
  Debug.getSubstituteString = function(val) {

    /** @type {string} */
    var str;

    str = ( (!checkType(val, '!object|function')) ?
      '%s' : (!Debug.formatElementsAsObj && val instanceof HTMLElement) ?
        '%o' : '%O'
    );

    return str;
  };

  /**
   * ---------------------------------------------------
   * Public Method (Debug.makeSubstituteStrings)
   * ---------------------------------------------------
   * @desc Creates a string of the correct matching substitution strings
   *   for a console log message.
   * @param {vals} vals - The values to match.
   * @return {string} The substitution strings.
   */
  Debug.makeSubstituteStrings = function(vals) {

    /** @type {number} */
    var i;
    /** @type {number} */
    var len;
    /** @type {string} */
    var message;

    message = '';

    len = vals.length;
    i = -1;
    while (++i < len) {
      if (i) {
        message += ', ';
      }
      message += Debug.getSubstituteString(vals[i]);
    }

    return message;
  };

  /**
   * ---------------------------------------------------
   * Public Method (Debug.insertSubstituteStrings)
   * ---------------------------------------------------
   * @desc Inserts the correct substitution strings into a log message.
   * @param {string} msg - The original console message string.
   * @param {vals} vals - The values to use for finding the
   *   substitution strings.
   * @return {string} The prepared console message.
   */
  Debug.insertSubstituteStrings = (function() {

    /** @type {!RegExp} */
    var dualDollarSigns;

    dualDollarSigns = /([^\\]*?)\$\$/;

    return function insertSubstituteStrings(msg, vals) {

      /** @type {number} */
      var len;
      /** @type {number} */
      var i;
      /** @type {string} */
      var substituteString;

      // Insert the substitution strings
      len = vals.length;
      i = -1;
      while (++i < len) {

        substituteString = Debug.getSubstituteString(vals[i]);

        if ( dualDollarSigns.test(msg) ) {
          substituteString = '$1' + substituteString;
          msg = msg.replace(dualDollarSigns, substituteString);
        }
        else {
          msg += '; unnamedVar' + i + '= ' + substituteString;
        }
      }

      return msg;
    };
  })();

  /**
   * ---------------------------------------------------
   * Public Method (Debug.checkArgsDataTypeStrings)
   * ---------------------------------------------------
   * @desc Evaluates whether the arguments contain valid data type string
   *   values for each argument.
   * @param {!vals} args - The arguments to be evaluated.
   * @return {boolean} The evaluation result.
   */
  Debug.checkArgsDataTypeStrings = function(args) {

    /** @type {number} */
    var i;
    /** @type {boolean} */
    var pass;

    pass = true;

    i = args.length;
    while (i--) {

      if (i % 2) {
        pass = checkType(args[i], 'string', true);
        pass = pass && isValidTypeString(args[i]);
      }

      if (!pass) {
        break;
      }
    }

    return pass;
  };

  /**
   * ---------------------------------------------------
   * Public Method (Debug.testArgTypes)
   * ---------------------------------------------------
   * @desc Evaluates argument data types.
   * @param {!vals} args - The arguments to be evaluated.
   * @return {boolean} The evaluation result.
   */
  Debug.testArgTypes = function(args) {

    /** @type {number} */
    var i;
    /** @type {boolean} */
    var pass;
    /** @type {string} */
    var dataTypeOpts;

    pass = true;

    i = args.length;
    while (i--) {

      dataTypeOpts = args[i];
      --i;
      pass = checkType(args[i], dataTypeOpts, true);

      if (!pass) {
        break;
      }
    }

    return pass;
  };

  /**
   * ---------------------------------------------------
   * Public Method (Debug.stripArgTypeStrings)
   * ---------------------------------------------------
   * @desc Removes the data type strings from an array of arguments.
   * @param {!vals} args - The arguments.
   * @return {!vals} An array of the stripped arguments.
   */
  Debug.stripArgTypeStrings = function(args) {

    /** @type {number} */
    var i;
    /** @type {number} */
    var ii;
    /** @type {number} */
    var len;
    /** @type {!vals} */
    var newArgs;

    len = args.length / 2;
    newArgs = new Array(len);

    i = args.length;
    ii = len;
    while (ii--) {
      i = i - 2;
      newArgs[ii] = args[i];
    }

    return newArgs;
  };

////////////////////////////////////////////////////////////////////////////////
// The Debug Module End
////////////////////////////////////////////////////////////////////////////////

  return debugModuleAPI;

})(window, document));
  /**
   * -----------------------------------------------------
   * Global Object (console)
   * -----------------------------------------------------
   * @desc A polyfill for the native object. For method details
   *   [see MDN]{@link https://developer.mozilla.org/en-US/docs/Web/API/Console}
   * @type {Object<string, function}
   */
  window.console = window.console || {};

  (function(console, emptyFunc) {

    // Note: The console method polyfills are completed alphabetically with the
    // exception of console.log and console.error

    if (!console.log) {
      /**
       * ---------------------------------------------
       * Public Method (console.log)
       * ---------------------------------------------
       * @desc A polyfill for the native method. For method details
       *   [see MDN]{@link https://developer.mozilla.org/en-US/docs/Web/API/Console/log}
       * @param {...*} val
       */
      console.log = emptyFunc;
    }

    if (!console.error) {
      /**
       * ---------------------------------------------
       * Public Method (console.error)
       * ---------------------------------------------
       * @desc A polyfill for the native method. For method details
       *   [see MDN]{@link https://developer.mozilla.org/en-US/docs/Web/API/Console/error}
       * @param {...*} val
       */
      console.error = console.log;
    }

    if (!console.assert) {
      /**
       * ---------------------------------------------
       * Public Method (console.assert)
       * ---------------------------------------------
       * @desc A polyfill for the native method. For method details
       *   [see MDN]{@link https://developer.mozilla.org/en-US/docs/Web/API/console/assert}
       * @param {boolean} assertion
       * @param {...*} val
       */
      console.assert = function(assertion) {

        /** @type {!Array<*>} */
        var args;

        if (assertion) {
          return;
        }

        args = ( (arguments.length > 1) ?
          Array.prototype.slice.call(arguments, 1)
          : [ 'A console.assert call failed.' ]
        );

        return console.error.apply(this, args);
      };
    }

    if (!console.clear) {
      /**
       * ---------------------------------------------
       * Public Method (console.clear)
       * ---------------------------------------------
       * @desc A polyfill for the native method. For method details
       *   [see Chrome]{@link https://developer.chrome.com/devtools/docs/console-api#consoleclear}
       * @type {function}
       */
      console.clear = emptyFunc;
    }

    if (!console.count) {
      /**
       * ---------------------------------------------
       * Public Method (console.count)
       * ---------------------------------------------
       * @desc A polyfill for the native method. For method details
       *   [see MDN]{@link https://developer.mozilla.org/en-US/docs/Web/API/Console/count}
       * @param {string=} label
       */
      console.count = emptyFunc;
    }

    if (!console.debug) {
      /**
       * ---------------------------------------------
       * Public Method (console.debug)
       * ---------------------------------------------
       * @desc A polyfill for the native method. For method details
       *   [see Chrome]{@link https://developer.chrome.com/devtools/docs/console-api#consoledebugobject-object}
       * @param {...*} val
       */
      console.debug = console.log;
    }

    if (!console.dir) {
      /**
       * ---------------------------------------------
       * Public Method (console.dir)
       * ---------------------------------------------
       * @desc A polyfill for the native method. For method details
       *   [see Chrome]{@link https://developer.chrome.com/devtools/docs/console-api#consoledirobject}
       * @param {!(Object|function)} obj
       */
      console.dir = console.log;
    }

    if (!console.dirxml) {
      /**
       * ---------------------------------------------
       * Public Method (console.dirxml)
       * ---------------------------------------------
       * @desc A polyfill for the native method. For method details
       *   [see Chrome]{@link https://developer.chrome.com/devtools/docs/console-api#consoledirxmlobject}
       * @param {!(Object|function)} obj
       */
      console.dirxml = console.log;
    }

    if (!console.exception) {
      /**
       * ---------------------------------------------
       * Public Method (console.exception)
       * ---------------------------------------------
       * @desc A polyfill for the native method. For method details
       *   [see MDN]{@link https://developer.mozilla.org/en-US/docs/Web/API/Console/error}
       * @param {...*} val
       */
      console.exception = console.error;
    }

    if (!console.group) {
      /**
       * ---------------------------------------------
       * Public Method (console.group)
       * ---------------------------------------------
       * @desc A polyfill for the native method. For method details
       *   [see Chrome]{@link https://developer.chrome.com/devtools/docs/console-api#consolegroupobject-object}
       * @param {...*} val
       */
      console.group = emptyFunc;
    }

    if (!console.groupCollapsed) {
      /**
       * ---------------------------------------------
       * Public Method (console.groupCollapsed)
       * ---------------------------------------------
       * @desc A polyfill for the native method. For method details
       *   [see Chrome]{@link https://developer.chrome.com/devtools/docs/console-api#consolegroupcollapsedobject-object}
       * @param {...*} val
       */
      console.groupCollapsed = console.group;
    }

    if (!console.groupEnd) {
      /**
       * ---------------------------------------------
       * Public Method (console.groupEnd)
       * ---------------------------------------------
       * @desc A polyfill for the native method. For method details
       *   [see MDN]{@link https://developer.mozilla.org/en-US/docs/Web/API/Console/groupEnd}
       * @type {function}
       */
      console.groupEnd = emptyFunc;
    }

    if (!console.info) {
      /**
       * ---------------------------------------------
       * Public Method (console.info)
       * ---------------------------------------------
       * @desc A polyfill for the native method. For method details
       *   [see MDN]{@link https://developer.mozilla.org/en-US/docs/Web/API/Console/info}
       * @param {...*} val
       */
      console.info = console.log;
    }

    if (!console.markTimeline) {
      /**
       * ---------------------------------------------
       * Public Method (console.markTimeline)
       * ---------------------------------------------
       * @desc A polyfill for the native method. For method details
       *   [see Apple]{@link https://developer.apple.com/library/mac/documentation/AppleApplications/Conceptual/Safari_Developer_Guide/Console/Console.html#//apple_ref/doc/uid/TP40007874-CH6-SW8}
       * @param {string} label
       */
      console.markTimeline = ( (!console.timeStamp) ?
        emptyFunc : console.timeStamp
      );
    }

    if (!console.profile) {
      /**
       * ---------------------------------------------
       * Public Method (console.profile)
       * ---------------------------------------------
       * @desc A polyfill for the native method. For method details
       *   [see Chrome]{@link https://developer.chrome.com/devtools/docs/console-api#consoleprofilelabel}
       * @param {string=} label
       */
      console.profile = emptyFunc;
    }

// profiles,profileEnd,show,table,time,timeEnd,timeline,timelineEnd

    if (!console.timeStamp) {
      /**
       * ---------------------------------------------
       * Public Method (console.timeStamp)
       * ---------------------------------------------
       * @desc A polyfill for the native method. For method details
       *   [see Chrome]{@link https://developer.chrome.com/devtools/docs/console-api#consoletimestamplabel}
       * @param {string=} label
       */
      console.timeStamp = console.markTimeline;
    }

    if (!console.trace) {
      /**
       * ---------------------------------------------
       * Public Method (console.trace)
       * ---------------------------------------------
       * @desc A polyfill for the native method. For method details
       *   [see Chrome]{@link https://developer.chrome.com/devtools/docs/console-api#consoletraceobject}
       * @param {...*} val
       */
      console.trace = console.log;
    }

    if (!console.warn) {
      /**
       * ---------------------------------------------
       * Public Method (console.warn)
       * ---------------------------------------------
       * @desc A polyfill for the native method. For method details
       *   [see MDN]{@link https://developer.mozilla.org/en-US/docs/Web/API/Console/error}
       * @param {...*} val
       */
      console.warn = console.error;
    }

    // Convert console objects to functions if needed (IE8 & IE9)
    (function(funcSetupNeeded, bind, call, slice) {

      /** @type {number} */
      var i;
      /** @type {string} */
      var method;
      /** @type {!Array<string>} */
      var methodsIE8;
      /** @type {!Array<string>} */
      var methodsIE9;

      if (funcSetupNeeded) {

        methodsIE8 = [ 'assert', 'error', 'info', 'log', 'warn' ];
        methodsIE9 = [ 'clear', 'dir', 'profile', 'profileEnd' ];
        methodsIE9 = methodsIE8.concat(methodsIE9);

        if (bind) {
          i = methodsIE9.length;
          while (i--) {
            method = console[ methodsIE9[i] ];
            console[ methodsIE9[i] ] = bind.call(method, console);
          }
        }
        else {
          i = methodsIE8.length;
          while (i--) {
            method = console[ methodsIE8[i] ];
            call.call(method, console, slice.call(arguments));
          }
        }
      }
    })((typeof console.log === 'object'), Function.prototype.bind,
        Function.prototype.call, Array.prototype.slice);

  })(window.console, function() { return; });

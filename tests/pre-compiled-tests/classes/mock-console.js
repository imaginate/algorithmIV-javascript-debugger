  /**
   * -----------------------------------------------------
   * Public Class (MockConsole)
   * -----------------------------------------------------
   * @desc Mocks the Console class for testing.
   * @constructor
   */
  var MockConsole = function() {

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Property (MockConsole.logs)
     * -----------------------------------------------
     * @desc The logs made.
     * @type {!strings}
     */
    this.logs = [];

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Protected Property (MockConsole.originals)
     * -----------------------------------------------
     * @desc The original console methods (that will be temporarily overridden).
     * @type {!Object<string, function>}
     */
    var originals = {
      log     : console.log,
      error   : console.error,
      group   : console.group,
      groupEnd: console.groupEnd
    };

    /**
     * ----------------------------------------------- 
     * Protected Property (MockConsole.that)
     * -----------------------------------------------
     * @desc The MockConsole Instance.
     * @type {!Object<string, !strings>}
     */
    var that = this;

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Method (MockConsole.reset)
     * -----------------------------------------------
     * @desc Resets the global Console object to its orginal settings.
     * @type {function}
     */
    this.reset = function() {
      console.log = originals.log;
      console.error = originals.error;
      console.group = originals.group;
      console.groupEnd = originals.groupEnd;
    };

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Mock Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * -----------------------------------------------
     * Mock Method (MockConsole.log)
     * -----------------------------------------------
     * @type {function}
     */
    console.log = function(message) {

      /** @type {string} */
      var log;
      /** @type {!strings} */
      var args;

      args = ( (arguments.length > 1) ?
        Array.prototype.slice.call(arguments, 1) : []
      );

      log = 'LOG: ' + message;
      if (args.length) {
        log += ' ' + args.join(' ');
      }

      that.logs.push(log);

      args.unshift(message);
      originals.log.apply(console, args);
    };

    /**
     * -----------------------------------------------
     * Mock Method (MockConsole.error)
     * -----------------------------------------------
     * @type {function}
     */
    console.error = function(message) {

      /** @type {string} */
      var log;
      /** @type {!strings} */
      var args;

      args = ( (arguments.length > 1) ?
        Array.prototype.slice.call(arguments, 1) : []
      );

      log = 'ERROR: ' + message;
      if (args.length) {
        log += ' ' + args.join(' ');
      }

      that.logs.push(log);

      args.unshift(message);
      originals.error.apply(console, args);
    };

    /**
     * -----------------------------------------------
     * Mock Method (MockConsole.log)
     * -----------------------------------------------
     * @type {function}
     */
    console.group = function(message) {

      /** @type {string} */
      var log;
      /** @type {!strings} */
      var args;

      args = ( (arguments.length > 1) ?
        Array.prototype.slice.call(arguments, 1) : []
      );

      log = 'OPEN GROUP: ' + message;
      if (args.length) {
        log += ' ' + args.join(' ');
      }

      that.logs.push(log);

      args.unshift(message);
      originals.group.apply(console, args);
    };

    /**
     * -----------------------------------------------
     * Mock Method (MockConsole.log)
     * -----------------------------------------------
     * @type {function}
     */
    console.groupEnd = function() {

      /** @type {string} */
      var log;

      log = 'CLOSE GROUP';

      that.logs.push(log);

      originals.groupEnd.call(console);
    };

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

    // Freeze class instance & method
    aIV.utils.freezeObj(this);
    aIV.utils.freezeObj(this.reset);
  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

  MockConsole.prototype.constructor = MockConsole;

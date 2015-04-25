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
   * @param {boolean} settings.turnOnProfiles - Enables/disables automatic
   *   profiling for all logic between every start and end method.
   * @param {boolean} settings.turnOnTimers - Enables/disables automatic
   *   timing for all logic between every start and end method.
   * @constructor
   */
  var Debug = function(settings) {


    ////////////////////////////////////////////////////////////////////////////
    // Define The Public Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ---------------------------------------------------
     * Public Property (Debug.classTitle)
     * ---------------------------------------------------
     * @desc The class name for the instance.
     * @type {string}
     */
    this.classTitle;

    /**
     * The automated actions object hash map.
     * @typedef {{
     *   msgTitle : string,
     *   startFunc: function(string),
     *   endFunc  : function(string=)
     * }} autoMap
     */

    /**
     * ---------------------------------------------------
     * Public Property (Debug.autoSettings)
     * ---------------------------------------------------
     * @desc The settings for the automated actions.
     * @type {{
     *   groups  : autoMap,
     *   profiles: autoMap,
     *   timers  : autoMap
     * }}
     */
    this.autoSettings;


    ////////////////////////////////////////////////////////////////////////////
    // Setup The Public Properties
    ////////////////////////////////////////////////////////////////////////////

    this.classTitle = settings.classTitle + '.';

    this.autoSettings = {};
    this.autoSettings.groups = {
      msgTitle : 'GROUPS',
      startFunc: function(label) { console.groupCollapsed(label); },
      endFunc  : function(label) { console.groupEnd(); }
    };
    this.autoSettings.profiles = {
      msgTitle : 'PROFILE',
      startFunc: function(label) { console.profile(label); },
      endFunc  : function(label) { console.profileEnd(); }
    };
    this.autoSettings.timers = {
      msgTitle : 'TIME',
      startFunc: function(label) { console.time(label); },
      endFunc  : function(label) { console.timeEnd(label); }
    };

    Object.freeze(this.autoSettings);
    Object.freeze(this.autoSettings.groups);
    Object.freeze(this.autoSettings.profiles);
    Object.freeze(this.autoSettings.timers);


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
      start: !/start|all/.test(settings.turnOffMethods),
      end  :   !/end|all/.test(settings.turnOffMethods),
      args :  !/args|all/.test(settings.turnOffMethods),
      fail :  !/fail|all/.test(settings.turnOffMethods),
      group: !/group|all/.test(settings.turnOffMethods),
      state: !/state|all/.test(settings.turnOffMethods),
      misc :  !/misc|all/.test(settings.turnOffMethods)
    };

    breakpoints = {
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

      /** @type {string} */
      var msg;

      if (!checkType(method, 'string') ||  !methods.hasOwnProperty(method)) {
        msg = 'An aIV.debug getMethod call was given an incorrect method ';
        msg += 'name. The given incorrect method name was \'' + method + '\'.';
        console.error(msg);
        if (errorBreakpoints) {
          debugger;
        }
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

      /** @type {string} */
      var msg;

      if (!checkType(method, 'string') || !breakpoints.hasOwnProperty(method)) {
        msg = 'An aIV.debug getBreakpoint call was given an incorrect method ';
        msg += 'name. The given incorrect method name was \'' + method + '\'.';
        console.error(msg);
        if (errorBreakpoints) {
          debugger;
        }
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
      /** @type {string} */
      var msg;

      props = {
        groups  : groups,
        profiles: profiles,
        timers  : timers
      };

      if (!checkType(prop, 'string') || !props.hasOwnProperty(prop)) {
        msg = 'An aIV.debug getAuto call was given an incorrect type name. ';
        msg += 'The given incorrect type name was \'' + prop + '\'.';
        console.error(msg);
        if (errorBreakpoints) {
          debugger;
        }
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

      if (!methods.hasOwnProperty(method) && method !== 'all') {
        return false;
      }

      if (method === 'all') {
        for (method in methods) {
          if ( methods.hasOwnProperty(method) ) {
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

      if (!breakpoints.hasOwnProperty(method) && method !== 'all') {
        return false;
      }

      if (method === 'all') {
        for (method in breakpoints) {
          if ( breakpoints.hasOwnProperty(method) ) {
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
     */
    this.setAuto = function(prop, val) {

      /** @type {Object<string, function(boolean)>} */
      var props;

      props = {
        groups  : function(val) { groups   = val; },
        profiles: function(val) { profiles = val; },
        timers  : function(val) { timers   = val; }
      };

      props[ prop ](!!val);
    };

    // Freeze all of the public methods
    Object.freeze(this.getMethod);
    Object.freeze(this.getBreakpoint);
    Object.freeze(this.getAuto);
    Object.freeze(this.setMethod);
    Object.freeze(this.setBreakpoint);
    Object.freeze(this.setAuto);


    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

    // Freeze this class instance
    Object.freeze(this);
  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

  Debug.prototype.constructor = Debug;

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
   * Global Method (aIV.console.reset) (SAME AS aIV.debug.reset)
   * ---------------------------------------------------------------
   * @desc Allows you to reset any of the settings for the debugger.
   * @param {...(string|strings)=} setting - A setting to reset. If no arguments
   *   are given this method will automatically reset all of the options.
   * @return {boolean} The success of the new settings update.
   */
  aIV.console.reset = debugModuleAPI.reset;

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
   * Global Method (aIV.debug.reset) (SAME AS aIV.console.reset)
   * ---------------------------------------------------------------
   * @desc The same as {@link aIV.console.reset}.
   * @type {function}
   * @global
   */
  aIV.debug.reset = debugModuleAPI.reset;

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

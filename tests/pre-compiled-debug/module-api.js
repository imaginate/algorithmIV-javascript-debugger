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
   * @param {boolean=} settings.turnOnProfiles - Enables/disables automatic
   *   profiling for all logic between every start and end method for this
   *   Debug instance.
   * @param {boolean=} settings.turnOnTimers - Enables/disables automatic
   *   timing for all logic between every start and end method for this
   *   Debug instance.
   * @return {Debug} A new or existing Debug object.
   */
  debugModuleAPI.init = function(settings) {

    /** @type {string} */
    var classTitle;
    /** @type {string} */
    var turnOffMethods;
    /** @type {string} */
    var addBreakpoints;
    /** @type {boolean} */
    var turnOnGroups;
    /** @type {boolean} */
    var turnOnProfiles;
    /** @type {boolean} */
    var turnOnTimers;

    // Catch incorrect data types for settings
    if ( !checkType(settings, '?(string|object)') ) {
      settings = null;
    }

    // Setup classTitle
    classTitle = defaultSettings.classTitle;
    if ( checkType(settings, 'string') ) {
      classTitle = settings;
      settings = null;
    }
    if (settings) {
      if ( hasOwnProp(settings, 'classTitle') ) {
        classTitle = settings.classTitle;
      }
      else if ( hasOwnProp(settings, 'className') ) {
        classTitle = settings.className;
      }
    }

    // Create a new Debug instance
    if ( !hasOwnProp(debugInstances, classTitle) ) {

      // Setup turnOffMethods
      turnOffMethods = defaultSettings.turnOffMethods;
      if (settings) {
        if ( hasOwnProp(settings, 'turnOffMethods') ) {
          if ( checkType(settings.turnOffMethods, 'string') ) {
            turnOffMethods = settings.turnOffMethods;
          }
          else if ( checkType(settings.turnOffMethods, '!strings') ) {
            turnOffMethods = settings.turnOffMethods.join(' ');
          }
        }
        else if ( hasOwnProp(settings, 'turnOffTypes') ) {
          if ( checkType(settings.turnOffTypes, 'string') ) {
            turnOffMethods = settings.turnOffTypes;
          }
          else if ( checkType(settings.turnOffTypes, '!strings') ) {
            turnOffMethods = settings.turnOffTypes.join(' ');
          }
        }
      }

      // Setup addBreakpoints
      addBreakpoints = defaultSettings.addBreakpoints;
      if (settings) {
        if ( hasOwnProp(settings, 'addBreakpoints') ) {
          if ( checkType(settings.addBreakpoints, 'string') ) {
            addBreakpoints = settings.addBreakpoints;
          }
          else if ( checkType(settings.addBreakpoints, '!strings') ) {
            addBreakpoints = settings.addBreakpoints.join(' ');
          }
        }
        else if ( hasOwnProp(settings, 'turnOnDebuggers') ) {
          if ( checkType(settings.turnOnDebuggers, 'string') ) {
            addBreakpoints = settings.turnOnDebuggers;
          }
          else if ( checkType(settings.turnOnDebuggers, '!strings') ) {
            addBreakpoints = settings.turnOnDebuggers.join(' ');
          }
        }
      }

      // Setup turnOnGroups
      turnOnGroups = ( (settings &&
                        hasOwnProp(settings, 'turnOnGroups') &&
                        checkType(settings.turnOnGroups, 'boolean')) ?
        settings.turnOnGroups : defaultSettings.turnOnGroups
      );

      // Setup turnOnProfiles
      turnOnProfiles = ( (settings &&
                          hasOwnProp(settings, 'turnOnProfiles') &&
                          checkType(settings.turnOnProfiles, 'boolean')) ?
        settings.turnOnProfiles : defaultSettings.turnOnProfiles
      );

      // Setup turnOnTimers
      turnOnTimers = ( (settings &&
                        hasOwnProp(settings, 'turnOnTimers') &&
                        checkType(settings.turnOnTimers, 'boolean')) ?
        settings.turnOnTimers : defaultSettings.turnOnTimers
      );

      // Create the new instance's settings object
      settings = {
        classTitle    : classTitle,
        turnOffMethods: turnOffMethods,
        addBreakpoints: addBreakpoints,
        turnOnGroups  : turnOnGroups,
        turnOnProfiles: turnOnProfiles,
        turnOnTimers  : turnOnTimers
      };

      // Setup and save the new Debug instance
      debugInstances[ classTitle ] = new Debug(settings);
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
   * @param {boolean=} settings.turnOnProfiles - The default setting for
   *   automatic profiling for all logic between every start and end method.
   * @param {boolean=} settings.turnOnTimers - The default setting for automatic
   *   timing for all logic between every start and end method.
   * @param {boolean=} settings.formatElementsAsObj - Controls whether elements
   *   are logged as JavaScript objects or DOM elements. For more details on the
   *   differences between the two logging styles (specifier '%o' vs '%O')
   *   [see Google's Console API Reference]{@link https://developer.chrome.com/devtools/docs/console-api#consolelogobject-object}.
   */
  debugModuleAPI.set = function(settings) {

    if ( !checkType(settings, '!object') ) {
      console.error( ErrorMessages.setConsoleTypeError(settings) );
      if (errorBreakpoints) {
        debugger;
      }
      return;
    }

    // Set errorBreakpoints
    if (hasOwnProp(settings, 'errorBreakpoints') &&
        checkType(settings.errorBreakpoints, 'boolean')) {
      errorBreakpoints = settings.errorBreakpoints;
    }
    else if (hasOwnProp(settings, 'errorDebuggers') &&
             checkType(settings.errorDebuggers, 'boolean')) {
      errorBreakpoints = settings.errorDebuggers;
    }

    // Set the default value for classTitle
    if (hasOwnProp(settings, 'classTitle') &&
        checkType(settings.classTitle, 'string')) {
      defaultSettings.classTitle = settings.classTitle;
    }
    else if (hasOwnProp(settings, 'className') &&
             checkType(settings.className, 'string')) {
      defaultSettings.classTitle = settings.className;
    }

    // Set the default value for turnOffMethods
    if ( hasOwnProp(settings, 'turnOffMethods') ) {
      if ( checkType(settings.turnOffMethods, 'string') ) {
        defaultSettings.turnOffMethods = settings.turnOffMethods;
      }
      else if ( checkType(settings.turnOffMethods, '!strings') ) {
        defaultSettings.turnOffMethods = settings.turnOffMethods.join(' ');
      }
    }
    else if ( hasOwnProp(settings, 'turnOffTypes') ) {
      if ( checkType(settings.turnOffTypes, 'string') ) {
        defaultSettings.turnOffMethods = settings.turnOffTypes;
      }
      else if ( checkType(settings.turnOffTypes, '!strings') ) {
        defaultSettings.turnOffMethods = settings.turnOffTypes.join(' ');
      }
    }

    // Set the default value for addBreakpoints
    if ( hasOwnProp(settings, 'addBreakpoints') ) {
      if ( checkType(settings.addBreakpoints, 'string') ) {
        defaultSettings.addBreakpoints = settings.addBreakpoints;
      }
      else if ( checkType(settings.addBreakpoints, '!strings') ) {
        defaultSettings.addBreakpoints = settings.addBreakpoints.join(' ');
      }
    }
    else if ( hasOwnProp(settings, 'turnOnDebuggers') ) {
      if ( checkType(settings.turnOnDebuggers, 'string') ) {
        defaultSettings.addBreakpoints = settings.turnOnDebuggers;
      }
      else if ( checkType(settings.turnOnDebuggers, '!strings') ) {
        defaultSettings.addBreakpoints = settings.turnOnDebuggers.join(' ');
      }
    }

    // Set the default value for turnOnGroups
    if (hasOwnProp(settings, 'turnOnGroups') &&
        checkType(settings.turnOnGroups, 'boolean')) {
      defaultSettings.turnOnGroups = settings.turnOnGroups;
    }

    // Set the default value for turnOnProfiles
    if (hasOwnProp(settings, 'turnOnProfiles') &&
        checkType(settings.turnOnProfiles, 'boolean')) {
      defaultSettings.turnOnProfiles = settings.turnOnProfiles;
    }

    // Set the default value for turnOnTimers
    if (hasOwnProp(settings, 'turnOnTimers') &&
        checkType(settings.turnOnTimers, 'boolean')) {
      defaultSettings.turnOnTimers = settings.turnOnTimers;
    }

    // Set formatElementsAsObj
    if (hasOwnProp(settings, 'formatElementsAsObj') &&
        checkType(settings.formatElementsAsObj, 'boolean')) {
      formatElementsAsObj = settings.formatElementsAsObj;
    }
  };

  /**
   * -----------------------------------------------------
   * Public Object (debugModuleAPI.console)
   * -----------------------------------------------------
   * @desc The container for aIV's console.
   * @type {!Object<string, function(*)>}
   */
  debugModuleAPI.console = {};

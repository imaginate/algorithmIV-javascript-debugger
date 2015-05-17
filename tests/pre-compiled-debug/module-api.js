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
    /** @type {!Object<string, function>} */
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

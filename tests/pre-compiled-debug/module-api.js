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
   * Private Variable (debugInstances)
   * -----------------------------------------------------
   * @desc Saves a reference to all of the created Debug instances.
   * @type {!Object<string, Debug>}
   * @private
   */
  var debugInstances = {};

  /**
   * -----------------------------------------------------
   * Public Method (debugModuleAPI.init)
   * -----------------------------------------------------
   * @desc Creates or retrieves an instance of the Debug class.
   * @param {!(string|Object)=} settings - A string of the Debug instance's
   *   class name or an object with the Debug instance's settings.
   * @param {string=} settings.classTitle - The Debug instance's class name.
   * @param {string=} settings.className - The same as settings.classTitle.
   * @param {!(string|strings)=} settings.turnOff - Contains the methods to
   *   disable for this Debug instance. The options are 'all', 'none', 'start',
   *   'end', 'args', 'fail', 'group', 'state', and 'misc'. This setting does
   *   override the module defaults.
   * @param {!(string|strings)=} settings.turnOffTypes - The same as
   *   settings.turnOff.
   * @param {!(string|strings)=} settings.addBreakpoints - Contains the methods
   *   to add debugger breakpoints to for this Debug instance. The options are
   *   'all', 'none', 'start', 'end', 'args', 'fail', 'group', 'state', and
   *   'misc'. This setting does override the module defaults.
   * @param {!(string|strings)=} settings.turnOnDebuggers - The same as
   *   settings.addBreakpoints.
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
    /** @type {?(string|strings)} */
    var turnOffTypes;
    /** @type {?(string|strings)} */
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
    classTitle = defaultArgs.classTitle;
    if ( checkType(settings, 'string') ) {
      classTitle = settings;
      settings = null;
    }
    if (settings) {
      if ( settings.hasOwnProperty('classTitle') ) {
        classTitle = settings.classTitle;
      }
      else if ( settings.hasOwnProperty('className') ) {
        classTitle = settings.className;
      }
    }

    // Create a new Debug instance
    if ( !debugInstances.hasOwnProperty(classTitle) ) {

      // Setup turnOffTypes
      turnOffTypes = defaultArgs.turnOffTypes;
      if (settings) {
        if (settings.hasOwnProperty('turnOff') &&
            checkType(settings.turnOff, '!string|strings')) {
          turnOffTypes = settings.turnOff;
        }
        else if (settings.hasOwnProperty('turnOffTypes') &&
            checkType(settings.turnOffTypes, '!string|strings')) {
          turnOffTypes = settings.turnOffTypes;
        }
      }

      // Setup addBreakpoints
      addBreakpoints = defaultArgs.addBreakpoints;
      if (settings) {
        if (settings.hasOwnProperty('addBreakpoints') &&
            checkType(settings.addBreakpoints, '!string|strings')) {
          addBreakpoints = settings.addBreakpoints;
        }
        else if (settings.hasOwnProperty('turnOnDebuggers') &&
            checkType(settings.turnOnDebuggers, '!string|strings')) {
          addBreakpoints = settings.turnOnDebuggers;
        }
      }

      // Setup turnOnGroups
      turnOnGroups = ( (settings &&
                        settings.hasOwnProperty('turnOnGroups') &&
                        checkType(settings.turnOnGroups, 'boolean')) ?
        settings.turnOnGroups : defaultArgs.turnOnGroups
      );

      // Setup turnOnProfiles
      turnOnProfiles = ( (settings &&
                          settings.hasOwnProperty('turnOnProfiles') &&
                          checkType(settings.turnOnProfiles, 'boolean')) ?
        settings.turnOnProfiles : defaultArgs.turnOnProfiles
      );

      // Setup turnOnTimers
      turnOnTimers = ( (settings &&
                        settings.hasOwnProperty('turnOnTimers') &&
                        checkType(settings.turnOnTimers, 'boolean')) ?
        settings.turnOnTimers : defaultArgs.turnOnTimers
      );

      // Create the new instance's settings object
      settings = {
        classTitle    : classTitle,
        turnOffTypes  : turnOffTypes,
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
   * @param {!(string|strings)=} settings.turnOff - The default methods
   *   to disable for all new Debug instances created after this call.
   * @param {!(string|strings)=} settings.turnOffTypes - The same as
   *   settings.turnOff.
   * @param {!(string|strings)=} settings.addBreakpoints - The default
   *   methods to add debugger breakpoints to for all new Debug instances
   *   created after this call.
   * @param {!(string|strings)=} settings.turnOnDebuggers - The same as
   *   settings.addBreakpoints.
   * @param {boolean=} settings.turnOnGroups - The default setting for automatic
   *   grouping of all logs, timers, and profiles between every start and end
   *   method.
   * @param {boolean=} settings.turnOnProfiles - The default setting for
   *   automatic profiling for all logic between every start and end method.
   * @param {boolean=} settings.turnOnTimers - The default setting for automatic
   *   timing for all logic between every start and end method.
   */
  debugModuleAPI.set = function(settings) {

    /** @type {string} */
    var msg;
    /** @type {string} */
    var dataType;

    if ( !checkType(settings, '!object') ) {
      msg = 'The settings param given to aIV.debug.set was an incorrrect data ';
      msg += 'type. It should be an object using strings of the items to set ';
      msg += 'as its keys and the values to set each item to as the values. ';
      msg += 'The given data type was \'%s\'.';
      dataType = (settings === null) ? 'null' : typeof settings;
      console.error(msg, dataType);
      if (errorBreakpoints) {
        debugger;
      }
      return;
    }

    // Set errorBreakpoints
    if (settings.hasOwnProperty('errorBreakpoints') &&
        checkType(settings.errorBreakpoints, 'boolean')) {
      errorBreakpoints = settings.errorBreakpoints;
    }
    else if (settings.hasOwnProperty('errorDebuggers') &&
             checkType(settings.errorDebuggers, 'boolean')) {
      errorBreakpoints = settings.errorDebuggers;
    }

    // Set the default value for classTitle
    if (settings.hasOwnProperty('classTitle') &&
        checkType(settings.classTitle, 'string')) {
      defaultArgs.classTitle = settings.classTitle;
    }
    else if (settings.hasOwnProperty('className') &&
             checkType(settings.className, 'string')) {
      defaultArgs.classTitle = settings.className;
    }

    // Set the default value for turnOffTypes
    if (settings.hasOwnProperty('turnOff') &&
        checkType(settings.turnOff, '!string|strings')) {
      defaultArgs.turnOffTypes = settings.turnOff;
    }
    else if (settings.hasOwnProperty('turnOffTypes') &&
             checkType(settings.turnOffTypes, '!string|strings')) {
      defaultArgs.turnOffTypes = settings.turnOffTypes;
    }

    // Set the default value for addBreakpoints
    if (settings.hasOwnProperty('addBreakpoints') &&
        checkType(settings.addBreakpoints, '!string|strings')) {
      defaultArgs.addBreakpoints = settings.addBreakpoints;
    }
    else if (settings.hasOwnProperty('turnOnDebuggers') &&
             checkType(settings.turnOnDebuggers, '!string|strings')) {
      defaultArgs.addBreakpoints = settings.turnOnDebuggers;
    }

    // Set the default value for turnOnGroups
    if (settings.hasOwnProperty('turnOnGroups') &&
        checkType(settings.turnOnGroups, 'boolean')) {
      defaultArgs.turnOnGroups = settings.turnOnGroups;
    }

    // Set the default value for turnOnProfiles
    if (settings.hasOwnProperty('turnOnProfiles') &&
        checkType(settings.turnOnProfiles, 'boolean')) {
      defaultArgs.turnOnProfiles = settings.turnOnProfiles;
    }

    // Set the default value for turnOnTimers
    if (settings.hasOwnProperty('turnOnTimers') &&
        checkType(settings.turnOnTimers, 'boolean')) {
      defaultArgs.turnOnTimers = settings.turnOnTimers;
    }
  };

  /**
   * -----------------------------------------------------
   * Private Variable (_return)
   * -----------------------------------------------------
   * @desc Holds the public methods for the module.
   * @typedef {newDebug}
   * @struct
   */
  var _return = {};

  /**
   * -----------------------------------------------------
   * Private Variable (_instances)
   * -----------------------------------------------------
   * @desc Saves a reference to each instance of Debug.
   * @type {!Object}
   * @private
   */
  var _instances = {};

  /**
   * -----------------------------------------------------
   * Public Method (_return.newDebug)
   * -----------------------------------------------------
   * @desc Returns an instance of Debug.
   * @param {(string|Object)} settings - The Debug instance's settings.
   */
  _return.newDebug = function(settings) {

    /**
     * @type {!string}
     * @private
     */
    var classTitle;
    /**
     * @type {?(string|strings)}
     * @private
     */
    var turnOffTypes;
    /**
     * @type {?(string|strings)}
     * @private
     */
    var turnOnBuggers;

    if (typeof settings !== 'string' && typeof settings !== 'object') {
      settings = null;
    }

    // Setup classTitle
    if (typeof settings === 'string') {
      classTitle = settings;
      settings = null;
    }
    else {
      classTitle = ( (settings && !!settings.classTitle &&
                      typeof settings.classTitle === 'string') ?
        settings.classTitle : 'unknown'
      );
    }

    // Create a new Debug instance
    if ( !_instances.hasOwnProperty(classTitle) ) {

      turnOffTypes = ( (settings && !!settings.turnOffTypes) ?
        settings.turnOffTypes : null
      );
      if ( !checkType(turnOffTypes, 'string|strings') ) {
        turnOffTypes = null;
      }
      if (!turnOffTypes && defaultArgs.turnOffTypes) {
        turnOffTypes = defaultArgs.turnOffTypes;
      }

      turnOnBuggers = ( (settings && !!settings.turnOnDebuggers) ?
        settings.turnOnDebuggers : null
      );
      if ( !checkType(turnOnBuggers, 'string|strings') ) {
        turnOnBuggers = null;
      }
      if (!turnOnBuggers && defaultArgs.turnOnBuggers) {
        turnOnBuggers = defaultArgs.turnOnBuggers;
      }

      // Setup, save, and freeze the new Debug instance
      _instances[classTitle] = new Debug(classTitle, turnOffTypes, turnOnBuggers);
      Object.freeze(_instances[classTitle]);
    }

    return _instances[classTitle];
  };

  /**
   * -----------------------------------------------------
   * Public Method (_return.newDebug.setConfig)
   * -----------------------------------------------------
   * @desc Allows you to configure settings for all of the debug instances
   *   called in the app.
   * @param {Object} settings - The Debug module's settings.
   */
  _return.newDebug.setConfig = function(settings) {

    /** @type {string} */
    var msg;

    if (typeof settings !== 'object') {
      msg = 'The settings given to aIV.debug.config were incorrrect. They ';
      msg += 'should be an object. They were a(n) %s.';
      console.error(msg, (typeof settings));
      if (debuggers) {
        debugger;
      }
      return;
    }

    // Configure debuggers upon errors
    if (settings.hasOwnProperty('errorDebuggers') &&
        typeof settings.errorDebuggers === 'boolean') {
      debuggers = settings.errorDebuggers;
    }

    // Configure default settings for turnOffTypes
    if (settings.hasOwnProperty('turnOffTypes') &&
        checkType(settings.turnOffTypes, '!string|strings')) {
      defaultArgs.turnOffTypes = settings.turnOffTypes;
    }

    // Configure default settings for turnOnDebuggers
    if (settings.hasOwnProperty('turnOnDebuggers') &&
        checkType(settings.turnOnDebuggers, '!string|strings')) {
      defaultArgs.turnOnBuggers = settings.turnOnDebuggers;
    }
  };

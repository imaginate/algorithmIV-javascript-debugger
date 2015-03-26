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
   * @param {(string|Object)=} settings - The Debug instance's settings.
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

    settings = settings || null;

    if (typeof settings === 'string') {
      classTitle = settings;
      settings = null;
    }
    else {
      classTitle = ( (typeof settings.classTitle === 'string') ?
        settings.classTitle : 'unknown'
      );
    }

    // Create a new Debug instance
    if ( !_instances.hasOwnProperty(classTitle) ) {

      turnOffTypes = ( ( checkType(settings.turnOffTypes, 'string|strings') ) ?
        settings.turnOffTypes : null
      );
      turnOnBuggers = ( ( checkType(settings.turnOnDebuggers, 'string|strings') ) ?
        settings.turnOnDebuggers : null
      );

      // Setup, save, and freeze the new Debug instance
      _instances[classTitle] = new Debug(classTitle, turnOffTypes, turnOnBuggers);
      Object.freeze(_instances[classTitle]);
    }

    return _instances[classTitle];
  };

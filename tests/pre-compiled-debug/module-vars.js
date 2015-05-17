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

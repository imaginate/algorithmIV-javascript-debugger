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
   * Public Variable (formatElementsAsObj)
   * -----------------------------------------------
   * @desc Controls whether logged DOM elements are shown as expandable
   *   objects or elements.
   * @type {boolean}
   */
  var formatElementsAsObj = true;

  /**
   * ----------------------------------------------- 
   * Public Variable (defaultSettings)
   * -----------------------------------------------
   * @desc Sets default settings for all instances of the debugger. Note that
   *   if local settings are provided upon a new instance call they will be used
   *   instead of the default settings.
   * @type {!{
   *   classTitle    : string,
   *   turnOffMethods: string,
   *   addBreakpoints: string,
   *   turnOnGroups  : boolean,
   *   turnOnProfiles: boolean,
   *   turnOnTimers  : boolean
   * }}
   */
  var defaultSettings = {
    classTitle    : 'unknown',
    turnOffMethods: 'none',
    addBreakpoints: 'args fail',
    turnOnGroups  : true,
    turnOnProfiles: false,
    turnOnTimers  : true
  };

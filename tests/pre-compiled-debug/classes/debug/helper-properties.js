  /**
   * -----------------------------------------------
   * Public Property (Debug.DEFAULTS)
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
  Debug.DEFAULTS = {
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
   * Public Property (Debug.DEFAULT_TYPES)
   * -----------------------------------------------
   * @desc The data types for each settings property.
   * @type {!Object<string, string>}
   */
  Debug.DEFAULT_TYPES = {
    classTitle    : 'string',
    turnOffMethods: 'string|!strings',
    addBreakpoints: 'string|!strings',
    turnOnGroups  : 'boolean',
    openGroups    : 'boolean',
    turnOnProfiles: 'boolean',
    turnOnTimers  : 'boolean'
  };

  /**
   * -----------------------------------------------
   * Public Property (Debug.defaultSettings)
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
  Debug.defaultSettings = {
    classTitle    : Debug.DEFAULTS.classTitle,
    turnOffMethods: Debug.DEFAULTS.turnOffMethods,
    addBreakpoints: Debug.DEFAULTS.addBreakpoints,
    turnOnGroups  : Debug.DEFAULTS.turnOnGroups,
    openGroups    : Debug.DEFAULTS.openGroups,
    turnOnProfiles: Debug.DEFAULTS.turnOnProfiles,
    turnOnTimers  : Debug.DEFAULTS.turnOnTimers
  };

  /**
   * The automated actions object hash map.
   * @typedef {!{
   *   msgTitle : string,
   *   startFunc: function(string),
   *   endFunc  : function(string=)
   * }} autoMap
   */
  /**
   * -----------------------------------------------
   * Public Property (Debug.autoSettings)
   * -----------------------------------------------
   * @desc The settings for the automated debugger actions.
   * @type {!{
   *   groups  : autoMap,
   *   profiles: autoMap,
   *   timers  : autoMap
   * }}
   */
  Debug.autoSettings = {};
  Debug.autoSettings.groups = {
    msgTitle : 'GROUP',
    startFunc: function(label) { console.groupCollapsed(label); },
    endFunc  : function(label) { console.groupEnd(); }
  };
  Debug.autoSettings.profiles = {
    msgTitle : 'PROFILE',
    startFunc: function(label) { console.profile(label); },
    endFunc  : function(label) { console.profileEnd(); }
  };
  Debug.autoSettings.timers = {
    msgTitle : 'TIME',
    startFunc: function(label) { console.time(label); },
    endFunc  : function(label) { console.timeEnd(label); }
  };

  /**
   * ----------------------------------------------- 
   * Public Property (Debug.formatElementsAsObj)
   * -----------------------------------------------
   * @desc Controls whether logged DOM elements are shown as expandable
   *   objects or elements.
   * @type {boolean}
   */
  Debug.formatElementsAsObj = true;

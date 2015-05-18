  /**
   * -----------------------------------------------
   * Public Property (Debug.defaults)
   * -----------------------------------------------
   * @desc Sets default settings for all instances of the debugger. Note that
   *   if local settings are provided upon a new instance call they will be used
   *   instead of the default settings.
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
  Debug.defaults = {
    classTitle    : Debug_DEFAULTS.classTitle,
    turnOffMethods: Debug_DEFAULTS.turnOffMethods,
    addBreakpoints: Debug_DEFAULTS.addBreakpoints,
    turnOnGroups  : Debug_DEFAULTS.turnOnGroups,
    openGroups    : Debug_DEFAULTS.openGroups,
    turnOnProfiles: Debug_DEFAULTS.turnOnProfiles,
    turnOnTimers  : Debug_DEFAULTS.turnOnTimers
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

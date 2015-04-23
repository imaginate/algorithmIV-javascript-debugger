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
   * Public Variable (defaultSettings)
   * -----------------------------------------------
   * @desc Sets default settings for all instances of the debugger. Note that
   *   if local settings are provided upon a new instance call they will be used
   *   instead of the default settings.
   * @type {{
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
    turnOnGroups  : false,
    turnOnProfiles: false,
    turnOnTimers  : false
  };

  /**
   * ----------------------------------------------- 
   * Public Variable (regexps)
   * -----------------------------------------------
   * @desc Regular expressions that are used multiple times
   *   by the debugger (avoid re-creating multiple times).
   * @type {Object<string, Object>}
   */
  var regexps = {};

  /**
   * ----------------------------------------------- 
   * Public Variable (regexps.types)
   * -----------------------------------------------
   * @desc Regular expressions that contain types.
   * @type {Object<string, RegExp>}
   */
  regexps.types = {};

  /**
   * ----------------------------------------------- 
   * Public Variable (regexps.types.all)
   * -----------------------------------------------
   * @desc All the types available.
   * @type {RegExp}
   */
  regexps.types.all = (function() {

    /** @type {string} */
    var types;

    types = '' +
    '^string$|^number$|^boolean$|^object$|^array$|^function$|^elem$|'          +
    '^undefined$|^strings$|^numbers$|^booleans$|^objects$|^arrays$|^elems$|'   +
    '^functions$|^stringmap$|^numbermap$|^booleanmap$|^objectmap$|^arraymap$|' +
    '^functionmap$|^elemmap$';

    return new RegExp(types);
  })();

  /**
   * ----------------------------------------------- 
   * Public Variable (regexps.types.basic)
   * -----------------------------------------------
   * @desc The basic types available.
   * @type {RegExp}
   */
  regexps.types.basic = (function() {

    /** @type {string} */
    var types;

    types = '^string$|^number$|^boolean$|^object$|' +
            '^function$|^elem$|^undefined$';

    return new RegExp(types);
  })();

  /**
   * ----------------------------------------------- 
   * Public Variable (regexps.types.arrays)
   * -----------------------------------------------
   * @desc The array types available.
   * @type {RegExp}
   */
  regexps.types.arrays = (function() {

    /** @type {string} */
    var types;

    types = '^array$|^strings$|^numbers$|^booleans$|' +
            '^objects$|^arrays$|^elems$|^functions$';

    return new RegExp(types);
  })();

  /**
   * ----------------------------------------------- 
   * Public Variable (regexps.types.maps)
   * -----------------------------------------------
   * @desc The hash map types available.
   * @type {RegExp}
   */
  regexps.types.maps = (function() {

    /** @type {string} */
    var types;

    types = '^stringmap$|^numbermap$|^booleanmap$|^objectmap$|' +
            '^arraymap$|^functionmap$|^elemmap$';

    return new RegExp(types);
  })();

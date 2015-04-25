  /**
   * ----------------------------------------------- 
   * Public Class (RegExps)
   * -----------------------------------------------
   * @desc Regular expressions that are used throughout the module.
   * @type {!Object<string, RegExp>}
   * @struct
   */
  var RegExps = {};

  /**
   * ----------------------------------------------- 
   * Public Property (RegExps.allDataTypes)
   * -----------------------------------------------
   * @desc All of the data types available to this module.
   * @type {!RegExp}
   */
  RegExps.allDataTypes = (function() {

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
   * Public Property (RegExps.basicDataTypes)
   * -----------------------------------------------
   * @desc The basic data types available to this module.
   * @type {!RegExp}
   */
  RegExps.basicDataTypes = (function() {

    /** @type {string} */
    var types;

    types = '^string$|^number$|^boolean$|^object$|' +
            '^function$|^elem$|^undefined$';

    return new RegExp(types);
  })();

  /**
   * ----------------------------------------------- 
   * Public Property (RegExps.arrayDataTypes)
   * -----------------------------------------------
   * @desc The array data types available to this module.
   * @type {!RegExp}
   */
  RegExps.arrayDataTypes = (function() {

    /** @type {string} */
    var types;

    types = '^array$|^strings$|^numbers$|^booleans$|' +
            '^objects$|^arrays$|^elems$|^functions$';

    return new RegExp(types);
  })();

  /**
   * ----------------------------------------------- 
   * Public Property (RegExps.mapDataTypes)
   * -----------------------------------------------
   * @desc The hash map types available to this module.
   * @type {!RegExp}
   */
  RegExps.mapDataTypes = (function() {

    /** @type {string} */
    var types;

    types = '^stringmap$|^numbermap$|^booleanmap$|^objectmap$|' +
            '^arraymap$|^functionmap$|^elemmap$';

    return new RegExp(types);
  })();

  /**
   * ----------------------------------------------- 
   * Public Property (RegExps.dualDollarSigns)
   * -----------------------------------------------
   * @desc Two consecutive dollar signs.
   * @type {!RegExp}
   */
  RegExps.dualDollarSigns = /([^\\]*?)\$\$/;

  Object.freeze(RegExps);

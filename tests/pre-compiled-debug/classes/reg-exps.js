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
  RegExps.allDataTypes = (function setupRegExpsAllDataTypes() {

    /** @type {string} */
    var types;

    types = '' +
    '^string$|^number$|^boolean$|^object$|^array$|^function$|^elem$|'          +
    '^element$|^undefined$|^null$|^strings$|^numbers$|^booleans$|^objects$|'   +
    '^arrays$|^elems$|^elements$|^functions$|^stringmap$|^numbermap$|'         +
    '^booleanmap$|^objectmap$|^arraymap$|^functionmap$|^elemmap$|^elementmap$';

    return new RegExp(types);
  })();

  /**
   * -----------------------------------------------
   * Public Property (RegExps.nonNullableDataTypes)
   * -----------------------------------------------
   * @desc The non-nullable data types available to this module.
   * @type {!RegExp}
   */
  RegExps.nonNullableDataTypes = (function setupRegExpsNonNullableDataTypes() {

    /** @type {string} */
    var types;

    types = '^string$|^number$|^boolean$|^function$|^undefined$';

    return new RegExp(types);
  })();

  /**
   * -----------------------------------------------
   * Public Property (RegExps.typeOfDataTypes)
   * -----------------------------------------------
   * @desc The data types that can be accurately checked with the
   *   native JavaScript typeof operator.
   * @type {!RegExp}
   */
  RegExps.typeOfDataTypes = (function setupRegExpsTypeOfDataTypes() {

    /** @type {string} */
    var types;

    types = '^string$|^number$|^boolean$|^object$|^function$|^undefined$';

    return new RegExp(types);
  })();

  /**
   * -----------------------------------------------
   * Public Property (RegExps.instanceOfDataTypes)
   * -----------------------------------------------
   * @desc The data types that can be accurately checked with the
   *   native JavaScript instanceof operator.
   * @type {!RegExp}
   */
  RegExps.instanceOfDataTypes = /^elem$|^element$/;

  /**
   * -----------------------------------------------
   * Public Property (RegExps.arrayDataTypes)
   * -----------------------------------------------
   * @desc The array data types available to this module.
   * @type {!RegExp}
   */
  RegExps.arrayDataTypes = (function setupRegExpsArrayDataTypes() {

    /** @type {string} */
    var types;

    types = '^array$|^strings$|^numbers$|^booleans$|^objects$|' +
            '^arrays$|^elems$|^elements$|^functions$';

    return new RegExp(types);
  })();

  /**
   * -----------------------------------------------
   * Public Property (RegExps.mapDataTypes)
   * -----------------------------------------------
   * @desc The hash map types available to this module.
   * @type {!RegExp}
   */
  RegExps.mapDataTypes = (function setupRegExpsMapDataTypes() {

    /** @type {string} */
    var types;

    types = '^stringmap$|^numbermap$|^booleanmap$|^objectmap$|' +
            '^arraymap$|^functionmap$|^elemmap$|^elementmap$';

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

  /**
   * -----------------------------------------------
   * Public Property (RegExps.space)
   * -----------------------------------------------
   * @desc A whitespace.
   * @type {!RegExp}
   */
  RegExps.space = /\s/;

  /**
   * -----------------------------------------------
   * Public Property (RegExps.exclamationPoint)
   * -----------------------------------------------
   * @desc An exclamation point.
   * @type {!RegExp}
   */
  RegExps.exclamationPoint = /\!/;

  /**
   * -----------------------------------------------
   * Public Property (RegExps.questionMark)
   * -----------------------------------------------
   * @desc A question mark.
   * @type {!RegExp}
   */
  RegExps.questionMark = /\?/;

  /**
   * -----------------------------------------------
   * Public Property (RegExps.equalSign)
   * -----------------------------------------------
   * @desc An equal sign.
   * @type {!RegExp}
   */
  RegExps.equalSign = /\=/;

  /**
   * -----------------------------------------------
   * Public Property (RegExps.pipe)
   * -----------------------------------------------
   * @desc A pipe.
   * @type {!RegExp}
   */
  RegExps.pipe = /\|/;

  /**
   * -----------------------------------------------
   * Public Property (RegExps.lowerAlphaAndPipe)
   * -----------------------------------------------
   * @desc All characters except lowercase letters and the pipe.
   * @type {!RegExp}
   */
  RegExps.lowerAlphaAndPipe = /[^a-z\|]/g;

  freezeObj(RegExps, true);

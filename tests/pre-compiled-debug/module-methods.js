  /**
   * ---------------------------------------------------
   * Public Method (freezeObj)
   * ---------------------------------------------------
   * @desc A shortcut for the Object.freeze method with a deep freeze option.
   * @param {!object|function} obj - The object to freeze.
   * @param {boolean=} deep - Deep freeze the object. The default is false.
   * @return {!object|function} The frozen object.
   */
  var freezeObj = (function setupFreezeObj() {

    /**
     * -------------------------------------------------
     * Private Method (deepFreeze)
     * -------------------------------------------------
     * @desc A helper to freezeObj that recursively freezes all of its
     *   properties.
     * @param {!object|function} obj - The object to freeze.
     */
    var deepFreeze = function(obj) {

      /** @type {string} */
      var prop;

      Object.freeze(obj);

      for (prop in obj) {
        if (hasOwnProp(obj, prop) && checkType(obj[ prop ], '!object|function')) {
          deepFreeze(obj[ prop ]);
        }
      }
    };

    return function freezeObj(obj, deep) {

      /** @type {string} */
      var errorMessage;

      if ( !checkType(obj, '!object|function') ) {
        errorMessage = 'A freezeObj call received an invalid obj parameter.';
        throw new TypeError(errorMessage);
        return;
      }

      if ( !checkType(deep, 'boolean') ) {
        deep = false;
      }

      if (deep) {
        deepFreeze(obj);
      }
      else {
        Object.freeze(obj);
      }

      return obj;
    };
  })();

  /**
   * ---------------------------------------------------
   * Public Method (hasOwnProp)
   * ---------------------------------------------------
   * @desc A shortcut for the Object.prototype.hasOwnProperty method.
   * @param {!object|function} obj - The object to check.
   * @param {string} prop - The property to check.
   * @return {boolean} The result of the check.
   */
  function hasOwnProp(obj, prop) {

    /** @type {string} */
    var errorMessage;

    if (!obj || !checkTypeOf(obj, 'object') ||
        !checkTypeOf(obj, 'function')) {
      errorMessage = 'A hasOwnProp call received an invalid obj parameter.';
      throw new TypeError(errorMessage);
      return;
    }

    if (!prop || !checkTypeOf(prop, 'string')) {
      errorMessage = 'A hasOwnProp call received an invalid prop parameter.';
      throw new TypeError(errorMessage);
      return;
    }

    return obj.hasOwnProperty(prop);
  }

  /**
   * ---------------------------------------------------
   * Public Method (getSubstituteString)
   * ---------------------------------------------------
   * @desc Gets the correct substitution string for the given value.
   * @param {val} val - The value to be evaluated.
   * @return {string} The correct substitution string.
   */
  function getSubstituteString(val) {

    /** @type {string} */
    var str;

    str = '%s';

    if ( checkType(val, '!number|object|function') ) {
      str = ( ( checkType(val, 'number') ) ?
        '%i' : (!formatElementsAsObj && val instanceof HTMLElement) ?
          '%o' : '%O'
      );
    }

    return str;
  }

  /**
   * ---------------------------------------------------
   * Public Method (makeSubstituteStrings)
   * ---------------------------------------------------
   * @desc Creates a string of the correct matching substitution strings
   *   for a console log message.
   * @param {vals} vals - The values to match.
   * @return {string} The substitution strings.
   */
  function makeSubstituteStrings(vals) {

    /** @type {number} */
    var i;
    /** @type {number} */
    var len;
    /** @type {string} */
    var message;

    message = '';

    len = vals.length;
    i = -1;
    while (++i < len) {
      if (i) {
        message += ', ';
      }
      message += getSubstituteString(vals[i]);
    }

    return message;
  }

  /**
   * ---------------------------------------------------
   * Public Method (insertSubstituteStrings)
   * ---------------------------------------------------
   * @desc Inserts the correct substitution strings into a log message.
   * @param {string} msg - The original console message string.
   * @param {vals} vals - The values to use for finding the
   *   substitution strings.
   * @return {string} The prepared console message.
   */
  function insertSubstituteStrings(msg, vals) {

    /** @type {number} */
    var len;
    /** @type {number} */
    var i;
    /** @type {string} */
    var substituteString;

    // Insert the substitution strings
    len = vals.length;
    i = -1;
    while (++i < len) {

      substituteString = getSubstituteString(vals[i]);

      if ( RegExps.dualDollarSigns.test(msg) ) {
        substituteString = '$1' + substituteString;
        msg = msg.replace(RegExps.dualDollarSigns, substituteString);
      }
      else {
        msg += ' unnamedVar' + i + '= ' + substituteString + ';';
      }
    }

    return msg;
  }

  /**
   * ---------------------------------------------------
   * Public Method (checkType)
   * ---------------------------------------------------
   * @desc Checks a value's data type against the given optional types.
   * @param {*} val - The value to be evaluated.
   * @param {string} type - A string of the data types to evaluate the value
   *   against. The optional data type strings are below:
   *   <table>
   *     <tr><th>Main Types</th><th>Array Types</th><th>Hash Map Types</th></tr>
   *     <tr>
   *       <td>
   *         <span>'string', 'number', 'boolean', 'object', 'array', </span>
   *         <span>'function', 'elem', 'element', 'undefined'</span>
   *       </td>
   *       <td>
   *         <span>'strings', 'numbers', 'booleans', 'objects', </span>
   *         <span>'arrays', 'functions', 'elems', 'elements'</span>
   *       </td>
   *       <td>
   *         <span>'stringMap', 'numberMap', 'booleanMap', 'objectMap', </span>
   *         <span>'arrayMap', 'functionMap', 'elemMap', 'elementMap'</span>
   *       </td>
   *     </tr>
   *   </table>
   *   Other important characters are below:
   *   <table>
   *     <tr><th>Character</th><th>Details</th><th>Example</th></tr>
   *     <tr>
   *       <td>'|'</td>
   *       <td>Separates multiple type options.</td>
   *       <td>'strings|numbers'</td>
   *     </tr>
   *     <tr>
   *       <td>'!'</td>
   *       <td>
   *         <span>Indicates an object is not nullable. By default all </span>
   *         <span>functions, primitive data types (string, number, </span>
   *         <span>or boolean), and undefined are not nullable.</span>
   *       </td>
   *       <td>'!stringMap'</td>
   *     </tr>
   *     <tr>
   *       <td>'?'</td>
   *       <td>
   *         <span>Indicates a function or primitive data type is </span>
   *         <span>nullable. By default all objects except functions </span>
   *         <span>are nullable.</span>
   *       </td>
   *       <td>'?string'</td>
   *     </tr>
   *     <tr>
   *       <td>'='</td>
   *       <td>Indicates that the value can be undefined.</td>
   *       <td>'array=' or 'string|number='</td>
   *     </tr>
   *   </table>
   * @return {boolean} The evaluation result.
   */
  function checkType(val, type) {

    /** @type {number} */
    var i;
    /** @type {!strings} */
    var types;
    /** @type {boolean} */
    var nullable;
    /** @type {boolean} */
    var earlyPass;
    /** @type {string} */
    var errorMessage;
    /** @type {boolean} */
    var nullableOverride;

    if ( !checkTypeOf(type, 'string') ) {
      errorMessage = 'A checkType call received an invalid type parameter.';
      throw new TypeError(errorMessage);
      return;
    }

    earlyPass = false;

    if (val === null) {
      nullable = false;
      nullableOverride = RegExps.exclamationPoint.test(type);
      if ( RegExps.questionMark.test(type) ) {
        nullableOverride = !nullableOverride;
        nullable = !nullableOverride;
      }
      if (nullable && nullableOverride) {
        earlyPass = true;
      }
    }
    else {
      nullableOverride = true;
      nullable = false;
    }

    if (val === undefined && RegExps.equalSign.test(type)) {
      earlyPass = true;
    }

    // Remove everything except lowercase letters and pipes
    type = type.toLowerCase();
    type = type.replace(RegExps.lowerAlphaAndPipe, '');

    types = ( RegExps.pipe.test(type) ) ? type.split('|') : [ type ];

    if ( !checkDataTypeStrings(types) ) {
      errorMessage = 'A checkType call received an invalid type parameter.';
      throw new RangeError(errorMessage);
      return;
    }

    if (earlyPass) {
      return true;
    }

    // Test the value against each type
    i = types.length;
    while (i--) {

      type = types[i];

      if (!nullableOverride) {
        nullable = !RegExps.nonNullableDataTypes.test(type);
      }

      if (nullable && val === null) {
        return true;
      }

      if ( RegExps.typeOfDataTypes.test(type) ) {
        if ( checkTypeOf(val, type) ) {
          return true;
        }
        continue;
      }

      if ( RegExps.instanceOfDataTypes.test(type) ) {
        if ( checkInstanceOf(val, type) ) {
          return true;
        }
        continue;
      }

      if ( RegExps.arrayDataTypes.test(type) ) {
        if ( checkArrayType(val, type) ) {
          return true;
        }
        continue;
      }

      if ( RegExps.mapDataTypes.test(type) ) {
        if ( checkHashMapType(val, type) ) {
          return true;
        }
        continue;
      }
    }

    return false;
  }

  /**
   * ---------------------------------------------------
   * Public Method (checkDataTypeStrings)
   * ---------------------------------------------------
   * @desc Evaluates whether each value is a valid data type string.
   * @param {!(string|strings)} types - The strings to evaluate.
   * @return {boolean} The evaluation result.
   */
  function checkDataTypeStrings(types) {

    /** @type {number} */
    var i;
    /** @type {boolean} */
    var pass;

    if ( checkTypeOf(types, 'string') ) {
      types = types.toLowerCase();
      types = types.replace(RegExps.lowerAlphaAndPipe, '');
      types = ( RegExps.pipe.test(types) ) ? types.split('|') : [ types ];
    }

    pass = true;

    i = types.length;
    while (i--) {
      pass = RegExps.allDataTypes.test(types[i]);
      if (!pass) {
        break;
      }
    }

    return pass;
  }

  /**
   * ---------------------------------------------------
   * Public Method (checkTypeOf)
   * ---------------------------------------------------
   * @desc Checks a value's typeof against the given type.
   * @param {*} val - The value to be evaluated.
   * @param {string} type - The data type.
   * @return {boolean} The evaluation result.
   */
  function checkTypeOf(val, type) {
    return (typeof val === type);
  }

  /**
   * ---------------------------------------------------
   * Public Method (checkInstanceOf)
   * ---------------------------------------------------
   * @desc Checks a value's instanceof against the given type.
   * @param {*} val - The value to be evaluated.
   * @param {string} type - The data type.
   * @return {boolean} The evaluation result.
   */
  function checkInstanceOf(val, type) {

    /** @type {!Object<string, function>} */
    var constructors;

    if ( !checkTypeOf(val, 'object') ) {
      return false;
    }

    constructors = {
      'elem'   : HTMLElement,
      'element': HTMLElement
    };

    return (val instanceof constructors[ type ]);
  }

  /**
   * ---------------------------------------------------
   * Public Method (checkArrayType)
   * ---------------------------------------------------
   * @desc Checks a value's data type against the given array type.
   * @param {*} vals - The value to be evaluated.
   * @param {string} type - The array data type.
   * @return {boolean} The evaluation result.
   */
  function checkArrayType(vals, type) {

    /** @type {number} */
    var i;
    /** @type {boolean} */
    var pass;
    /** @type {function} */
    var testFunc;

    if ( !Array.isArray(vals) ) {
      return false;
    }

    if (type === 'array') {
      return true;
    }

    type = type.slice(0, -1);

    testFunc = ( (type === 'array') ?
      Array.isArray : ( RegExps.instanceOfDataTypes.test(type) ) ?
        checkInstanceOf : checkTypeOf
    );

    pass = true;

    i = vals.length;
    while (i--) {
      pass = testFunc(vals[i], type);
      if (!pass) {
        break;
      }
    }

    return pass;
  }

  /**
   * ---------------------------------------------------
   * Public Method (checkHashMapType)
   * ---------------------------------------------------
   * @desc Checks a value's data type against the given object type.
   * @param {*} val - The value to be evaluated.
   * @param {string} type - The hash map's data type.
   * @return {boolean} The evaluation result.
   */
  function checkHashMapType(val, type) {

    /** @type {string} */
    var prop;
    /** @type {boolean} */
    var pass;
    /** @type {function} */
    var testFunc;

    if ( !checkTypeOf(val, 'object') ) {
      return false;
    }

    type = type.slice(0, -3);

    testFunc = ( (type === 'array') ?
      Array.isArray : ( RegExps.instanceOfDataTypes.test(type) ) ?
        checkInstanceOf : checkTypeOf
    );

    pass = true;

    for (prop in val) {
      if ( hasOwnProp(val, prop) ) {
        pass = testFunc(val[ prop ], type);
        if (!pass) {
          break;
        }
      }
    }

    return pass;
  }

  /**
   * ---------------------------------------------------
   * Public Method (checkArgsDataTypeStrings)
   * ---------------------------------------------------
   * @desc Evaluates whether the arguments contain valid data type string
   *   values for each argument.
   * @param {!vals} args - The arguments to be evaluated.
   * @return {boolean} The evaluation result.
   */
  function checkArgsDataTypeStrings(args) {

    /** @type {number} */
    var i;
    /** @type {boolean} */
    var pass;

    pass = true;

    i = args.length;
    while (i--) {

      if (i % 2) {
        pass = checkType(args[i], 'string');
        pass = pass && checkDataTypeString(args[i]);
      }

      if (!pass) {
        break;
      }
    }

    return pass;
  }

  /**
   * ---------------------------------------------------
   * Public Method (testArgTypes)
   * ---------------------------------------------------
   * @desc Evaluates argument data types.
   * @param {!vals} args - The arguments to be evaluated.
   * @return {boolean} The evaluation result.
   */
  function testArgTypes(args) {

    /** @type {number} */
    var i;
    /** @type {boolean} */
    var pass;
    /** @type {val} */
    var arg;
    /** @type {string} */
    var dataTypeOpts;

    pass = true;

    i = args.length;
    while (i--) {

      dataTypeOpts = args[i];

      --i;
      arg = args[i];

      pass = checkType(arg, dataTypeOpts);

      if (!pass) {
        break;
      }
    }

    return pass;
  }

  /**
   * ---------------------------------------------------
   * Public Method (stripArgTypeStrings)
   * ---------------------------------------------------
   * @desc Removes the data type strings from an array of arguments.
   * @param {!vals} args - The arguments.
   * @return {!vals} An array of the stripped arguments.
   */
  function stripArgTypeStrings(args) {

    /** @type {number} */
    var i;
    /** @type {number} */
    var ii;
    /** @type {number} */
    var len;
    /** @type {!vals} */
    var newArgs;

    len = args.length / 2;
    newArgs = new Array(len);

    i = args.length;
    ii = len;
    while (ii--) {
      i = i - 2;
      newArgs[ii] = args[i];
    }

    return newArgs;
  }

  /**
   * -----------------------------------------------------
   * Public Method (insertErrorBreakpoint)
   * -----------------------------------------------------
   * @desc Handles whether a debugger breakpoint is inserted for an error.
   * @return {boolean} Whether a breakpoint was inserted.
   */
  function insertErrorBreakpoint() {

    if (errorBreakpoints) {
      debugger;
    }

    return errorBreakpoints;
  };

  /**
   * -----------------------------------------------------
   * Public Class (ErrorMessages)
   * -----------------------------------------------------
   * @desc Error messages used throughout this module.
   * @type {!Object<string, function>}
   * @struct
   */
  var ErrorMessages = {};

  /**
   * -----------------------------------------------------
   * Public Method (ErrorMessages.setConsoleTypeError)
   * -----------------------------------------------------
   * @desc Creates an error message for a param type error in aIV.console.set.
   * @param {*} settings - The new settings.
   * @return {string} The error message.
   */
  ErrorMessages.setConsoleTypeError = function(settings) {

    /** @type {string} */
    var message;

    message = 'An aIV.console.set call was missing a valid object for the new ';
    message += 'settings parameter (the first and only parameter). It should ';
    message += 'be an object with string => value pairs that match the module ';
    message += 'properties you want to set and their new value (e.g. property ';
    message += '=> value). The invalid settings data type was \'';
    message += (settings === null) ? 'null' : typeof settings;
    message += '\'';

    return message;
  };

  /**
   * -----------------------------------------------------
   * Public Method (ErrorMessages.invalidGetName)
   * -----------------------------------------------------
   * @desc Creates an error message for an invalid method/type name
   *   parameter in a Debug get method.
   * @param {string} method - The name of the method that failed.
   * @param {string} name - The user's method/type name parameter.
   * @return {string} The error message.
   */
  ErrorMessages.invalidGetName = function(method, name) {

    /** @type {string} */
    var message;

    message = 'An aIV.console ' + method + ' call was missing a valid method ';
    message += 'or type name parameter (the first parameter). It should be a ';
    message += 'string of the method/type name that ' + method + ' is to get. ';
    message += 'The invalid name was \'' + name + '\'.';

    return message;
  };

  /**
   * -----------------------------------------------------
   * Public Method (ErrorMessages.missingMethodName)
   * -----------------------------------------------------
   * @desc Creates an error message for a missing method name
   *   parameter in a Debug logging method.
   * @param {string} method - The name of the method that failed.
   * @param {*} methodName - The user's method name parameter.
   * @return {string} The error message.
   */
  ErrorMessages.missingMethodName = function(method, methodName) {

    /** @type {string} */
    var message;

    message = 'An aIV.console ' + method + ' call was missing a valid method ';
    message += 'name parameter (the first parameter). It should be a string ';
    message += 'of the method\'s name that ' + method + ' is recording. The ';
    message += 'invalid method name parameter\'s data type follows: ';
    message += (methodName === null) ? 'null' : typeof methodName;

    return message;
  };

  /**
   * -----------------------------------------------------
   * Public Method (ErrorMessages.missingTypeStrings)
   * -----------------------------------------------------
   * @desc Creates an error message for missing type string parameters
   *   in a Debug logging method.
   * @param {string} method - The name of the method that failed.
   * @return {string} The error message.
   */
  ErrorMessages.missingTypeStrings = function(method) {

    /** @type {string} */
    var message;

    message = 'An aIV.console ' + method + ' call was missing valid data ';
    message += 'type strings to use for testing arguments. For all arguments ';
    message += 'you should include a string of each argument\'s possible data ';
    message += 'types (e.g. \'!string|object\') as a parameter immediately ';
    message += 'following the argument parameter.';

    return message;
  };

  /**
   * -----------------------------------------------------
   * Public Method (ErrorMessages.missingTestArgs)
   * -----------------------------------------------------
   * @desc Creates an error message for missing type string parameters
   *   in a Debug logging method.
   * @return {string} The error message.
   */
  ErrorMessages.missingTestArgs = function() {

    /** @type {string} */
    var message;

    message = 'An aIV.console args call was missing arguments to test. ';
    message += 'The args method requires that at least one argument be ';
    message += 'tested. After the first parameter (the method name), the ';
    message += 'second parameter should be an argument to test, and the ';
    message += 'third parameter should be a string of the argument\'s ';
    message += 'optional data types. You can include as many pairs of ';
    message += 'arguments and optional data types as you like.';

    return message;
  };

  /**
   * -----------------------------------------------------
   * Public Method (ErrorMessages.invalidGroupType)
   * -----------------------------------------------------
   * @desc Creates an error message for an invalid console group type
   *   in a Debug logging method.
   * @param {*} groupType - The invalid group type.
   * @return {string} The error message.
   */
  ErrorMessages.invalidGroupType = function(groupType) {

    /** @type {string} */
    var message;

    message = 'An aIV.console group call was given an incorrect group ';
    message += 'type value for its second parameter. The  group\'s data ';
    message += 'type was \'';
    message += (groupType === null) ? 'null' : typeof groupType;
    message += '\',  and its value converted to a string was \'';
    message += groupType + '\'. It should be either \'open\', \'coll\', ';
    message += 'or \'end\'.';

    return message;
  };

  /**
   * -----------------------------------------------------
   * Public Method (ErrorMessages.missingErrorMessage)
   * -----------------------------------------------------
   * @desc Creates an error message for a missing error message parameter
   *   in a Debug logging method.
   * @param {string} logMessage - The log message.
   * @return {string} The error message.
   */
  ErrorMessages.missingErrorMessage = function(logMessage) {

    /** @type {string} */
    var message;

    message = 'An aIV.console fail call was missing a valid log message ';
    message += 'parameter (its third parameter). It should be a string ';
    message += 'of the error message to log upon test failure. The ';
    message += 'invalid message\'s data type was \'';
    message += (logMessage === null) ? 'null' : typeof logMessage;
    message += '\'';

    return message;
  };

  /**
   * -----------------------------------------------------
   * Public Method (ErrorMessages.missingStateValues)
   * -----------------------------------------------------
   * @desc Creates an error message for missing values in a Debug.proto.state
   *   call.
   * @return {string} The error message.
   */
  ErrorMessages.missingStateValues = function() {

    /** @type {string} */
    var message;

    message = 'An aIV.console state call was missing a state to log. After ';
    message += 'the first parameter (the method name), the second parameter ';
    message += 'should be a log message with $$ in the places where you would ';
    message += 'like the variable states to be inserted. The remaining ';
    message += 'parameters should be the variables to capture.';

    return message;
  };

  /**
   * -----------------------------------------------------
   * Public Method (ErrorMessages.missingLogMessage)
   * -----------------------------------------------------
   * @desc Creates an error message for a missing log message parameter
   *   in a Debug logging method.
   * @param {string} logMessage - The log message.
   * @return {string} The error message.
   */
  ErrorMessages.missingLogMessage = function(logMessage) {

    /** @type {string} */
    var message;

    message = 'An aIV.console misc call was missing a valid log message ';
    message += 'parameter (its second parameter). It should be a string ';
    message += 'of the message to log. The invalid message\'s data type ';
    message += 'was \'';
    message += (logMessage === null) ? 'null' : typeof logMessage;
    message += '\'';

    return message;
  };

  freezeObj(ErrorMessages, true);

  /**
   * -----------------------------------------------------
   * Public Class (ErrorMessages)
   * -----------------------------------------------------
   * @desc Error messages used throughout this module.
   * @type {!Object<string, (string|function)>}
   * @struct
   */
  var ErrorMessages = {};

  /**
   * -----------------------------------------------------
   * Public Method (ErrorMessages.missingMethodName)
   * -----------------------------------------------------
   * @desc Creates an error message for a missing method name
   *   parameter in a Debug logging method.
   * @param {string} method - The name of the method that failed.
   * @param {string} methodName - The user's method name parameter.
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
   * Public Method (ErrorMessages.setConsoleTypeError)
   * -----------------------------------------------------
   * @desc Creates an error message for a param type error in aIV.console.set.
   * @param {!Object<string, *>} settings - The new settings.
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

  freezeObj(ErrorMessages, true);

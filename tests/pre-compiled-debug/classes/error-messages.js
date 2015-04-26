  /**
   * ---------------------------------------------------
   * Public Class (ErrorMessages)
   * ---------------------------------------------------
   * @desc Error messages used throughout this module.
   * @type {!Object<string, (string|function)>}
   * @struct
   */
  var ErrorMessages = {};

  /**
   * ---------------------------------------------------
   * Public Property (ErrorMessages.missingMethodName)
   * ---------------------------------------------------
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

  freezeObj(ErrorMessages, true);

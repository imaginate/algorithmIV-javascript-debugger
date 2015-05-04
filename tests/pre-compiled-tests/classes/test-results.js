  /**
   * -----------------------------------------------------
   * Public Class (TestResults)
   * -----------------------------------------------------
   * @desc Contains the results for a test.
   * @param {string} type - The type of tests that were ran.
   * @param {number=} amount - The number of tests that were ran.
   * @constructor
   */
  var TestResults = function(type, amount) {

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Protected Properties
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Protected Property (TestResults.result)
     * -----------------------------------------------
     * @desc The test results.
     * @type {boolean}
     */
    var result = true;

    /**
     * ----------------------------------------------- 
     * Protected Property (TestResults.errors)
     * -----------------------------------------------
     * @desc The test errors.
     * @type {!strings}
     */
    var errors = [];

    if (!checkType(amount, 'number') || amount < 0) {
      amount = 0;
    }

    ////////////////////////////////////////////////////////////////////////////
    // Define & Setup The Public Methods
    ////////////////////////////////////////////////////////////////////////////

    /**
     * ----------------------------------------------- 
     * Public Method (TestResults.reportResult)
     * -----------------------------------------------
     * @desc Reports the tests and their results.
     * @return {string} The test's type followed by its results.
     */
    this.reportResult = function() {

      /** @type {string} */
      var classname;
      /** @type {number} */
      var passed;
      /** @type {string} */
      var msg;
      /** @type {string} */
      var report;

      classname = (errors.length) ? 'red' : 'green';

      if (amount && amount > errors.length) {
        passed = amount - errors.length;
        report = '' +
          '<li class="' + classname + '">' +
            '<span class="title">' + type + '</span>' +
            ' =&gt; ' +
            '<span class="passed">' +
              'Passed ' + passed + ' of ' + amount + ' Tests' +
            '</span>' +
          '</li>';
      }
      else {
        msg = (result) ? 'Pass' : 'Fail';
        report = '' +
          '<li class="' + classname + '">' +
            '<span class="title">' + type + '</span>' +
            ' =&gt; ' + msg +
          '</li>';
      }

      return report;
    };

    /**
     * ----------------------------------------------- 
     * Public Method (TestResults.reportErrors)
     * -----------------------------------------------
     * @desc Reports the tests and their errors.
     * @return {?string} The test's type followed by its errors.
     */
    this.reportErrors = function() {

      /** @type {number} */
      var len;
      /** @type {number} */
      var i;
      /** @type {?string} */
      var report;

      len = errors.length;

      if (!len) {
        return null;
      }

      // The type of results name
      report = '<li>' + type;

      // The errors
      report += '<ol id="subErrors">';

      i = -1;
      while (++i < len) {
        report += '<li>' + errors[i] + '</li>';
      }

      report += '</ol></li>';

      return report;
    };

    /**
     * ----------------------------------------------- 
     * Public Method (TestResults.getResult)
     * -----------------------------------------------
     * @desc Gets the test results.
     * @return {boolean} The test's results.
     */
    this.getResult = function() {
      return result;
    };

    /**
     * ----------------------------------------------- 
     * Public Method (TestResults.setResult)
     * -----------------------------------------------
     * @desc Sets the test results.
     * @param {boolean} pass - The test results.
     */
    this.setResult = function(pass) {
      if (typeof pass === 'boolean') {
        result = pass;
      }
    };

    /**
     * ----------------------------------------------- 
     * Public Method (TestResults.addError)
     * -----------------------------------------------
     * @desc Adds an error to the test results.
     * @param {string} msg - The error message.
     */
    this.addError = function(msg) {

      result = false;

      if (typeof msg !== 'string') {
        msg = 'No error message was provided.';
      }

      errors.push(msg);
    };

    ////////////////////////////////////////////////////////////////////////////
    // End Of The Class Setup
    ////////////////////////////////////////////////////////////////////////////

    // Deep freeze
    aIV.utils.freezeObj(this, true);
  };

////////////////////////////////////////////////////////////////////////////////
// The Prototype Methods
////////////////////////////////////////////////////////////////////////////////

  TestResults.prototype.constructor = TestResults;

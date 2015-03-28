  /**
   * -----------------------------------------------------
   * Public Class (TestResults)
   * -----------------------------------------------------
   * @desc Contains the results for a test.
   * @param {string} type - The type of tests that were ran.
   * @constructor
   */
  var TestResults = function(type) {

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
     * @type {?strings}
     */
    var errors = null;

    /**
     * ----------------------------------------------- 
     * Public Method (TestResults.reportResult)
     * -----------------------------------------------
     * @desc Reports the tests and their results.
     * @return {string} The test's type followed by its results.
     */
    this.reportResult = function() {
      /** @type {string} */
      var name;
      /** @type {string} */
      var msg;
      /** @type {string} */
      var report;

      name = (result) ? 'green' : 'red';
      msg = (result) ? 'Success' : 'Failure';
      report = '' +
        '<li class="' + name + '">' +
          type + ' =&gt; ' + msg +
        '</li>';

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

      report = null;

      if (errors && errors.length) {

        // The type of results name
        report = '<li>' + type;

        // The errors
        report += '<ol id="subErrors">';

        len = errors.length;
        i = -1;

        while (++i < len) {
          report += '<li>' + errors[i] + '</li>';
        }

        report += '</ol></li>';
      }

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
      result = pass;
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
      if (errors) {
        errors.push(msg);
      }
      else {
        errors = [ msg ];
      }
    };
  };

  // Ensure constructor is set to this class.
  TestResults.prototype.constructor = TestResults;

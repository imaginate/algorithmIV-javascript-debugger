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
     * ---------------------------------------------------
     * Private Property (TestResults.debug)
     * ---------------------------------------------------
     * @type {Object}
     */
    this.debug = aIV.debug({
      classTitle     : 'TestResults',
      turnOnDebuggers: 'misc'
    });

    /**
     * ----------------------------------------------- 
     * Protected Property (TestResults.result)
     * -----------------------------------------------
     * @desc The test results.
     * @type {boolean}
     */
    var result;

    /**
     * ----------------------------------------------- 
     * Public Method (TestResults.report)
     * -----------------------------------------------
     * @desc Reports the tests and their results.
     * @return {string} The test's type followed by its results.
     */
    this.report = function() {
      /** @type {string} */
      var report;

      report = type + ' => ';
      report += (result) ? 'Success' : 'Failure';

      return report;
    };

    /**
     * ----------------------------------------------- 
     * Public Method (TestResults.get)
     * -----------------------------------------------
     * @desc Gets the test results.
     * @return {boolean} The test's results.
     */
    this.get = function() {
      return result;
    };

    /**
     * ----------------------------------------------- 
     * Public Method (TestResults.set)
     * -----------------------------------------------
     * @desc Sets the test results.
     * @param {boolean} pass - The test results.
     */
    this.set = function(pass) {
      result = pass;
    };
  };

  // Ensure constructor is set to this class.
  TestResults.prototype.constructor = TestResults;

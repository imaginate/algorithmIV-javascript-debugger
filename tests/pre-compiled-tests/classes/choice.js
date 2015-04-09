  /**
   * -----------------------------------------------------
   * Public Class (Choice)
   * -----------------------------------------------------
   * @desc A choice to be executed.
   * @param {string} choiceMsg - The choice message.
   * @param {TestResults} results - The results object.
   * @param {string} errorMsg - The error message.
   * @param {?function} before - A function that gets called before
   *   the choice is shown.
   * @param {?function} after - A function that gets called after
   *   a choice is completed.
   * @constructor
   */
  var Choice = function(choiceMsg, results, errorMsg, before, after) {

    /**
     * ----------------------------------------------- 
     * Public Property (Choice.msg)
     * -----------------------------------------------
     * @desc The choice directions.
     * @type {string}
     */
    this.msg = choiceMsg;

    /**
     * ----------------------------------------------- 
     * Public Method (Choice.fail)
     * -----------------------------------------------
     * @desc A function that records an error and the
     *   failure of a test.
     * @type {function}
     */
    this.fail = function() {
      results.addError(errorMsg);
      results.setResult(false);
    };
    Object.freeze(this.fail);

    /**
     * ----------------------------------------------- 
     * Public Method (Choice.before)
     * -----------------------------------------------
     * @desc Logic to call before showing the choice.
     * @type {?function}
     */
    this.before = before;
    if (before) {
      Object.freeze(before);
    }

    /**
     * ----------------------------------------------- 
     * Public Method (Choice.after)
     * -----------------------------------------------
     * @desc Logic to call after completing the choice.
     * @type {?function}
     */
    this.after = after;
    if (after) {
      Object.freeze(after);
    }
  };

  // Ensure constructor is set to this class.
  Choice.prototype.constructor = Choice;

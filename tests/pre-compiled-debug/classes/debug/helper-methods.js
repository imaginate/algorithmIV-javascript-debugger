  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.handleAuto)
   * -----------------------------------------------------
   * @desc Handles the automated actions for a logging method.
   * @param {string} type - The type of automation to handle.
   * @param {string} methodName - The name of the user's method to log.
   * @param {boolean=} end - Controls whether the automation should start
   *   or end. The default value is false.
   * @return {boolean} The automation's success (i.e. whether an action
   *   was made).
   */
  Debug.prototype.handleAuto = function(type, methodName, end) {

    /** @type {string} */
    var label;

    if ( !this.getAuto(type) ) {
      return false;
    }

    if ( !checkType(end, 'boolean') ) {
      end = false;
    }

    label = this.autoSettings[ type ].msgTitle + ': ';
    label += this.classTitle + methodName;

    if (end) {
      this.autoSettings[ type ].endFunc(label);
    }
    else {
      this.autoSettings[ type ].startFunc(label);
    }

    return true;
  };
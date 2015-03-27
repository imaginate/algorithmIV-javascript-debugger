  /**
   * -----------------------------------------------------
   * Public Class (Elems)
   * -----------------------------------------------------
   * @desc Important app elements.
   * @constructor
   */
  var Elems = function() {

    console.log('Elems is being setup.');

    /**
     * ---------------------------------------------------
     * Private Property (Elems.msg)
     * ---------------------------------------------------
     * @desc Element: #msg
     * @type {HTMLElement}
     */
    this.msg = getID('msg');

    /**
     * ---------------------------------------------------
     * Private Property (Elems.ui)
     * ---------------------------------------------------
     * @desc Element: #ui
     * @type {HTMLElement}
     */
    this.ui = getID('ui');

    /**
     * ---------------------------------------------------
     * Private Property (Elems.start)
     * ---------------------------------------------------
     * @desc Element: #start
     * @type {HTMLElement}
     */
    this.start = getID('start');

    /**
     * ---------------------------------------------------
     * Private Property (Elems.choose)
     * ---------------------------------------------------
     * @desc Element: #choose
     * @type {HTMLElement}
     */
    this.choose = getID('choose');

    /**
     * ---------------------------------------------------
     * Private Property (Elems.yes)
     * ---------------------------------------------------
     * @desc Element: #yes
     * @type {HTMLElement}
     */
    this.yes = getID('yes');
    this.yes.onclick = function () {
      choice = true;
    };

    /**
     * ---------------------------------------------------
     * Private Property (Elems.no)
     * ---------------------------------------------------
     * @desc Element: #no
     * @type {HTMLElement}
     */
    this.no = getID('no');
    this.no.onclick = function () {
      choice = false;
    };
  };

  // Ensure constructor is set to this class.
  Elems.prototype.constructor = Elems;

  /**
   * -----------------------------------------------
   * Public Method (Elems.prototype.clearUI)
   * -----------------------------------------------
   * @desc Clears the current interactions.
   * @type {function()}
   */
  Elems.prototype.clearUI = function() {

    /** @type {Object} */
    var that;

    that = this;

    this.ui.style.opacity = '0';

    setTimeout(function() {
      that.msg.textContent = 'Tests are running.';
      that.start.style.display = 'none';
      that.choose.style.display = 'none';
      that.ui.style.opacity = '1';
    }, 500);
  };

  /**
   * -----------------------------------------------
   * Public Method (Elems.prototype.showMsg)
   * -----------------------------------------------
   * @desc Shows a message to the user.
   * @param {string} msg - The message to show.
   */
  Elems.prototype.showMsg = function(msg) {

    /** @type {Object} */
    var that;

    that = this;

    this.ui.style.opacity = '0';

    setTimeout(function() {
      that.msg.textContent = msg;
      that.choose.style.display = 'none';
      that.ui.style.opacity = '1';
    }, 500);
  };

  /**
   * -----------------------------------------------
   * Public Method (Elems.prototype.showChoice)
   * -----------------------------------------------
   * @desc Shows a message with 'yes' or 'no' options to the user.
   * @param {string} msg - The message to show.
   */
  Elems.prototype.showChoice = function(msg) {

    /** @type {Object} */
    var that;

    that = this;

    this.ui.style.opacity = '0';

    setTimeout(function() {
      that.msg.textContent = msg;
      that.choose.style.display = 'block';
      that.ui.style.opacity = '1';
    }, 500);
  };

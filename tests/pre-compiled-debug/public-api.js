  /**
   * ---------------------------------------------------
   * Global Variable (aIV)
   * ---------------------------------------------------
   * @desc Holds the public API for aIV's apps, tools, and libraries.
   * @struct
   * @global
   */
  window.aIV = window.aIV || {};

  /**
   * ---------------------------------------------------
   * Global Method (aIV.debug)
   * ---------------------------------------------------
   * @desc Creates an instance of aIV's Debug class.
   * @param {(string|{
   *   classTitle     : (string|undefined),
   *   turnOffTypes   : (string|strings|undefined),
   *   turnOnDebuggers: (string|strings|undefined)
   * })=} settings - The Debug instance's settings.
   * return {Debug}
   * @global
   */
  aIV.debug = function (settings) {
    if (typeof settings !== 'string' && typeof settings !== 'object') {
      settings = null;
    }
    return debug.newDebug(settings);
  };

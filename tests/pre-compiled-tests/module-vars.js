  /**
   * ----------------------------------------------- 
   * Public Variable (debug)
   * -----------------------------------------------
   * @desc The Debug instance for the module's public methods.
   * @type {Object}
   */
  var debug = aIV.debug({
    classTitle     : 'module',
    turnOnDebuggers: 'fail args'
  });

  /**
   * ----------------------------------------------- 
   * Public Variable (app)
   * -----------------------------------------------
   * @desc The instance of DummyApp for the tests.
   * @type {DummyApp}
   */
  var app;

  /**
   * ----------------------------------------------- 
   * Public Variable (choice)
   * -----------------------------------------------
   * @desc The result of a UI interaction with #choose.
   * @type {boolean}
   */
  var choice;

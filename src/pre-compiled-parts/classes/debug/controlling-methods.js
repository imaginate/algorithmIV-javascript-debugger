  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.turnOnMethod)
   * -----------------------------------------------------
   * @desc Used to enable any methods that are disabled.
   * @param {...!(string|strings)} method - The method to enable.
   *   If 'all' is provided then all methods are enabled.
   * @return {boolean} The update's success (if error return false).
   * @example
   *   // Create an aIV.console class instance
   *   Example.prototype.constructor = function Example() {
   *     this.console = aIV.console.create('Example');
   *   };
   *   
   *   Example.prototype.exMethod = function() {
   *     
   *     // Calling turnOnMethod with multiple params
   *     this.console.turnOnMethod('start', 'state');
   *     
   *     // Calling turnOnMethod with an array
   *     var arr = [ 'start', 'state' ];
   *     this.console.turnOnMethod(arr);
   *   };
   */
  Debug.prototype.turnOnMethod = function(method) {

    /** @type {!Debug} */
    var that;
    /** @type {function} */
    var setter;

    that = this;
    setter = function(method) {
      return that.setMethod(method, true);
    };

    if (arguments.length > 1) {
      method = Array.prototype.slice.call(arguments, 0).join(' ');
    }
    else if ( checkType(method, '!strings') ) {
      method = method.join(' ');
    }

    return Debug.handleToggle('turnOnMethod', setter, method);
  };

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.turnOn)
   * -----------------------------------------------------
   * @desc The same as {@link Debug.prototype.turnOnMethod}.
   * @type {function( ...!(string|strings) ): boolean}
   */
  Debug.prototype.turnOn = Debug.prototype.turnOnMethod;

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.turnOffMethod)
   * -----------------------------------------------------
   * @desc Used to disable any methods that are enabled.
   * @param {...!(string|strings)} method - The method to disable.
   *   If 'all' is provided then all methods are disabled.
   * @return {boolean} The update's success (if error return false).
   * @example
   *   // Create an aIV.console class instance
   *   Example.prototype.constructor = function Example() {
   *     this.console = aIV.console.create('Example');
   *   };
   *   
   *   Example.prototype.exMethod = function() {
   *     
   *     // Calling turnOffMethod with multiple params
   *     this.console.turnOffMethod('args', 'fail');
   *     
   *     // Calling turnOffMethod with an array
   *     var arr = [ 'args', 'fail' ];
   *     this.console.turnOffMethod(arr);
   *   };
   */
  Debug.prototype.turnOffMethod = function(method) {

    /** @type {!Debug} */
    var that;
    /** @type {function} */
    var setter;

    that = this;
    setter = function(method) {
      return that.setMethod(method, false);
    };

    if (arguments.length > 1) {
      method = Array.prototype.slice.call(arguments, 0).join(' ');
    }
    else if ( checkType(method, '!strings') ) {
      method = method.join(' ');
    }

    return Debug.handleToggle('turnOffMethod', setter, method);
  };

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.turnOff)
   * -----------------------------------------------------
   * @desc The same as {@link Debug.prototype.turnOffMethod}.
   * @type {function( ...!(string|strings) ): boolean}
   */
  Debug.prototype.turnOff = Debug.prototype.turnOffMethod;

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.addBreakpoint)
   * -----------------------------------------------------
   * @desc Used to add debugger breakpoints to methods.
   * @param {...!(string|strings)} method - The method to add to.
   *   If 'all' is provided then all methods will add breakpoints.
   * @return {boolean} The update's success (if error return false).
   * @example
   *   // Create an aIV.console class instance
   *   Example.prototype.constructor = function Example() {
   *     this.console = aIV.console.create('Example');
   *   };
   *   
   *   Example.prototype.exMethod = function() {
   *     
   *     // Calling addBreakpoint with multiple params
   *     this.console.addBreakpoint('args', 'fail');
   *     
   *     // Calling addBreakpoint with an array
   *     var arr = [ 'args', 'fail' ];
   *     this.console.addBreakpoint(arr);
   *   };
   */
  Debug.prototype.addBreakpoint = function(method) {

    /** @type {!Debug} */
    var that;
    /** @type {function} */
    var setter;

    that = this;
    setter = function(method) {
      return that.setBreakpoint(method, true);
    };

    if (arguments.length > 1) {
      method = Array.prototype.slice.call(arguments, 0).join(' ');
    }
    else if ( checkType(method, '!strings') ) {
      method = method.join(' ');
    }

    return Debug.handleToggle('addBreakpoint', setter, method);
  };

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.turnOnDebugger)
   * -----------------------------------------------------
   * @desc The same as {@link Debug.prototype.addBreakpoint}.
   * @type {function( ...!(string|strings) ): boolean}
   */
  Debug.prototype.turnOnDebugger = Debug.prototype.addBreakpoint;

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.removeBreakpoint)
   * -----------------------------------------------------
   * @desc Used to remove debugger breakpoints from methods.
   * @param {...!(string|strings)} method - The method to remove from.
   *   If 'all' is provided then all methods will not add breakpoints.
   * @return {boolean} The update's success (if error return false).
   * @example
   *   // Create an aIV.console class instance
   *   Example.prototype.constructor = function Example() {
   *     this.console = aIV.console.create('Example');
   *   };
   *   
   *   Example.prototype.exMethod = function() {
   *     
   *     // Calling removeBreakpoint with multiple params
   *     this.console.removeBreakpoint('start', 'state');
   *     
   *     // Calling removeBreakpoint with an array
   *     var arr = [ 'start', 'state' ];
   *     this.console.removeBreakpoint(arr);
   *   };
   */
  Debug.prototype.removeBreakpoint = function(method) {

    /** @type {!Debug} */
    var that;
    /** @type {function} */
    var setter;

    that = this;
    setter = function(method) {
      return that.setBreakpoint(method, false);
    };

    if (arguments.length > 1) {
      method = Array.prototype.slice.call(arguments, 0).join(' ');
    }
    else if ( checkType(method, '!strings') ) {
      method = method.join(' ');
    }

    return Debug.handleToggle('removeBreakpoint', setter, method);
  };

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.turnOffDebugger)
   * -----------------------------------------------------
   * @desc The same as {@link Debug.prototype.removeBreakpoint}.
   * @type {function( ...!(string|strings) ): boolean}
   */
  Debug.prototype.turnOffDebugger = Debug.prototype.removeBreakpoint;

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.turnOnAuto)
   * -----------------------------------------------------
   * @desc Used to enable any automations that are disabled.
   * @param {...!(string|strings)} type - The type to enable.
   *   If 'all' is provided then all automations are enabled.
   * @return {boolean} The update's success (if error return false).
   * @example
   *   // Create an aIV.console class instance
   *   Example.prototype.constructor = function Example() {
   *     this.console = aIV.console.create('Example');
   *   };
   *   
   *   Example.prototype.exMethod = function() {
   *     
   *     // Calling turnOnAuto with multiple params
   *     this.console.turnOnAuto('groups', 'timers');
   *     
   *     // Calling turnOnAuto with an array
   *     var arr = [ 'groups', 'timers' ];
   *     this.console.turnOnAuto(arr);
   *   };
   */
  Debug.prototype.turnOnAuto = function(type) {

    /** @type {!Debug} */
    var that;
    /** @type {function} */
    var setter;

    that = this;
    setter = function(type) {
      return that.setAuto(type, true);
    };

    if (arguments.length > 1) {
      type = Array.prototype.slice.call(arguments, 0).join(' ');
    }
    else if ( checkType(type, '!strings') ) {
      type = type.join(' ');
    }

    return Debug.handleToggle('turnOnAuto', setter, type);
  };

  /**
   * -----------------------------------------------------
   * Public Method (Debug.prototype.turnOffAuto)
   * -----------------------------------------------------
   * @desc Used to disable any automations that are enabled.
   * @param {...!(string|strings)} type - The type to disable.
   *   If 'all' is provided then all automations are disabled.
   * @return {boolean} The update's success (if error return false).
   * @example
   *   // Create an aIV.console class instance
   *   Example.prototype.constructor = function Example() {
   *     this.console = aIV.console.create('Example');
   *   };
   *   
   *   Example.prototype.exMethod = function() {
   *     
   *     // Calling turnOffAuto with multiple params
   *     this.console.turnOffAuto('groups', 'timers');
   *     
   *     // Calling turnOffAuto with an array
   *     var arr = [ 'groups', 'timers' ];
   *     this.console.turnOffAuto(arr);
   *   };
   */
  Debug.prototype.turnOffAuto = function(type) {

    /** @type {!Debug} */
    var that;
    /** @type {function} */
    var setter;

    that = this;
    setter = function(type) {
      return that.setAuto(type, false);
    };

    if (arguments.length > 1) {
      type = Array.prototype.slice.call(arguments, 0).join(' ');
    }
    else if ( checkType(type, '!strings') ) {
      type = type.join(' ');
    }

    return Debug.handleToggle('turnOffAuto', setter, type);
  };

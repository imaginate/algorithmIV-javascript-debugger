  if (!Array.isArray) {
    /**
     * ---------------------------------------------
     * Public Method (Array.isArray)
     * ---------------------------------------------
     * @desc A polyfill for the native method. For method details
     *   [see MDN]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray}
     * @param {*} val
     * @return {boolean}
     */
    Array.isArray = function(val) {
      return Object.prototype.toString.call(val) === '[object Array]';
    };
  }

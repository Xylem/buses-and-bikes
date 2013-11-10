"use strict";

/**
 * Curries a function, applying given scope and arguments.
 *
 * @param {Function} fn function to curry
 * @param {Object} scope scope in which the curried function should be executed
 * @param {...*} V_ARGS arguments to apply to the function
 * @returns {Function} curried function
 */
exports.curry = function curry (fn, scope, V_ARGS) {
    var args = [];

    for (var i=2, len = arguments.length; i < len; ++i) {
        args.push(arguments[i]);
    }

    return function() {
        fn.apply(scope, args);
    };
};
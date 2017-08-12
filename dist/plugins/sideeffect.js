'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var __CONFIG__ = require('../constants.js').__CONFIG__;

function wrapToNestedFn(handler) {
  return function (store) {
    return function (next) {
      return function (action) {
        var result = handler(action, store);
        if (result !== false) {
          next(action);
        }
      };
    };
  };
}

module.exports = function middleware() {
  var middlewares = Array.prototype.slice.apply(arguments).map(wrapToNestedFn);
  return function (state) {
    return _extends({}, state, _defineProperty({}, __CONFIG__, _extends(state[__CONFIG__], {
      initialMiddlewares: state[__CONFIG__].initialMiddlewares.concat(middlewares)
    })));
  };
};
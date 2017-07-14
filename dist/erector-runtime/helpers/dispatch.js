'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = dispatch;

var _constants = require('../../constants');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Dispatch an action.
 *
 * @private
 * @param  {object} action
 */
function dispatch(action) {
  return function lateDispatch(props, store) {
    var next = function callback(promise) {
      next = promise;
    };
    store.dispatch(_extends({}, action, _defineProperty({}, _constants.NEXT, typeof action[_constants.NEXT] === 'function' || next)));
    return next;
  };
}
module.exports = exports['default'];
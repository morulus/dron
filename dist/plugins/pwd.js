'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* Setup project working directory */
var __CONFIG__ = require('../constants.js').__CONFIG__;

module.exports = function pwd(pwd) {
  if (typeof pwd !== 'string') {
    throw new Error('pwd must be a string');
    return void 0;
  }

  return function (state) {
    return _extends({}, state, _defineProperty({}, __CONFIG__, _extends({}, state[__CONFIG__], {
      pwd: pwd
    })));
  };
};
'use strict';

var _defineProperty2 = require('/Users/morulus/Work/morulus/projects/erector/node_modules/erector-core-transform-config/node_modules/babel-runtime/core-js/object/define-property');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('/Users/morulus/Work/morulus/projects/erector/node_modules/erector-core-transform-config/node_modules/babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _extends = _assign2.default || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { (0, _defineProperty3.default)(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var __CONFIG__ = require('../constants.js').__CONFIG__;
module.exports = function middleware() {
  var middlewares = Array.prototype.slice.apply(arguments);
  return function (state) {
    return _extends({}, state, _defineProperty({}, __CONFIG__, _extends(state[__CONFIG__], {
      initialMiddlewares: state[__CONFIG__].initialMiddlewares.concat(middlewares)
    })));
  };
};
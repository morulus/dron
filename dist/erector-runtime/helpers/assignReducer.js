'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = assignReducer;

var _dispatch = require('./dispatch');

var _dispatch2 = _interopRequireDefault(_dispatch);

var _exit = require('./exit');

var _exit2 = _interopRequireDefault(_exit);

var _constants = require('../../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function assignReducer(reducer) {
  return function () {
    return (0, _dispatch2.default)({
      type: _constants.ACTION_ASSIGN_REDUCER,
      reducer: reducer
    });
  };
} /**
   * Assign reducer to store
   * @private
   */
module.exports = exports['default'];
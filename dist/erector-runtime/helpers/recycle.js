'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = recycle;

var _echo = require('./echo');

var _echo2 = _interopRequireDefault(_echo);

var _assignState = require('./assignState');

var _assignState2 = _interopRequireDefault(_assignState);

var _lodash = require('lodash.isPlainObject');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function* recycle(worker) {
  while (true) {
    var payload = yield worker;
    if (!(0, _lodash2.default)(payload)) {
      if (!payload) {
        break;
      } else {
        throw new Error('recycle payload must be a plain object or falsy');
      }
    } else {
      var nextState = yield (0, _assignState2.default)(payload);
    }
  }
}
module.exports = exports['default'];
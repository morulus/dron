'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = connectDispatcher;

var _assignMiddleware = require('./assignMiddleware');

var _assignMiddleware2 = _interopRequireDefault(_assignMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function* connectDispatcher(handler) {
  yield echo.warn('connectDispatcher is deprecated, use applyDispatcher instead');
  yield (0, _assignMiddleware2.default)(function () {
    return function () {
      return handler;
    };
  });
}
module.exports = exports['default'];
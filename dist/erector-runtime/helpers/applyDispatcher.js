'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = connectDispatcher;

var _assignMiddleware = require('./assignMiddleware');

var _assignMiddleware2 = _interopRequireDefault(_assignMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Apply custom dispatcher, which will be accept all Erector actions.
 *
 * @param  {function|generator} handler
 * @return {function} Unapplier
 */
function* connectDispatcher(handler) {
  yield (0, _assignMiddleware2.default)(function () {
    return function () {
      return handler;
    };
  });
}
module.exports = exports['default'];
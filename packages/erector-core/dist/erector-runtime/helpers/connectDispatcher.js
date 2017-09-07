'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('/Users/morulus/Work/morulus/projects/erector/packages/erector-core-transform-config/node_modules/babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = connectDispatcher;

var _assignMiddleware = require('./assignMiddleware');

var _assignMiddleware2 = _interopRequireDefault(_assignMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/_regenerator2.default.mark(connectDispatcher);

function connectDispatcher(handler) {
  return _regenerator2.default.wrap(function connectDispatcher$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return echo.warn('connectDispatcher is deprecated, use applyDispatcher instead');

        case 2:
          _context.next = 4;
          return (0, _assignMiddleware2.default)(function () {
            return function () {
              return handler;
            };
          });

        case 4:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this);
}
module.exports = exports['default'];
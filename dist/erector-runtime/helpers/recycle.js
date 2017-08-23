'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('/Users/morulus/Work/morulus/projects/erector/node_modules/erector-core-transform-config/node_modules/babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = recycle;

var _echo = require('./echo');

var _echo2 = _interopRequireDefault(_echo);

var _assignState = require('./assignState');

var _assignState2 = _interopRequireDefault(_assignState);

var _lodash = require('lodash.isPlainObject');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [recycle].map(_regenerator2.default.mark);

function recycle(worker) {
  var payload, nextState;
  return _regenerator2.default.wrap(function recycle$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!true) {
            _context.next = 23;
            break;
          }

          _context.prev = 1;
          _context.next = 4;
          return worker;

        case 4:
          payload = _context.sent;

          if ((0, _lodash2.default)(payload)) {
            _context.next = 13;
            break;
          }

          if (payload) {
            _context.next = 10;
            break;
          }

          return _context.abrupt('break', 23);

        case 10:
          throw new Error('recycle payload must be a plain object or falsy');

        case 11:
          _context.next = 16;
          break;

        case 13:
          _context.next = 15;
          return (0, _assignState2.default)(payload);

        case 15:
          nextState = _context.sent;

        case 16:
          _context.next = 21;
          break;

        case 18:
          _context.prev = 18;
          _context.t0 = _context['catch'](1);
          throw _context.t0;

        case 21:
          _context.next = 0;
          break;

        case 23:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this, [[1, 18]]);
}
module.exports = exports['default'];
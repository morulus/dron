'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('/Users/morulus/Work/morulus/projects/erector/packages/erector-core-transform-config/node_modules/babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = forkAll;

var _fork = require('./fork');

var _fork2 = _interopRequireDefault(_fork);

var _reciprocator = require('reciprocator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/_regenerator2.default.mark(forkAll);

/**
 * Fork multiple tasks.
 * @example
 * const asyncTasks = forkAll(
 *  Promise.resolve(1),
 *  Promise.resolve(2),
 *  Promise.resolve(3),
 * );
 * yield echo(asyncTasks);
 * // [1, 2, 3]
 * @param  {...any} ...subjects
 * @return {function}
 */
function forkAll() {
  for (var _len = arguments.length, subjects = Array(_len), _key = 0; _key < _len; _key++) {
    subjects[_key] = arguments[_key];
  }

  var sausages, i, forkHandler;
  return _regenerator2.default.wrap(function forkAll$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          sausages = [];
          i = 0;

        case 2:
          if (!(i < subjects.length)) {
            _context2.next = 9;
            break;
          }

          _context2.next = 5;
          return (0, _fork2.default)(subjects[i]);

        case 5:
          sausages[i] = _context2.sent;

        case 6:
          ++i;
          _context2.next = 2;
          break;

        case 9:
          forkHandler = /*#__PURE__*/_regenerator2.default.mark(function _callee() {
            var results, _i;

            return _regenerator2.default.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    results = [];
                    _i = 0;

                  case 2:
                    if (!(_i < subjects.length)) {
                      _context.next = 9;
                      break;
                    }

                    _context.next = 5;
                    return sausages[_i];

                  case 5:
                    results[_i] = _context.sent;

                  case 6:
                    ++_i;
                    _context.next = 2;
                    break;

                  case 9:
                    return _context.abrupt('return', results);

                  case 10:
                  case 'end':
                    return _context.stop();
                }
              }
            }, _callee, this);
          });


          forkHandler[_reciprocator.CANCEL] = function () {
            sausages.forEach(function (sausage) {
              return sausages[_reciprocator.CANCEL]();
            });
            sausages.splice(0);
          };

          return _context2.abrupt('return', forkHandler);

        case 12:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked, this);
}
module.exports = exports['default'];
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("/Users/morulus/Work/morulus/projects/erector/node_modules/erector-core-transform-config/node_modules/babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _isIterable2 = require("/Users/morulus/Work/morulus/projects/erector/node_modules/erector-core-transform-config/node_modules/babel-runtime/core-js/is-iterable");

var _isIterable3 = _interopRequireDefault(_isIterable2);

exports.default = each;

var _digest = require("./digest");

var _digest2 = _interopRequireDefault(_digest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [each].map(_regenerator2.default.mark);

/**
 * Iterate array or object with handler.
 * @example
 * yield each([1, 2, 3], function* (num) {
 *  yield echo(num);
 * });
 * @param  {array|object} iterable
 * @param  {function|generator} callback
 * @return {array|object|Error}
 */
function each(iterable, callback) {
  var i, mapped, prop;
  return _regenerator2.default.wrap(function each$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _digest2.default)(iterable);

        case 2:
          iterable = _context.sent;

          if (!(0, _isIterable3.default)(iterable)) {
            _context.next = 14;
            break;
          }

          i = 0;

        case 5:
          if (!(i < iterable.length)) {
            _context.next = 11;
            break;
          }

          _context.next = 8;
          return callback(iterable[i], i);

        case 8:
          i++;
          _context.next = 5;
          break;

        case 11:
          return _context.abrupt("return", iterable);

        case 14:
          if (!("object" === typeof iterable)) {
            _context.next = 27;
            break;
          }

          mapped = {};
          _context.t0 = _regenerator2.default.keys(iterable);

        case 17:
          if ((_context.t1 = _context.t0()).done) {
            _context.next = 24;
            break;
          }

          prop = _context.t1.value;

          if (!iterable.hasOwnProperty(prop)) {
            _context.next = 22;
            break;
          }

          _context.next = 22;
          return callback(iterable[prop], prop);

        case 22:
          _context.next = 17;
          break;

        case 24:
          return _context.abrupt("return", iterable);

        case 27:
          return _context.abrupt("return", new Error("Operator each() requires iterable object"));

        case 28:
        case "end":
          return _context.stop();
      }
    }
  }, _marked[0], this);
}
module.exports = exports["default"];
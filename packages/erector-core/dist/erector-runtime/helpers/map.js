"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("/Users/morulus/Work/morulus/projects/erector/node_modules/erector-core-transform-config/node_modules/babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _isIterable2 = require("/Users/morulus/Work/morulus/projects/erector/node_modules/erector-core-transform-config/node_modules/babel-runtime/core-js/is-iterable");

var _isIterable3 = _interopRequireDefault(_isIterable2);

exports.default = map;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [map].map(_regenerator2.default.mark);

/**
 * Create a new array with the results of executing a handler for every array/object element.
 * @example
 * const files = [
 *  './a.js',
 *  './b.js',
 *  './c.js'
 * ];
 * const existsMap = yield map(files, function* (file) {
 *  yield fileExists(file);
 * });
 * yield echo(existsMap); // [true, true, false]
 * @param  {array|object} iterable
 * @param  {function|generator} handler
 * @return {array|object}
 */
function map(iterable, handler) {
  var i, mapped, prop;
  return _regenerator2.default.wrap(function map$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!(0, _isIterable3.default)(iterable)) {
            _context.next = 13;
            break;
          }

          i = 0;

        case 2:
          if (!(i < iterable.length)) {
            _context.next = 9;
            break;
          }

          _context.next = 5;
          return handler(iterable[i], i);

        case 5:
          iterable[i] = _context.sent;

        case 6:
          i++;
          _context.next = 2;
          break;

        case 9:
          _context.next = 11;
          return iterable;

        case 11:
          _context.next = 29;
          break;

        case 13:
          if (!("object" === typeof iterable)) {
            _context.next = 28;
            break;
          }

          mapped = {};
          _context.t0 = _regenerator2.default.keys(iterable);

        case 16:
          if ((_context.t1 = _context.t0()).done) {
            _context.next = 24;
            break;
          }

          prop = _context.t1.value;

          if (!iterable.hasOwnProperty(prop)) {
            _context.next = 22;
            break;
          }

          _context.next = 21;
          return handler(iterable[prop], prop);

        case 21:
          mapped[prop] = _context.sent;

        case 22:
          _context.next = 16;
          break;

        case 24:
          _context.next = 26;
          return mapped;

        case 26:
          _context.next = 29;
          break;

        case 28:
          throw new Error("Operator map() requires iterable object");

        case 29:
        case "end":
          return _context.stop();
      }
    }
  }, _marked[0], this);
}
module.exports = exports["default"];
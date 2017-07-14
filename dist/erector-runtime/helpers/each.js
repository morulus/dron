"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = each;

var _digest = require("./digest");

var _digest2 = _interopRequireDefault(_digest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
function* each(iterable, callback) {
  iterable = yield (0, _digest2.default)(iterable);
  if (Symbol.iterator in iterable) {
    for (var i = 0; i < iterable.length; i++) {
      yield callback(iterable[i], i);
    }
    return iterable;
  } else if ("object" === typeof iterable) {
    var mapped = {};
    for (var prop in iterable) {
      if (iterable.hasOwnProperty(prop)) {
        yield callback(iterable[prop], prop);
      }
    }
    return iterable;
  } else {
    return new Error("Operator each() requires iterable object");
  }
}
module.exports = exports["default"];
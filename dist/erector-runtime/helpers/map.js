"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = map;
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
function* map(iterable, handler) {
  if (Symbol.iterator in iterable) {
    for (var i = 0; i < iterable.length; i++) {
      iterable[i] = yield handler(iterable[i], i);
    }
    yield iterable;
  } else if ("object" === typeof iterable) {
    var mapped = {};
    for (var prop in iterable) {
      if (iterable.hasOwnProperty(prop)) {
        mapped[prop] = yield handler(iterable[prop], prop);
      }
    }
    yield mapped;
  } else {
    throw new Error("Operator map() requires iterable object");
  }
}
module.exports = exports["default"];
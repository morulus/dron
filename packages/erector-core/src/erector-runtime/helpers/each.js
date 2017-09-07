import digest from './digest';

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
export default function* each(iterable, callback) {
  iterable = yield digest(iterable);
  if (Symbol.iterator in iterable) {
    for (let i = 0;i<iterable.length; i++) {
      yield callback(iterable[i], i);
    }
    return iterable;
  } else if ("object"===typeof iterable) {
    let mapped = {};
    for (let prop in iterable) {
      if (iterable.hasOwnProperty(prop)) {
        yield callback(iterable[prop], prop);
      }
    }
    return iterable;
  } else {
    return new Error("Operator each() requires iterable object");
  }
}

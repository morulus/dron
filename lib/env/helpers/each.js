export default function each(iterable, callback) {
  return function* $each() {
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
}

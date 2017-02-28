export default function* map(iterable, callback) {
  if (Symbol.iterator in iterable) {
    for (let i = 0;i<iterable.length; i++) {
      iterable[i] = yield callback(iterable[i], i);
    }
    yield iterable;
  } else if ("object"===typeof iterable) {
    let mapped = {};
    for (let prop in iterable) {
      if (iterable.hasOwnProperty(prop)) {
        mapped[prop] = yield callback(iterable[prop], prop);
      }
    }
    yield mapped;
  } else {
    yield new Error("Operator map() requires iterable object");
  }
}

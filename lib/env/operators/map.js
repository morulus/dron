export default function map(iterable, callback) {
  return function genericMap() {
    if (iterable instanceof Array) {
      return Array.prototype.map.call(iterable, callback);
    } else if ("object"===typeof iterable) {
      let mapped = {};
      for (let prop in iterable) {
        mapped[prop] = callback(iterable[prop], prop);
      }
      return mapped;
    } else {
      return new Error("Operator map() requires iterable object");
    }
  }
}

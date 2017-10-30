const isPromise = require('is-promise');

function runner(iterator, state) {
  const next = iterator.next();
  const resolver = next.value;
  const result = resolver(state);
  if (isPromise(result)) {
    return result;
  } else {
    return runner(iterator, state);
  }
}

module.exports = function tillMatchAsync() {
  const resolvers = Array.prototype.slice.call(arguments);
  const iterator = resolvers[Symbol.iterator]();
  return function resolvers(state) {
    return runner(iterator, state);
  }
}

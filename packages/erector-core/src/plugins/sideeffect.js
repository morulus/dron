const __CONFIG__ = require('../constants.js').__CONFIG__;

function wrapToNestedFn(handler) {
  return function(store) {
    return function(next) {
      return function(action) {
        const result = handler(action, store);
        if (result !== false) {
          next(action);
        }
      }
    }
  }
}

module.exports = function middleware() {
  const middlewares = Array.prototype.slice.apply(arguments)
  .map(wrapToNestedFn);
  return function(state) {
    return Object.assign({}, state, {
      [__CONFIG__]: Object.assign(
        state[__CONFIG__],
        {
          initialMiddlewares: state[__CONFIG__].initialMiddlewares.concat(middlewares)
        }
      ),
    });
  }
}

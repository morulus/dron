const __CONFIG__ = require('../constants.js').__CONFIG__;
module.exports = function middleware() {
  const middlewares = Array.prototype.slice.apply(arguments);
  return function(state) {
    return Object.assign({}, state, {
      [__CONFIG__]: Object.assign(
        state[__CONFIG__],
        {
          initialMiddlewares: state[__CONFIG__].initialMiddlewares.concat(middlewares)
        }
      )
    });
  }
}

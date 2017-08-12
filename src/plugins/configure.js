const __CONFIG__ = require('../constants.js').__CONFIG__;
module.exports = function configure(config) {
  return function(state) {
    return Object.assign({}, state, {
      [__CONFIG__]: typeof config === 'function' ? config(state[__CONFIG__]) : config,
    });
  }
}

const __CONFIG__ = require('../lib/constants.js').__CONFIG__;
module.exports = function configure(config) {
  return function(state) {
    return {
      [__CONFIG__]: config,
    }
  }
}

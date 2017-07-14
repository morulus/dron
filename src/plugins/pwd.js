/* Setup project working directory */
const __CONFIG__ = require('../constants.js').__CONFIG__;

module.exports = function pwd(pwd) {
  if (typeof pwd !== 'string') {
    throw new Error('pwd must be a string');
    return void 0;
  }

  return function(state) {
    return Object.assign({}, state, {
      [__CONFIG__]: {
        pwd: pwd,
      }
    });
  }
}

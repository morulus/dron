Object.defineProperty(exports, "__esModule", {
  value: true
});

const __CONFIG__ = require('./constants.js').__CONFIG__;

exports.engineVersion = function engineVersion(state) {
  return state[__CONFIG__].engineVersion;
}

exports.cwdSelector = function cwdSelector(state) {
  return state[__CONFIG__].pwd;
}

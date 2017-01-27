const fs = require('fs');
const path = require('path');
const createStore = require('redux').createStore;
const singular = require('reciprocator').singular;
const applyMiddleware = require('redux').applyMiddleware;
const registerBabel = require('./lib/registerBabel.js');
const createReducer = require('./lib/createReducer.js');
const ACTION_SET_STATE = require('./lib/constants.js').ACTION_SET_STATE;
const LAST_REDUCER = require('./lib/constants.js').LAST_REDUCER;
const __CONFIG__ = require('./lib/constants.js').__CONFIG__;
const __STORE__ = require('./lib/constants.js').__STORE__;
const createCmdMiddleware = require('./lib/createCmdMiddleware.js');
const defaultReducer = require('./lib/defaultReducer.js');
const resolvePackage = require('./lib/resolvePackage.js');

const __INITIAL_STATE__ = Symbol('initialState');

const INITIAL_STATE = {
  [__CONFIG__]: {},
  isRuntime: false,
};

function Erector(initialState) {
  this[__INITIAL_STATE__] = typeof initialState === 'object' ?
    Object.assign({}, initialState, INITIAL_STATE) : INITIAL_STATE;
  this[__STORE__] = null;
  this.isRuntime = false;
}

Erector.prototype.use = function(configurator) {
  if (typeof configurator !== 'function') {
    this.sendError(new Error('Configurator must be a function'));
  }
  if (this.isRuntime) {
    const state = configurator(this[__STORE__].getState());
    if (typeof state !== 'object') {
      this.sendError(new Error('Configurator must provide a plain object'));
    } else {
      this[__STORE__].dispatch({
        type: ACTION_SET_STATE,
        state: state
      });
    }
  } else {
    const state = configurator(this[__INITIAL_STATE__]);
    if (typeof state !== 'object') {
      this.sendError(new Error('Configurator must provide a plain object'));
    } else {
      this[__INITIAL_STATE__] = state;
    }
  }
}

Erector.prototype.run = function(file, props) {
  if (!fs.existsSync(file)) {
    return this.sendError(new Error(file + 'is not exists'));
  }
  const mwd = path.dirname(file);
  registerBabel(mwd);
  const entry = require(file);
  const middleware = createCmdMiddleware(this);
  const reducer = "undefined"===typeof this[__INITIAL_STATE__][__CONFIG__].reducer ? [] :
    (this[__CONFIG__].reducer instanceof Array ? this[__CONFIG__].reducer
      : [this[__CONFIG__].reducer]);
  // Check for pwd defined
  if (typeof this[__INITIAL_STATE__][__CONFIG__].pwd !== 'string') {
    this[__INITIAL_STATE__][__CONFIG__].pwd = mwd;
  }
  // Define mwd
  this[__INITIAL_STATE__][__CONFIG__].mwd = mwd;
  this[__STORE__] = createStore(defaultReducer, this[__INITIAL_STATE__]||{}, applyMiddleware(middleware));
  this[__STORE__][LAST_REDUCER] = createReducer([defaultReducer]);
  this[__STORE__].replaceReducer(this[__STORE__][LAST_REDUCER]);
  this.isRuntime = true;
  return singular(entry, props, this[__STORE__]);
}

Erector.prototype.runPackage = function runPackage(packageName, props, options) {
  options = Object.assign({
    autoinstall: true
  }, options);
  const file = resolvePackage(packageName, !options.autoinstall);
  if (file&&!(file instanceof Error)) {
    return this.run(file, props);
  }
  return Promise.reject('Corrupt package `'+packageName+'`');
}

module.exports = function createErector(initialState) {
  return new Erector(initialState);
}
module.exports.pwd = require('./plugins/pwd');
module.exports.configure = require('./plugins/configure');

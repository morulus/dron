'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = createErector;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var fs = require('fs');
var path = require('path');
var createStore = require('redux').createStore;
var singular = require('reciprocator').singular;
var applyMiddleware = require('redux').applyMiddleware;
var resolvePackage = require('erector-node-utils/resolvePackage');
var registerBabel = require('./registerBabel.js');
var resolveSystemScripts = require('./resolveSystemScripts.js');
var autoinstallPackage = require('./resolveLocalScripts.js');
var createReducer = require('../../createReducer.js');
var createCmdMiddleware = require('../../createCmdMiddleware.js');
var defaultReducer = require('../../defaultReducer.js');
var pwd = require('../../../plugins/pwd');
var configure = require('../../../plugins/configure');
var middleware = require('../../../plugins/middleware');
var sideeffect = require('../../../plugins/sideeffect');
var constants = require('../../../constants.js');
var selectors = require('../../../selectors.js');

var ACTION_SET_STATE = constants.ACTION_SET_STATE,
    LAST_REDUCER = constants.LAST_REDUCER,
    __CONFIG__ = constants.__CONFIG__,
    __STORE__ = constants.__STORE__,
    __MIDDLEWARES__ = constants.__MIDDLEWARES__,
    ERR_UNDEFINED_PACKAGE = constants.ERR_UNDEFINED_PACKAGE;


var erectorPackage = require('./../../../../package.json');

var __INITIAL_STATE__ = Symbol('initialState');
var INITIAL_STATE = _defineProperty({}, __CONFIG__, {
  babel: {
    enabled: true
  },
  initialMiddlewares: []
});

function Erector(initialState) {
  this[__INITIAL_STATE__] = typeof initialState === 'object' ? _extends({}, initialState, INITIAL_STATE) : INITIAL_STATE;
  this[__STORE__] = null;
  this.isRuntime = false;
  this.errors = [];
}

Erector.prototype.use = function (configurator) {
  if (typeof configurator !== 'function') {
    return this.sendError(new Error('Configurator must be a function'));
  }
  if (this.isRuntime) {
    var state = configurator(this[__STORE__].getState());
    if (typeof state !== 'object') {
      return this.sendError(new Error('Configurator must provide a plain object'));
    } else {
      this[__STORE__].dispatch({
        type: ACTION_SET_STATE,
        state: state
      });
    }
  } else {
    var _state = configurator(this[__INITIAL_STATE__]);
    if (typeof _state !== 'object') {
      return this.sendError(new Error('Configurator must provide a plain object'));
    } else {
      this[__INITIAL_STATE__] = _state;
    }
  }
};

Erector.prototype.run = function (file, props) {
  var start = new Date().getTime();
  if (!fs.existsSync(file)) {
    return this.sendError(new Error(file + 'is not exists'));
  }
  var mwd = path.dirname(file);
  if (this[__INITIAL_STATE__][__CONFIG__].babel.enabled) {
    registerBabel(mwd, this[__INITIAL_STATE__][__CONFIG__].babel);
  }
  var module = require(file);
  var entry = typeof module === 'object' ? module.default : module;
  var systemMiddleware = createCmdMiddleware(this);
  var reducer = "undefined" === typeof this[__INITIAL_STATE__][__CONFIG__].reducer ? [] : this[__CONFIG__].reducer instanceof Array ? this[__CONFIG__].reducer : [this[__CONFIG__].reducer];
  // Check for pwd defined
  if (typeof this[__INITIAL_STATE__][__CONFIG__].pwd !== 'string') {
    this[__INITIAL_STATE__][__CONFIG__].pwd = mwd;
  }
  // Define mwd
  this[__INITIAL_STATE__][__CONFIG__].mwd = mwd;
  // Define engine version
  this[__INITIAL_STATE__][__CONFIG__].engineVersion = erectorPackage.version;
  // Get custom state
  var state = typeof entry.initialState === 'object' ? _extends({}, this[__INITIAL_STATE__], entry.initialState) : this[__INITIAL_STATE__];
  this[__STORE__] = createStore(defaultReducer, state, applyMiddleware(systemMiddleware));
  this[__STORE__][LAST_REDUCER] = createReducer([defaultReducer]);
  // Define initial middlewares (excepts system one)
  this[__STORE__][__MIDDLEWARES__] = this[__INITIAL_STATE__][__CONFIG__].initialMiddlewares;
  this[__STORE__].replaceReducer(this[__STORE__][LAST_REDUCER]);
  this.isRuntime = true;
  if (process.env.DEBUG) {
    console.log('Erector has started in ', new Date().getTime() - start + 'ms');
  }
  return singular(entry, props, this[__STORE__]).then(function (result) {
    if (this.errors.length > 0) {
      return Promise.reject(this.errors[0]);
    }
    return result;
  }.bind(this));
};

Erector.prototype.runPackage = function runPackage(packageName, props, options) {
  throw new Error("Erector::runPackage is deprecated");
};

Erector.prototype.sendError = function (e) {
  this.errors.push(e);
};

Erector.prototype.fatalError = function (e) {
  /* We need next tick, because it is reference error, and
   * we must to throw error outside of Promise scope */
  (process.nextTick || setTimeout)(function () {
    /* This is fatal error. Program died */
    throw e;
  });
};

function createErector(initialState) {
  return new Erector(initialState);
}

createErector.constants = constants;
createErector.selectors = selectors;
createErector.resolvePackage = resolvePackage;
createErector.pwd = pwd;
createErector.configure = configure;
createErector.middleware = middleware;
createErector.sideeffect = sideeffect;

exports.constants = constants;
exports.resolvePackage = resolvePackage;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.__CONFIG__ = Symbol('config');
exports.__STORE__ = Symbol('store');
exports.__MIDDLEWARES__ = Symbol('middlewares');
exports.ACTION_SET_STATE = Symbol('ACTION_SET_STATE');
exports.ACTION_ASSIGN_STATE = Symbol('ACTION_ASSIGN_STATE');
exports.ACTION_ASSIGN_REDUCER = Symbol('ACTION_ASSIGN_REDUCER');
exports.ACTION_RUN = Symbol('ACTION_RUN');
exports.ACTION_ERROR = Symbol('ACTION_ERROR');
exports.LAST_REDUCER = Symbol('LAST_REDUCER');
exports.ERR_UNDEFINED_PACKAGE = Symbol('ERR_UNDEFINED_PACKAGE');
exports.ECHO = require('reciprocator').MESSAGE;
exports.CANCEL = require('reciprocator').CANCEL;
exports.CANCELLED = require('reciprocator').CANCELLED;
exports.CHANNEL = Symbol('CHANNEL');
exports.NEXT = Symbol('NEXT');
exports.ERECTOR_LOCAL_DIRS = ['__store__', '__erector__'];
exports.THROBBER_START = Symbol('THROBBER_START');
exports.THROBBER_STOP = Symbol('THROBBER_STOP');
exports.DIALOG = Symbol('DIALOG');
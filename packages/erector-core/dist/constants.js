'use strict';

var _symbol = require('/Users/morulus/Work/morulus/projects/erector/packages/erector-core-transform-config/node_modules/babel-runtime/core-js/symbol');

var _symbol2 = _interopRequireDefault(_symbol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.__CONFIG__ = (0, _symbol2.default)('config');
exports.__STORE__ = (0, _symbol2.default)('store');
exports.__MIDDLEWARES__ = (0, _symbol2.default)('middlewares');
exports.ACTION_SET_STATE = (0, _symbol2.default)('ACTION_SET_STATE');
exports.ACTION_ASSIGN_STATE = (0, _symbol2.default)('ACTION_ASSIGN_STATE');
exports.ACTION_ASSIGN_REDUCER = (0, _symbol2.default)('ACTION_ASSIGN_REDUCER');
exports.ACTION_RUN = (0, _symbol2.default)('ACTION_RUN');
exports.ACTION_ERROR = (0, _symbol2.default)('ACTION_ERROR');
exports.LAST_REDUCER = (0, _symbol2.default)('LAST_REDUCER');
exports.ERR_UNDEFINED_PACKAGE = (0, _symbol2.default)('ERR_UNDEFINED_PACKAGE');
exports.ECHO = require('reciprocator').MESSAGE;
exports.CANCEL = require('reciprocator').CANCEL;
exports.CANCELLED = require('reciprocator').CANCELLED;
exports.CHANNEL = (0, _symbol2.default)('CHANNEL');
exports.NEXT = (0, _symbol2.default)('NEXT');
exports.ERECTOR_LOCAL_DIRS = ['__store__', '__erector__'];
exports.THROBBER_START = (0, _symbol2.default)('THROBBER_START');
exports.THROBBER_STOP = (0, _symbol2.default)('THROBBER_STOP');
exports.DIALOG = (0, _symbol2.default)('DIALOG');
exports.OPEN_FILE = (0, _symbol2.default)('OPEN_FILE');
exports.OPEN_DIRECTORY = (0, _symbol2.default)('OPEN_DIRECTORY');
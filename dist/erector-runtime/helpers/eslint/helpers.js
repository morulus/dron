'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.displayEsLintErrorMessage = undefined;

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _echo = require('../echo');

var _echo2 = _interopRequireDefault(_echo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var displayEsLintErrorMessage = exports.displayEsLintErrorMessage = function displayEsLintErrorMessage(filename) {
  return function* reDisplayEsLintErrorMessage(message) {
    var output = '  ' + (message.fatal ? _chalk2.default.bold.red('Fatal: ') : '') + _chalk2.default.red(message.message) + '\n  ' + _chalk2.default.bold('at') + ': ' + message.line + ':' + message.column;
    yield (0, _echo2.default)(output);
  };
};
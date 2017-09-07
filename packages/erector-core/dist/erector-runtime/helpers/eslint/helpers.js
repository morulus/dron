'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.displayEsLintErrorMessage = undefined;

var _regenerator = require('/Users/morulus/Work/morulus/projects/erector/packages/erector-core-transform-config/node_modules/babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _echo = require('../echo');

var _echo2 = _interopRequireDefault(_echo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var displayEsLintErrorMessage = exports.displayEsLintErrorMessage = function displayEsLintErrorMessage(filename) {
  return (/*#__PURE__*/_regenerator2.default.mark(function reDisplayEsLintErrorMessage(message) {
      var output;
      return _regenerator2.default.wrap(function reDisplayEsLintErrorMessage$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              output = '  ' + (message.fatal ? _chalk2.default.bold.red('Fatal: ') : '') + _chalk2.default.red(message.message) + '\n  ' + _chalk2.default.bold('at') + ': ' + message.line + ':' + message.column;
              _context.next = 3;
              return (0, _echo2.default)(output);

            case 3:
            case 'end':
              return _context.stop();
          }
        }
      }, reDisplayEsLintErrorMessage, this);
    })
  );
};
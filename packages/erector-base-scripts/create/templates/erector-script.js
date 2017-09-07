'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _erector = require('erector');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _erector.cliapp)({
  description: 'This script has no description',
  help: 'Usage: erector <%- name %>',
  getInitialState: function getInitialState(args) {
    return {};
  },

  worker: _regenerator2.default.mark(function worker() {
    return _regenerator2.default.wrap(function worker$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _erector.echo.ok('Empty script');

          case 2:
            return _context.abrupt('return', false);

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, worker, this);
  })
});
module.exports = exports['default'];
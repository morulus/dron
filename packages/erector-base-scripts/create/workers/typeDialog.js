'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = typeDialog;

var _erector = require('erector');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [typeDialog].map(_regenerator2.default.mark);

function typeDialog() {
  return _regenerator2.default.wrap(function typeDialog$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _erector.normalize)((0, _erector.dialog)({
            message: 'Select creation type',
            type: 'list',
            choices: ['script', 'package'],
            default: 'script'
          }), function (type) {
            return {
              type: type
            };
          });

        case 2:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this);
}
module.exports = exports['default'];
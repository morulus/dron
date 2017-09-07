'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = nameDialog;

var _erector = require('erector');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [nameDialog].map(_regenerator2.default.mark); /**
                                                             * Get script/package name via dialog
                                                             */


function nameDialog(_ref) {
  var existenNames = _ref.existenNames;
  return _regenerator2.default.wrap(function nameDialog$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt('return', (0, _erector.normalize)((0, _erector.dialog)({
            message: 'Script format',
            type: 'list',
            choices: ['file', 'folder'],
            required: true
          }), function (format) {
            return {
              format: format
            };
          }));

        case 1:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this);
}
module.exports = exports['default'];
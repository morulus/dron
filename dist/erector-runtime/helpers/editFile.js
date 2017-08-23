'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('/Users/morulus/Work/morulus/projects/erector/node_modules/erector-core-transform-config/node_modules/babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = editFile;

var _readFile = require('./readFile');

var _readFile2 = _interopRequireDefault(_readFile);

var _writeFile = require('./writeFile');

var _writeFile2 = _interopRequireDefault(_writeFile);

var _digest = require('./digest');

var _digest2 = _interopRequireDefault(_digest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [editFile].map(_regenerator2.default.mark);

/**
 * Read file, apply transforms, write it back.
 * @example
 * yield editFile('./log.md', function(content) {
 *  return `${content}
 * Updated on ${new Date().getTime()}`;
 * });
 * @param {string} filename
 * @param {function|generator} editor
 */
function editFile(filename, editor) {
  var currentContent;
  return _regenerator2.default.wrap(function editFile$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!(typeof filename !== 'string')) {
            _context.next = 4;
            break;
          }

          _context.next = 3;
          return (0, _digest2.default)(filename);

        case 3:
          filename = _context.sent;

        case 4:
          currentContent = '';
          _context.prev = 5;
          _context.next = 8;
          return (0, _readFile2.default)(filename);

        case 8:
          currentContent = _context.sent;
          _context.next = 13;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context['catch'](5);

        case 13:
          _context.next = 15;
          return (0, _writeFile2.default)(filename, editor(currentContent));

        case 15:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this, [[5, 11]]);
}
module.exports = exports['default'];
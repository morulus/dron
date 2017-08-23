'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('/Users/morulus/Work/morulus/projects/erector/node_modules/erector-core-transform-config/node_modules/babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = touch;

var _digest = require('./digest');

var _digest2 = _interopRequireDefault(_digest);

var _resolve = require('./resolve');

var _resolve2 = _interopRequireDefault(_resolve);

var _fileExists = require('./fileExists');

var _fileExists2 = _interopRequireDefault(_fileExists);

var _writeFile = require('./writeFile');

var _writeFile2 = _interopRequireDefault(_writeFile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [touch].map(_regenerator2.default.mark);

function touch(subject) {
  var defaultContent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var resolvedFilename, fullname;
  return _regenerator2.default.wrap(function touch$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _digest2.default)(subject);

        case 2:
          resolvedFilename = _context.sent;
          _context.next = 5;
          return (0, _resolve2.default)(resolvedFilename);

        case 5:
          fullname = _context.sent;
          _context.next = 8;
          return (0, _fileExists2.default)(fullname);

        case 8:
          if (!_context.sent) {
            _context.next = 13;
            break;
          }

          _context.next = 11;
          return fullname;

        case 11:
          _context.next = 17;
          break;

        case 13:
          _context.next = 15;
          return (0, _writeFile2.default)(fullname, defaultContent);

        case 15:
          _context.next = 17;
          return fullname;

        case 17:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this);
}
module.exports = exports['default'];
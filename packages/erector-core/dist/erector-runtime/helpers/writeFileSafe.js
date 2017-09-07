'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('/Users/morulus/Work/morulus/projects/erector/packages/erector-core-transform-config/node_modules/babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = writeFileSafe;

var _fileExists = require('./fileExists');

var _fileExists2 = _interopRequireDefault(_fileExists);

var _writeFile = require('./writeFile');

var _writeFile2 = _interopRequireDefault(_writeFile);

var _digest = require('./digest');

var _digest2 = _interopRequireDefault(_digest);

var _dialog = require('./dialog');

var _dialog2 = _interopRequireDefault(_dialog);

var _exit = require('./exit');

var _exit2 = _interopRequireDefault(_exit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function writeFileSafe(filename, content) {
  var encode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'utf-8';

  return (/*#__PURE__*/_regenerator2.default.mark(function $writeFileSafe() {
      var permit, exists, dialogResult;
      return _regenerator2.default.wrap(function $writeFileSafe$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _digest2.default)(filename);

            case 2:
              filename = _context.sent;
              permit = void 0;
              _context.next = 6;
              return (0, _fileExists2.default)(filename);

            case 6:
              exists = _context.sent;

              if (!exists) {
                _context.next = 20;
                break;
              }

              _context.next = 10;
              return (0, _dialog2.default)({
                type: 'confirm',
                name: 'confirm',
                message: 'Rewrite file ' + filename + '?',
                default: false
              });

            case 10:
              dialogResult = _context.sent;

              if (dialogResult) {
                _context.next = 16;
                break;
              }

              _context.next = 14;
              return false;

            case 14:
              _context.next = 18;
              break;

            case 16:
              _context.next = 18;
              return (0, _writeFile2.default)(filename, content, encode);

            case 18:
              _context.next = 22;
              break;

            case 20:
              _context.next = 22;
              return (0, _writeFile2.default)(filename, content, encode);

            case 22:
            case 'end':
              return _context.stop();
          }
        }
      }, $writeFileSafe, this);
    })
  );
}
module.exports = exports['default'];
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = generate;

var _erector = require('erector');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [generate].map(_regenerator2.default.mark);

var templateSrc = _path2.default.resolve(__dirname, '../../templates/erector-script.ejs');

function isFormatFile(format) {
  return format === 'file';
}

function generate(state) {
  var format, type, name, dir, isFile, fullname;
  return _regenerator2.default.wrap(function generate$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          format = state.format, type = state.type, name = state.name, dir = state.dir;
          isFile = isFormatFile(format);
          fullname = isFile ? _path2.default.join(dir, name + '.es') : _path2.default.join(dir, name, 'index.es');

          if (isFile) {
            _context.next = 6;
            break;
          }

          _context.next = 6;
          return (0, _erector.createDir)(_path2.default.dirname(fullname));

        case 6:
          _context.next = 8;
          return (0, _erector.writeFile)(fullname, (0, _erector.ejs)((0, _erector.readFile)(templateSrc), state));

        case 8:
          _context.next = 10;
          return _erector.echo.ok('Created');

        case 10:
          return _context.abrupt('return', {
            scriptFilename: fullname
          });

        case 11:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this);
}
module.exports = exports['default'];
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('/Users/morulus/Work/morulus/projects/erector/node_modules/erector-core-transform-config/node_modules/babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = readJson;

var _readFile = require('./readFile');

var _readFile2 = _interopRequireDefault(_readFile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [readJson].map(_regenerator2.default.mark);

function readJson(filename) {
  var content;
  return _regenerator2.default.wrap(function readJson$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          content = void 0;
          _context.prev = 1;
          _context.next = 4;
          return (0, _readFile2.default)(filename);

        case 4:
          content = _context.sent;
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context['catch'](1);
          throw new Error('JSON file is not exists');

        case 10:
          _context.prev = 10;
          _context.next = 13;
          return JSON.parse(content);

        case 13:
          _context.next = 18;
          break;

        case 15:
          _context.prev = 15;
          _context.t1 = _context['catch'](10);
          throw new Error("Invalid JSON");

        case 18:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this, [[1, 7], [10, 15]]);
}
module.exports = exports['default'];
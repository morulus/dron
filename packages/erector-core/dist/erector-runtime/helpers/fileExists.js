'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('/Users/morulus/Work/morulus/projects/erector/node_modules/erector-core-transform-config/node_modules/babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = fileExists;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _constants = require('../../constants');

var _digest = require('./digest');

var _digest2 = _interopRequireDefault(_digest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Checking the existence of a file.
 * If target resource is a directory the result will be false.
 *
 * @example
 * let indexExists = yield fileExists('./index.html');
 *
 * @param  {string} filename
 * @return {boolean}
 */
function fileExists(filename) {
  return _regenerator2.default.mark(function $fileExists(state) {
    var filepath, stats;
    return _regenerator2.default.wrap(function $fileExists$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _digest2.default)(filename);

          case 2:
            filename = _context.sent;
            filepath = _path2.default.resolve(state[_constants.__CONFIG__].pwd, filename);
            _context.prev = 4;
            stats = _fs2.default.lstatSync(filepath);
            _context.next = 8;
            return !stats.isDirectory();

          case 8:
            _context.next = 14;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context['catch'](4);
            _context.next = 14;
            return false;

          case 14:
          case 'end':
            return _context.stop();
        }
      }
    }, $fileExists, this, [[4, 10]]);
  });
}
module.exports = exports['default'];
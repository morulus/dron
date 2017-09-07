'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('/Users/morulus/Work/morulus/projects/erector/packages/erector-core-transform-config/node_modules/babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = isDirectory;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _constants = require('../../constants');

var _digest = require('./digest');

var _digest2 = _interopRequireDefault(_digest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Checking the existence of a directory. If target is the file result will be false.
 * @example
 * let appExists = yield isDirectory('./app');
 *
 * @param  {string} filename Relative path to the file
 * @return {boolean}
 */
function isDirectory(dirname) {

  /**
   * @return {boolean}
   */
  return (/*#__PURE__*/_regenerator2.default.mark(function _isDirectory(state) {
      var filepath, stats;
      return _regenerator2.default.wrap(function _isDirectory$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _digest2.default)(dirname);

            case 2:
              dirname = _context.sent;
              filepath = _path2.default.resolve(state[_constants.__CONFIG__].pwd, dirname);
              _context.prev = 4;
              stats = _fs2.default.lstatSync(filepath);
              _context.next = 8;
              return stats.isDirectory();

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
      }, _isDirectory, this, [[4, 10]]);
    })
  );
}
module.exports = exports['default'];
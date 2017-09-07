'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('/Users/morulus/Work/morulus/projects/erector/node_modules/erector-core-transform-config/node_modules/babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = inModule;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [inModule].map(_regenerator2.default.mark);

/**
 * Resolve filename relative to the module directory.
 * @example
 * yield readFile(inModule('./templates/example.html'));
 *
 * @deprecated
 * @param {string} filename Must be a relative path
 * @return {string}
 */
function inModule(filename) {
  return _regenerator2.default.wrap(function inModule$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return echo.warn('inModule is deprecated, use resolve.module instead');

        case 2:
          _context.next = 4;
          return function (state, store) {
            return _path2.default.resolve(store[ENV].MWD, filename);
          };

        case 4:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this);
}
module.exports = exports['default'];
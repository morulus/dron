'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('/Users/morulus/Work/morulus/projects/erector/packages/erector-core-transform-config/node_modules/babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = resolve;

var _digest = require('./digest');

var _digest2 = _interopRequireDefault(_digest);

var _getState = require('./getState');

var _getState2 = _interopRequireDefault(_getState);

var _constants = require('../../constants');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/_regenerator2.default.mark(resolve);

/**
 * Resolve path relative project working dir
 *
 * ```js
 * const fn = yield resolve('./package.json');
 * yield echo(fn); // absolute/path/to/package.json
 * @param  {string|function|generator} relativePath
 * @return {string}
 * ```
 *
 * To resolve path relative module directory, use `resolve.module` function.
 *
 * ```js
 * const inModulePath = yield resolve.module('./template.js');
 * ```
 */
function resolve(relativePath) {
  var state, resolvedDirname;
  return _regenerator2.default.wrap(function resolve$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _getState2.default)();

        case 2:
          state = _context.sent;
          _context.next = 5;
          return (0, _digest2.default)(relativePath);

        case 5:
          resolvedDirname = _context.sent;

          if (!(typeof resolvedDirname !== 'string')) {
            _context.next = 8;
            break;
          }

          throw new Error('Path must ba a string');

        case 8:
          _context.next = 10;
          return _path2.default.resolve(state[_constants.__CONFIG__].pwd, resolvedDirname);

        case 10:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this);
}

resolve.module = function inModule(filename) {
  return function (state, store) {
    return _path2.default.resolve(state[_constants.__CONFIG__].mwd, filename);
  };
};
module.exports = exports['default'];
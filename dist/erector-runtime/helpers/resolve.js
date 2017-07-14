'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = resolve;

var _digest = require('./digest');

var _digest2 = _interopRequireDefault(_digest);

var _getState = require('./getState');

var _getState2 = _interopRequireDefault(_getState);

var _constants = require('../../constants');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
function* resolve(relativePath) {
  var state = yield (0, _getState2.default)();
  var resolvedDirname = yield (0, _digest2.default)(relativePath);
  if (typeof resolvedDirname !== 'string') {
    throw new Error('Path must ba a string');
  }
  yield _path2.default.resolve(state[_constants.__CONFIG__].pwd, resolvedDirname);
}

resolve.module = function inModule(filename) {
  return function (state, store) {
    return _path2.default.resolve(state[_constants.__CONFIG__].mwd, filename);
  };
};
module.exports = exports['default'];
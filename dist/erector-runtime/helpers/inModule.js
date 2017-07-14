'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = inModule;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Resolve filename relative to the module directory.
 * @example
 * yield readFile(inModule('./templates/example.html'));
 *
 * @deprecated
 * @param {string} filename Must be a relative path
 * @return {string}
 */
function* inModule(filename) {
  yield echo.warn('inModule is deprecated, use resolve.module instead');
  yield function (state, store) {
    return _path2.default.resolve(store[ENV].MWD, filename);
  };
}
module.exports = exports['default'];
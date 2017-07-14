'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = pathExists;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _constants = require('../../constants');

var _digest = require('./digest');

var _digest2 = _interopRequireDefault(_digest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Check for path existing. Returns true or false.
 *
 * @description If target resource is directory then result will false too.
 *
 * @example
 * let indexExists = yield pathExists('./');
 *
 * @param  {string} pathname Relative path to the file or dir
 * @return {function}
 */
function pathExists(pathname) {
  /**
   * @return {boolean}
   */
  return function* pathExistsChecker(state) {
    pathname = yield (0, _digest2.default)(pathname);
    var filepath = _path2.default.resolve(state[_constants.__CONFIG__].pwd, pathname);
    try {
      var stats = _fs2.default.lstatSync(pathname);
      yield true;
    } catch (e) {
      yield false;
    }
  };
}
module.exports = exports['default'];
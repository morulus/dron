'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
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
  return function* _isDirectory(state) {
    dirname = yield (0, _digest2.default)(dirname);
    var filepath = _path2.default.resolve(state[_constants.__CONFIG__].pwd, dirname);
    try {
      var stats = _fs2.default.lstatSync(filepath);
      yield stats.isDirectory();
    } catch (e) {
      yield false;
    }
  };
}
module.exports = exports['default'];
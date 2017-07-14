'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
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
  return function* $fileExists(state) {
    filename = yield (0, _digest2.default)(filename);
    var filepath = _path2.default.resolve(state[_constants.__CONFIG__].pwd, filename);
    try {
      var stats = _fs2.default.lstatSync(filepath);
      yield !stats.isDirectory();
    } catch (e) {
      yield false;
    }
  };
}
module.exports = exports['default'];
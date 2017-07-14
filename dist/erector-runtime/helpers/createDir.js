'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createDir;

var _digest = require('./digest');

var _digest2 = _interopRequireDefault(_digest);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _constants = require('../../constants');

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Create a directory. It will throw an error on fail.
 *
 * @example
 * try {
 *  yield createDir('create/some/folder');
 * } catch(e) {
 *  yield exit(e.message);
 * }
 * @param  {string} dirname
 */
function createDir(dirname) {
  return function* $createDir(state) {
    dirname = yield (0, _digest2.default)(dirname);
    yield new Promise(function (resolve, reject) {
      var filepath = _path2.default.resolve(state[_constants.__CONFIG__].pwd, dirname);
      (0, _mkdirp2.default)(filepath, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  };
}
module.exports = exports['default'];
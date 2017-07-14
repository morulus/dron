'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = writeFile;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _constants = require('../../constants');

var _createDir = require('./createDir');

var _createDir2 = _interopRequireDefault(_createDir);

var _digest = require('./digest');

var _digest2 = _interopRequireDefault(_digest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * writeFile - Return a loopback function which writes content to file
 *
 * @param  {string} filename         Relative filename
 * @param  {string} content          Content
 * @param  {string|undefined} encode = 'utf-8' Encode
 * @return {Promise}
 */
function writeFile(filename, content) {
  var encode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'utf-8';

  return function* payloadedWriteFile(state) {
    if (typeof filename !== 'string') {
      filename = yield (0, _digest2.default)(filename);
    }

    if (typeof content !== 'string') {
      content = yield (0, _digest2.default)(content);
    }
    var dirname = _path2.default.dirname(_path2.default.resolve(state[_constants.__CONFIG__].pwd, filename));
    yield (0, _createDir2.default)(dirname);
    yield new Promise(function (resolve, reject) {
      _fs2.default.writeFile(_path2.default.resolve(state[_constants.__CONFIG__].pwd, filename), content, encode, function (err, report) {
        if (err) {
          console.log('TEATD', err.message);
          reject(err);
        } else {
          resolve(content);
        }
      });
    });
  };
}
module.exports = exports['default'];
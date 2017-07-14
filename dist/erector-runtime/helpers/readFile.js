'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = readFile;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _constants = require('../../constants');

var _digest = require('./digest');

var _digest2 = _interopRequireDefault(_digest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * readFile - Return loopback function which read file
 *
 * @param  {string} filename
 * @param  {string|object} options = 'utf-8'
 * @return {Promise}
 */
function readFile(filename) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'utf-8';

  return function* payloadedReadFile(state) {
    filename = yield (0, _digest2.default)(filename);
    yield new Promise(function (resolve, reject) {
      _fs2.default.readFile(_path2.default.resolve(state[_constants.__CONFIG__].pwd, filename), options, function (err, content) {
        if (err) {
          reject(err);
        } else {
          resolve(content);
        }
      });
    });
  };
}
module.exports = exports['default'];
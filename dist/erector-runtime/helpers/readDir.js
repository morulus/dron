'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = readDir;

var _digest = require('./digest');

var _digest2 = _interopRequireDefault(_digest);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _constants = require('../../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function readDir(dirname) {
  return function* (state) {
    var resolvedDirname = yield (0, _digest2.default)(dirname);
    var absoluteDirname = _path2.default.resolve(state[_constants.__CONFIG__].pwd, resolvedDirname);
    yield _fs2.default.readdirSync(absoluteDirname);
  };
}
module.exports = exports['default'];
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (dirname) {
  var forceDeleteNotEmpty = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  return function* (state) {
    var resolvedDirname = yield (0, _digest2.default)(dirname);
    var absoluteDirname = _path2.default.resolve(state[_constants.__CONFIG__].pwd, resolvedDirname);
    if (forceDeleteNotEmpty) {
      unsafeRemoveDirectory(absoluteDirname);
    } else {
      if (_fs2.default.readdirSync(absoluteDirname).length) {
        throw new Error('Directory ' + dirname + ' is not empty');
      }
      _fs2.default.rmdirSync(absoluteDirname);
    }
    yield true;
  };
};

var _digest = require('./digest');

var _digest2 = _interopRequireDefault(_digest);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _constants = require('../../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function unsafeRemoveDirectory(path) {
  if (_fs2.default.existsSync(path)) {
    _fs2.default.readdirSync(path).forEach(function (file, index) {
      var curPath = path + "/" + file;
      if (_fs2.default.lstatSync(curPath).isDirectory()) {
        unsafeRemoveDirectory(curPath);
      } else {
        _fs2.default.unlinkSync(curPath);
      }
    });
    _fs2.default.rmdirSync(path);
  }
}

module.exports = exports['default'];
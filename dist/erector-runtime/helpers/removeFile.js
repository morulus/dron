'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (filename) {
  return function* (state) {
    var resolvedFilename = yield (0, _digest2.default)(filename);
    var absoluteFilename = _path2.default.resolve(state[_constants.__CONFIG__].pwd, resolvedFilename);
    _fs2.default.unlinkSync(absoluteFilename);
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

module.exports = exports['default'];
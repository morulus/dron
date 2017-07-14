'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = touch;

var _digest = require('./digest');

var _digest2 = _interopRequireDefault(_digest);

var _resolve = require('./resolve');

var _resolve2 = _interopRequireDefault(_resolve);

var _fileExists = require('./fileExists');

var _fileExists2 = _interopRequireDefault(_fileExists);

var _writeFile = require('./writeFile');

var _writeFile2 = _interopRequireDefault(_writeFile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function* touch(subject) {
  var defaultContent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  var resolvedFilename = yield (0, _digest2.default)(subject);
  var fullname = yield (0, _resolve2.default)(resolvedFilename);
  if (yield (0, _fileExists2.default)(fullname)) {
    yield fullname;
  } else {
    yield (0, _writeFile2.default)(fullname, defaultContent);
    yield fullname;
  }
}
module.exports = exports['default'];
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = writeFileSafe;

var _fileExists = require('./fileExists');

var _fileExists2 = _interopRequireDefault(_fileExists);

var _writeFile = require('./writeFile');

var _writeFile2 = _interopRequireDefault(_writeFile);

var _digest = require('./digest');

var _digest2 = _interopRequireDefault(_digest);

var _dialog = require('./dialog');

var _dialog2 = _interopRequireDefault(_dialog);

var _exit = require('./exit');

var _exit2 = _interopRequireDefault(_exit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function writeFileSafe(filename, content) {
  var encode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'utf-8';

  return function* $writeFileSafe() {
    filename = yield (0, _digest2.default)(filename);
    var permit = void 0,
        exists = yield (0, _fileExists2.default)(filename);
    if (exists) {
      var dialogResult = yield (0, _dialog2.default)({
        type: 'confirm',
        name: 'confirm',
        message: 'Rewrite file ' + filename + '?',
        default: false
      });
      if (!dialogResult) {
        yield false;
      } else {
        yield (0, _writeFile2.default)(filename, content, encode);
      }
    } else {
      yield (0, _writeFile2.default)(filename, content, encode);
    }
  };
}
module.exports = exports['default'];
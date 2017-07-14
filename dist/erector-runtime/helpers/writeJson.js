'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = writeJson;

var _writeFile = require('./writeFile');

var _writeFile2 = _interopRequireDefault(_writeFile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function writeJson(filename, content) {
  var encode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'utf-8';
  var replacer = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var space = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 2;

  return (0, _writeFile2.default)(filename, JSON.stringify(content, replacer, space), encode);
}
module.exports = exports['default'];
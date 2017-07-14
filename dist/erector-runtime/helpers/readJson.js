'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = readJson;

var _readFile = require('./readFile');

var _readFile2 = _interopRequireDefault(_readFile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function* readJson(filename) {
  var content = void 0;
  try {
    content = yield (0, _readFile2.default)(filename);
  } catch (e) {
    throw new Error('JSON file is not exists');
  }
  try {
    yield JSON.parse(content);
  } catch (e) {
    throw new Error("Invalid JSON");
  }
}
module.exports = exports['default'];
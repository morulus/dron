'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = editFile;

var _readFile = require('./readFile');

var _readFile2 = _interopRequireDefault(_readFile);

var _writeFile = require('./writeFile');

var _writeFile2 = _interopRequireDefault(_writeFile);

var _digest = require('./digest');

var _digest2 = _interopRequireDefault(_digest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Read file, apply transforms, write it back.
 * @example
 * yield editFile('./log.md', function(content) {
 *  return `${content}
 * Updated on ${new Date().getTime()}`;
 * });
 * @param {string} filename
 * @param {function|generator} editor
 */
function* editFile(filename, editor) {
  if (typeof filename !== 'string') {
    filename = yield (0, _digest2.default)(filename);
  }
  var currentContent = '';
  try {
    currentContent = yield (0, _readFile2.default)(filename);
  } catch (e) {
    // ...
  }

  yield (0, _writeFile2.default)(filename, editor(currentContent));
}
module.exports = exports['default'];
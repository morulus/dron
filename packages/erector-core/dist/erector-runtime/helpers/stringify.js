'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = stringify;

var _stringifyObjectExtractFunctions = require('stringify-object-extract-functions');

var _stringifyObjectExtractFunctions2 = _interopRequireDefault(_stringifyObjectExtractFunctions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function stringify(any) {
  return (0, _stringifyObjectExtractFunctions2.default)(any);
}
module.exports = exports['default'];
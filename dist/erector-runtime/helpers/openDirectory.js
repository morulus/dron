'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = openFile;

var _dispatch = require('./dispatch');

var _dispatch2 = _interopRequireDefault(_dispatch);

var _constants = require('../../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function openFile(dirname) {
  return (0, _dispatch2.default)({
    type: _constants.OPEN_DIRECTORY,
    dirname: dirname
  });
}
module.exports = exports['default'];
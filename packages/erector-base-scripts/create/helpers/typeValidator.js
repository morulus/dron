'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = typeValidator;

var _constants = require('../constants');

function typeValidator(type) {
  return _constants.ALLOWED_TYPES.includes(type) || 'Invalid type';
}
module.exports = exports['default'];
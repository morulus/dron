'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = nameValidator;
var validateNameRegExp = /^[\w\d\-\/]+$/;

function nameValidator(name) {
  return typeof name === 'string' && validateNameRegExp.test(name) || 'Invalid name';
}
module.exports = exports['default'];
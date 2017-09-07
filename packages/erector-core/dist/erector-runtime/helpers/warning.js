"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = warning;

/**
 * First argument must equals true, or flow will be rejected
 */
function warning(statement, warningMessage) {
  if (!Boolean(statement)) {
    throw new Error(warningMessage);
  }
  return true;
}
module.exports = exports["default"];
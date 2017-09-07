"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exit;
/**
 * Immediately exit
 * @example
 * yield exit('Game over');
 * @param  {string} message Last message
 */
function exit(message) {
  console.log(message);
  process.exit(0);
}
module.exports = exports["default"];
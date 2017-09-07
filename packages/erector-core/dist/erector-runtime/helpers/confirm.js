'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = confirm;

var _dialog = require('./dialog');

var _dialog2 = _interopRequireDefault(_dialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Get a confirmation of the user.
 * @example
 * if (yield confirm('Create a file?')) {
 *  // Create file
 * }
 * @param {string} message
 * @param {def} [def = true] Default answer
 */
function confirm(message) {
  var def = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  return (0, _dialog2.default)({
    type: 'confirm',
    message: message,
    default: def
  });
}
module.exports = exports['default'];
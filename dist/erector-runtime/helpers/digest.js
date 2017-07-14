'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = digest;

var _dispatch = require('./dispatch');

var _dispatch2 = _interopRequireDefault(_dispatch);

var _constants = require('../../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Execute some function or a generator by reciprocator.
 *
 * @private
 * @param  {any} subject
 * @return {any}
 */
function digest(subject) {
  return function* lateDigest(state) {
    var next = function callback(promise) {
      next = promise;
    };
    yield (0, _dispatch2.default)({
      type: _constants.ACTION_RUN,
      subject: subject,
      props: undefined,
      next: next
    });
    yield next;
  };
}
module.exports = exports['default'];
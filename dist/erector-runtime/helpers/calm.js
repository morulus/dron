'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = calm;

var _dispatch = require('./dispatch');

var _dispatch2 = _interopRequireDefault(_dispatch);

var _constants = require('../../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Intercepts errors inside `subject` and returns value of
 * onError as the normal result. If onError is a function
 * then it will handler of catch
 * @example
 * const result = yield calm(
 *  writeFile('./someBlockedFile', ''),
 *  null
 * );
 * // result === null
 *
 * @param  {function|generator} subject
 * @param  {any} [onError = false]
 */
function calm(subject) {
  var onError = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  return function* $calm(state) {
    var next = function callback(promise) {
      next = promise;
    };
    yield (0, _dispatch2.default)({
      type: _constants.ACTION_RUN,
      subject: subject,
      props: state,
      next: next
    });
    yield next.then(function (result) {
      return result;
    }).catch("function" === typeof onError ? onError : function () {
      return onError;
    });
  };
}
module.exports = exports['default'];
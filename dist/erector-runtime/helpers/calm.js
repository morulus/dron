'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('/Users/morulus/Work/morulus/projects/erector/node_modules/erector-core-transform-config/node_modules/babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

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

  return _regenerator2.default.mark(function $calm(state) {
    var next;
    return _regenerator2.default.wrap(function $calm$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            next = function callback(promise) {
              next = promise;
            };

            _context.next = 3;
            return (0, _dispatch2.default)({
              type: _constants.ACTION_RUN,
              subject: subject,
              props: state,
              next: next
            });

          case 3:
            _context.next = 5;
            return next.then(function (result) {
              return result;
            }).catch("function" === typeof onError ? onError : function () {
              return onError;
            });

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, $calm, this);
  });
}
module.exports = exports['default'];
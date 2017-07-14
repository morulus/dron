'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = fork;

var _dispatch = require('./dispatch');

var _dispatch2 = _interopRequireDefault(_dispatch);

var _constants = require('../../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Fork a task. It will be executed in parallel without blocking the current sequence.
 * @example
 * const copying = yield fork(copy('./src', './dist'));
 * yield echo('Copying started');
 * @param  {any} sausage
 * @return {Promise}
 */
function* fork(sausage) {
  var result = void 0;
  yield (0, _dispatch2.default)({
    type: _constants.ACTION_RUN,
    subject: sausage,
    props: undefined,
    next: function callback(promise) {
      result = promise;
    }
  });
  result[_constants.RESTANTE] = true;
  return result;
}
module.exports = exports['default'];
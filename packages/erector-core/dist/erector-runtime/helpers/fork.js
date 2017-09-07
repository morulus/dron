'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('/Users/morulus/Work/morulus/projects/erector/node_modules/erector-core-transform-config/node_modules/babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = fork;

var _dispatch = require('./dispatch');

var _dispatch2 = _interopRequireDefault(_dispatch);

var _constants = require('../../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [fork].map(_regenerator2.default.mark);

/**
 * Fork a task. It will be executed in parallel without blocking the current sequence.
 * @example
 * const copying = yield fork(copy('./src', './dist'));
 * yield echo('Copying started');
 * @param  {any} sausage
 * @return {Promise}
 */
function fork(sausage) {
  var result;
  return _regenerator2.default.wrap(function fork$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          result = void 0;
          _context.next = 3;
          return (0, _dispatch2.default)({
            type: _constants.ACTION_RUN,
            subject: sausage,
            props: undefined,
            next: function callback(promise) {
              result = promise;
            }
          });

        case 3:
          result[_constants.RESTANTE] = true;
          return _context.abrupt('return', result);

        case 5:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this);
}
module.exports = exports['default'];
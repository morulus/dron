'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('/Users/morulus/Work/morulus/projects/erector/node_modules/erector-core-transform-config/node_modules/babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

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
  return _regenerator2.default.mark(function lateDigest(state) {
    var next;
    return _regenerator2.default.wrap(function lateDigest$(_context) {
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
              props: undefined,
              next: next
            });

          case 3:
            _context.next = 5;
            return next;

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, lateDigest, this);
  });
}
module.exports = exports['default'];
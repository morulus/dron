'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('/Users/morulus/Work/morulus/projects/erector/node_modules/erector-core-transform-config/node_modules/babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _regenerator = require('/Users/morulus/Work/morulus/projects/erector/node_modules/erector-core-transform-config/node_modules/babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends = _assign2.default || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = assignToState;

var _dispatch = require('./dispatch');

var _dispatch2 = _interopRequireDefault(_dispatch);

var _exit = require('./exit');

var _exit2 = _interopRequireDefault(_exit);

var _constants = require('../../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Assign state to the store. Equals to
 * setState with `Object.assign(state, {...})`
 * ```js
 * yield assignState({
 *   name,
 * });
 * ```
 * It can accept function or generator as a first argument
 * ```js
 * yield assignState(dialog([{
 *  name: {...}
 * }]));
 * ```
 * @param {object|helper} subject Data or helper
 * @returns {object}
 */
function assignToState(subject, transform) {
  return _regenerator2.default.mark(function _callee(state, store) {
    var next;
    return _regenerator2.default.wrap(function _callee$(_context) {
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
            return next.then(function (props) {
              var nextProps = transform ? transform(props) : props;
              if ("object" !== typeof nextProps) {
                return (0, _exit2.default)('State to assign must be a plain object');
              } else {
                return (0, _dispatch2.default)({
                  type: _constants.ACTION_ASSIGN_STATE,
                  state: _extends({}, store.getState(), nextProps)
                });
              }
            }).catch(function (e) {
              throw e;
            });

          case 5:
            _context.next = 7;
            return store.getState();

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  });
}
module.exports = exports['default'];
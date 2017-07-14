'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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
  return function* (state, store) {
    var next = function callback(promise) {
      next = promise;
    };
    yield (0, _dispatch2.default)({
      type: _constants.ACTION_RUN,
      subject: subject,
      props: state,
      next: next
    });

    yield next.then(function (props) {
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

    yield store.getState();
  };
}
module.exports = exports['default'];
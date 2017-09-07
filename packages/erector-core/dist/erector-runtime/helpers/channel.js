'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DONE = undefined;

var _promise = require('/Users/morulus/Work/morulus/projects/erector/node_modules/erector-core-transform-config/node_modules/babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _symbol = require('/Users/morulus/Work/morulus/projects/erector/node_modules/erector-core-transform-config/node_modules/babel-runtime/core-js/symbol');

var _symbol2 = _interopRequireDefault(_symbol);

exports.default = channel;

var _constants = require('../../constants');

var _reciprocator = require('reciprocator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DONE = exports.DONE = (0, _symbol2.default)('DONE');

function accost(dispatch, subject, last) {
  var next = function callback(promise) {
    next = promise;
  };
  dispatch({
    type: _constants.ACTION_RUN,
    subject: subject,
    props: last,
    next: next
  });
  return next;
}

/**
 * Creates channel from a generator or a function. The channel is the mechanism which stores data from any observable source. Each time you call channel it gives you one stored item. When the data ends it returns undefined.
 *
 * In this example channel collect numbers from 1 to 3.
 *
 * ```js
 * const counter = yield channel((last = 0) => {
 *  return last <= 10 ? last + 1 : channel.DONE;
 * });
 * ```
 * To observe the channel you can use `while` loop.
 * ```js
 * let n;
 * while ( n = yield counter ) {
 *  yield echo(counter);
 * }
 * // 1
 * // 2
 * // 3
 * ```
 * @deprecated
 * @param  {function|generator} subject A function or a generator which provides any data
 * @return {function}
 */
function channel(subject) {
  return function (state, store) {
    var sequence = [];
    var enabled = true;
    var done = false;
    var final = void 0;
    var anticipant = void 0;
    var last = void 0;

    var energizer = function energizer() {
      if (!enabled) {
        return;
      }
      accost(store.dispatch, subject, last).then(function (next) {
        if (next === DONE) {
          done = true;
          last = undefined;
        } else {
          last = next;
        }

        if (anticipant && enabled) {
          anticipant(next);
          anticipant = null;
        } else {
          sequence.push(next);
        }

        if (sequence.length > 1000) {
          throw new Error("Dangerously count of observable result");
        }

        if (enabled && !done) {
          energizer();
        }
      });
    };

    energizer();

    var batcher = function plural() {
      if (done) {
        // Return unresolvable promise
        return new _promise2.default();
      }
      if (!enabled) {
        done = true;
        return final;
      }
      if (sequence.length) {
        return sequence.shift();
      } else {
        return new _promise2.default(function (resolve, reject) {
          anticipant = resolve;
        });
      }
    };

    batcher[_reciprocator.CANCEL] = function (f) {
      final = f;
      enabled = false;
    };

    batcher[_reciprocator.RESTANTE] = true;

    return batcher;
  };
}
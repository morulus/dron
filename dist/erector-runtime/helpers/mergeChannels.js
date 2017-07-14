'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = mergeChannels;

var _constants = require('../../constants');

var _reciprocator = require('reciprocator');

function accost(dispatch, subject) {
  var next = function callback(promise) {
    next = promise;
  };
  dispatch({
    type: _constants.ACTION_RUN,
    subject: subject,
    props: undefined,
    next: next
  });
  return next;
}

function isFunction(subject) {
  return typeof subject === 'function';
}

/**
 * Marge two or many channels.
 * @example
 * const watchFile1 = yield watch('./a.js');
 * const watchFile2 = yield watch('./b.js');
 * const onAnyChange = yield mergeChannels(
 *  watchFile1.on('change'),
 *  watchFile2.on('change'),
 * );
 * while (true) {
 *  const file = yield onAnyChange();
 *  yield echo(`${file} has changed`);
 * }
 * // path/to/a.js has changes
 * // path/to/b.js has changes
 * @param  {...channels} ...channels
 * @return {function}
 */
function mergeChannels() {
  for (var _len = arguments.length, channels = Array(_len), _key = 0; _key < _len; _key++) {
    channels[_key] = arguments[_key];
  }

  return function* (state, store) {
    var sequence = [];
    var enabled = true;
    var anticipant = void 0;

    for (var i = 0; i < channels.length; i++) {
      if (typeof channel !== 'function') {
        channels[i] = yield channels[i];
      }
    }

    channels = channels.filter(isFunction);

    var energizer = function energizer(subject) {
      if (!enabled) {
        return;
      }
      accost(store.dispatch, subject).then(function (next) {
        if (anticipant && enabled) {
          anticipant(next);
          anticipant = null;
        } else {
          sequence.push(next);
        }

        if (sequence.length > 200) {
          throw new Error("Dangerously count of observable result");
        }

        energizer(subject);
      });
    };

    channels.forEach(function (subject) {
      return energizer(subject);
    });

    var batcher = function plural() {
      if (sequence.length) {
        return sequence.shift();
      } else {
        return new Promise(function (resolve, reject) {
          anticipant = resolve;
        });
      }
    };

    batcher[_reciprocator.CANCEL] = function () {
      enabled = false;
    };

    batcher[_reciprocator.RESTANTE] = true;

    yield batcher;
  };
}
module.exports = exports['default'];
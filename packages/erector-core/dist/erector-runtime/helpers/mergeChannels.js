'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('/Users/morulus/Work/morulus/projects/erector/packages/erector-core-transform-config/node_modules/babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('/Users/morulus/Work/morulus/projects/erector/packages/erector-core-transform-config/node_modules/babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.default = mergeChannels;

var _constants = require('../../constants');

var _reciprocator = require('reciprocator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

  return (/*#__PURE__*/_regenerator2.default.mark(function _callee(state, store) {
      var sequence, enabled, anticipant, i, energizer, batcher;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              sequence = [];
              enabled = true;
              anticipant = void 0;
              i = 0;

            case 4:
              if (!(i < channels.length)) {
                _context.next = 12;
                break;
              }

              if (!(typeof channel !== 'function')) {
                _context.next = 9;
                break;
              }

              _context.next = 8;
              return channels[i];

            case 8:
              channels[i] = _context.sent;

            case 9:
              i++;
              _context.next = 4;
              break;

            case 12:

              channels = channels.filter(isFunction);

              energizer = function energizer(subject) {
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

              batcher = function plural() {
                if (sequence.length) {
                  return sequence.shift();
                } else {
                  return new _promise2.default(function (resolve, reject) {
                    anticipant = resolve;
                  });
                }
              };

              batcher[_reciprocator.CANCEL] = function () {
                enabled = false;
              };

              batcher[_reciprocator.RESTANTE] = true;

              _context.next = 20;
              return batcher;

            case 20:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    })
  );
}
module.exports = exports['default'];
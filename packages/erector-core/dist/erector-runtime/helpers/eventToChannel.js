'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('/Users/morulus/Work/morulus/projects/erector/packages/erector-core-transform-config/node_modules/babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.default = emitterToChannel;

var _reciprocator = require('reciprocator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function defaultMapArgsToVar(value) {
  return value;
}

/**
 * Create channel from listener. Read about [channel](../channel.md) to understand the channels in Erector.
 * @example
 * const myEvents = new Events();
 * const onChange = yield emitterToChannel(myEvents, 'change');
 * yield fork(function* () {
 *  while (yield onChange()) {
 *    yield echo('Changed');
 *  }
 * });
 * onChange.emit('change');
 * @param {EventEmitter} emitter Instance of EventEmitter
 * @param {string} event event name
 * @param {function} [mapArgsToVar = defaultMapArgsToVar] Map args to variable
 */
function emitterToChannel(emitter, event) {
  var mapArgsToVar = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultMapArgsToVar;

  var queue = [];
  var anticipant = void 0;
  var handler = function handler() {
    if (anticipant) {
      anticipant(mapArgsToVar.apply(undefined, arguments));
      anticipant = null;
    } else {
      queue.push(mapArgsToVar.apply(undefined, arguments));
    }
  };

  emitter.on(event, handler);

  var channel = function channel() {
    if (queue.length) {
      return queue.shift();
    } else {
      return new _promise2.default(function (resolve) {
        anticipant = resolve;
      });
    }
  };

  channel[_reciprocator.CANCEL] = function () {
    emitter.removeListener(event, handler);
    anticipant = null;
  };

  channel[_reciprocator.RESTANTE] = true;

  return channel;
}
module.exports = exports['default'];
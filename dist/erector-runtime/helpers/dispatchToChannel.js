'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function* () {
  var queue = [];
  var final = void 0;
  var enabled = true;
  var anticipant = void 0;
  var handler = function handler(action) {
    if (anticipant) {
      anticipant(action);
      anticipant = null;
    } else {
      queue.push(action);
    }
  };

  var unconnect = yield (0, _connectDispatcher2.default)(handler);
  var channel = function channel() {
    if (!enabled) {
      return final;
    }
    if (queue.length) {
      return queue.shift();
    } else {
      return new Promise(function (resolve) {
        anticipant = resolve;
      });
    }
  };

  channel[_reciprocator.CANCEL] = function (f) {
    final = f;
    enabled = false;
    anticipant = null;
    queue.split(0, queue.length);
    unconnect();
    originCancel(final);
  };

  channel[_reciprocator.RESTANTE] = true;

  yield channel;
};

var _connectDispatcher = require('./connectDispatcher');

var _connectDispatcher2 = _interopRequireDefault(_connectDispatcher);

var _reciprocator = require('reciprocator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];

/**
 * Create a channel which reproduces each action of the system store.
 * ```js
 * const onAction = yield dispatchToChannel;
 * let action;
 * while (action = yield onAction) {
 *  switch (action.type) {
 *    case 'MY_ACTION':
 *       yield doSomeJob;
 *    break;
 *  }
 * }
 * ```
 *
 * Read [channel](./channel.md) to learn how to use it.
 *
 * @return {type}  description
 */
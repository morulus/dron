'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('/Users/morulus/Work/morulus/projects/erector/packages/erector-core-transform-config/node_modules/babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('/Users/morulus/Work/morulus/projects/erector/packages/erector-core-transform-config/node_modules/babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.default = _callee;

var _connectDispatcher = require('./connectDispatcher');

var _connectDispatcher2 = _interopRequireDefault(_connectDispatcher);

var _reciprocator = require('reciprocator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/_regenerator2.default.mark(_callee);

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
function _callee() {
  var queue, final, enabled, anticipant, handler, unconnect, channel;
  return _regenerator2.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          queue = [];
          final = void 0;
          enabled = true;
          anticipant = void 0;

          handler = function handler(action) {
            if (anticipant) {
              anticipant(action);
              anticipant = null;
            } else {
              queue.push(action);
            }
          };

          _context.next = 7;
          return (0, _connectDispatcher2.default)(handler);

        case 7:
          unconnect = _context.sent;

          channel = function channel() {
            if (!enabled) {
              return final;
            }
            if (queue.length) {
              return queue.shift();
            } else {
              return new _promise2.default(function (resolve) {
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

          _context.next = 13;
          return channel;

        case 13:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this);
}
module.exports = exports['default'];
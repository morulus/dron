'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('/Users/morulus/Work/morulus/projects/erector/packages/erector-core-transform-config/node_modules/babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.default = craeteChannel;

var _constants = require('../../constants');

var _reciprocator = require('reciprocator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Create channel from function observer. The channel is the mechanism which stores data from any observable source. Each time you call channel it gives you one stored item. When the data ends it returns undefined.
 *
 * @example
 * const app = express();
 * const get = yield craeteChannel(function(next) {
 *   app.get('/', function (req, res) {
 *    next([req, res]);
 *   })
 * });
 *
 * @param  {type} provider description
 * @return {type}          description
 */
function craeteChannel(observer) {
  var sequence = [];
  var cancelled = false;
  var done = false;
  var completed = false;
  var final = void 0;
  var anticipant = void 0;
  var last = void 0;
  var tail = void 0;
  var destroyer = observer(function (value) {
    if (done) {
      return;
    }
    if (anticipant && !cancelled) {
      var preservedAnticipant = anticipant;
      anticipant = null;
      preservedAnticipant(value);
    } else {
      sequence.push(value);
    }

    if (sequence.length > 1000) {
      throw new Error("Dangerously count of observable result");
    }
  },
  // Done
  function (payload) {
    // The tail value, which will be returned each time channel will be
    // invoked after completed
    tail = payload;
    if (done) {
      return;
    }
    if (anticipant && !cancelled) {
      var preservedAnticipant = anticipant;
      anticipant = null;
      preservedAnticipant(undefined);
    } else {
      sequence.push(undefined);
    }
    done = true;
    if (typeof destroyer === 'function') {
      destroyer();
    }
  }, function (e) {
    if (done) {
      return;
    }
    throw e;
  });

  var channel = function channel() {
    if (cancelled) {
      done = true;
      completed = true;
      return final;
    }
    if (sequence.length) {
      return sequence.shift();
    } else {
      if (done) {
        return _promise2.default.resolve(tail);
      } else {
        return new _promise2.default(function (resolve, reject) {
          anticipant = resolve;
        });
      }
    }
  };

  channel[_reciprocator.CANCEL] = function (f) {
    final = f;
    cancelled = true;
  };

  channel[_constants.CHANNEL] = true;

  channel[_reciprocator.RESTANTE] = true;

  return channel;
}
module.exports = exports['default'];
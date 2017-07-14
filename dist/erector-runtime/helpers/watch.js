'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = watch;

var _eventToChannel = require('./eventToChannel');

var _eventToChannel2 = _interopRequireDefault(_eventToChannel);

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var _chokidar = require('chokidar');

var _chokidar2 = _interopRequireDefault(_chokidar);

var _reciprocator = require('reciprocator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function* watch(target, options) {
  var channels = [];
  var watcher = _chokidar2.default.watch(target, _extends({
    ignoreInitial: true,
    awaitWriteFinish: {
      stabilityThreshold: 500,
      pollInterval: 100
    }
  }, options));

  var erectedWatcher = _defineProperty({
    on: function* on(eventName) {
      var channel = yield (0, _eventToChannel2.default)(watcher, eventName);
      var orgCancel = channel[_reciprocator.CANCEL];
      channels.push(channel);
      channel[_reciprocator.CANCEL] = function () {
        channels.splice(channels.indexOf(channel), 1);
        orgCancel();
      };

      channel[_reciprocator.RESTANTE] = true;

      yield channel;
    },
    add: function add() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      watcher.add(args);
      return erectedWatcher;
    }
  }, _reciprocator.CANCEL, function () {
    channels.forEach(function (channel) {
      return channels[_reciprocator.CANCEL]();
    });
  });

  yield erectedWatcher;
}
module.exports = exports['default'];
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('/Users/morulus/Work/morulus/projects/erector/packages/erector-core-transform-config/node_modules/babel-runtime/core-js/object/define-property');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('/Users/morulus/Work/morulus/projects/erector/packages/erector-core-transform-config/node_modules/babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _regenerator = require('/Users/morulus/Work/morulus/projects/erector/packages/erector-core-transform-config/node_modules/babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends = _assign2.default || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = watch;

var _eventToChannel = require('./eventToChannel');

var _eventToChannel2 = _interopRequireDefault(_eventToChannel);

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var _chokidar = require('chokidar');

var _chokidar2 = _interopRequireDefault(_chokidar);

var _reciprocator = require('reciprocator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/_regenerator2.default.mark(watch);

function _defineProperty(obj, key, value) { if (key in obj) { (0, _defineProperty3.default)(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function watch(target, options) {
  var channels, watcher, erectedWatcher;
  return _regenerator2.default.wrap(function watch$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          channels = [];
          watcher = _chokidar2.default.watch(target, _extends({
            ignoreInitial: true,
            awaitWriteFinish: {
              stabilityThreshold: 500,
              pollInterval: 100
            }
          }, options));
          erectedWatcher = _defineProperty({
            on: /*#__PURE__*/_regenerator2.default.mark(function on(eventName) {
              var channel, orgCancel;
              return _regenerator2.default.wrap(function on$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return (0, _eventToChannel2.default)(watcher, eventName);

                    case 2:
                      channel = _context.sent;
                      orgCancel = channel[_reciprocator.CANCEL];

                      channels.push(channel);
                      channel[_reciprocator.CANCEL] = function () {
                        channels.splice(channels.indexOf(channel), 1);
                        orgCancel();
                      };

                      channel[_reciprocator.RESTANTE] = true;

                      _context.next = 9;
                      return channel;

                    case 9:
                    case 'end':
                      return _context.stop();
                  }
                }
              }, on, this);
            }),
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
          _context2.next = 5;
          return erectedWatcher;

        case 5:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked, this);
}
module.exports = exports['default'];
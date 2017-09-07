'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('/Users/morulus/Work/morulus/projects/erector/node_modules/erector-core-transform-config/node_modules/babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('/Users/morulus/Work/morulus/projects/erector/node_modules/erector-core-transform-config/node_modules/babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.default = pause;

var _echo = require('./echo');

var _echo2 = _interopRequireDefault(_echo);

var _fork = require('./fork');

var _fork2 = _interopRequireDefault(_fork);

var _constants = require('../../constants');

var _reciprocator = require('reciprocator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [pause].map(_regenerator2.default.mark); // import setupThrobber from 'cli-color/throbber';


//
// const throbber = setupThrobber(function (str) {
//   process.stdout.write(str);
// }, 100);

function pause() {
  var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var outsideResolver, start, retinaculum, callbackFn;
  return _regenerator2.default.wrap(function pause$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          outsideResolver = void 0;
          _context4.next = 3;
          return _echo2.default.type(_constants.THROBBER_START, 'start');

        case 3:
          start = new Date().getTime();
          retinaculum = new _promise2.default(function (resolve) {
            outsideResolver = resolve;
          });

          if (!delay) {
            _context4.next = 11;
            break;
          }

          _context4.next = 8;
          return (0, _fork2.default)(function () {
            return new _promise2.default(function (resolve) {
              setTimeout(function () {
                resolve(_regenerator2.default.mark(function _callee() {
                  return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.next = 2;
                          return _echo2.default.type(_constants.THROBBER_STOP, 'done');

                        case 2:
                          outsideResolver();

                        case 3:
                        case 'end':
                          return _context.stop();
                      }
                    }
                  }, _callee, this);
                }));
              }, delay);
            });
          });

        case 8:
          return _context4.abrupt('return', retinaculum);

        case 11:
          callbackFn = function callbackFn() {
            var postDelay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

            return _regenerator2.default.mark(function _callee3() {
              return _regenerator2.default.wrap(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      if (!postDelay) {
                        _context3.next = 4;
                        break;
                      }

                      return _context3.abrupt('return', new _promise2.default(function (resolve) {
                        setTimeout(function () {
                          resolve(_regenerator2.default.mark(function _callee2() {
                            return _regenerator2.default.wrap(function _callee2$(_context2) {
                              while (1) {
                                switch (_context2.prev = _context2.next) {
                                  case 0:
                                    _context2.next = 2;
                                    return _echo2.default.type(_constants.THROBBER_STOP, 'done');

                                  case 2:
                                    outsideResolver();
                                    return _context2.abrupt('return', new Date().getTime() - start);

                                  case 4:
                                  case 'end':
                                    return _context2.stop();
                                }
                              }
                            }, _callee2, this);
                          }));
                        }, postDelay);
                      }));

                    case 4:
                      _context3.next = 6;
                      return _echo2.default.type(_constants.THROBBER_STOP, 'done');

                    case 6:
                      outsideResolver();
                      return _context3.abrupt('return', new Date().getTime() - start);

                    case 8:
                    case 'end':
                      return _context3.stop();
                  }
                }
              }, _callee3, this);
            });
          };

          callbackFn[_reciprocator.RESTANTE] = true;
          return _context4.abrupt('return', callbackFn);

        case 14:
        case 'end':
          return _context4.stop();
      }
    }
  }, _marked[0], this);
}
module.exports = exports['default'];
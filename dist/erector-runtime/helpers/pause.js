'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = pause;

var _echo = require('./echo');

var _echo2 = _interopRequireDefault(_echo);

var _fork = require('./fork');

var _fork2 = _interopRequireDefault(_fork);

var _reciprocator = require('reciprocator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
// const throbber = setupThrobber(function (str) {
//   process.stdout.write(str);
// }, 100);

function* pause() {
  var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

  var outsideResolver = void 0;
  yield _echo2.default.type(THROBBER_START, 'start');
  var start = new Date().getTime();
  var retinaculum = new Promise(function (resolve) {
    outsideResolver = resolve;
  });
  if (delay) {
    yield (0, _fork2.default)(function () {
      return new Promise(function (resolve) {
        setTimeout(function () {
          resolve(function* () {
            yield _echo2.default.type(THROBBER_STOP, 'done');
            outsideResolver();
          });
        }, delay);
      });
    });
    return retinaculum;
  } else {
    var callbackFn = function callbackFn() {
      var postDelay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      return function* () {
        if (postDelay) {
          return new Promise(function (resolve) {
            setTimeout(function () {
              resolve(function* () {
                yield _echo2.default.type(THROBBER_STOP, 'done');
                outsideResolver();
                return new Date().getTime() - start;
              });
            }, postDelay);
          });
        } else {
          yield _echo2.default.type(THROBBER_STOP, 'done');
          outsideResolver();
          return new Date().getTime() - start;
        }
      };
    };
    callbackFn[_reciprocator.RESTANTE] = true;
    return callbackFn;
  }
} // import setupThrobber from 'cli-color/throbber';
module.exports = exports['default'];
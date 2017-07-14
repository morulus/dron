'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = pause;

var _throbber = require('cli-color/throbber');

var _throbber2 = _interopRequireDefault(_throbber);

var _reciprocator = require('reciprocator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var throbber = (0, _throbber2.default)(function (str) {
  process.stdout.write(str);
}, 100);

function pause() {
  var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

  var outsideResolver = void 0;
  throbber.start();
  var start = new Date().getTime();
  var retinaculum = new Promise(function (resolve) {
    outsideResolver = resolve;
  });
  if (delay) {
    setTimeout(function () {
      throbber.stop();
      outsideResolver();
    }, delay);
    return retinaculum;
  } else {
    var callbackFn = function callbackFn() {
      var postDelay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      return function () {
        if (postDelay) {
          return new Promise(function (resolve) {
            setTimeout(function () {
              throbber.stop();
              outsideResolver();
              resolve(new Date().getTime() - start);
            }, postDelay);
          });
        } else {
          throbber.stop();
          outsideResolver();
          return new Date().getTime() - start;
        }
      };
    };
    callbackFn[_reciprocator.RESTANTE] = true;
    return callbackFn;
  }
}
module.exports = exports['default'];
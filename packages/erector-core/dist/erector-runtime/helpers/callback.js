"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _from = require("/Users/morulus/Work/morulus/projects/erector/node_modules/erector-core-transform-config/node_modules/babel-runtime/core-js/array/from");

var _from2 = _interopRequireDefault(_from);

var _promise = require("/Users/morulus/Work/morulus/projects/erector/node_modules/erector-core-transform-config/node_modules/babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

exports.default = callback;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return (0, _from2.default)(arr); } }

/**
 * Run node.js style function.
 * @example
 * try {
 *  yield callback([fs, writeFile], './test', 'Hello, Erector');
 *  yield echo.ok('File writed');
 * } catch(e) {
 *  yield echo.error('Write fail');
 * }
 * @param  {type} fn      description
 * @param  {type} ...args description
 * @return {type}         description
 */
function callback(fn) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  var context = void 0;
  if (fn instanceof Array) {
    context = fn[0];
    fn = fn[1];
  }
  return new _promise2.default(function (resolve, reject) {
    var _context, _ref;

    (_ref = (_context = context, fn)).call.apply(_ref, [_context].concat(_toConsumableArray(args.concat([function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    }]))));
  });
}
module.exports = exports["default"];
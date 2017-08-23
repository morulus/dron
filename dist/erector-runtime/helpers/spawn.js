"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require("/Users/morulus/Work/morulus/projects/erector/node_modules/erector-core-transform-config/node_modules/babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _extends = _assign2.default || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = spawn;

var _crossSpawn = require("cross-spawn");

var _crossSpawn2 = _interopRequireDefault(_crossSpawn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function spawn(command, args) {
  var std = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  return function () {
    return _crossSpawn2.default.sync(command, args, _extends({
      stdio: [std.stdin || process.stdin, std.stdout || process.stdout, std.stderr || "inherit"]
    }, std || {}));
  };
}
module.exports = exports["default"];
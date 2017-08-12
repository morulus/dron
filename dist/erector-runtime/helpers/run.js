'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = run;

var _constants = require('../../constants');

var _erector = require('./../../core/env/node/erector');

var _erector2 = _interopRequireDefault(_erector);

var _resolvePackage = require('erector-node-utils/resolvePackage');

var _resolvePackage2 = _interopRequireDefault(_resolvePackage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function run(file) {
  var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var defaultState = arguments[2];

  return function* runner(state, store) {
    if (!module) {
      yield exit('Package has errors');
    } else {
      var app = (0, _erector2.default)(defaultState || {});
      app.use((0, _erector.configure)(state[_constants.__CONFIG__]));
      yield app.run(file, args);
    }
  };
}
module.exports = exports['default'];
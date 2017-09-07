'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('/Users/morulus/Work/morulus/projects/erector/node_modules/erector-core-transform-config/node_modules/babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = run;

var _constants = require('../../constants');

var _erector = require('./../../core/env/node/erector');

var _erector2 = _interopRequireDefault(_erector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function run(file) {
  var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var defaultState = arguments[2];

  return _regenerator2.default.mark(function runner(state, store) {
    return _regenerator2.default.wrap(function runner$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            throw new Error('Helper run is temporary deprecated');

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, runner, this);
  });
}
module.exports = exports['default'];
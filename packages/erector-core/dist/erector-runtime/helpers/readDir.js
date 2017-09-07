'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('/Users/morulus/Work/morulus/projects/erector/node_modules/erector-core-transform-config/node_modules/babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = readDir;

var _digest = require('./digest');

var _digest2 = _interopRequireDefault(_digest);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _constants = require('../../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function readDir(dirname) {
  return _regenerator2.default.mark(function _callee(state) {
    var resolvedDirname, absoluteDirname;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _digest2.default)(dirname);

          case 2:
            resolvedDirname = _context.sent;
            absoluteDirname = _path2.default.resolve(state[_constants.__CONFIG__].pwd, resolvedDirname);
            _context.next = 6;
            return _fs2.default.readdirSync(absoluteDirname);

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  });
}
module.exports = exports['default'];
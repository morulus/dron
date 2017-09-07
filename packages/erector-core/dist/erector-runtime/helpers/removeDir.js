'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('/Users/morulus/Work/morulus/projects/erector/packages/erector-core-transform-config/node_modules/babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = function (dirname) {
  var forceDeleteNotEmpty = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  return (/*#__PURE__*/_regenerator2.default.mark(function _callee(state) {
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

              if (!forceDeleteNotEmpty) {
                _context.next = 8;
                break;
              }

              unsafeRemoveDirectory(absoluteDirname);
              _context.next = 11;
              break;

            case 8:
              if (!_fs2.default.readdirSync(absoluteDirname).length) {
                _context.next = 10;
                break;
              }

              throw new Error('Directory ' + dirname + ' is not empty');

            case 10:
              _fs2.default.rmdirSync(absoluteDirname);

            case 11:
              _context.next = 13;
              return true;

            case 13:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    })
  );
};

var _digest = require('./digest');

var _digest2 = _interopRequireDefault(_digest);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _constants = require('../../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function unsafeRemoveDirectory(path) {
  if (_fs2.default.existsSync(path)) {
    _fs2.default.readdirSync(path).forEach(function (file, index) {
      var curPath = path + "/" + file;
      if (_fs2.default.lstatSync(curPath).isDirectory()) {
        unsafeRemoveDirectory(curPath);
      } else {
        _fs2.default.unlinkSync(curPath);
      }
    });
    _fs2.default.rmdirSync(path);
  }
}

module.exports = exports['default'];
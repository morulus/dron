'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('/Users/morulus/Work/morulus/projects/erector/packages/erector-core-transform-config/node_modules/babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('/Users/morulus/Work/morulus/projects/erector/packages/erector-core-transform-config/node_modules/babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.default = createDir;

var _digest = require('./digest');

var _digest2 = _interopRequireDefault(_digest);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _constants = require('../../constants');

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Create a directory. It will throw an error on fail.
 *
 * @example
 * try {
 *  yield createDir('create/some/folder');
 * } catch(e) {
 *  yield exit(e.message);
 * }
 * @param  {string} dirname
 */
function createDir(dirname) {
  return (/*#__PURE__*/_regenerator2.default.mark(function $createDir(state) {
      return _regenerator2.default.wrap(function $createDir$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _digest2.default)(dirname);

            case 2:
              dirname = _context.sent;
              _context.next = 5;
              return new _promise2.default(function (resolve, reject) {
                var filepath = _path2.default.resolve(state[_constants.__CONFIG__].pwd, dirname);
                (0, _mkdirp2.default)(filepath, function (err) {
                  if (err) {
                    reject(err);
                  } else {
                    resolve(true);
                  }
                });
              });

            case 5:
            case 'end':
              return _context.stop();
          }
        }
      }, $createDir, this);
    })
  );
}
module.exports = exports['default'];
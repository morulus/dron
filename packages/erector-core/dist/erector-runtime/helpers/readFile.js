'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('/Users/morulus/Work/morulus/projects/erector/node_modules/erector-core-transform-config/node_modules/babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('/Users/morulus/Work/morulus/projects/erector/node_modules/erector-core-transform-config/node_modules/babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.default = readFile;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _constants = require('../../constants');

var _digest = require('./digest');

var _digest2 = _interopRequireDefault(_digest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * readFile - Return loopback function which read file
 *
 * @param  {string} filename
 * @param  {string|object} options = 'utf-8'
 * @return {Promise}
 */
function readFile(filename) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'utf-8';

  return _regenerator2.default.mark(function payloadedReadFile(state) {
    return _regenerator2.default.wrap(function payloadedReadFile$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _digest2.default)(filename);

          case 2:
            filename = _context.sent;
            _context.next = 5;
            return new _promise2.default(function (resolve, reject) {
              _fs2.default.readFile(_path2.default.resolve(state[_constants.__CONFIG__].pwd, filename), options, function (err, content) {
                if (err) {
                  reject(err);
                } else {
                  resolve(content);
                }
              });
            });

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, payloadedReadFile, this);
  });
}
module.exports = exports['default'];
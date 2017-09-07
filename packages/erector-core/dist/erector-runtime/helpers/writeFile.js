'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('/Users/morulus/Work/morulus/projects/erector/packages/erector-core-transform-config/node_modules/babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('/Users/morulus/Work/morulus/projects/erector/packages/erector-core-transform-config/node_modules/babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.default = writeFile;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _constants = require('../../constants');

var _createDir = require('./createDir');

var _createDir2 = _interopRequireDefault(_createDir);

var _digest = require('./digest');

var _digest2 = _interopRequireDefault(_digest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * writeFile - Return a loopback function which writes content to file
 *
 * @param  {string} filename         Relative filename
 * @param  {string} content          Content
 * @param  {string|undefined} encode = 'utf-8' Encode
 * @return {Promise}
 */
function writeFile(filename, content) {
  var encode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'utf-8';

  return (/*#__PURE__*/_regenerator2.default.mark(function payloadedWriteFile(state) {
      var dirname;
      return _regenerator2.default.wrap(function payloadedWriteFile$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(typeof filename !== 'string')) {
                _context.next = 4;
                break;
              }

              _context.next = 3;
              return (0, _digest2.default)(filename);

            case 3:
              filename = _context.sent;

            case 4:
              if (!(typeof content !== 'string')) {
                _context.next = 8;
                break;
              }

              _context.next = 7;
              return (0, _digest2.default)(content);

            case 7:
              content = _context.sent;

            case 8:
              dirname = _path2.default.dirname(_path2.default.resolve(state[_constants.__CONFIG__].pwd, filename));
              _context.next = 11;
              return (0, _createDir2.default)(dirname);

            case 11:
              _context.next = 13;
              return new _promise2.default(function (resolve, reject) {
                _fs2.default.writeFile(_path2.default.resolve(state[_constants.__CONFIG__].pwd, filename), content, encode, function (err, report) {
                  if (err) {
                    console.log('TEATD', err.message);
                    reject(err);
                  } else {
                    resolve(content);
                  }
                });
              });

            case 13:
            case 'end':
              return _context.stop();
          }
        }
      }, payloadedWriteFile, this);
    })
  );
}
module.exports = exports['default'];
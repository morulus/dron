'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('/Users/morulus/Work/morulus/projects/erector/packages/erector-core-transform-config/node_modules/babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _extends = _assign2.default || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = find;

var _getState = require('./getState');

var _getState2 = _interopRequireDefault(_getState);

var _createChannel = require('./createChannel');

var _createChannel2 = _interopRequireDefault(_createChannel);

var _vinylFs = require('vinyl-fs');

var _vinylFs2 = _interopRequireDefault(_vinylFs);

var _mapStream = require('map-stream');

var _mapStream2 = _interopRequireDefault(_mapStream);

var _constants = require('../../constants');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Find files by mask and get result as the channel.
 * This helper reproduce functionality of [vinyl-fs](https://www.npmjs.com/package/vinyl-fs)
 * package. Each channel result is array of [file, cb].
 *
 * File contains two base properties: path, contents.
 * - `path` {string} is a abslute path to target file
 * - `contents` {Buffer} File contents in Buffer format
 *
 * In moust usual cases you may to use this tool to find some files and
 * do somthing with each of it.
 *
 * First, you should to create channel
 * ```js
 * const files = yield find(['*.js'], {});
 *
 * ```
 *
 * @param  {type} globs        description
 * @param  {type} options = {} description
 * @return {type}              description
 */
function find(globs) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return function (state) {
    var filesStream = _vinylFs2.default.src(globs, _extends({}, options, {
      cwd: _path2.default.resolve(state[_constants.__CONFIG__].pwd, options.cwd || '.')
    }));
    var filesChannel = (0, _createChannel2.default)(function (next, done) {
      filesStream.on('end', function () {
        done();
      });

      filesStream.pipe((0, _mapStream2.default)(function (file, cb) {
        next([file, cb]);
      }));
    });
    filesChannel.dest = function () {
      filesStream.pipe(_vinylFs2.default.dest.apply(_vinylFs2.default, arguments));
      return filesChannel;
    };
    filesChannel.stream = filesStream;
    return filesChannel;
  };
}
module.exports = exports['default'];
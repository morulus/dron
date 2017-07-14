'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = copy;

var _ncp = require('ncp');

var _isDirectory = require('./isDirectory');

var _isDirectory2 = _interopRequireDefault(_isDirectory);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _constants = require('../../constants');

var _createDir = require('./createDir');

var _createDir2 = _interopRequireDefault(_createDir);

var _through = require('through2');

var _through2 = _interopRequireDefault(_through);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_ncp.ncp.limit = 128;

function decorateTransform(store, origTransform, encoding, reject) {
  return function (read, write) {
    read.pipe((0, _through2.default)(function (chunk, enc, callback) {
      var _this = this;

      store.dispatch({
        type: _constants.ACTION_RUN,
        subject: origTransform(chunk.toString()),
        props: store.getState(),
        next: function next(promise) {
          return promise.then(function (content) {
            _this.push(new Buffer(content, encoding));
            callback();
          }).catch(function (e) {
            reject(e);
          });
        }
      });
    })).pipe(write);
  };
}

function defaultTransform(read, write) {
  read.pipe(write);
}

/**
 * Copy file or directory recursively. Helper uses functionality of package [ncp](https://www.npmjs.com/package/ncp).
 * ```js
 * yield copy('./src', './dist');
 * ```
 * This helper accepts same options as the module [ncp](https://www.npmjs.com/package/ncp).
 * But opt.transform can be a generator. For example, you can use it
 * with another helpers to apply transforms while copying.
 * ```js
 * yield copy('./src/some.ejs', './dist/some.js', {
 *  transform: function* (content) {
 *    yield ejs(content, state);
 *  },
 * });
 * ```
 * @param {string} source Source file or Directory
 * @param {string} destination Target file or directory
 * @param {object} opt Options (read [ncp](https://www.npmjs.com/package/ncp) for ditails)
 */
function copy(source, destination) {
  var opt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var encoding = opt.encoding || 'utf-8';
  return function* (state, store) {
    var resolvedSource = _path2.default.resolve(state[_constants.__CONFIG__].pwd, source);
    var resolvedDestination = _path2.default.resolve(state[_constants.__CONFIG__].pwd, destination);
    var isSourceDir = yield (0, _isDirectory2.default)(resolvedSource);
    yield (0, _createDir2.default)(isSourceDir ? resolvedDestination : _path2.default.dirname(resolvedDestination));
    yield new Promise(function (resolve, reject) {
      var transform = typeof opt.transform === 'function' ? decorateTransform(store, opt.transform, encoding, reject) : defaultTransform;
      (0, _ncp.ncp)(resolvedSource, _path2.default.resolve(state[_constants.__CONFIG__].pwd, resolvedDestination), _extends({}, opt, {
        transform: transform
      }), function (err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  };
}
module.exports = exports['default'];
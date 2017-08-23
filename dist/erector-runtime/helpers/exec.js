'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('/Users/morulus/Work/morulus/projects/erector/node_modules/erector-core-transform-config/node_modules/babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _promise = require('/Users/morulus/Work/morulus/projects/erector/node_modules/erector-core-transform-config/node_modules/babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _extends = _assign2.default || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _constants = require('../../constants');

var _child_process = require('child_process');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Execute shell command and get the output as the result.
 * ```js
 * const npmVersion = yield exec('npm -v');
 * ```
 * You can specify `cwd`:
 * ```js
 * const ls = yield exec('ls', {
 *  cwd: '/path/to/folder',
 * });
 * ```
 * It decorates the function `exec` of the package [child_process](https://www.npmjs.com/package/child_process), thus it uses all the same options.
 * @param {string} com Command
 * @param {object} opt Options
 */
function execHelper(com) {
  var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return function shellExec(state) {
    var defOpt = {
      cwd: state[_constants.__CONFIG__].pwd
    };
    return new _promise2.default(function (resolve, reject) {
      try {
        var child = (0, _child_process.exec)(com, _extends({}, defOpt, opt), function (error, stdout, stderr) {
          if (!error) {
            resolve(stdout);
          } else {
            reject(error);
          }
        });
        // child.stderr.on('data', (error) => {
        //   reject(error);
        // });
      } catch (e) {
        reject(e);
      }
    });
  };
}

execHelper.prepare = function (constOpt) {
  return function customExec(com, opt) {
    return execHelper(com, _extends({}, constOpt, opt));
  };
};

exports.default = execHelper;
module.exports = exports['default'];
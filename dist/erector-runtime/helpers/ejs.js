'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ejs = require('ejs');

var _ejs2 = _interopRequireDefault(_ejs);

var _digest = require('./digest');

var _digest2 = _interopRequireDefault(_digest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* The operator allow you to use ejs compilator (http://ejs.co/).
*
* @description
* In most typicall tasks, you do not need to specify `data` argument to parse you .ejs template.
* In an overwhelming case for the compilation of the document is enough to give it a `template`.
* By the defaults the data are taken from the state.
* @example
* let filename = yield inModule('./templates/readme.jsx');
* @example
* yield writeFile('./readme.md', ejs(readFile(inModule('./templates/readme.jsx'))));
*
* @param {string|function} template String or a function (generator) which returns chain, ending with template text
* @param {object} [data] Properties which will be used by ejs as data
* @param {object} [options] Options for ejs (read ejs docs for ditails)
*/
function ejs(template, data, options) {

  /**
   * @return {string} The compiled document
   */
  return function* $ejs(state) {
    template = yield (0, _digest2.default)(template);
    yield _ejs2.default.render(template, "object" === typeof data ? data : state, options || {});
  };
}

/**
 * Prepare a render function that already carrying the data and options
 *
 * @param {object} [data] Properties which will be used by ejs as data
 * @param {object} [options] Options for ejs (read ejs docs for ditails)
 * @return {function} render
 */
ejs.prepare = function (data, options) {
  return function (template) {
    return ejs(template, data, options);
  };
};

exports.default = ejs;
module.exports = exports['default'];
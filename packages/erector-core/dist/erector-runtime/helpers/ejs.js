'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('/Users/morulus/Work/morulus/projects/erector/packages/erector-core-transform-config/node_modules/babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _ejs = require('ejs');

var _ejs2 = _interopRequireDefault(_ejs);

var _digest = require('./digest');

var _digest2 = _interopRequireDefault(_digest);

var _loophole = require('loophole');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Allow to use new Function
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
  return (/*#__PURE__*/_regenerator2.default.mark(function $ejs(state) {
      return _regenerator2.default.wrap(function $ejs$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _digest2.default)(template);

            case 2:
              template = _context.sent;
              _context.next = 5;
              return (0, _loophole.allowUnsafeNewFunction)(function () {
                return _ejs2.default.render(template, "object" === typeof data ? data : state, options || {});
              });

            case 5:
            case 'end':
              return _context.stop();
          }
        }
      }, $ejs, this);
    })
  );
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
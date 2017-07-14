'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = forkAll;

var _fork = require('./fork');

var _fork2 = _interopRequireDefault(_fork);

var _reciprocator = require('reciprocator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Fork multiple tasks.
 * @example
 * const asyncTasks = forkAll(
 *  Promise.resolve(1),
 *  Promise.resolve(2),
 *  Promise.resolve(3),
 * );
 * yield echo(asyncTasks);
 * // [1, 2, 3]
 * @param  {...any} ...subjects
 * @return {function}
 */
function* forkAll() {
  for (var _len = arguments.length, subjects = Array(_len), _key = 0; _key < _len; _key++) {
    subjects[_key] = arguments[_key];
  }

  var sausages = [];
  for (var i = 0; i < subjects.length; ++i) {
    sausages[i] = yield (0, _fork2.default)(subjects[i]);
  }
  var forkHandler = function* forkHandler() {
    var results = [];
    for (var _i = 0; _i < subjects.length; ++_i) {
      results[_i] = yield sausages[_i];
    }
    return results;
  };

  forkHandler[_reciprocator.CANCEL] = function () {
    sausages.forEach(function (sausage) {
      return sausages[_reciprocator.CANCEL]();
    });
    sausages.splice(0);
  };

  return forkHandler;
}
module.exports = exports['default'];
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = normalize;

var _constants = require('../../constants');

var _dispatch = require('./dispatch');

var _dispatch2 = _interopRequireDefault(_dispatch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function normalize(subject, normalizer) {
  return function* lateTransform(state) {
    var next = function callback(promise) {
      next = promise;
    };
    yield (0, _dispatch2.default)({
      type: _constants.ACTION_RUN,
      subject: subject,
      props: state,
      next: next
    });
    var data = yield next;
    yield normalizer(data);
  };
}
module.exports = exports['default'];
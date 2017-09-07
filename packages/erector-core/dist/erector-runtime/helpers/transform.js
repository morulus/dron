'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('/Users/morulus/Work/morulus/projects/erector/node_modules/erector-core-transform-config/node_modules/babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = normalize;

var _constants = require('../../constants');

var _dispatch = require('./dispatch');

var _dispatch2 = _interopRequireDefault(_dispatch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function normalize(subject, normalizer) {
  return _regenerator2.default.mark(function lateTransform(state) {
    var next, data;
    return _regenerator2.default.wrap(function lateTransform$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            next = function callback(promise) {
              next = promise;
            };

            _context.next = 3;
            return (0, _dispatch2.default)({
              type: _constants.ACTION_RUN,
              subject: subject,
              props: state,
              next: next
            });

          case 3:
            _context.next = 5;
            return next;

          case 5:
            data = _context.sent;
            _context.next = 8;
            return normalizer(data);

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, lateTransform, this);
  });
}
module.exports = exports['default'];
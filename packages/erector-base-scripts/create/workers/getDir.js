'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = getDir;

var _selectors = require('erector/selectors');

var _searchLocalErectorDisposition = require('erector-node-utils/searchLocalErectorDisposition');

var _searchLocalErectorDisposition2 = _interopRequireDefault(_searchLocalErectorDisposition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [getDir].map(_regenerator2.default.mark);

function getDir(state) {
  var dirs;
  return _regenerator2.default.wrap(function getDir$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _searchLocalErectorDisposition2.default)((0, _selectors.cwdSelector)(state));

        case 2:
          dirs = _context.sent;

          if (!(dirs.length === 0)) {
            _context.next = 5;
            break;
          }

          throw new Error("No erector disposition found");

        case 5:
          return _context.abrupt('return', {
            dir: dirs[0]
          });

        case 6:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this);
}
module.exports = exports['default'];
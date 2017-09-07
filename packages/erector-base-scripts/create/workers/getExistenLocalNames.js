'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = getExistenLocalNames;

var _getErectorScriptNamesInDirectory = require('/Users/morulus/Work/morulus/projects/erector-node-utils/getErectorScriptNamesInDirectory');

var _getErectorScriptNamesInDirectory2 = _interopRequireDefault(_getErectorScriptNamesInDirectory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [getExistenLocalNames].map(_regenerator2.default.mark);

function getExistenLocalNames(_ref) {
  var dir = _ref.dir;
  return _regenerator2.default.wrap(function getExistenLocalNames$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt('return', {
            existenNames: (0, _getErectorScriptNamesInDirectory2.default)(dir)
          });

        case 1:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this);
}
module.exports = exports['default'];
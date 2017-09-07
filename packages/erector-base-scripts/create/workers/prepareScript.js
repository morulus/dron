'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = scriptConfigurator;

var _erector = require('erector');

var _getExistenLocalNames = require('./getExistenLocalNames');

var _getExistenLocalNames2 = _interopRequireDefault(_getExistenLocalNames);

var _getDir = require('./getDir');

var _getDir2 = _interopRequireDefault(_getDir);

var _nameDialog = require('./nameDialog');

var _nameDialog2 = _interopRequireDefault(_nameDialog);

var _formatDialog = require('./formatDialog');

var _formatDialog2 = _interopRequireDefault(_formatDialog);

var _generateScript = require('./generateScript');

var _generateScript2 = _interopRequireDefault(_generateScript);

var _nameValidator = require('../helpers/nameValidator');

var _nameValidator2 = _interopRequireDefault(_nameValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [scriptConfigurator].map(_regenerator2.default.mark);

function scriptConfigurator(_ref) {
  var name = _ref.name,
      dir = _ref.dir,
      existenNames = _ref.existenNames,
      format = _ref.format;
  return _regenerator2.default.wrap(function scriptConfigurator$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (dir) {
            _context.next = 2;
            break;
          }

          return _context.abrupt('return', _getDir2.default);

        case 2:
          if (existenNames) {
            _context.next = 4;
            break;
          }

          return _context.abrupt('return', _getExistenLocalNames2.default);

        case 4:
          if (!(!name || (0, _nameValidator2.default)(name) !== true || existenNames.includes(name))) {
            _context.next = 8;
            break;
          }

          _context.next = 7;
          return (0, _erector.echo)('**Near scripts base**: ' + dir);

        case 7:
          return _context.abrupt('return', _nameDialog2.default);

        case 8:
          if (format) {
            _context.next = 10;
            break;
          }

          return _context.abrupt('return', _formatDialog2.default);

        case 10:
          return _context.abrupt('return', _generateScript2.default);

        case 11:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this);
}
module.exports = exports['default'];
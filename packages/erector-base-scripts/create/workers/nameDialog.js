'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = nameDialog;

var _erector = require('erector');

var _nameValidator = require('../helpers/nameValidator');

var _nameValidator2 = _interopRequireDefault(_nameValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [nameDialog].map(_regenerator2.default.mark); /**
                                                             * Get script/package name via dialog
                                                             */


function nameDialog(_ref) {
  var existenNames = _ref.existenNames;
  return _regenerator2.default.wrap(function nameDialog$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt('return', (0, _erector.normalize)((0, _erector.dialog)({
            message: 'Script name',
            type: 'input',
            validate: function validate(name) {
              var syntax = (0, _nameValidator2.default)(name);
              if (syntax !== true) {
                return syntax;
              }
              return !existenNames.includes(name) || name + ' already exists';
            },
            filter: function filter(name) {
              return name.toLowerCase();
            },
            required: true
          }), function (name) {
            return {
              name: name
            };
          }));

        case 1:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this);
}
module.exports = exports['default'];
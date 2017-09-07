'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _erector = require('erector');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _typeDialog = require('./workers/typeDialog');

var _typeDialog2 = _interopRequireDefault(_typeDialog);

var _prepareScript = require('./workers/prepareScript');

var _prepareScript2 = _interopRequireDefault(_prepareScript);

var _typeValidator = require('./helpers/typeValidator');

var _typeValidator2 = _interopRequireDefault(_typeValidator);

var _nameValidator = require('./helpers/nameValidator');

var _nameValidator2 = _interopRequireDefault(_nameValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Workers
;
// Validators
exports.default = (0, _erector.cliapp)({
  description: 'Create new erector script/package',
  help: 'Usage: erect create <type> <name> [-f]\n\nwhere:\n  <type> (default: "script") can be of one:\n    script, package\n\n  <name> is the name of the script/package\n\n  [-f] format of source (only with type script):\n    file, folder\n',
  getInitialState: function getInitialState(args) {
    return {
      type: args._ && args._[1] || 'helper',
      name: args._ && args._[2],
      format: args.f || args.format || false,
      dir: args.dir
    };
  },

  worker: _regenerator2.default.mark(function worker(_ref) {
    var type = _ref.type,
        name = _ref.name,
        dir = _ref.dir,
        existenNames = _ref.existenNames,
        scriptFilename = _ref.scriptFilename,
        format = _ref.format;
    return _regenerator2.default.wrap(function worker$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log('type', type);

            if (!(!type || (0, _typeValidator2.default)(type) !== true)) {
              _context.next = 3;
              break;
            }

            return _context.abrupt('return', _typeDialog2.default);

          case 3:
            if (!(type === 'script')) {
              _context.next = 18;
              break;
            }

            if (scriptFilename) {
              _context.next = 8;
              break;
            }

            return _context.abrupt('return', _prepareScript2.default);

          case 8:
            if (!(format === 'script')) {
              _context.next = 13;
              break;
            }

            _context.next = 11;
            return (0, _erector.openFile)(scriptFilename);

          case 11:
            _context.next = 15;
            break;

          case 13:
            _context.next = 15;
            return (0, _erector.openFile)(_path2.default.dirname(scriptFilename));

          case 15:
            return _context.abrupt('return', false);

          case 16:
            _context.next = 21;
            break;

          case 18:
            _context.next = 20;
            return _erector.echo.error('Package type is not supported yet');

          case 20:
            return _context.abrupt('return', false);

          case 21:
          case 'end':
            return _context.stop();
        }
      }
    }, worker, this);
  })
});
module.exports = exports['default'];
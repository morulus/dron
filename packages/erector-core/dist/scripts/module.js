'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('/Users/morulus/Work/morulus/projects/erector/node_modules/erector-core-transform-config/node_modules/babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.build = build;
exports.default = entry;

var _erector = require('erector');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [build, help, entry].map(_regenerator2.default.mark);

var DEFAULT_SRC = './src/index.js';
var DEFAULT_OUTPUT = './index.js';

function mapArgsToState(args) {
  return {
    entry: args.entry || false,
    output: args.output || false
  };
}

function build(state) {
  var _packageJson;

  return _regenerator2.default.wrap(function build$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return (0, _erector.readJson)('./package.json');

        case 3:
          _packageJson = _context.sent;
          _context.next = 10;
          break;

        case 6:
          _context.prev = 6;
          _context.t0 = _context['catch'](0);
          _context.next = 10;
          return _erector.echo.error('No package.json found');

        case 10:
          if (state.entry) {
            _context.next = 13;
            break;
          }

          _context.next = 13;
          return (0, _erector.assignState)({
            entry: typeof packageJson.src === 'string' ? packageJson.src : DEFAULT_SRC
          });

        case 13:
          if (state.output) {
            _context.next = 16;
            break;
          }

          _context.next = 16;
          return (0, _erector.assignState)({
            output: typeof packageJson.main === 'string' ? packageJson.main : DEFAULT_OUTPUT
          });

        case 16:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this, [[0, 6]]);
}

function help() {
  return _regenerator2.default.wrap(function help$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return _erector.echo.note('Usage: erect module <command>');

        case 2:
          _context2.next = 4;
          return _erector.echo.note('Commands:');

        case 4:
          _context2.next = 6;
          return _erector.echo.note(' - build');

        case 6:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked[1], this);
}

function entry(args) {
  return _regenerator2.default.wrap(function entry$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return (0, _erector.assignState)(mapArgsToState(args));

        case 2:
          if (!(args._ && args._[1])) {
            _context3.next = 14;
            break;
          }

          _context3.t0 = args._[1];
          _context3.next = _context3.t0 === 'build' ? 6 : 9;
          break;

        case 6:
          _context3.next = 8;
          return build;

        case 8:
          return _context3.abrupt('break', 12);

        case 9:
          _context3.next = 11;
          return help;

        case 11:
          return _context3.abrupt('break', 12);

        case 12:
          _context3.next = 16;
          break;

        case 14:
          _context3.next = 16;
          return help;

        case 16:
        case 'end':
          return _context3.stop();
      }
    }
  }, _marked[2], this);
}
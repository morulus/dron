'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('/Users/morulus/Work/morulus/projects/erector/packages/erector-core-transform-config/node_modules/babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _regenerator = require('/Users/morulus/Work/morulus/projects/erector/packages/erector-core-transform-config/node_modules/babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _keys = require('/Users/morulus/Work/morulus/projects/erector/packages/erector-core-transform-config/node_modules/babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _extends = _assign2.default || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = approute;

var _erector = require('erector');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_COMMAND = 'default';

function showHelp(help, api, name) {
  if (typeof help === 'string') {
    return (0, _erector.echo)(help);
  } else if (typeof help === 'function') {
    return help;
  } else {
    return (0, _erector.echo)((name || 'app') + ' <command>\n  where <command> in ' + (0, _keys2.default)(api).join('|'));
  }
}

function extractArgsCommand() {
  var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var command = void 0,
      payload = void 0;
  var _ = args._ instanceof Array ? args._.slice() : [DEFAULT_COMMAND];
  command = _.shift();
  payload = _extends({}, args, {
    _: _
  });
  return { command: command, payload: payload };
}

function approute(_ref) {
  var getApi = _ref.getApi,
      description = _ref.description,
      help = _ref.help,
      name = _ref.name;

  (0, _erector.warning)(name || help, 'You must specify name or help property');
  if (help) {
    var helpType = typeof help;
    (0, _erector.warning)(helpType === 'function' || helpType === 'string' || helpType === 'undefined', 'Application help narration can not be of type ' + helpType);
  }
  if (name) {
    (0, _erector.warning)(typeof name === 'string', 'Appclication name must be a string');
  }
  (0, _erector.warning)(typeof getApi === 'function', 'Application must have api factory. Please specify `getApi` function');
  (0, _erector.warning)(typeof description === 'string', 'Application must have description');
  var routerapp = /*#__PURE__*/_regenerator2.default.mark(function routerapp(args) {
    var _extractArgsCommand, command, payload, state, api;

    return _regenerator2.default.wrap(function routerapp$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _extractArgsCommand = extractArgsCommand(args), command = _extractArgsCommand.command, payload = _extractArgsCommand.payload;
            _context.next = 3;
            return (0, _erector.getState)();

          case 3:
            state = _context.sent;
            api = getApi(state);

            if (!(typeof api[command] === 'function')) {
              _context.next = 9;
              break;
            }

            return _context.abrupt('return', api[command](payload));

          case 9:
            _context.next = 11;
            return showHelp(help, api, name);

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, routerapp, this);
  });
  routerapp.description = description;
  routerapp.help = help;
  return routerapp;
}
module.exports = exports['default'];
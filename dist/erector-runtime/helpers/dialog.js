'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('/Users/morulus/Work/morulus/projects/erector/node_modules/erector-core-transform-config/node_modules/babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _regenerator = require('/Users/morulus/Work/morulus/projects/erector/node_modules/erector-core-transform-config/node_modules/babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends = _assign2.default || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = dialog;

var _map = require('./map');

var _map2 = _interopRequireDefault(_map);

var _digest = require('./digest');

var _digest2 = _interopRequireDefault(_digest);

var _dispatch = require('./dispatch');

var _dispatch2 = _interopRequireDefault(_dispatch);

var _constants = require('../../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validateQuestion(q) {
  return q.hasOwnProperty("message") && q.hasOwnProperty("type");
}

/**
 * Starts CLI dialog (powered by inquirer).
 * If `questions` will be object, then an answer will be the only one (instead of array)
 *
 * See [Inquirer](https://www.npmjs.com/package/inquirer) for the ditails.
 * @example
 * const price = yield dialog({
 *  message: 'How much is the fish?',
 *  type: 'string',
 * });
 * yield echo(`The fish is ${price} coins`);
 *
 * @param  {array<object>|object|helper} questions Question(s)
 * @return {type}
 */
function dialog(questions) {
  var single = false;
  return _regenerator2.default.mark(function payloadedPrompt(defaults, store) {
    return _regenerator2.default.wrap(function payloadedPrompt$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _digest2.default)(questions);

          case 2:
            questions = _context.sent;

            if (!store.getState()[_constants.__CONFIG__].devMode) {
              _context.next = 18;
              break;
            }

            if (!(questions instanceof Array)) {
              _context.next = 10;
              break;
            }

            if (~questions.filter(function (q) {
              return !validateQuestion(q);
            }).length) {
              _context.next = 8;
              break;
            }

            _context.next = 8;
            return new Error("Invalid dialog question format");

          case 8:
            _context.next = 18;
            break;

          case 10:
            if (!("object" === typeof questions)) {
              _context.next = 16;
              break;
            }

            if (validateQuestion(questions)) {
              _context.next = 14;
              break;
            }

            _context.next = 14;
            return new Error("Invalid dialog question format");

          case 14:
            _context.next = 18;
            break;

          case 16:
            _context.next = 18;
            return new Error("Invalid dialog question type");

          case 18:
            if ("object" === typeof questions && !(questions instanceof Array)) {
              single = true;
              questions = [_extends({}, questions, {
                name: 'question'
              })];
            }

            if (!("object" === typeof defaults)) {
              _context.next = 23;
              break;
            }

            _context.next = 22;
            return (0, _map2.default)(questions, function (value) {
              if (defaults.hasOwnProperty(value.name)) {
                value.default = defaults[value.name];
              }
              return value;
            });

          case 22:
            questions = _context.sent;

          case 23:
            return _context.abrupt('return', (0, _dispatch2.default)({
              type: _constants.DIALOG,
              questions: questions,
              single: single
            }));

          case 24:
          case 'end':
            return _context.stop();
        }
      }
    }, payloadedPrompt, this);
  });
}
module.exports = exports['default'];
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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
  return function* payloadedPrompt(defaults, store) {
    /**
     * Datafy questions
     */
    questions = yield (0, _digest2.default)(questions);
    /**
     * Validate question in DEV mode
     */
    if (store.getState()[_constants.__CONFIG__].devMode) {
      if (questions instanceof Array) {
        if (!~questions.filter(function (q) {
          return !validateQuestion(q);
        }).length) {
          yield new Error("Invalid dialog question format");
        }
      } else if ("object" === typeof questions) {
        if (!validateQuestion(questions)) {
          yield new Error("Invalid dialog question format");
        }
      } else {
        yield new Error("Invalid dialog question type");
      }
    }
    if ("object" === typeof questions && !(questions instanceof Array)) {
      single = true;
      questions = [_extends({}, questions, {
        name: 'question'
      })];
    }
    if ("object" === typeof defaults) {
      questions = yield (0, _map2.default)(questions, function (value) {
        if (defaults.hasOwnProperty(value.name)) {
          value.default = defaults[value.name];
        }
        return value;
      });
    }
    return (0, _dispatch2.default)({
      type: _constants.DIALOG,
      questions: questions,
      single: single
    });
  };
}
module.exports = exports['default'];
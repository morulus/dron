'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dispatch = require('./dispatch');

var _dispatch2 = _interopRequireDefault(_dispatch);

var _digest = require('./digest');

var _digest2 = _interopRequireDefault(_digest);

var _constants = require('../../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ECHO_TYPE_DEFAULT = 0;
var ECHO_TYPE_LOG = 1;
var ECHO_TYPE_SUCCESS = 2;
var ECHO_TYPE_ERROR = 3;
var ECHO_TYPE_WARN = 4;
var ECHO_TYPE_NOTE = 5;
var ECHO_TYPE_HEADER = 6;
var ECHO_TYPE_OK = 7;

function noop() {
  return true;
}

function typeEcho(messages, type) {
  return function* () {
    for (var i = 0; i < messages.length; ++i) {
      if (typeof messages[i] !== 'string') {
        messages[i] = yield (0, _digest2.default)(messages[i]);
      }
    }

    yield (0, _dispatch2.default)({
      type: _constants.ECHO,
      message: messages,
      messageType: type
    });
    yield true;
  };
}

/**
 * Print a message to the terminal (like console.log)
 * Has static methods:
 * - echo.success Satisfactory message
 * - echo.warn Waning
 * - echo.note Notification
 * - echo.error Error
 * - echo.clear Clear terminal
 * @example
 * yield echo.clear();
 * yield echo('Welcome');
 * yield echo.note('to');
 * yield echo.warn('the');
 * yield echo.success('Erector');
 * @param  {...*} ...messages One or many messages
 */
var echo = function echo() {
  for (var _len = arguments.length, messages = Array(_len), _key = 0; _key < _len; _key++) {
    messages[_key] = arguments[_key];
  }

  return typeEcho(messages, ECHO_TYPE_DEFAULT);
};

/**
* Echo log message
*/
echo.log = function echo() {
  for (var _len2 = arguments.length, messages = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    messages[_key2] = arguments[_key2];
  }

  return typeEcho(messages, ECHO_TYPE_LOG);
};

/**
* Success log message
*/
echo.success = function echoSuccess() {
  for (var _len3 = arguments.length, messages = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    messages[_key3] = arguments[_key3];
  }

  return typeEcho(messages, ECHO_TYPE_SUCCESS);
};

/**
* Success point
*/
echo.ok = function echoOk() {
  for (var _len4 = arguments.length, messages = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    messages[_key4] = arguments[_key4];
  }

  return typeEcho(['✓'].concat(messages), ECHO_TYPE_OK);
};

/**
* Echo error message
*/
echo.error = function echoError() {
  for (var _len5 = arguments.length, messages = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
    messages[_key5] = arguments[_key5];
  }

  return typeEcho(messages, ECHO_TYPE_ERROR);
};

/**
* Echo warning
*/
echo.warn = function echoWarn() {
  for (var _len6 = arguments.length, messages = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
    messages[_key6] = arguments[_key6];
  }

  return typeEcho(messages, ECHO_TYPE_WARN);
};

/**
* Echo debug message (only for development mode)
*/
echo.debug = function echoDebug() {
  for (var _len7 = arguments.length, messages = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
    messages[_key7] = arguments[_key7];
  }

  return process.env.NODE_ENV === 'development' ? typeEcho(messages, ECHO_TYPE_WARN) : noop;
};

echo.note = function echoHappy() {
  for (var _len8 = arguments.length, messages = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
    messages[_key8] = arguments[_key8];
  }

  return typeEcho(messages, ECHO_TYPE_NOTE);
};

echo.header = function echoHappy() {
  for (var _len9 = arguments.length, messages = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
    messages[_key9] = arguments[_key9];
  }

  return typeEcho(messages, ECHO_TYPE_HEADER);
};

echo.clear = function () {
  process.stdout.write('\x1B[2J\x1B[0f');
};

exports.default = echo;
module.exports = exports['default'];
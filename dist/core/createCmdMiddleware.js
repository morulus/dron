'use strict';

var _mapMessageTypeToStyl;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var singular = require('reciprocator').singular;
var clc = require('cli-color');
var constants = require('../constants.js');
var __STORE__ = constants.__STORE__,
    __CONFIG__ = constants.__CONFIG__,
    __MIDDLEWARES__ = constants.__MIDDLEWARES__,
    LAST_REDUCER = constants.LAST_REDUCER,
    ACTION_RUN = constants.ACTION_RUN,
    ACTION_ERROR = constants.ACTION_ERROR,
    NEXT = constants.NEXT,
    ECHO = constants.ECHO,
    ACTION_ASSIGN_REDUCER = constants.ACTION_ASSIGN_REDUCER;


var ECHO_TYPE_DEFAULT = 0;
var ECHO_TYPE_LOG = 1;
var ECHO_TYPE_SUCCESS = 2;
var ECHO_TYPE_ERROR = 3;
var ECHO_TYPE_WARN = 4;
var ECHO_TYPE_NOTE = 5;
var ECHO_TYPE_HEADER = 6;
var ECHO_TYPE_OK = 7;

var mapMessageTypeToStyle = (_mapMessageTypeToStyl = {}, _defineProperty(_mapMessageTypeToStyl, ECHO_TYPE_DEFAULT, function (s) {
  return s;
}), _defineProperty(_mapMessageTypeToStyl, ECHO_TYPE_LOG, clc.xterm(172)), _defineProperty(_mapMessageTypeToStyl, ECHO_TYPE_SUCCESS, clc.xterm(197).bold), _defineProperty(_mapMessageTypeToStyl, ECHO_TYPE_OK, clc.xterm(197).bold), _defineProperty(_mapMessageTypeToStyl, ECHO_TYPE_ERROR, clc.xterm(167)), _defineProperty(_mapMessageTypeToStyl, ECHO_TYPE_WARN, clc.xterm(199)), _defineProperty(_mapMessageTypeToStyl, ECHO_TYPE_NOTE, clc.xterm(209)), _defineProperty(_mapMessageTypeToStyl, ECHO_TYPE_HEADER, clc.xterm(167).bold), _mapMessageTypeToStyl);

function runSequence(dispatch, middlewares, action) {
  var iterable = middlewares[Symbol.iterator]();
  var result = new Promise(function (resolve, reject) {
    var next = function next() {
      var nextMiddleware = iterable.next();
      if (!nextMiddleware.done) {
        dispatch({
          type: ACTION_RUN,
          subject: nextMiddleware.value(next),
          props: action,
          next: function next(result) {
            result.catch(function (e) {
              if (typeof action[NEXT] === 'function') {
                reject(e);
              } else {
                dispatch({
                  type: ACTION_ERROR,
                  payload: e
                });
              }
            });
          }
        });
      } else {
        resolve();
      }
    };
    next();
  });
  if (typeof action[NEXT] === 'function') {
    action[NEXT](result);
  }
}

function parseInlineStyles(str) {
  str = str.toString();
  var rendered = [];
  var shift = 0;
  var opened = false;
  while (true) {
    var i = str.indexOf('**', shift);
    if (i < 0) {
      break;
    }
    if (str.charAt(i - 1) !== "\\") {
      if (!opened) {
        rendered.push(str.substring(shift, i));
        opened = true;
      } else {
        rendered.push(clc.bold(str.substring(shift, i)));
        opened = false;
      }
    } else {
      rendered.push(str.substring(shift, i - 1) + '**');
    }
    shift = i + 2;
  }
  if (shift < str.length) {
    rendered.push(str.substring(shift, str.length));
  }
  return rendered.join('');
}

module.exports = function createCmdMiddleware(erector) {
  return function (store) {
    return function (next) {
      return function (action) {
        switch (action.type) {
          case ACTION_RUN:
            action.next(singular(action.subject, action.props, erector[__STORE__]));
            break;
          case ACTION_ERROR:
            erector.fatalError(action.payload);
            break;
          case ECHO:
            var messages = action.message instanceof Array ? action.message : [action.message];
            var msg = mapMessageTypeToStyle[action.messageType] || function (v) {
              return v;
            };
            console.log.apply(console, messages.map(function (message) {
              return msg(parseInlineStyles(message));
            }));
            break;
          case ACTION_ASSIGN_REDUCER:
            erector[__STORE__][LAST_REDUCER] = createReducer([erector[__STORE__][LAST_REDUCER]].concat(action.reducer));
            erector[__STORE__].replaceReducer(erector[__STORE__][LAST_REDUCER]);
            break;
          default:
            runSequence(store.dispatch, erector[__STORE__][__MIDDLEWARES__], action);
            break;
        }
        next(action);
      };
    };
  };
};
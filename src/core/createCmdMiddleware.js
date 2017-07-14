const singular = require('reciprocator').singular;
const clc = require('cli-color');
const constants = require('../constants.js');
const {
  __STORE__,
  __CONFIG__,
  __MIDDLEWARES__,
  LAST_REDUCER,
  ACTION_RUN,
  ACTION_ERROR,
  NEXT,
  ECHO,
  ACTION_ASSIGN_REDUCER,
} = constants;

const ECHO_TYPE_DEFAULT = 0;
const ECHO_TYPE_LOG = 1;
const ECHO_TYPE_SUCCESS = 2;
const ECHO_TYPE_ERROR = 3;
const ECHO_TYPE_WARN = 4;
const ECHO_TYPE_NOTE = 5;
const ECHO_TYPE_HEADER = 6;
const ECHO_TYPE_OK = 7;

const mapMessageTypeToStyle = {
  [ECHO_TYPE_DEFAULT]: function(s) { return s},
  [ECHO_TYPE_LOG]: clc.xterm(172),
  [ECHO_TYPE_SUCCESS]: clc.xterm(197).bold,
  [ECHO_TYPE_OK]: clc.xterm(197).bold,
  [ECHO_TYPE_ERROR]: clc.xterm(167),
  [ECHO_TYPE_WARN]: clc.xterm(199),
  [ECHO_TYPE_NOTE]: clc.xterm(209),
  [ECHO_TYPE_HEADER]: clc.xterm(167).bold
};


function runSequence(dispatch, middlewares, action) {
  const iterable = middlewares[Symbol.iterator]();
  const result = new Promise(function(resolve, reject) {
    const next = function() {
      const nextMiddleware = iterable.next();
      if (!nextMiddleware.done) {
        dispatch({
          type: ACTION_RUN,
          subject: nextMiddleware.value(next),
          props: action,
          next: function(result) {
            result.catch(function(e) {
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
    }
    next();
  });
  if (typeof action[NEXT] === 'function') {
    action[NEXT](result);
  }
}

function parseInlineStyles(str) {
  str = str.toString();
  const rendered = [];
  let shift = 0;
  let opened = false;
  while (true) {
    const i = str.indexOf('**', shift);
    if (i < 0) {
      break;
    }
    if ( str.charAt(i - 1) !== "\\" ) {
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
  return function(store) {
    return function(next) {
      return function(action) {
        switch(action.type) {
          case ACTION_RUN:
            action.next(singular(action.subject, action.props, erector[__STORE__]));
          break;
          case ACTION_ERROR:
            erector.fatalError(action.payload);
          break;
          case ECHO:
            const messages = (action.message instanceof Array ? action.message : [action.message]);
            const msg = mapMessageTypeToStyle[action.messageType] || function(v) {
              return v;
            };
            console.log.apply(console, messages.map(function(message) {
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
      }
    }
  }
}

const singular = require('reciprocator').singular;
const clc = require('cli-color');
const __STORE__ = require('./constants.js').__STORE__;
const LAST_REDUCER = require('./constants.js').LAST_REDUCER;
const ACTION_RUN = require('./constants.js').ACTION_RUN;
const ECHO = require('./constants.js').ECHO;
const ACTION_ASSIGN_REDUCER = require('./constants.js').ACTION_ASSIGN_REDUCER;

const ECHO_TYPE_DEFAULT = 0;
const ECHO_TYPE_LOG = 1;
const ECHO_TYPE_SUCCESS = 2;
const ECHO_TYPE_ERROR = 3;
const ECHO_TYPE_WARN = 4;
const ECHO_TYPE_NOTE = 5;
const ECHO_TYPE_HEADER = 6;

const mapMessageTypeToStyle = {
  [ECHO_TYPE_DEFAULT]: function(s) { return s},
  [ECHO_TYPE_LOG]: clc.xterm(223),
  [ECHO_TYPE_SUCCESS]: clc.xterm(197).bold,
  [ECHO_TYPE_ERROR]: clc.xterm(167),
  [ECHO_TYPE_WARN]: clc.xterm(174),
  [ECHO_TYPE_NOTE]: clc.xterm(167),
  [ECHO_TYPE_HEADER]: clc.xterm(167).bold
};

module.exports = function createCmdMiddleware(erector) {
  return function(getState) {
    return function(next) {
      return function(action) {
        switch(action.type) {
          case ACTION_RUN:
            action.next(singular(action.subject, action.props, erector[__STORE__]));
          break;
          case ECHO:
            const messages = (action.message instanceof Array ? action.message : [action.message]);
            const msg = mapMessageTypeToStyle[action.messageType];
            console.log.apply(console, messages.map(function(message) {
              return msg(message);
            }));
          break;
          case ACTION_ASSIGN_REDUCER:
            erector[__STORE__][LAST_REDUCER] = createReducer([erector[__STORE__][LAST_REDUCER]].concat(action.reducer));
            erector[__STORE__].replaceReducer(erector[__STORE__][LAST_REDUCER]);
          break;
        }
        next(action);
      }
    }
  }
}

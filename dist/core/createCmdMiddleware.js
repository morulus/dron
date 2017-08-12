'use strict';

var singular = require('reciprocator').singular;
var constants = require('../constants.js');
var __STORE__ = constants.__STORE__,
    __CONFIG__ = constants.__CONFIG__,
    __MIDDLEWARES__ = constants.__MIDDLEWARES__,
    LAST_REDUCER = constants.LAST_REDUCER,
    ACTION_RUN = constants.ACTION_RUN,
    ACTION_ERROR = constants.ACTION_ERROR,
    NEXT = constants.NEXT,
    ACTION_ASSIGN_REDUCER = constants.ACTION_ASSIGN_REDUCER;


function runSequence(store, middlewares, action) {
  var dispatch = store.dispatch;
  var iterable = middlewares[Symbol.iterator]();
  var result = new Promise(function (resolve, reject) {
    var next = function next() {
      var nextMiddleware = iterable.next();
      if (!nextMiddleware.done) {
        dispatch({
          type: ACTION_RUN,
          subject: nextMiddleware.value(store)(next),
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
          case ACTION_ASSIGN_REDUCER:
            erector[__STORE__][LAST_REDUCER] = createReducer([erector[__STORE__][LAST_REDUCER]].concat(action.reducer));
            erector[__STORE__].replaceReducer(erector[__STORE__][LAST_REDUCER]);
            break;
          default:
            runSequence(store, erector[__STORE__][__MIDDLEWARES__], action);
            break;
        }
        next(action);
      };
    };
  };
};
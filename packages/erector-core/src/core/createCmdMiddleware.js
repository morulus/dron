const singular = require('reciprocator').singular;
const constants = require('../constants.js');
const {
  __STORE__,
  __CONFIG__,
  __MIDDLEWARES__,
  LAST_REDUCER,
  ACTION_RUN,
  ACTION_ERROR,
  NEXT,
  ACTION_ASSIGN_REDUCER,
} = constants;


function runSequence(store, middlewares, action) {
  const dispatch = store.dispatch;
  const iterable = middlewares[Symbol.iterator]();
  const result = new Promise(function(resolve, reject) {
    let lastResult;
    const next = function(localAction) {
      const nextMiddleware = iterable.next();
      let nextCalled = false;
      const localNext = function(action) {
        nextCalled = true;
        next(action);
      }
      if (!nextMiddleware.done) {
        dispatch({
          type: ACTION_RUN,
          subject: nextMiddleware.value(store)(localNext),
          props: localAction,
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
            })
            .then(function(finalResult) {
              if (!nextCalled) {
                resolve(finalResult);
              } else {
                lastResult = finalResult;
              }
            });
          }
        });
      } else {
        resolve(lastResult);
      }
    }
    next(action);
  });
  if (typeof action[NEXT] === 'function') {
    action[NEXT](result);
  }
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
          case ACTION_ASSIGN_REDUCER:
            erector[__STORE__][LAST_REDUCER] = createReducer([erector[__STORE__][LAST_REDUCER]].concat(action.reducer));
            erector[__STORE__].replaceReducer(erector[__STORE__][LAST_REDUCER]);
          break;
          default:
            runSequence(store, erector[__STORE__][__MIDDLEWARES__], action);
          break;
        }
        next(action);
      }
    }
  }
}

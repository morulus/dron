"use strict";
const ACTION_SET_STATE = require('../constants.js').ACTION_SET_STATE;
const ACTION_ASSIGN_REDUCER = require('../constants.js').ACTION_ASSIGN_REDUCER;
const ACTION_RUN = require('../constants.js').ACTION_RUN;
const LAST_REDUCER = require('../constants.js').LAST_REDUCER;
const ENV = require('../constants.js').ENV;
const singular = require('reciprocator').singular;
const MESSAGE = require('reciprocator').MESSAGE;
const isPlainObject = require('lodash.isplainobject');
const createStore = require('redux').createStore;
const applyMiddleware = require('redux').applyMiddleware;

function defaultReducer(state, action) {
  switch(action.type) {
    case ACTION_SET_STATE:
      return Object.assign({}, state, action.state);
    break;
    default:
      return state;
    break;
  }
}

function createReducer(reducers) {

  return function reducer(state, action) {
    const isDevMode = state[ENV]&&state[ENV].DEV;
    for (let reducer of reducers) {
      state = reducer(state, action);
    }
    if (isDevMode&&"undefined"===typeof state) {
      /**
       * Test for corrupted reducer
       */
       for (var reducer of reducers) {
         if ("undefined"===typeof reducer({a:1}, {type:Symbol('@@')})) {
           break;
         }
       }
      throw new Error("Corrupted reducer `"+(reducer.name||'anonymus')+"` provides undefined state. Code: "+(reducer.toString().substr(0, 200)+"..."));
    }
    return state;
  }
}

function createRuntimeReducer(store) {
  return function runtimeReducer(state, action) {
    switch(action.type) {
      default:
        return state;
      break;
    }
  }
}

module.exports = function erectorRun(fn, props, preloadedState, reducers) {
  let store;
  /**
   * Create default middleware
   */
  let middleware = function(getState) {

    return function(next) {

      return function(action) {

        switch(action.type) {
          case ACTION_RUN:
            action.next(singular(action.subject, action.state, store));
          break;
          case MESSAGE:
            if (action.message instanceof Array) {
              console.log.apply(console, action.message);
            } else {
              console.log(action.message);
            }
          break;
          case ACTION_ASSIGN_REDUCER:
            store[LAST_REDUCER] = createReducer([store[LAST_REDUCER]].concat(action.reducer));
            store.replaceReducer(store[LAST_REDUCER]);
          break;
        }
        next(action);
      }
    }
  }
  let reducer = "undefined"===typeof reducers ? [] : (reducers instanceof Array ? reducers : [reducers]);
  if (isPlainObject(preloadedState)) {

    store = createStore(defaultReducer, preloadedState||{}, applyMiddleware(middleware));
  } else {
    if (isStore(preloadedState)) {
      return Promise.reject(new Error('Preloaded state must be a plain object or immutable, but not store.'));
    } else {
      store = createStore(defaultReducer, {}, applyMiddleware(middleware));
    }
  }
  store[LAST_REDUCER] = createReducer(reducer.concat([defaultReducer]).concat([createRuntimeReducer(store)]));

  store.replaceReducer(store[LAST_REDUCER]);


  return singular(fn, props, store);
}

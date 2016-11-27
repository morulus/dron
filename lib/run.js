"use strict";
const ACTION_SET_STATE = require('dron-constants').ACTION_SET_STATE;
const run = require('./loopback-run.js');

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
    for (let reducer of reducers) {
      state = reducer(state, action);
    }
    return state;
  }
}

module.exports = function dronRun(fn, props, preloadedState, reducer) {
  reducers = "undefined"===typeof reducers ? [] : (reducers instanceof Array ? reducers : [reducers]);
  return run(fn, props, createStore(createReducer(reducer.concat(defaultReducer)), preloadedState||{}));
}

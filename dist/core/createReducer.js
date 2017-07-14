"use strict";

module.exports = function createReducer(reducers) {
  return function reducer(state, action) {
    for (var _reducer of reducers) {
      state = _reducer(state, action);
    }
    return state;
  };
};
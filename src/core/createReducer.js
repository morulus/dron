module.exports = function createReducer(reducers) {
  return function reducer(state, action) {
    for (let reducer of reducers) {
      state = reducer(state, action);
    }
    return state;
  }
}

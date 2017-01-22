const ACTION_SET_STATE = require('./constants.js').ACTION_SET_STATE;
const ACTION_ASSIGN_STATE = require('./constants.js').ACTION_ASSIGN_STATE;

module.exports = function defaultReducer(state, action) {
  switch(action.type) {
    case ACTION_SET_STATE:
      return action.state;
    case ACTION_ASSIGN_STATE:
      return Object.assign({}, state, action.state);
    default:
      return state;
    break;
  }
};

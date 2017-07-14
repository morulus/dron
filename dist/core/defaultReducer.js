'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var ACTION_SET_STATE = require('../constants.js').ACTION_SET_STATE;
var ACTION_ASSIGN_STATE = require('../constants.js').ACTION_ASSIGN_STATE;

module.exports = function defaultReducer(state, action) {
  switch (action.type) {
    case ACTION_SET_STATE:
      return action.state;
    case ACTION_ASSIGN_STATE:
      return _extends({}, state, action.state);
    default:
      return state;
      break;
  }
};
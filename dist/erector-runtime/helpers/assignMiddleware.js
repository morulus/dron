'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = assignMiddleware;

var _dispatch = require('./dispatch');

var _dispatch2 = _interopRequireDefault(_dispatch);

var _exit = require('./exit');

var _exit2 = _interopRequireDefault(_exit);

var _constants = require('../../constants');

var _reciprocator = require('reciprocator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Assign middleware to the store
 * @private
 */
function assignMiddleware(middleware) {
  return function (state, store) {
    var middlewareAPI = {
      getState: store.getState,
      dispatch: function dispatch(action) {
        return store.dispatch(action);
      }
    };
    var middlewareDispatch = middleware(store);
    store[_constants.__MIDDLEWARES__].push(middlewareDispatch);
    var unassign = function unassign() {
      store[_constants.__MIDDLEWARES__] = store[_constants.__MIDDLEWARES__].filter(function (mw) {
        return middlewareDispatch === mw;
      });
    };
    unassign[_reciprocator.RESTANTE] = true;
    return unassign;
  };
}
module.exports = exports['default'];
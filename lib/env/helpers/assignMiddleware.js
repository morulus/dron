/**
 * Assign middleware to the store
 * @private
 */
import dispatch from './dispatch';
import exit from './exit';
import { ACTION_ASSIGN_REDUCER, __MIDDLEWARES__ } from 'erector/constants';
import { RESTANTE } from 'reciprocator';

export default function assignMiddleware(middleware) {
  return function (state, store) {
    const middlewareAPI = {
      getState: store.getState,
      dispatch: function dispatch(action) {
        return store.dispatch(action);
      }
    };
    const middlewareDispatch = middleware(store);
    store[__MIDDLEWARES__].push(middlewareDispatch);
    const unassign = function() {
      store[__MIDDLEWARES__] = store[__MIDDLEWARES__].filter((mw) => middlewareDispatch === mw);
    };
    unassign[RESTANTE] = true;
    return unassign;
  }
}

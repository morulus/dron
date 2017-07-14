import { NEXT } from 'erector/constants';
/**
 * Dispatch an action.
 *
 * @private
 * @param  {object} action
 */
export default function dispatch(action) {
  return function lateDispatch(props, store) {
    let next = function callback(promise) {
      next = promise;
    };
    store.dispatch({
      ...action,
      [NEXT]: typeof action[NEXT] === 'function' ||  next,
    });
    return next;
  }
}

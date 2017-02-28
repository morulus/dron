/**
 * Assign reducer to store
 * @private
 */
import dispatch from './dispatch';
import exit from './exit';
import { ACTION_ASSIGN_REDUCER } from 'erector/constants';

export default function assignReducer(reducer) {
  return function () {
    return dispatch({
      type: ACTION_ASSIGN_REDUCER,
      reducer: reducer
    });
  }
}

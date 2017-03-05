import dispatch from './dispatch';
import exit from './exit';
import { ACTION_ASSIGN_STATE, ACTION_RUN } from 'erector/constants';

/**
 * Assign state to the store. Equals to
 * setState with `Object.assign(state, {...})`
 * ```js
 * yield assignState({
 *   name,
 * });
 * ```
 * It can accept another helper as the first argument
 * ```js
 * yield assignState(dialog([{
 *  name: {...}
 * }]));
 * ```
 * @param {object|helper} subject Data or helper
 * @returns {object}
 */
export default function assignToState(subject, transform) {
  return function* (state, store) {
    let next = function callback(promise) {
      next = promise;
    }
    yield dispatch({
      type: ACTION_RUN,
      subject: subject,
      props: state,
      next: next
    });

    yield next
    .then((props) => {
      const nextProps = transform ? transform(props) : props;
      if ("object"!==typeof nextProps) {
        return exit('State to assign must be a plain object');
      } else {
        return dispatch({
          type: ACTION_ASSIGN_STATE,
          state: Object.assign({}, store.getState(), nextProps)
        });
      }
    });

    yield store.getState();
  }
}

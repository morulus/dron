import dispatch from './dispatch';
import exit from './exit';
import { ACTION_ASSIGN_STATE, ACTION_RUN } from 'erector/constants';

export default function assignToState(subject) {
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
      if ("object"!==typeof props) {
        return exit('State to assign must be a plain object');
      } else {

        return dispatch({
          type: ACTION_ASSIGN_STATE,
          state: Object.assign({}, store.getState(), props)
        });
      }
    });

    yield store.getState();
  }
}

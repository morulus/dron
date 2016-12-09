import dispatch from './dispatch';
import { ACTION_RUN } from 'erector/constants';

export default function digest(subject) {
  return function* lateDigest(state) {
    let next = function callback(promise) {
      next = promise;
    };
    yield dispatch({
      type: ACTION_RUN,
      subject: subject,
      props: state,
      next: next
    });
    yield next;
  }
}

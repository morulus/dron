import { ACTION_RUN } from '../../constants';
import dispatch from './dispatch';

export default function normalize(subject, normalizer) {
  return function* lateTransform(state) {
    let next = function callback(promise) {
      next = promise;
    }
    yield dispatch({
      type: ACTION_RUN,
      subject: subject,
      props: state,
      next: next
    });
    let data = yield next;
    yield normalizer(data);
  }
}

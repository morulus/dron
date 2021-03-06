import { ACTION_RUN } from 'erector/constants';
import { dispatch } from 'erector';

export default function transform(subject, transformer) {
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
    yield transformer(data);
  }
}

import { ACTION_RUN } from 'dron-constants';
import { dispatch } from "dron";

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

import dispatch from './dispatch';
import { ACTION_RUN } from 'erector/constants';

export default function calm(subject, onError = false) {
  return function* $calm(state) {
    let next = function callback(promise) {
      next = promise;
    };
    yield dispatch({
      type: ACTION_RUN,
      subject: subject,
      props: state,
      next: next
    });
    yield next.then((result) => result).catch(() => onError);
  }
}

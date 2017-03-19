import dispatch from './dispatch';
import { ACTION_RUN } from 'erector/constants';

/**
 * Execute some function or a generator by reciprocator.
 *
 * @private
 * @param  {any} subject
 * @return {any}
 */
export default function digest(subject) {
  return function* lateDigest(state) {
    let next = function callback(promise) {
      next = promise;
    };
    yield dispatch({
      type: ACTION_RUN,
      subject: subject,
      props: undefined,
      next: next
    });
    yield next;
  }
}

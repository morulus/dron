import dispatch from './dispatch';
import { ACTION_RUN } from '../../constants';
/**
 * Intercepts errors inside `subject` and returns value of
 * onError as the normal result. If onError is a function
 * then it will handler of catch
 * @example
 * const result = yield calm(
 *  writeFile('./someBlockedFile', ''),
 *  null
 * );
 * // result === null
 *
 * @param  {function|generator} subject
 * @param  {any} [onError = false]
 */
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
    yield next
    .then((result) => result)
    .catch("function" === typeof onError ? onError : () => onError);
  }
}

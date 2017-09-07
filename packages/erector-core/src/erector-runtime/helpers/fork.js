import dispatch from './dispatch';
import { ACTION_RUN, RESTANTE } from '../../constants';


/**
 * Fork a task. It will be executed in parallel without blocking the current sequence.
 * @example
 * const copying = yield fork(copy('./src', './dist'));
 * yield echo('Copying started');
 * @param  {any} sausage
 * @return {Promise}
 */
export default function* fork(sausage) {
  let result;
  yield dispatch({
    type: ACTION_RUN,
    subject: sausage,
    props: undefined,
    next: function callback(promise) {
      result = promise;
    },
  });
  result[RESTANTE] = true;
  return result;
}

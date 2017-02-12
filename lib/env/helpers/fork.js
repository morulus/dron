import dispatch from './dispatch';
import { ACTION_RUN, RESTANTE } from 'erector/constants';

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

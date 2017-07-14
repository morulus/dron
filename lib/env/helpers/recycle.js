import { echo, assignState } from 'erector';
import isPlainObject from 'lodash.isPlainObject';

export default function* recycle(worker) {
  while (true) {
    const payload = yield worker;
    try {
      if (!isPlainObject(payload)) {
        break;
      } else {
        const nextState = yield assignState(payload);
      }
    } catch(e) {
      yield echo(e.stack);
      yield echo.error('Recycle aborted');
      break;
    }
  }
}

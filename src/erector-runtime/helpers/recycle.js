import echo from './echo';
import assignState from './assignState';
import isPlainObject from 'lodash.isPlainObject';

export default function* recycle(worker) {
  while (true) {
    const payload = yield worker;
    if (!isPlainObject(payload)) {
      if (!payload) {
        break;
      } else {
        throw new Error('recycle payload must be a plain object or falsy')
      }
    } else {
      const nextState = yield assignState(payload);
    }
  }
}

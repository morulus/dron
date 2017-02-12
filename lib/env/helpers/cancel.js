import { CANCEL } from 'erector/constants';
export default function(promise) {
  return function() {
    if (typeof promise[CANCEL] === 'function') {
      promise[CANCEL]();
    } else {
      throw new Error(`This process (${typeof promise})cannot be cancelled`);
    }
  }
}

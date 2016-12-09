import runModule from './../../runModule';
import resolvePackage from './../../resolvePackage';
import { ENV } from 'erector/constants';

export default function run(module, args = {}) {
  return function* runner(state, store) {
    if ("string"===typeof module) {
      module = yield resolvePackage(module);
    }
    if (!module) {
      yield exit('Package has errors');
    } else {
      yield runModule(module, args, store.getState()[ENV]);
    }
  }
}

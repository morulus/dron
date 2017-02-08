import erector from './../../../erector';
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
      const app = erector();
      app.use(erector.configure(state[__CONFIG__]));
      yield app.run(module, args);
    }
  }
}

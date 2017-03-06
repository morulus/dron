import createErector, { configure } from './../../../erector';
import resolvePackage from './../../resolvePackage';
import { __CONFIG__ } from 'erector/constants';

export default function run(file, args = {}, defaultState) {
  return function* runner(state, store) {
    if (!module) {
      yield exit('Package has errors');
    } else {
      const app = createErector(defaultState || {});
      app.use(configure(state[__CONFIG__]));
      yield app.run(file, args);
    }
  }
}

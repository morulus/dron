import { __CONFIG__ } from '../../constants';
import createErector, { configure } from './../../core/env/node/erector';
import resolvePackage from 'erector-node-utils/resolvePackage';

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

import { __CONFIG__ } from '../../constants';
import createErector, { configure } from './../../core/env/node/erector';

export default function run(file, args = {}, defaultState) {
  return function* runner(state, store) {
    throw new Error('Helper run is temporary deprecated');
    // if (!module) {
    //   yield exit('Package has errors');
    // } else {
    //   const app = createErector(defaultState || {});
    //   app.use(configure(state[__CONFIG__]));
    //   yield app.run(file, args);
    // }
  }
}

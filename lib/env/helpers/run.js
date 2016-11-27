import runFile from './../../runFile';
import resolvePackage from './../../resolvePackage';

export default function run(module, args = {}) {
  return function* runner(state, store) {
    if ("string"===typeof module) {
      module = resolvePackage(module);
    }
    if (!module) {
      yield exit('Package has errors');
    } else {
      yield runFile(module, args);
    }
  }
}

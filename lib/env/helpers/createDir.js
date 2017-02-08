import digest from './digest';
import path from 'path';
import { __CONFIG__ } from 'erector/constants';
import mkdirp from 'mkdirp';

export default function createDir(dirname) {
  return function* $createDir(state) {
    dirname = yield digest(dirname);
    yield new Promise(function(resolve, reject) {
      const filepath = path.resolve(state[__CONFIG__].pwd, dirname);
      mkdirp(filepath, function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  }
}

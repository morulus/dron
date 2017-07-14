import digest from './digest';
import path from 'path';
import { __CONFIG__ } from '../../constants';
import mkdirp from 'mkdirp';

/**
 * Create a directory. It will throw an error on fail.
 *
 * @example
 * try {
 *  yield createDir('create/some/folder');
 * } catch(e) {
 *  yield exit(e.message);
 * }
 * @param  {string} dirname
 */
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

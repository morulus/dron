import fs from 'fs';
import path from 'path';
import { __CONFIG__ } from 'erector/constants';
import digest from './digest';

/**
 * Checking the existence of a directory. If target is the file result will be false.
 * @example
 * let appExists = yield isDirectory('./app');
 *
 * @param  {string} filename Relative path to the file
 * @return {boolean}
 */
export default function isDirectory(dirname) {

  /**
   * @return {boolean}
   */
  return function* _isDirectory(state) {
    dirname = yield digest(dirname);
    const filepath = path.resolve(state[__CONFIG__].pwd, dirname);
    try {
      let stats = fs.lstatSync(filepath);
      yield stats.isDirectory();
    }
    catch (e) {
      yield false;
    }
  }
}

import fs from 'fs';
import path from 'path';
import { __CONFIG__ } from '../../constants';
import digest from './digest';

/**
 * Check for path existing. Returns true or false.
 *
 * @description If target resource is directory then result will false too.
 *
 * @example
 * let indexExists = yield pathExists('./');
 *
 * @param  {string} pathname Relative path to the file or dir
 * @return {function}
 */
export default function pathExists(pathname) {
  /**
   * @return {boolean}
   */
  return function* pathExistsChecker(state) {
    pathname = yield digest(pathname);
    const filepath = path.resolve(state[__CONFIG__].pwd, pathname);
    try {
      let stats = fs.lstatSync(pathname);
      yield true;
    }
    catch (e) {
      yield false;
    }
  }
}

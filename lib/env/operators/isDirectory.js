import fs from 'fs';
import path from 'path';
import { ENV } from 'erector/constants';
import digest from './digest';

/**
 * Check for DIRECTORY existing. Returns true or false.
 *
 * @description If target resource is file then result will false too.
 *
 * @example
 * let appExists = yield isDirectory('./app');
 *
 * @param  {string} filename Relative path to the file
 * @return {function}
 */
export default function isDirectory(dirname) {

  /**
   * @return {boolean}
   */
  return function* _isDirectory(state) {
    dirname = yield digest(dirname);
    const filepath = path.resolve(state[ENV].PWD, dirname);
    try {
      let stats = fs.lstatSync(filepath);
      yield stats.isDirectory();
    }
    catch (e) {
      yield false;
    }
  }
}

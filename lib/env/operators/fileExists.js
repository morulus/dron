import fs from 'fs';
import path from 'path';
import { __CONFIG__ } from 'erector/constants';
import digest from './digest';

/**
 * Check for FILE existing. Returns true or false.
 *
 * @description If target resource is directory then result will false too.
 *
 * @example
 * let indexExists = yield fileExists('./index.html');
 *
 * @param  {string} filename Relative path to the file
 * @return {function}
 */
export default function fileExists(filename) {

  /**
   * @return {boolean}
   */
  return function* $fileExists(state) {
    filename = yield digest(filename);
    const filepath = path.resolve(state[__CONFIG__].pwd, filename);
    try {
      let stats = fs.lstatSync(filepath);
      yield !stats.isDirectory();
    }
    catch (e) {
      yield false;
    }
  }
}

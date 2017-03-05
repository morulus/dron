import fs from 'fs';
import path from 'path';
import { __CONFIG__ } from 'erector/constants';
import digest from './digest';

/**
 * Checking the existence of a file.
 * If target resource is a directory the result will be false.
 *
 * @example
 * let indexExists = yield fileExists('./index.html');
 *
 * @param  {string} filename
 * @return {boolean}
 */
export default function fileExists(filename) {
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

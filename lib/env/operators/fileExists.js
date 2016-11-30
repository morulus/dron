import fs from 'fs';
import path from 'path';
import { ENV } from 'dron-constants';

export default function fileExists(filename) {
  return function(state) {
    let filepath = path.resolve(state[ENV].PWD, filename);
    try {
      let stats = fs.lstatSync(filepath);
      return !stats.isDirectory();
    }
    catch (e) {
      console.log('errror', e);
        return false;
    }
  }
}

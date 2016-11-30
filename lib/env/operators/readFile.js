import fs from 'fs';
import path from 'path';
import { ENV } from 'dron-constants';
import digest from './digest';
/**
 * readFile - Return loopback function which read file
 *
 * @param  {string} filename
 * @param  {string|object} options = 'utf-8'
 * @return {Promise}
 */
export default function readFile(filename, options = 'utf-8') {
  return function* payloadedReadFile(state) {
    filename = yield digest(filename);
    yield new Promise(function(resolve, reject) {
      fs.readFile(path.resolve(state[ENV].PWD, filename), options, function(err, content) {
        if (err) {
          reject(err);
        } else {
          resolve(content);
        }
      });
    });
  }
}

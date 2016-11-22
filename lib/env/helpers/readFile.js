import fs from 'fs';
import path from 'path';
import { ENV } from 'dron-constants';
/**
 * readFile - Return loopback function which read file
 *
 * @param  {string} filename
 * @param  {string|object} options = 'utf-8'
 * @return {Promise}
 */
export default function readFile(filename, options = 'utf-8') {
  return function payloadedReadFile(props) {
    return new Promise(function(resolve, reject) {
      fs.readFile(path.resolve(props[ENV].CWD, filename), options, function(err, content) {
        if (err) {
          reject(err);
        } else {
          resolve(content);
        }
      });
    });
  }
}

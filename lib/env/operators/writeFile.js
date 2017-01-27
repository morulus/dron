import fs from 'fs';
import path from 'path';
import { __CONFIG__ } from 'erector/constants';
import digest from './digest';
/**
 * writeFile - Return a loopback function which writes content to file
 *
 * @param  {string} filename         Relative filename
 * @param  {string} content          Content
 * @param  {string|undefined} encode = 'utf-8' Encode
 * @return {Promise}
 */
export default function writeFile(filename, content, encode = 'utf-8') {
  return function* payloadedWriteFile(state) {
    if (typeof filename !== 'string') {
      filename = yield digest(filename);
    }

    if (typeof content !== 'string') {
      content = yield digest(content);
    }

    yield new Promise(function(resolve, reject) {
      fs.writeFile(path.resolve(state[__CONFIG__].pwd, filename), content, encode, function(err, report) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}

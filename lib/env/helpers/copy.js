import { ncp } from 'ncp';
import path from 'path';
import { ACTION_RUN, __CONFIG__ } from 'erector/constants';
import createDir from './createDir';
import through2 from 'through2';

ncp.limit = 128;

function decorateTransform(store, origTransform, encoding) {
  return function (read, write) {
    read
    .pipe(through2(function (chunk, enc, callback) {
      store.dispatch({
        type: ACTION_RUN,
        subject: origTransform(chunk.toString()),
        props: store.getState(),
        next: promise => promise
        .then((content) => {
          this.push(new Buffer(content, encoding));
          callback();
        })
        .catch((e) => {
          throw e;
          callback();
        }),
      });
     }))
    .pipe(write);
  }
}

function defaultTransform(read, write) {
  read.pipe(write);
}

/**
 * Copy file or directory recursively. Helper uses functionality of package [ncp](https://www.npmjs.com/package/ncp).
 * ```js
 * yield copy('./src', './dist');
 * ```
 * This helper accepts same options as the module [ncp](https://www.npmjs.com/package/ncp).
 * But opt.transform can be a generator. For example, you can use it
 * with another helpers to apply transforms while copying.
 * ```js
 * yield copy('./src/some.ejs', './dist/some.js', {
 *  transform: function* (content) {
 *    yield ejs(content, state);
 *  },
 * });
 * ```
 * @param {string} source Source file or Directory
 * @param {string} destination Target file or directory
 * @param {object} opt Options (read [ncp](https://www.npmjs.com/package/ncp) for ditails)
 */
export default function copy(source, destination, opt = {}) {
  const encoding = opt.encoding || 'utf-8';
  return function* (state, store) {
    const transform = typeof opt.transform === 'function' ? decorateTransform(store, opt.transform, encoding) : defaultTransform;
    const resolvedSource = path.resolve(state[__CONFIG__].pwd, source);
    const resolvedDestination = path.resolve(state[__CONFIG__].pwd, destination);
    yield createDir(path.dirname(resolvedDestination));
    yield new Promise(function(resolve, reject) {
      ncp(resolvedSource, path.resolve(state[__CONFIG__].pwd, resolvedDestination), {
        ...opt,
        transform: transform,
      }, function (err) {
       if (err) {
         reject(err);
       } else {
         reject();
       }
      });
    });
  }
}

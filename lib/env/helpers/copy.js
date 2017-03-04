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

export default function copy(source, destination, opt = {}) {
  const encoding = opt.encoding || 'utf-8';
  return function* (state, store) {
    const transform = typeof opt.transform === 'function' ? decorateTransform(store, opt.transform, encoding) : defaultTransform;
    const resolvedDestination = path.resolve(state[__CONFIG__].pwd, destination);
    yield createDir(path.dirname(resolvedDestination));
    yield new Promise(function(resolve, reject) {
      ncp(source, path.resolve(state[__CONFIG__].pwd, resolvedDestination), {
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

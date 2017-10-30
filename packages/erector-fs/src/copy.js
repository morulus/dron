import { digest } from 'erector';
import { copy } from 'fs-extra';

export default function reCopy(src, dist, options = {}) {
  src = yield digest(src);
  dist = yield digest(dist);
  return new Promise(function(resolve, reject) {

  });
  copy(src, dist, options, function (err) {
    if (err) {
      reject(err);
    } else {
      resolve();
    }
  });
}

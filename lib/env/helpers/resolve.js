import { digest, getState } from 'erector';
import { __CONFIG__, ENV } from 'erector/constants';
import path from 'path';

/**
 * Resolve path relative project working dir
 *
 * ```js
 * const fn = yield resolve('./package.json');
 * yield echo(fn); // absolute/path/to/package.json
 * @param  {string|function|generator} relativePath
 * @return {string}
 * ```
 *
 * To resolve path relative module directory, use `resolve.module` function.
 *
 * ```js
 * const inModulePath = yield resolve.module('./template.js');
 * ```
 */
export default function* resolve(relativePath) {
  const state = yield getState();
  const resolvedDirname = yield digest(relativePath);
  if (typeof resolvedDirname !== 'string') {
    throw new Error('Path must ba a string');
  }
  yield path.resolve(state[__CONFIG__].pwd, resolvedDirname);
}

resolve.module = function inModule(filename) {
  return function(state, store) {
    return path.resolve(state[__CONFIG__].mwd, filename);
  }
}

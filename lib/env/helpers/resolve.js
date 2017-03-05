import { digest, getState } from 'erector';
import { __CONFIG__ } from 'erector/constants';
import path from 'path';

/**
 * Resolve path relative project working dir
 * @example
 * const fn = yield resolve('./package.json');
 * yield echo(fn); // absolute/path/to/package.json
 * @param  {string|function|generator} relativePath
 * @return {string}
 */
export default function* (relativePath) {
  const state = yield getState();
  const resolvedDirname = yield digest(relativePath);
  if (typeof resolvedDirname !== 'string') {
    throw new Error('Path must ba a string');
  }
  yield path.resolve(state[__CONFIG__].pwd, resolvedDirname);
}

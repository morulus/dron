import path from 'path';
/**
 * Resolve filename relative to the module directory.
 * @example
 * yield readFile(inModule('./templates/example.html'));
 *
 * @deprecated
 * @param {string} filename Must be a relative path
 * @return {string}
 */
export default function* inModule(filename) {
  yield echo.warn('inModule is deprecated, use resolve.module instead');
  yield function(state, store) {
    return path.resolve(store[ENV].MWD, filename);
  }
}

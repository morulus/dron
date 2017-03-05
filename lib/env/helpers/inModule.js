import path from 'path';
/**
* Resolve filename relative to module directory.
* @example
* yield readFile(inModule('./templates/example.html'));
*
* @param {string} filename Must be a relative path
* @return {string}
*/
export default function inModule(filename) {
  return function(state, store) {
    return path.resolve(store[ENV].MWD, filename);
  }
}

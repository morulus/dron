import path from 'path';
/**
* Resolves filename relative to module root directory and returns absolute path.
*
* @description When you need to get file in your module directory you should to use this fabric,
* because in default mode all paths are calculated relative to the project's root directory.
* @example
* // Read template from module directory
* yield readFile(inModule('./templates/example.html'));
*
* @param {string} filename Must be a relative path (with dot at the beginning)
* @return {function}
*/
export default function inModule(filename) {
  /**
   * @return {string} Absolute path to the file or directory
   */
  return function(state, store) {
    return path.resolve(store[ENV].MWD, filename);
  }
}

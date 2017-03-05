import { readFile, writeFile, digest } from 'erector';

/**
 * Read file, apply transforms, write it back.
 * @example
 * yield editFile('./log.md', function(content) {
 *  return `${content}
 * Updated on ${new Date().getTime()}`;
 * });
 * @param {string} filename
 * @param {function|generator} editor
 */
export default function* editFile(filename, editor) {
  if (typeof filename !== 'string') {
    filename = yield digest(filename);
  }
  let currentContent = '';
  try {
    currentContent = yield readFile(filename);
  } catch (e) {
    // ...
  }

  yield writeFile(filename, editor(currentContent));
}

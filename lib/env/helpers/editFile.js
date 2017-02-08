import { readFile, writeFile, digest } from 'erector';

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

import fileExists from './fileExists';
import writeFile from './writeFile';
import digest from './digest';

export default function writeFileSafe(filename, content, encode = 'utf-8') {
  return function* $writeFileSafe() {
    filename = yield digest(filename);
    let permit, exists = yield fileExists(filename);
    if (exists) {
      const dialogResult = yield dialog({
        type: 'confirm',
        name: 'confirm',
        message: `Rewrite file ${filename}?`,
        default: false
      });
      if (!dialogResult) {
        yield exit('Canceled by user');
      }
    }
    yield writeFile(filename, content, encode);
  }
}

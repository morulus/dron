import fileExists from './fileExists';
import writeFile from './writeFile';
import digest from './digest';
import dialog from './dialog';
import exit from './exit';

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
        yield false;
      } else {
        yield writeFile(filename, content, encode);
      }
    } else {
      yield writeFile(filename, content, encode);
    }
  }
}

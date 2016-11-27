import fileExists from './fileExists';
import writeFile from './fileExists';

export default function writeFileSafe(filename, content, encode = 'utf-8') {
  return function* plWriteFileSafe() {
    let permit, exists = yield fileExists(filename);
    if (exists) {
      if (!yield dialog({
        type: 'confirm',
        name: 'confirm',
        message: `Rewrite file ${filename}?`,
        default: false
      })) {
        yield exit('Canceled by user');
      }
    }
    yield writeFile(filename, content, encode);
  }
}

import digest from './digest';
import resolve from './resolve';
import fileExists from './fileExists';
import writeFile from './writeFile';

export default function* touch(subject, defaultContent = '') {
  const resolvedFilename = yield digest(subject);
  const fullname = yield resolve(resolvedFilename);
  if (yield fileExists(fullname)) {
    yield fullname;
  } else {
    yield writeFile(fullname, defaultContent);
    yield fullname;
  }
}

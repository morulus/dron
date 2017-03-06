import { digest, resolve, fileExists, writeFile } from 'erector';

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

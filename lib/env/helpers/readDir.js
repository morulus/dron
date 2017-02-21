import { digest } from 'erector';
import fs from 'fs';
import path from 'path';
import { __CONFIG__ } from 'erector/constants';

export default function readDir(dirname) {
  return function* (state) {
    const resolvedDirname = yield digest(dirname);
    const absoluteDirname = path.resolve(state[__CONFIG__].pwd, resolvedDirname);
    yield fs.readdirSync(absoluteDirname);
  }
}

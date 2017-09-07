import { readDir, map, echo } from 'erector';
import helper from './helper';

function isJsFile(filename) {
  return /\.js$/i.test(filename);
}

const HELPERS_RELATIVE_PATH = './lib/env/helpers';

export default function* () {
  const files = yield readDir(HELPERS_RELATIVE_PATH);
  const report = yield map(files.filter(isJsFile), helper);
}

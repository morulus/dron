import { echo, map, copy, ejs, assignState, readDir, readFile, normalize } from 'erector';
import jsdoc from 'jsdoc-api';
import jsDocParse from 'jsdoc-parse';
import path from 'path';

const HELPERS_RELATIVE_PATH = './lib/env/helpers';
const FIND_MAIN_JSDOC =  /^\/\*\*[\n]*([.\s\S]*)(\*\/)+/igm;

function isJsFile(filename) {
  return /\.js$/i.test(filename);
}

function sourceToJsDocOptions(source) {
  return {
    source,
  };
}

export default function* (state) {
  const files = yield readDir(HELPERS_RELATIVE_PATH);
  const helpers = yield map(files.filter(isJsFile), function* (filename) {
    const file = yield readFile(path.join(HELPERS_RELATIVE_PATH, filename));
    const jsdocJson = jsDocParse(jsdoc.explainSync(sourceToJsDocOptions(file)));
    if (!jsdocJson.length || jsdocJson[0].private) {
      yield echo.warn(filename);
      yield false;
    } else {
      yield echo.note(filename);
      yield {
        name: filename.split('.').shift(),
        jsdoc: jsdocJson[0],
      };
    }
  });
  state = yield assignState({
    helpers: helpers.filter(helper => helper),
  });
  yield copy(require.resolve('./README.md'), './README.md', {
    transform: function* (content) {
      yield ejs(content, state);
    }
  });
  yield echo.success('README.md updated');
}

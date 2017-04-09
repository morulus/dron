import erector, { echo, each, resolve, fork, readFile, createDir, fileExists, writeFile, ejs } from 'erector';
import { CLIEngine } from 'eslint';
import fs from 'fs';
import path from 'path';

const TEST_FOLDER = './__tests__/helpers';
const TEST_TEMPATE = fs.readFileSync(require.resolve('./templates/tester.js'), 'utf-8');

const cli = new CLIEngine({
  baseConfig: {
    extends: ["plugin:helper-unit-test/recommended"],
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
  useEslintrc: false,
  plugins: [
    "helper-unit-test"
  ],
});

export default function* (filename) {
  const report = {
    filename,
    valid: false,
    isNew: false,
  };
  yield createDir(TEST_FOLDER); // Makes sure dir exists
  /* Make sure test exists */
  const testFileName = yield resolve(path.join(TEST_FOLDER, filename));
  if (!(yield fileExists(testFileName))) {
    /* Create test file */
    yield echo.log(`init __tests__/helpers/${filename}`)
    yield writeFile(testFileName, ejs(TEST_TEMPATE, {
      name: filename,
    }));
    report.isNew = true;
  } else {
    yield echo.note(`Lint **${filename}**`);
    /* lint file */
    const messages = cli.executeOnFiles([testFileName]);
    if (messages.results.length) {
      yield each(messages.results[0].messages, (message) => {
        return echo.warn(`${message.line}:${message.column} ${message.message}`);
      });
    }
    yield echo.log('Helper builded');
  }
}

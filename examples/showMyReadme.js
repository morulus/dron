import { readFile, echo, confirm, dialog, writeFile } from 'erector';
const FILENAME = './README.md';
export default function* displayMyReadme(props) {
  let readme = yield readFile(FILENAME);
  yield echo.success('Content of README.md');
  yield echo('--------------------');
  yield echo.log(readme);
  yield echo('--------------------');
  const addString = yield confirm('Would you like to add a string to file?');
  if (addString) {
    const str = yield dialog({
      type: 'input',
      message: 'Enter string',
      default: 'New string'
    });
    yield writeFile(FILENAME, readme+"\n"+str);
    yield echo.success("Done");
  }
}

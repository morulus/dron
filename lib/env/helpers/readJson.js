import readFile from 'readFile';
export default function* readJson(filename) {
  let content = yield readFile(filename);
  yield JSON.parse(content);
}

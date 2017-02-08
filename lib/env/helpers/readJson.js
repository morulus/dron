import readFile from './readFile';
export default function* readJson(filename) {
  let content;
  try {
    content = yield readFile(filename);
  } catch(e) {
    throw new Error('JSON file is not exists');
  }
  try {
    yield JSON.parse(content);
  } catch(e) {
    console.log('content', content);
    throw new Error("Invalid JSON");
  }
}

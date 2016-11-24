import { readFile } from 'dron';

export default function* displayMyReadme(props) {
  let readme = yield readFile('./../README.md');
  console.log(readme);
}

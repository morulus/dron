Create file dialog
==

```js
import { echo, dialog, writeFileSafe } from 'erector';

const FILENAME_REGEXP = ^[\w,\s-]+\.[A-Za-z]+$;
const FILECONTENT = '';

function* createFileDialog() {
  while (true) {
    const filename = yield dialog({
      message: 'Enter file name',
      type: 'input',
      required: true,
      validate: filename => FILENAME_REGEXP.test(filename)
        ? true : 'Invalid filename'
    });
    if (yield writeFileSafe(filename, FILECONTENT)) {
      yield echo(`./${filename} created`);
      break;
    }
  }
}
```

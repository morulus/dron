editFile
==
```js
import { editFile } from 'erector';
```

Read file, apply transforms, write it back.

| Param  | Type                | Description  | Default   |
| ------ | ------------------- | ------------ | --------- |
| filename | `string` |  | 
| editor | `function|generator` |  | 




```js
yield editFile('./log.md', function(content) {
 return `${content}
Updated on ${new Date().getTime()}`;
});
```


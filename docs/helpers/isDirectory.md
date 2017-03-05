isDirectory
==
```js
import { isDirectory } from 'erector';
```

Checking the existence of a directory. If target is the file result will be false.

| Param  | Type                | Description  | Default   |
| ------ | ------------------- | ------------ | --------- |
| filename | `string` | Relative path to the file | 


__Returns:__ `boolean` 



```js
let appExists = yield isDirectory('./app');
```


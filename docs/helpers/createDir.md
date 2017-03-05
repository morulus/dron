createDir
==
```js
import { createDir } from 'erector';
```

Create a directory. It will throw an error on fail.

| Param  | Type                | Description  | Default   |
| ------ | ------------------- | ------------ | --------- |
| dirname | `string` |  | 




```js
try {
 yield createDir('create/some/folder');
} catch(e) {
 yield exit(e.message);
}
```


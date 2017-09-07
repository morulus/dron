fileExists
==
```js
import { fileExists } from 'erector';
```

Checking the existence of a file.
If target resource is a directory the result will be false.

| Param  | Type                | Description  | Default   |
| ------ | ------------------- | ------------ | --------- |
| filename | `string` |  | 


__Returns:__ `boolean` 



```js
let indexExists = yield fileExists('./index.html');
```


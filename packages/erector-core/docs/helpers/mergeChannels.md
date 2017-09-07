mergeChannels
==
```js
import { mergeChannels } from 'erector';
```

Marge two or many channels.

| Param  | Type                | Description  | Default   |
| ------ | ------------------- | ------------ | --------- |
| ...channels | `channels` |  | 


__Returns:__ `function` 



```js
const watchFile1 = yield watch('./a.js');
const watchFile2 = yield watch('./b.js');
const onAnyChange = yield mergeChannels(
 watchFile1.on('change'),
 watchFile2.on('change'),
);
while (true) {
 const file = yield onAnyChange();
 yield echo(`${file} has changed`);
}
// path/to/a.js has changes
// path/to/b.js has changes
```


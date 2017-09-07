copy
==
```js
import { copy } from 'erector';
```

Copy file or directory recursively. Helper uses functionality of package [ncp](https://www.npmjs.com/package/ncp).
```js
yield copy('./src', './dist');
```
This helper accepts same options as the module [ncp](https://www.npmjs.com/package/ncp).
But opt.transform can be a generator. For example, you can use it
with another helpers to apply transforms while copying.
```js
yield copy('./src/some.ejs', './dist/some.js', {
 transform: function* (content) {
   yield ejs(content, state);
 },
});
```

| Param  | Type                | Description  | Default   |
| ------ | ------------------- | ------------ | --------- |
| source | `string` | Source file or Directory | 
| destination | `string` | Target file or directory | 
| opt | `object` | Options (read [ncp](https://www.npmjs.com/package/ncp) for ditails) | 




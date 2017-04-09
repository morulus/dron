resolve
==
```js
import { resolve } from 'erector';
```

Resolve path relative project working dir

```js
const fn = yield resolve('./package.json');
yield echo(fn); // absolute/path/to/package.json

| Param  | Type                | Description  | Default   |
| ------ | ------------------- | ------------ | --------- |
| relativePath | `string|function|generator` |  | 


__Returns:__ `string` ```

To resolve path relative module directory, use `resolve.module` function.

```js
const inModulePath = yield resolve.module(&#39;./template.js&#39;);
```



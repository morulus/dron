map
==
```js
import { map } from 'erector';
```

Create a new array with the results of executing a handler for every array/object element.

| Param  | Type                | Description  | Default   |
| ------ | ------------------- | ------------ | --------- |
| iterable | `array|object` |  | 
| handler | `function|generator` |  | 


__Returns:__ `array|object` 



```js
const files = [
 './a.js',
 './b.js',
 './c.js'
];
const existsMap = yield map(files, function* (file) {
 yield fileExists(file);
});
yield echo(existsMap); // [true, true, false]
```


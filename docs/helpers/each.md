each
==
```js
import { each } from 'erector';
```

Iterate array or object with handler.

| Param  | Type                | Description  | Default   |
| ------ | ------------------- | ------------ | --------- |
| iterable | `array|object` |  | 
| callback | `function|generator` |  | 


__Returns:__ `array|object|Error` 



```js
yield each([1, 2, 3], function* (num) {
 yield echo(num);
});
```


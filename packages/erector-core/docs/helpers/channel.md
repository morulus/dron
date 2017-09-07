channel
==
```js
import { channel } from 'erector';
```

Creates channel from a generator or a function. The channel is the mechanism which stores data from any observable source. Each time you call channel it gives you one stored item. When the data ends it returns undefined.

In this example channel collect numbers from 1 to 3.

```js
const counter = yield channel((last = 0) => {
 return last <= 10 ? last + 1 : channel.DONE;
});
```
To observe the channel you can use `while` loop.
```js
let n;
while ( n = yield counter ) {
 yield echo(counter);
}
// 1
// 2
// 3
```

| Param  | Type                | Description  | Default   |
| ------ | ------------------- | ------------ | --------- |
| subject | `function|generator` | A function or a generator which provides any data | 


__Returns:__ `function` 



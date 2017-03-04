cancel
==

Cancel cancelable async task or channel.

```js
import { channel, cancel, echo } from 'erector';

export default function* () {
  const counter = yield channel(function* () {
    yield new Promise(resolve => setTimeout(
      () => resolve('tick'),
      1000,
    ));
  });
  let times = 0;
  while ( yield counter() ) {
    yield echo('tick');
    if (++times === 3 ) {
      yield cancel(counter);
    }
  }
  yield echo('done');
}
// tick
// tick
// tick
// done
```

| Param  | Type                | Description  | Default   |
| ------ | ------------------- | ------------ | --------- |
| promise | `Promise|generator` | Channel or async task | 
| final | `any` | The value which will be returned after cancellation | 




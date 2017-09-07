dispatchToChannel
==
```js
import { dispatchToChannel } from 'erector';
```

Create a channel which reproduces each action of the system store.
```js
const onAction = yield dispatchToChannel;
let action;
while (action = yield onAction) {
 switch (action.type) {
   case 'MY_ACTION':
      yield doSomeJob;
   break;
 }
}
```

Read [channel](./channel.md) to learn how to use it.


__Returns:__ `type` description



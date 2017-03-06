Handle dispatcher channel
==

```js
import { fork, dispatchToChannel } from 'erector';

function* middleware() {
  const onAction = yield dispatchToChannel;
  let action;
  while(action = yield onAction) {
    switch(action.type) {
      case SOME_ACTION:
        // ...
      break;
    }
  } while (action);
}

export default function* () {
  yield fork(middleware);
}
```

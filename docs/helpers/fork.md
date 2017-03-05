fork
==
```js
import { fork } from 'erector';
```

Fork a task. It will be executed in parallel without blocking the current sequence.

| Param  | Type                | Description  | Default   |
| ------ | ------------------- | ------------ | --------- |
| sausage | `any` |  | 


__Returns:__ `Promise` 



```js
const copying = yield fork(copy('./src', './dist'));
yield echo('Copying started');
```


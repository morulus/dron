forkAll
==
```js
import { forkAll } from 'erector';
```

Fork multiple tasks.

| Param  | Type                | Description  | Default   |
| ------ | ------------------- | ------------ | --------- |
| ...subjects | `any` |  | 


__Returns:__ `function` 



```js
const asyncTasks = forkAll(
 Promise.resolve(1),
 Promise.resolve(2),
 Promise.resolve(3),
);
yield echo(asyncTasks);
// [1, 2, 3]
```


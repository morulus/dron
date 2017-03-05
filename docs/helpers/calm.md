calm
==
```js
import { calm } from 'erector';
```

Intercepts errors inside `subject` and returns value of
onError as the normal result. If onError is a function
then it will handler of catch

| Param  | Type                | Description  | Default   |
| ------ | ------------------- | ------------ | --------- |
| subject | `function|generator` |  | 
| onError | `any` |  | 




```js
const result = yield calm(
 writeFile('./someBlockedFile', ''),
 null
);
// result === null
```


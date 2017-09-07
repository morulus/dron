getState
==
```js
import { getState } from 'erector';
```

Get current state
```js
const state = yield getState();
```
The helper can accept selector.
```js
const files = yield getState(state => state.files);
```

| Param  | Type                | Description  | Default   |
| ------ | ------------------- | ------------ | --------- |
| selector | `function` |  | 


__Returns:__ `any` 



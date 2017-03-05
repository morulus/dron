confirm
==
```js
import { confirm } from 'erector';
```

Ask the simple question and get the simple answer: Yes or no.

| Param  | Type                | Description  | Default   |
| ------ | ------------------- | ------------ | --------- |
| message | `string` |  | 
| def | `def` | Default answer | 




```js
const confirmed = yield confirm('Create a file?');
```


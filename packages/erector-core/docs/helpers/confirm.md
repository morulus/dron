confirm
==
```js
import { confirm } from 'erector';
```

Get a confirmation of the user.

| Param  | Type                | Description  | Default   |
| ------ | ------------------- | ------------ | --------- |
| message | `string` |  | 
| def | `def` | Default answer | 




```js
if (yield confirm('Create a file?')) {
 // Create file
}
```


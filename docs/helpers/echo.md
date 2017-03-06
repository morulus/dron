echo
==
```js
import { echo } from 'erector';
```

Print a message to the terminal (like console.log)
Has static methods:
- echo.success Satisfactory message
- echo.warn Waning
- echo.note Notification
- echo.error Error
- echo.clear Clear terminal

| Param  | Type                | Description  | Default   |
| ------ | ------------------- | ------------ | --------- |
| ...messages | `*` | One or many messages |

```js
yield echo.clear();
yield echo('Welcome');
yield echo.note('to');
yield echo.warn('the');
yield echo.success('Erector');
yield echo.ok('Done');
```

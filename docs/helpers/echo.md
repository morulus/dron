echo
==

Print a message to the terminal (like console.log)
Has static methods:
- echo.success
- echo.warn
- echo.note
- echo.error

| Param  | Type                | Description  | Default   |
| ------ | ------------------- | ------------ | --------- |
| ...messages | `*` | One or many messages | 




```js
yield echo('Welcome');
yield echo.note('to');
yield echo.warn('the');
yield echo.success('Erector');
```


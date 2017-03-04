dialog
==

Starts CLI dialog (powered by inquirer).
If `questions` will be object, then an answer will be the only one (instead of array)

See [Inquirer](https://www.npmjs.com/package/inquirer) for the ditails.

| Param  | Type                | Description  | Default   |
| ------ | ------------------- | ------------ | --------- |
| questions | `array.<object>|object|helper` | Question(s) | 


__Returns:__ `type` 



```js
const price = yield dialog({
 message: 'How much is the fish?',
 type: 'string',
});
yield echo(`The fish is ${price} coins`);
```


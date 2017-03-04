assignState
==

Assign state to the store. Equals to
setState with `Object.assign(state, {...})`
```js
yield assignState({
  name,
});
```
It can accept another helper as the first argument
```js
yield assignState(dialog([{
 name: {...}
}]));
```

| Param  | Type                | Description  | Default   |
| ------ | ------------------- | ------------ | --------- |
| subject | `object|helper` | Data or helper | 


__Returns:__ `object` 



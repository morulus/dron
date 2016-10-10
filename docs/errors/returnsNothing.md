Error: An installer returns nothing
==

Your function returns no value.
```js
module.exports = function createPackageJson() {
  this.touch('package.json').safeWrite('{}');
}
```

```terminal
An installer returns nothing
```

To resolve this problem your function should return any value, except  `undefined`.
```js
module.exports = function createPackageJson() {
  this.touch('package.json').safeWrite('{}');
  return true;
}
```
If you wish to finish process immediately, you should return `null`.

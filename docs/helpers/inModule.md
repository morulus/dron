inModule
==

When you need to get file in your module directory you should to use this fabric,
because in default mode all paths are calculated relative to the project's root directory.

| Param  | Type                | Description  | Default   |
| ------ | ------------------- | ------------ | --------- |
| filename | `string` | Must be a relative path (with dot at the beginning) | 


__Returns:__ `function` 



```js
// Read template from module directory
yield readFile(inModule('./templates/example.html'));
```


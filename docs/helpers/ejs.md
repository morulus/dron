ejs
==

In most typicall tasks, you do not need to specify `data` argument to parse you .ejs template.
In an overwhelming case for the compilation of the document is enough to give it a `template`.
By the defaults the data are taken from the state.

| Param  | Type                | Description  | Default   |
| ------ | ------------------- | ------------ | --------- |
| template | `string|function` | String or a function (generator) which returns chain, ending with template text | 
| data | `object` | Properties which will be used by ejs as data | 
| options | `object` | Options for ejs (read ejs docs for ditails) | 




```js
let filename = yield inModule('./templates/readme.jsx');
```
```js
yield writeFile('./readme.md', ejs(readFile(inModule('./templates/readme.jsx'))));
```


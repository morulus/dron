exec
==
```js
import { exec } from 'erector';
```

Execute shell command and get the output as the result.
```js
const npmVersion = yield exec('npm -v');
```
You can specify `cwd`:
```js
const ls = yield exec('ls', {
 cwd: '/path/to/folder',
});
```
It decorates the function `exec` of the package [child_process](https://www.npmjs.com/package/child_process), thus it uses all the same options.

| Param  | Type                | Description  | Default   |
| ------ | ------------------- | ------------ | --------- |
| com | `string` | Command | 
| opt | `object` | Options | 




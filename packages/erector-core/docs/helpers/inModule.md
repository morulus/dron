inModule
==
```js
import { inModule } from 'erector';
```

Resolve filename relative to the module directory.

| Param  | Type                | Description  | Default   |
| ------ | ------------------- | ------------ | --------- |
| filename | `string` | Must be a relative path | 


__Returns:__ `string` 



```js
yield readFile(inModule('./templates/example.html'));
```


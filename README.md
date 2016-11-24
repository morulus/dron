Utility for development processes automation
==

[Web-page](https://morulus.github.io/dron)   
[Developer guide](http://github.com/morulus/dron/blob/master/docs/dg.md)

# Developning modules

## Sigle-file modules

Create a file *.js. Use es6 modules to export a function or a generator. You should use a es6 generator instead a function, it will give you possability to use async methods and sequencies of calls.

```js
export default function* myModule(props) {
  console.log('Hello, Dron!');
  yield true;
}
```

Your first dron module is ready. You can run it now.
```
dron mymodule.js
Hello, Dron!
```

### Using Operators

Operators is a helper functions provided by dron.

```js
import { readFile } from 'dron';

export default function* displayMyReadme(props) {
  let readme = yield readFile('./README.md');
  console.log(readme);
}
```

To use it effectively, you must [learn to operators](http://github.com/morulus/dron/blob/master/docs/operators.md).

# Why

Dron is utility to create utils. It is not boilerplate generator. Dron is tool for development automation.

How to use. You can use existing modules. You do not need to install it. Dron use prefix `dron-` for all modules. So you can call any existing at npm module in any time. For example:

```
dron webpack-init
```

Will start detailed dialog to generate webpack project.

Or

```
dron version
```

To control you package version.

### Or

You can create you own package or sigle file which will use any existing package.

Next module will configurate webpack, increase version and patch README.md with new version.

```js
import { usePackage, editFile } from 'dron';
export default function* someModule() {
  yield usePackage('webpack-init');
  let version = yield usePackage('version');
  yield editFile('./README.md', (content) => {
    return content.replace(/version: [0-9\.]/g, 'version: '+version);
  });
}
```

You must try to create your own module, to understand how easy it is.

# Early access

This application at an early stage of development. It can be unstable.

## Known issues

- Incorrect paths in OS Windows. Execution may fall when interact with fs.

# License
Under BSD-2-clause (C) 2016, Vladimir Kalmykov

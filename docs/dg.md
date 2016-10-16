Dron developer guide
==

## Creating modules

The modules of Dron is a simple Npm package. If you need to create your own module, first - you should to create a function, which perform that you need. Then, put your function into the shape of Npm package and name it with prefix `dron-`;

The package must containing main script. The script exports the native function. That function is a entry point to the sequence and takes command-line arguments, parsed by [minimist](https://www.npmjs.com/package/minimist).

```js
module.exports = function installer(argv) {

}
```

An important condition is that the function must return a value anyway. Each function must return another function, or array of functions, or Promise, as long as not returned `false` or `true`, thus obtaining a sequence of calls.

```js
function a() {
  return 1;
}

function b() {
  return 2;
}

function c(val) {
  return val==2;
}

function partOfModule2() {
  return [a, b, c];
}

function partOfModule1() {
  return partOfModule2;
}

module.exports = function installer(argv) {
  return partOfModule1;
}
```

The execution sequence will be as follows:

```
installer(argv) -> partOfModule1() -> partOfModule1() -> a() -> b(1) -> c(2) -> true
```

### Routing

The routing is based on a simple check the desired conditions and the return of the corresponding function.

```terminal
dron myfirstmodule --myOption1
```

```js
function doJobA() {}
function doJobB() {}

module.exports = function installer(argv) {
  if (argv.myOption1) {
    return doJobA;
  } else {
    return doJobB;
  }
}
```

Calling next function with arguments is achieved by carrying.

```js
function doJobA(option) {
  return function() {
    // Do some job with options
    return true;
  }
}

module.exports = function installer(argv) {
  if (argv.myOption1) {
    return doJobA(argv.myOption1);
  } else {
    return doJobB;
  }
}
```

Any function, to execute in sequence, can perform that trick.

### Interact with user

In frequent cases, you need something to ask the user. If you need to ask a question, before to call the function, then you should to define special property `prompt` of the function, which should be an array of questions. The results of questioning will  be present as first argument of the function.

```js
function doJobC(answers) {
  if (!answers.doit) return false;
}

doJobC.prompt = [
  {
    type: 'confirm',
    name: 'doit',
    message: 'Do next job?',
    default: true
  }
]


function doJobA() {
  return doJobC;
}
```

The prompt can be a function, that returns an array. And that function will be executed in context of workspace.
```js
doJobC.prompt = function() {
  return [
    {
      type: 'confirm',
      name: 'doit',
      message: 'Create package.json?',
      default: true,
      when: () => {
        return this.touch('package.json').exists();
      }
    }
  ]
}
```

The questions is powered by __inquirer__. Read [official documentation](https://www.npmjs.com/package/inquirer) of inquirer for more info.

### Working with file system

Dron provides API for fast interact with file system.

#### touch()

Method takes a name of target file and returns an FileCursor with API.

#### FileCursor::exists()

Check file existence:

```js
this.touch('package.json').exists();
```

#### FileCursor::write(content)

Write content to the file:

```js
this.touch('package.json').write('{}');
```

#### FileCursor::safeWrite(content)

Write content to the file, but ask for confirmation if file already exists:

```js
this.touch('package.json').safeWrite('{}');
```
#### FileCursor::read()

Read content of file as utf-8 string:

```js
this.touch('package.json').read();
```

#### FileCursor::mkdir()

Create a directory with such name, if not exists.

```js
this.touch('app/assets').mkdir();
```

#### FileCursor::path()

Get full path of file or directory

#### FileCursor:name()

Get filename without extension

#### FileCursor:basename()

Get basename

#### FileCursor::extname()

Get extension name (with dot)

#### FileCursor::dirname()

Get directory name

#### FileCursor::isDirectory()

Check is directory

#### FileCursor::isFile()

Check is file

#### FileCursor::require()

Require a file

```js
var json = this.touch('package.json').require();
```

#### FileCursor::ejs(data, options)

Parse file with Ejs ([Embedded JavaScript](http://www.embeddedjs.com/)).

```js
this.touch(path.join(__dirname, 'templates', 'index.ejs')).ejs(json);
```

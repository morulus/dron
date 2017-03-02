Erector
==
![Erector](https://i.imgsafe.org/525701471b.png)

This tool will help you to create CLI utilities. You got a set of tools and you will able:

- Create CLI dialog and beautiful messages;
- Easy to resolve, read, write files;
- Work with JSON;
- Ejs templates;
- Create scaffolds and generators;
- Reuse modules.

# Getting started

```shell
npm install erector-cli -g
```
Enjoy.

# Creating modules

The easiest module of Erector is the plain file.

To write your first module, just create in any folder the file named `hello.js`. Open your favorite code editor and put to this file next code:
```js
import { echo, dialog } from 'erector';

default function* () {
  const name = yield dialog({
    message: 'Enter your name',
    type: 'string',
    required: true,
  });
  yield echo(`Hello, ${name}!`);
}
```

Save it and then open your terminal in this directory and run next command:

```shell
erect hello.js
```

You will see the work of your script.

This is the simplest example of module of Erector.

## Using \__erector__ folder

There is a way to make your scripts more unobtrusive. Create in your project folder sub-directory with name `__erector__`.

```js
mkdir __erector__
```

Move your script `hello.js` from the root to the `__erector__` folder. And erect your script again, but without extension:

```shell
erect hello
```

This way it is more convenient to run scripts. You can use short names without extension and add `__erector__` to ignore lists, for example.

But wait, we can do something more. Create inside `__erector__` one more directory named `myscripts`. And then move your `hello.js` file into new folder.

You should have `__erector__/myscripts/hello.js`. Let try to run it.

```shell
erect myscripts/hello
```

Much better, right?

If you got a question - _Сan I turn sub folder into the Npm package?_
Yes. You can. And you can use in your script any dependencies as you wish.

```shell
cd __erector__/myscripts
npm init
```

## Packages instead modules

If your script became big and strong, or it a whole set of scripts, you should turn it into a complete package.

Just create Npm package, name it with prefix `erector_...` and make it global by command `npm link`.

Now you can use your script in any place of your computer. So if your package is called `erector_doit`, your command will be.
```
erect doit
```

And if your script is pretty nice, you able to publish it in Npm. Then other people will be able to use it.

# Helpers

The helpers is a special functions which perform some frequent job. The Erector contains several dozen basic helpers. All of them are imported as follows:

```js
import { helperName } from 'erector';
```

Helpers will help you to write your scripts, removes the load from the hands. You should use them as often as possible.

And you do not need to install `erector` separately to make import from it. It always with you.

## List of basic helpers

Later you will learn how to write your own assistants, but the use of basic helpers simplifies life by covering common tasks.


### assignState
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



### calm
Intercepts errors inside `subject` and returns value of
onError as the normal result. If onError is a function
then it will handler of catch

| Param  | Type                | Description  | Default   |
| ------ | ------------------- | ------------ | --------- |
| subject | `function|generator` |  | 
| onError | `any` |  | 




```js
const result = yield calm(
 writeFile('./someBlockedFile', ''),
 null
);
// result === null
```


### cancel
Cancel cancelable async task or channel.

```js
import { channel, cancel, echo } from 'erector';

export default function* () {
  const counter = yield channel(function* () {
    yield new Promise(resolve => setTimeout(
      () => resolve('tick'),
      1000,
    ));
  });
  let times = 0;
  while ( yield counter() ) {
    yield echo('tick');
    if (++times === 3 ) {
      yield cancel(counter);
    }
  }
  yield echo('done');
}
// tick
// tick
// tick
// done
```

| Param  | Type                | Description  | Default   |
| ------ | ------------------- | ------------ | --------- |
| promise | `Promise|generator` | Channel or async task | 
| final | `any` | The value which will be returned after cancellation | 




### clear
Clear terminal




```js
yield clear();
```


### dialog
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


### echo
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


### ejs
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


### fileExists
If target resource is directory then result will false too.

| Param  | Type                | Description  | Default   |
| ------ | ------------------- | ------------ | --------- |
| filename | `string` | Relative path to the file | 


__Returns:__ `function` 



```js
let indexExists = yield fileExists('./index.html');
```


### inModule
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


### isDirectory
If target resource is file then result will false too.

| Param  | Type                | Description  | Default   |
| ------ | ------------------- | ------------ | --------- |
| filename | `string` | Relative path to the file | 


__Returns:__ `function` 



```js
let appExists = yield isDirectory('./app');
```


### pathExists
If target resource is directory then result will false too.

| Param  | Type                | Description  | Default   |
| ------ | ------------------- | ------------ | --------- |
| pathname | `string` | Relative path to the file or dir | 


__Returns:__ `function` 



```js
let indexExists = yield pathExists('./');
```


### readFile
readFile - Return loopback function which read file

| Param  | Type                | Description  | Default   |
| ------ | ------------------- | ------------ | --------- |
| filename | `string` |  | 
| options | `string|object` | = &#39;utf-8&#39; | 


__Returns:__ `Promise` 



### writeFile
writeFile - Return a loopback function which writes content to file

| Param  | Type                | Description  | Default   |
| ------ | ------------------- | ------------ | --------- |
| filename | `string` | Relative filename | 
| content | `string` | Content | 
| encode | `string|undefined` | = &#39;utf-8&#39; Encode | 


__Returns:__ `Promise` 




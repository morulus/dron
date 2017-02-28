Erector
--
![Erector](https://i.imgsafe.org/525701471b.png)

This tool will help you to create CLI utilities. You got a set of tools and you will able:

- Create CLI dialog and beautiful messages;
- Easy to resolve, read, write files;
- Work with JSON;
- Ejs templates;
- Create scaffolds and generators;
- Reuse modules.

```shell
npm install erector-cli -g
```
Enjoy.

# Hello, world

```js
import { echo } from 'erector';

default function* () {
  yield echo('Hello, world!');
}
```

```shell
erect helloworld.js
```

# helpers


## clear
Clear terminal



```js
yield clear();
```


## dialog
prompt - Return a loopback function that invoke prompt dialog and returns answers

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| questions | <code>array.&lt;object&gt;|object</code> | If questions is object, then answer will be single value



## echo
Echo default



## ejs
In most typicall tasks, you do not need to specify `data` argument to parse you .ejs template.
In an overwhelming case for the compilation of the document is enough to give it a `template`.
By the defaults the data are taken from the state.

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| template | <code>string|function</code> | String or a function (generator) which returns chain, ending with template text
| data | <code>object</code> | Properties which will be used by ejs as data
| options | <code>object</code> | Options for ejs (read ejs docs for ditails)



```js
let filename = yield inModule('./templates/readme.jsx');
```
```js
yield writeFile('./readme.md', ejs(readFile(inModule('./templates/readme.jsx'))));
```


## fileExists
If target resource is directory then result will false too.

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| filename | <code>string</code> | Relative path to the file



```js
let indexExists = yield fileExists('./index.html');
```


## inModule
When you need to get file in your module directory you should to use this fabric,
because in default mode all paths are calculated relative to the project&#39;s root directory.

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| filename | <code>string</code> | Must be a relative path (with dot at the beginning)



```js
// Read template from module directory
yield readFile(inModule('./templates/example.html'));
```


## pathExists
If target resource is directory then result will false too.

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| pathname | <code>string</code> | Relative path to the file or dir



```js
let indexExists = yield pathExists('./');
```


## readFile
readFile - Return loopback function which read file

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| filename | <code>string</code> | 
| options | <code>string|object</code> | = &#39;utf-8&#39;



## writeFile
writeFile - Return a loopback function which writes content to file

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| filename | <code>string</code> | Relative filename
| content | <code>string</code> | Content
| encode | <code>string|undefined</code> | = &#39;utf-8&#39; Encode




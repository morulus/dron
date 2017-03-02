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

Later you will learn how to write your own helpers, but the use of basic helpers simplifies life by covering common tasks.

<% for (var i = 0; i < helpers.length; i++) { %>
### <%= helpers[i].name %>
<%- helpers[i].jsdoc.description %>
<% if (helpers[i].jsdoc.params) { %>
| Param  | Type                | Description  | Default   |
| ------ | ------------------- | ------------ | --------- |<% for (var q = 0; q < helpers[i].jsdoc.params.length; q++) { %>
| <%= helpers[i].jsdoc.params[q].name %> | `<%- helpers[i].jsdoc.params[q].type.names.join('|') %>` | <%= helpers[i].jsdoc.params[q].description||'' %> | <%= helpers[i].jsdoc.params[q].defaultValue %><% } %>
<% } %>
<% if (helpers[i].jsdoc.returns) { %>
__Returns:__ `<%- helpers[i].jsdoc.returns[0].type.names.join('|') %>` <%= helpers[i].jsdoc.returns[0].description %>
<% } %>
<% if (helpers[i].jsdoc.examples) { %>
<% for (var e = 0; e < helpers[i].jsdoc.examples.length; e++) { %>
```js
<%- helpers[i].jsdoc.examples[e] %>
```<% } %>
<% } %>
<% } %>
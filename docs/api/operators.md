Operators
--

Operators are a helper functions which return generators with specific algorithms. In its turn the generators potentially can create long chain of asynchronous actions.

To create effective tools you need to learn all the basic operators.

#### assignState(state) -> object
Assign state and get updated state

- __state__ (object | function) Hash to assigment

```js
let state = yield assignState({
  firstname: 'Vasya'
  secondname: 'Pupkin'
});
```

#### dialog(questions) -> * ####

Launch terminal prompt interface powered by [inquirer](https://www.npmjs.com/package/inquirer).

- __questions__ (array\<Object\> | object | function) Hash containing questions.

If _questions_ is an array, then result will be hash object containing answers as object. Also if _questions_ is an object, then result will be an answer as variable.   
If _questions_ is a function, it will be executed for getting its result which will be used as _questions_.

```js
let email = yield dialog({
  message: 'Enter e-mail',
  type: 'input'
});
```

#### each(iterable, callback)

Call handler for each element of iterable object and run each result of function.

- __iterable__ (object | array | Map | Set) Iterable object
- __callback__ (function) Handler

_callback_ takes 3 arguments:

- __value__ - Value of element
- __key__ - Index or a key of property
- __object__ - Object self

 _Hash objects also can be used with this operator._

 ```js
let languages = ['cs','js','ts'];
yield each(languages, (lang) => {
  yield require(path.join('./lang/', lang+'.js'));
});
 ```

 #### map(iterable, callback) -> array

Create new array through the run of each result of callback

- __iterable__ (object | array | Map | Set) Iterable object
- __callback__ (function) Handler

_callback_ takes 3 arguments:

- __value__ - Value of element
- __key__ - Index or a key of property
- __object__ - array self

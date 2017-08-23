import Ejs from 'ejs';
import digest from './digest';
import { allowUnsafeNewFunction } from 'loophole'; // Allow to use new Function
/**
* The operator allow you to use ejs compilator (http://ejs.co/).
*
* @description
* In most typicall tasks, you do not need to specify `data` argument to parse you .ejs template.
* In an overwhelming case for the compilation of the document is enough to give it a `template`.
* By the defaults the data are taken from the state.
* @example
* let filename = yield inModule('./templates/readme.jsx');
* @example
* yield writeFile('./readme.md', ejs(readFile(inModule('./templates/readme.jsx'))));
*
* @param {string|function} template String or a function (generator) which returns chain, ending with template text
* @param {object} [data] Properties which will be used by ejs as data
* @param {object} [options] Options for ejs (read ejs docs for ditails)
*/
function ejs(template, data, options) {
  /**
   * @return {string} The compiled document
   */
  return function* $ejs(state) {
    template = yield digest(template);
    yield allowUnsafeNewFunction(function() {
      return Ejs.render(template, "object"===typeof data ? data : state, options||{});
    });
  }
}


/**
 * Prepare a render function that already carrying the data and options
 *
 * @param {object} [data] Properties which will be used by ejs as data
 * @param {object} [options] Options for ejs (read ejs docs for ditails)
 * @return {function} render
 */
ejs.prepare = function(data, options) {
  return function(template) {
    return ejs(template, data, options);
  }
}

export default ejs;

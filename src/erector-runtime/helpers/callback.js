/**
 * Run node.js style function.
 * @example
 * try {
 *  yield callback([fs, writeFile], './test', 'Hello, Erector');
 *  yield echo.ok('File writed');
 * } catch(e) {
 *  yield echo.error('Write fail');
 * }
 * @param  {type} fn      description
 * @param  {type} ...args description
 * @return {type}         description
 */
export default function callback(fn, ...args) {
  let context;
  if (fn instanceof Array) {
    context = fn[0];
    fn = fn[1];
  }
  return new Promise(function(resolve, reject) {
    context::fn(...args.concat([(err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    }]));
  });
}

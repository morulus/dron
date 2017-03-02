import { CANCEL } from 'erector/constants';
/**
 * Cancel cancelable async task or channel.
 *
 * ```js
 * import { channel, cancel, echo } from 'erector';
 *
 * export default function* () {
 *   const counter = yield channel(function* () {
 *     yield new Promise(resolve => setTimeout(
 *       () => resolve('tick'),
 *       1000,
 *     ));
 *   });
 *   let times = 0;
 *   while ( yield counter() ) {
 *     yield echo('tick');
 *     if (++times === 3 ) {
 *       yield cancel(counter);
 *     }
 *   }
 *   yield echo('done');
 * }
 * // tick
 * // tick
 * // tick
 * // done
 * ```
 *
 * @param  {Promise|generator} promise Channel or async task
 * @param  {any} [final = undefined] The value which will be returned after cancellation
 */
export default function(task, final) {
  return function() {
    if (typeof task[CANCEL] === 'function') {
      task[CANCEL](final);
    } else {
      throw new Error(`The task (${typeof task})cannot be cancelled`);
    }
  }
}

import { ACTION_RUN } from '../../constants';
import { RESTANTE, CANCEL } from 'reciprocator';

export const DONE = Symbol('DONE');

function accost(dispatch, subject, last) {
  let next = function callback(promise) {
    next = promise;
  };
  dispatch({
    type: ACTION_RUN,
    subject: subject,
    props: last,
    next: next
  });
  return next;
}


/**
 * Creates channel from a generator or a function. The channel is the mechanism which stores data from any observable source. Each time you call channel it gives you one stored item. When the data ends it returns undefined.
 *
 * In this example channel collect numbers from 1 to 3.
 *
 * ```js
 * const counter = yield channel((last = 0) => {
 *  return last <= 10 ? last + 1 : channel.DONE;
 * });
 * ```
 * To observe the channel you can use `while` loop.
 * ```js
 * let n;
 * while ( n = yield counter ) {
 *  yield echo(counter);
 * }
 * // 1
 * // 2
 * // 3
 * ```
 * @deprecated
 * @param  {function|generator} subject A function or a generator which provides any data
 * @return {function}
 */
export default function channel(subject) {
  return function(state, store) {
    const sequence = [];
    let enabled = true;
    let done = false;
    let final;
    let anticipant;
    let last;

    const energizer = function() {
      if (!enabled) {
        return;
      }
      accost(store.dispatch, subject, last)
      .then(function(next) {
        if (next === DONE) {
          done = true;
          last = undefined;
        } else {
          last = next;
        }

        if (anticipant && enabled) {
          anticipant(next);
          anticipant = null;
        } else {
          sequence.push(next);
        }

        if (sequence.length > 1000) {
          throw new Error("Dangerously count of observable result");
        }

        if (enabled && !done) {
          energizer();
        }
      });
    };

    energizer();

    const batcher = function plural() {
      if (done) {
        // Return unresolvable promise
        return new Promise();
      }
      if (!enabled) {
        done = true;
        return final;
      }
      if (sequence.length) {
        return sequence.shift();
      } else {
        return new Promise(function(resolve, reject) {
          anticipant = resolve;
        });
      }
    }

    batcher[CANCEL] = function(f) {
      final = f;
      enabled = false;
    }

    batcher[RESTANTE] = true;

    return batcher;
  }
}

import { ACTION_RUN } from 'erector/constants';
import { RESTANTE, CANCEL } from 'reciprocator';

function accost(dispatch, subject) {
  let next = function callback(promise) {
    next = promise;
  };
  dispatch({
    type: ACTION_RUN,
    subject: subject,
    props: undefined,
    next: next
  });
  return next;
}


/**
 * Create channel from generator/function. Note that source must be async or the channel will fall into a call stack trap.
 * Channels are the special functions which return some async value on each call. The channel gives data only when you ask them.
 * If you don't ask channel for data, then the channel will store data.
 *
 * @param  {function|generator} subject A function or a generator which provides any data
 * @return {channel}         Observable channel
 */
export default function channel(subject) {
  return function(state, store) {
    const sequence = [];
    let enabled = true;
    let final;
    let anticipant;

    const energizer = function() {
      if (!enabled) {
        return;
      }
      accost(store.dispatch, subject)
      .then(function(next) {
        if (anticipant && enabled) {
          anticipant(next);
          anticipant = null;
        } else {
          sequence.push(next);
        }

        if (sequence.length > 200) {
          throw new Error("Dangerously count of observable result");
        }

        energizer();
      });
    };

    energizer();

    const batcher = function plural() {
      if (!enabled) {
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

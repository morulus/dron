import { connectDispatcher } from 'erector';
import { RESTANTE, CANCEL } from 'reciprocator';


/**
 * Create a channel which reproduces each action of system store.
 * ```js
 * const onAction = yield dispatchToChannel;
 * let action;
 * while (action = yield onAction) {
 *  switch (action.type) {
 *    case 'MY_ACTION':
 *       yield doSomeJob;
 *    break;
 *  }
 * }
 * ```
 *
 * Read [channels](./channels.md) to learn how to use it.
 *
 * @return {type}  description
 */
export default function* () {
  const queue = [];
  let final;
  let enabled = true;
  let anticipant;
  const handler = function(action) {
    if (anticipant) {
      anticipant(action);
      anticipant = null;
    } else {
      queue.push(action);
    }
  };

  const unconnect = yield connectDispatcher(handler);
  const channel = function channel() {
    if (!enabled) {
      return final;
    }
    if (queue.length) {
      return queue.shift();
    } else {
      return new Promise(function(resolve) {
        anticipant = resolve;
      });
    }
  };

  channel[CANCEL] = function(f) {
    final = f;
    enabled = false;
    anticipant = null;
    queue.split(0, queue.length);
    unconnect();
    originCancel(final);
  }

  channel[RESTANTE] = true;

  yield channel;
}

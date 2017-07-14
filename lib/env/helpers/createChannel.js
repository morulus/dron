import { CHANNEL } from 'erector/constants';
import { RESTANTE, CANCEL } from 'reciprocator';

/**
 * Create channel from function observer. The channel is the mechanism which stores data from any observable source. Each time you call channel it gives you one stored item. When the data ends it returns undefined.
 *
 * @example
 * const app = express();
 * const get = yield craeteChannel(function(next) {
 *   app.get('/', function (req, res) {
 *    next([req, res]);
 *   })
 * });
 *
 * @param  {type} provider description
 * @return {type}          description
 */
export default function craeteChannel(observer) {
  const sequence = [];
  let cancelled = false;
  let done = false;
  let completed = false;
  let final;
  let anticipant;
  let last;
  let tail;
  const destroyer = observer(
    (value) => {
      if (done) {
        return;
      }
      if (anticipant && !cancelled) {
        const preservedAnticipant = anticipant;
        anticipant = null;
        preservedAnticipant(value);
      } else {
        sequence.push(value);
      }

      if (sequence.length > 1000) {
        throw new Error("Dangerously count of observable result");
      }
    },
    // Done
    (payload) => {
      // The tail value, which will be returned each time channel will be
      // invoked after completed
      tail = payload;
      if (done) {
        return;
      }
      if (anticipant && !cancelled) {
        const preservedAnticipant = anticipant;
        anticipant = null;
        preservedAnticipant(undefined);
      } else {
        sequence.push(undefined);
      }
      done = true;
      if (typeof destroyer === 'function') {
        destroyer();
      }
    },
    (e) => {
      if (done) {
        return;
      }
      throw e;
    }
  );

  const channel = function channel() {
    if (cancelled) {
      done = true;
      completed = true;
      return final;
    }
    if (sequence.length) {
      return sequence.shift();
    } else {
      if (done) {
        return Promise.resolve(tail);
      } else {
        return new Promise(function(resolve, reject) {
          anticipant = resolve;
        });
      }
    }
  }

  channel[CANCEL] = function(f) {
    final = f;
    cancelled = true;
  }

  channel[CHANNEL] = true;

  channel[RESTANTE] = true;

  return channel;
}

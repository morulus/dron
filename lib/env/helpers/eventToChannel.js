import { CANCEL, RESTANTE } from 'reciprocator';

function defaultMapArgsToVar(value) {
  return value;
}

/**
 * Create channel from listener. Read about [channel](../channel.md) to understand the channels in Erector.
 * @example
 * const myEvents = new Events();
 * const onChange = yield emitterToChannel(myEvents, 'change');
 * yield fork(function* () {
 *  while (yield onChange()) {
 *    yield echo('Changed');
 *  }
 * });
 * onChange.emit('change');
 * @param {EventEmitter} emitter Instance of EventEmitter
 * @param {string} event event name
 * @param {function} [mapArgsToVar = defaultMapArgsToVar] Map args to variable
 */
export default function emitterToChannel(emitter, event, mapArgsToVar = defaultMapArgsToVar) {
  const queue = [];
  let anticipant;
  const handler = function(...args) {
    if (anticipant) {
      anticipant(mapArgsToVar(...args));
      anticipant = null;
    } else {
      queue.push(mapArgsToVar(...args));
    }
  };

  emitter.on(event, handler);

  const channel = function() {
    if (queue.length) {
      return queue.shift();
    } else {
      return new Promise(function(resolve) {
        anticipant = resolve;
      });
    }
  }

  channel[CANCEL] = function() {
    emitter.removeListener(event, handler);
    anticipant = null;
  }

  channel[RESTANTE] = true;

  return channel;
}

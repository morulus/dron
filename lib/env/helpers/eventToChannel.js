import { CANCEL, RESTANTE } from 'reciprocator';

function defaultMapArgsToVar(value) {
  return value;
}

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

import eventToChannel from './eventToChannel';
import Events from 'events';
import chokidar from 'chokidar';
import { CANCEL, RESTANTE } from 'reciprocator';

export default function* watch(target, options) {
  const channels = [];
  const watcher = chokidar.watch(target, {
    ignoreInitial: true,
    awaitWriteFinish: {
      stabilityThreshold: 500,
      pollInterval: 100,
    },
    ...options,
  });

  const erectedWatcher = {
    on: function* (eventName) {
      const channel = yield eventToChannel(watcher, eventName);
      const orgCancel = channel[CANCEL];
      channels.push(channel);
      channel[CANCEL] = function() {
        channels.splice(channels.indexOf(channel), 1);
        orgCancel();
      }

      channel[RESTANTE] = true;

      yield channel;
    },
    add: (...args) => {
      watcher.add(args);
      return erectedWatcher;
    },
    [CANCEL]: () => {
      channels.forEach(channel => channels[CANCEL]());
    }
  }

  yield erectedWatcher;
}

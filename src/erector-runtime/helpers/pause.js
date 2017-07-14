import setupThrobber from 'cli-color/throbber';
import { RESTANTE } from 'reciprocator';

const throbber = setupThrobber(function (str) {
  process.stdout.write(str);
}, 100);

export default function pause(delay = 0) {
  let outsideResolver;
  throbber.start();
  const start = new Date().getTime();
  const retinaculum = new Promise(function(resolve) {
    outsideResolver = resolve;
  });
  if (delay) {
    setTimeout(() => {
      throbber.stop();
      outsideResolver();
    }, delay);
    return retinaculum;
  } else {
    const callbackFn = (postDelay = 0) => {
      return () => {
        if (postDelay) {
          return new Promise((resolve) => {
            setTimeout(() => {
              throbber.stop();
              outsideResolver();
              resolve(new Date().getTime() - start);
            }, postDelay);
          });
        } else {
          throbber.stop();
          outsideResolver();
          return new Date().getTime() - start;
        }
      };
    };
    callbackFn[RESTANTE] = true;
    return callbackFn;
  }
}

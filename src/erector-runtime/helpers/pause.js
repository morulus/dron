// import setupThrobber from 'cli-color/throbber';
import echo from './echo';
import fork from './fork';
import { RESTANTE } from 'reciprocator';
//
// const throbber = setupThrobber(function (str) {
//   process.stdout.write(str);
// }, 100);

export default function* pause(delay = 0) {
  let outsideResolver;
  yield echo.type(THROBBER_START, 'start');
  const start = new Date().getTime();
  const retinaculum = new Promise(function(resolve) {
    outsideResolver = resolve;
  });
  if (delay) {
    yield fork(function() {
      return new Promise(function(resolve) {
        setTimeout(() => {
          resolve(function* () {
            yield echo.type(THROBBER_STOP, 'done');
            outsideResolver();
          });
        }, delay);
      });
    });
    return retinaculum;
  } else {
    const callbackFn = (postDelay = 0) => {
      return function* () {
        if (postDelay) {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(function* () {
                yield echo.type(THROBBER_STOP, 'done');
                outsideResolver();
                return new Date().getTime() - start;
              });
            }, postDelay);
          });
        } else {
          yield echo.type(THROBBER_STOP, 'done');
          outsideResolver();
          return new Date().getTime() - start;
        }
      };
    };
    callbackFn[RESTANTE] = true;
    return callbackFn;
  }
}

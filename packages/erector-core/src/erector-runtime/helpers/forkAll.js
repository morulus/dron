import fork from './fork';
import { CANCEL } from 'reciprocator';


/**
 * Fork multiple tasks.
 * @example
 * const asyncTasks = forkAll(
 *  Promise.resolve(1),
 *  Promise.resolve(2),
 *  Promise.resolve(3),
 * );
 * yield echo(asyncTasks);
 * // [1, 2, 3]
 * @param  {...any} ...subjects
 * @return {function}
 */
export default function* forkAll(...subjects) {
  const sausages = [];
  for (let i = 0; i < subjects.length; ++i) {
    sausages[i] = yield fork(subjects[i]);
  }
  const forkHandler = function* () {
    const results = [];
    for (let i = 0; i < subjects.length; ++i) {
      results[i] = yield sausages[i];
    }
    return results;
  }

  forkHandler[CANCEL] = function() {
    sausages.forEach(sausage => sausages[CANCEL]());
    sausages.splice(0);
  }

  return forkHandler;
}

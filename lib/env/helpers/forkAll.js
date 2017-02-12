import { fork } from 'erector';
import { CANCEL } from 'reciprocator';

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

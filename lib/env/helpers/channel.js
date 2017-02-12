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

export default function channel(subject) {
  return function(state, store) {
    const sequence = [];
    let enabled = true;
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
      if (sequence.length) {
        return sequence.shift();
      } else {
        return new Promise(function(resolve, reject) {
          anticipant = resolve;
        });
      }
    }

    batcher[CANCEL] = function() {
      enabled = false;
    }

    batcher[RESTANTE] = true;

    return batcher;
  }
}

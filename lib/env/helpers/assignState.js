import { ACTION_SET_STATE } from 'dron-constants';

export default function assignToState(state) {
  return function() {
    return store.run(state, this.getState())
    .then((props) => {
      this.dispatch({
        type: ACTION_SET_STATE,
        state: Object.assign(this.getState(), merge(state))
      });
      return this.getState();
    });
  }
}

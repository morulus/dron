import { dispatch } from './dispatch';
import { MESSAGE } from './../../loopback-run';
export default function echo(...messages) {
  return function () {
    dispatch({
      type: MESSAGE,
      message: messages
    });
    return true;
  }
}

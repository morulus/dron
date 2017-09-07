import dispatch from './dispatch';
import {
  OPEN_FILE
} from '../../constants';

export default function openFile(filename) {
  return dispatch({
    type: OPEN_FILE,
    filename,
  });
}

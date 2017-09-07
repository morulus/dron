import dispatch from './dispatch';
import {
  OPEN_DIRECTORY
} from '../../constants';

export default function openFile(dirname) {
  return dispatch({
    type: OPEN_DIRECTORY,
    dirname,
  });
}

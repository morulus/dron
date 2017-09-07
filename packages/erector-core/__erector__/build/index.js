import { echo } from 'erector';
import helpers from './tasks/helpers.js';

export default function* () {
  yield echo('Start building...');
  yield helpers;
}

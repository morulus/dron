import { cwdSelector } from 'erector/selectors';
import searchLocalErectorDirectories from 'erector-node-utils/searchLocalErectorDisposition';

export default function* getDir(state) {
  const dirs = yield searchLocalErectorDirectories(cwdSelector(state));
  if (dirs.length === 0) {
    throw new Error("No erector disposition found");
  }
  return {
    dir: dirs[0],
  };
}

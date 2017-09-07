import getErectorScriptNamesInDirectory from '/Users/morulus/Work/morulus/projects/erector-node-utils/getErectorScriptNamesInDirectory';

export default function* getExistenLocalNames({ dir }) {
  return {
    existenNames: getErectorScriptNamesInDirectory(dir),
  };
}

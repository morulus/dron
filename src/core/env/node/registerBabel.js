const child_process = require('child_process');
const path = require('path');
const requireg = require('requireg');
const resolveLocalScripts = require('./resolveLocalScripts');
const ERECTOR_LOCAL_DIRS = require('../../../constants').ERECTOR_LOCAL_DIRS;
const getBabelConfiguration = require('../../../../tools/getBabelConfiguration.js');

const CONSTANTS_PATH = path.resolve(__dirname, '../../../constants.js');
const SELECTORS_PATH = path.resolve(__dirname, '../../../selectors.js');
const ERECTOR_PATH = path.resolve(__dirname, '../../../erector-runtime/entry.js');

module.exports = function registerBabel(mwd) {
  const aliases = {
    "erector/constants": CONSTANTS_PATH,
    "erector/selectors": SELECTORS_PATH,
    "erector": ERECTOR_PATH,
    "module": mwd
  };
  const globalPackages = child_process.execSync('npm config get erector.global.packages').toString();
  if (globalPackages) {
    globalPackages
    .trim()
    .split(';')
    .forEach(function(packageName) {
      if (packageName && packageName !== 'undefined') {
        const basename = path.basename(packageName);
        if (!aliases[basename]) {
          if (!path.isAbsolute(packageName)) {
            packageName = requireg.resolve(packageName);
          }
          aliases[basename] = packageName;
        }
      }
    });
  }
  require('babel-register')(getBabelConfiguration({
    root: mwd,
    aliases,
    resolvePath: resolveLocalScripts(ERECTOR_LOCAL_DIRS),
    ignore: function(path) {
      if (
        /node_modules/.test(path)
        || /dist\/erector\-runtime/.test
      ) {
        return true;
      }
      return false;
    },
  }));
}

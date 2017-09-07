const Module = require('module');
const child_process = require('child_process');
const path = require('path');
const requireg = require('requireg');
const resolveLocalScripts = require('./resolveLocalScripts');
const ERECTOR_LOCAL_DIRS = require('../../../constants').ERECTOR_LOCAL_DIRS;
const getBabelConfiguration = require('../../../../tools/getBabelConfiguration.js');

const CONSTANTS_PATH = path.resolve(__dirname, '../../../constants.js');
const SELECTORS_PATH = path.resolve(__dirname, '../../../selectors.js');
const ERECTOR_PATH = path.resolve(__dirname, '../../../erector-runtime/entry.js');

module.exports = function registerBabel(mwd, config = {}) {


  // Clear Node's global search paths.
  // Module.globalPaths.length = 0
  // Clear current and parent(init.js)'s search paths.
  // module.paths = []
  // module.parent.paths = []

  // Prevent Node from adding paths outside this app to search paths.
  // const resourcesPathWithTrailingSlash = process.resourcesPath + path.sep
  // const originalNodeModulePaths = Module._nodeModulePaths
  // Module._nodeModulePaths = function (from) {
  //   const paths = originalNodeModulePaths(from)
  //   const fromPath = path.resolve(from) + path.sep
  //   // If "from" is outside the app then we do nothing.
  //   if (fromPath.startsWith(resourcesPathWithTrailingSlash)) {
  //     return paths.filter(function (candidate) {
  //       return candidate.startsWith(resourcesPathWithTrailingSlash)
  //     })
  //   } else {
  //     return paths
  //   }
  // }

  // Patch Module._resolveFilename to always require the Electron API when
  // require('electron') is done.
  // const electronPath = path.join(__dirname, '..', process.type, 'api', 'exports', 'electron.js')

  const aliases = {
    "erector/constants": CONSTANTS_PATH,
    "erector/selectors": SELECTORS_PATH,
    "erector": ERECTOR_PATH,
    // "module": mwd, // Deprecated "module", is a nodejs resource
    "babel-runtime/regenerator": require.resolve("babel-runtime/regenerator")
  };

  const regeneratorRuntime = require.resolve("babel-runtime/regenerator");
  const _resolveFilename = Module._resolveFilename;
  Module._resolveFilename = function (request, parent, isMain) {
    if (aliases[request]) {
      return aliases[request];
    } else {
      return _resolveFilename(request, parent, isMain)
    }
  }
  // const globalPackages = child_process.execSync('npm config get erector.global.packages').toString();
  // if (globalPackages) {
  //   globalPackages
  //   .trim()
  //   .split(';')
  //   .forEach(function(packageName) {
  //     if (packageName && packageName !== 'undefined') {
  //       const basename = path.basename(packageName);
  //       if (!aliases[basename]) {
  //         if (!path.isAbsolute(packageName)) {
  //           packageName = requireg.resolve(packageName);
  //         }
  //         aliases[basename] = packageName;
  //       }
  //     }
  //   });
  // }
  require('babel-register')(getBabelConfiguration({
    root: mwd,
    aliases,
    resolvePath: resolveLocalScripts(ERECTOR_LOCAL_DIRS),
    ignore: function(path) {
      if (
        /node_modules/.test(path)
        || /dist\/erector\-runtime/.test(path)
      ) {
        return true;
      }
      return false;
    },
    extensions: config.extensions || ['.es', '.js', '.jsx'],
    runtime: config.runtime,
  }));
}

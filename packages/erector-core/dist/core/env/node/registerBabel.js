'use strict';

var Module = require('module');
var child_process = require('child_process');
var path = require('path');
var requireg = require('requireg');
var resolveLocalScripts = require('./resolveLocalScripts');
var ERECTOR_LOCAL_DIRS = require('../../../constants').ERECTOR_LOCAL_DIRS;
var getBabelConfiguration = require('../../../../tools/getBabelConfiguration.js');

var CONSTANTS_PATH = path.resolve(__dirname, '../../../constants.js');
var SELECTORS_PATH = path.resolve(__dirname, '../../../selectors.js');
var ERECTOR_PATH = path.resolve(__dirname, '../../../erector-runtime/entry.js');

module.exports = function registerBabel(mwd) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


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

  var aliases = {
    "erector/constants": CONSTANTS_PATH,
    "erector/selectors": SELECTORS_PATH,
    "erector": ERECTOR_PATH,
    // "module": mwd, // Deprecated "module", is a nodejs resource
    "babel-runtime/regenerator": require.resolve('/Users/morulus/Work/morulus/projects/erector/node_modules/erector-core-transform-config/node_modules/regenerator-runtime/runtime-module.js')
  };

  var regeneratorRuntime = require.resolve('/Users/morulus/Work/morulus/projects/erector/node_modules/erector-core-transform-config/node_modules/regenerator-runtime/runtime-module.js');
  var _resolveFilename = Module._resolveFilename;
  Module._resolveFilename = function (request, parent, isMain) {
    if (aliases[request]) {
      return aliases[request];
    } else {
      return _resolveFilename(request, parent, isMain);
    }
  };
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
    aliases: aliases,
    resolvePath: resolveLocalScripts(ERECTOR_LOCAL_DIRS),
    ignore: function ignore(path) {
      if (/node_modules/.test(path) || /dist\/erector\-runtime/.test(path)) {
        return true;
      }
      return false;
    },
    extensions: config.extensions || ['.es', '.js', '.jsx'],
    runtime: config.runtime
  }));
};
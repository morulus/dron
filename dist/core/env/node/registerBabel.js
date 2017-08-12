'use strict';

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

  var aliases = {
    "erector/constants": CONSTANTS_PATH,
    "erector/selectors": SELECTORS_PATH,
    "erector": ERECTOR_PATH,
    "module": mwd
  };
  var globalPackages = child_process.execSync('npm config get erector.global.packages').toString();
  if (globalPackages) {
    globalPackages.trim().split(';').forEach(function (packageName) {
      if (packageName && packageName !== 'undefined') {
        var basename = path.basename(packageName);
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
    aliases: aliases,
    resolvePath: resolveLocalScripts(ERECTOR_LOCAL_DIRS),
    ignore: function ignore(path) {
      if (/node_modules/.test(path) || /dist\/erector\-runtime/.test(path)) {
        return true;
      }
      return false;
    },
    extensions: config.extensions || ['.es', '.js', '.jsx']
  }));
};
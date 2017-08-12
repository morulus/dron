'use strict';

var path = require('path');
var requireg = require('requireg');
var npmErectModuleExpr = /^erector-[a-z0-9\-_]+$/i;
var preInstallPackage = require('./preInstallPackage.js');

module.exports = function autoinstallPackage(shortName, resolvePackage) {
  var packageName = !npmErectModuleExpr.exec(dpn) ? 'erector-' + dpn : dpn;
  if (preInstallPackage(packageName)) {
    return resolvePackage(dpn);
  } else {
    throw new Error('Package `' + dpn + '` is not exists');
  }
};
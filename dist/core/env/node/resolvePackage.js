"use strict";

var path = require('path');
var requireg = require('requireg');
var npmErectModuleExpr = /^erector-[a-z0-9\-_]+$/i;
var preInstallPackage = require('./preInstallPackage.js');

module.exports = function resolvePackage(dpn, local) {
  var trying = 0;
  // Resolve from own packages
  try {
    return require.resolve(path.resolve(__dirname, '../scripts/' + dpn + '.js'));
  } catch (e) {
    var packageName = !npmErectModuleExpr.exec(dpn) ? 'erector-' + dpn : dpn;
    try {
      return require.resolve(packageName);
    } catch (e) {
      try {
        if (e.code == 'MODULE_NOT_FOUND') {
          var localPath = path.join(process.cwd(), 'node_modules', packageName);
          return require.resolve(localPath);
        } else {
          return new Error('Package ' + packageName + ' have errors: ' + e.message + ' ' + e.stack);
        }
      } catch (e) {
        if (e.code == 'MODULE_NOT_FOUND') {
          try {
            var _module = requireg.resolve(packageName);
            if (!_module) {
              if (e.code == 'MODULE_NOT_FOUND' || ~e.message.indexOf('Cannot find global module')) {
                // Module is not exists. Lets try to install it.
                if (!local) {
                  console.log('Autoinstall package...');
                  if (preInstallPackage(packageName)) {
                    return resolvePackage(dpn, true);
                  } else {
                    return new Error('Package `' + dpn + '` is not exists');
                  }
                } else {
                  return new Error('Package `' + dpn + '` is not exists');
                }
              } else {
                var shortPackageName = packageName.split('/').pop();
                return new Error('Package ' + shortPackageName + ' has an errors. Run `erector debug ' + packageName + '` to find a problem.');
              }
            } else {
              return _module;
            }
          } catch (e) {
            return new Error("Undefined module `" + packageName + "`");
          }
        } else {
          console.log(e.stack);
          return false;
        }
      }
    }
  }
};
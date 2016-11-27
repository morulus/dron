"use strict";
const path = require('path');
const requireg = require('requireg');
const npmDronModuleExpr = /^dron-[a-z0-9\-_]+$/i;
module.exports = function resolvePackage(dpn) {
  let trying = 0;
  let packageName = !npmDronModuleExpr.exec(dpn) ? 'dron-'+dpn : dpn;
  try {
    return require.resolve(packageName);
  } catch(e) {
    try {
      if (e.code=='MODULE_NOT_FOUND') {
        let localPath = path.join(process.cwd(), 'node_modules', packageName);
        return require.resolve(localPath);
      } else {
        return new Error(`Package ${packageName} have errors: `+e.message+' '+e.stack);
      }
    } catch(e) {
      if (e.code=='MODULE_NOT_FOUND') {
        try {
          return requireg.resolve(packageName);
        } catch(e) {
          if (e.code=='MODULE_NOT_FOUND'||~e.message.indexOf('Cannot find global module')) {
            console.log('Autoinstall package...');
            // Module is not exists. Lets try to install it.
            console.log('Autoinstalling is not supported yet');
            return false;
          } else {
            let shortPackageName = (packageName.split('/').pop());
            console.log('Package '+shortPackageName+' has an errors. Run `dron debug '+packageName+'` to find a problem.');
            return false;
          }
        }
      } else {
        console.log(e.stack);
        return false;
      }
    }
  }
}

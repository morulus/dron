"use strict";
const runModule = require('./runModule.js');
const resolvePackage = require('./resolvePackage.js');
module.exports = function runPackage(packageName, args, env) {
  const module = resolvePackage(packageName);
  if (module) {
    return runModule(module, args, env||{});
  } else {
    return Promise.reject('Corrupt package `'+packageName+'`')
  }
}

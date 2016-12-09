"use strict";
const runModule = require('./runModule.js');
const resolvePackage = require('./resolvePackage.js');
module.exports = function runPackage(packageName, args, env) {
  const m = resolvePackage(packageName);
  if (m&&!(m instanceof Error)) {
    return runModule(m, args, env||{});
  } else {
    return Promise.reject('Corrupt package `'+packageName+'`')
  }
}

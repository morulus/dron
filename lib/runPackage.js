"use strict";
const runFile = require('./runFile.js');
const resolvePackage = require('./resolvePackage.js');
module.exports = function runPackage(packageName, args) {
  const module = resolvePackage(packageName);
  if (module) {
    return runFile(module, args);
  } else {
    return Promise.reject('Corrupt package ``'+packageName+'`')
  }
}

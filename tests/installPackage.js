"use strict";
const packageName = process.argv[2];
const preInstallPackage = require('./../lib/preInstallPackage.js');
const result = preInstallPackage(packageName);
console.log('result', result);

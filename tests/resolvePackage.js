"use strict";
const packageName = process.argv[2];
const resolvePackage = require('./../lib/resolvePackage.js');
const result = resolvePackage(packageName);
console.log('result', result);

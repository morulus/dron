"use strict";

var fs = require('fs');
var path = require('path');
var isDirSync = require('./isDirSync.js');

module.exports = function searchFolderInParentDirs(startDir, folderName) {
  var currentParentDir = startDir;
  while (true) {
    var targetDir = path.resolve(currentParentDir, './' + folderName);
    if (isDirSync(targetDir)) {
      return targetDir;
    }
    var nextParentDir = path.resolve(currentParentDir, '../');
    if (nextParentDir === currentParentDir) {
      return false;
    }
    currentParentDir = nextParentDir;
  }
};
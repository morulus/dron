"use strict";
const fs = require('fs');
const path = require('path');
const isDirSync = require('./isDirSync.js');

module.exports = function searchFolderInParentDirs(startDir, folderName) {
  let currentParentDir = startDir;
  while (true) {
    const targetDir = path.resolve(currentParentDir, './'+folderName);
    if (isDirSync(targetDir)) {
      return targetDir;
    }
    const nextParentDir = path.resolve(currentParentDir, '../');
    if (nextParentDir === currentParentDir) {
      return false;
    }
    currentParentDir = nextParentDir;
  }
}

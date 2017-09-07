"use strict";

var fs = require("fs");

module.exports = function isDir(filepath) {
  try {
    var stats = fs.lstatSync(filepath);
    return stats.isDirectory();
  } catch (e) {
    return false;
  }
};
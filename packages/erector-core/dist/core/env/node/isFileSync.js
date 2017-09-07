"use strict";

var fs = require("fs");
module.exports = function isFileSync(filename) {
  try {
    var stats = fs.lstatSync(filename);
    return !stats.isDirectory();
  } catch (e) {
    return false;
  }
};
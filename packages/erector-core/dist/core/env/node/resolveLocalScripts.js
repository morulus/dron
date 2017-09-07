'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = resolveLocalScripts;
var path = require('path');
var resolvePath = require('babel-plugin-module-resolver').resolvePath;

function resolveLocalScripts(dirs) {
  return function resolveLocalPath(sourcePath, currentFile, opts) {
    var splitedPath = sourcePath.split(path.sep);
    var firstDir = splitedPath.shift();
    var startDir = path.dirname(sourcePath);
    if (~dirs.indexOf(firstDir)) {
      while (true) {
        var targetFolder = searchFolderInParentDirs(startDir);
        if (!targetFolder) {
          break;
        } else {
          var targetSource = path.join(targetFolder, splitedPath.join(path.sep));
          try {
            return require.resolve(targetSource);
          } catch (e) {
            var parentFromSource = path.resolve(targetFolder, '..');
            var nextStartDir = startDir === parentFromSource ? path.resolve(parentFromSource, '..') : parentFromSource;
            if (nextStartDir === startDir) {
              break;
            }
            startDir = nextStartDir;
            continue;
          }
        }
      }
    }
    var resolvedPath = resolvePath(sourcePath, currentFile, opts);
    return resolvedPath;
  };
}
module.exports = exports['default'];
const path = require('path');
const resolvePath = require("babel-plugin-module-resolver").resolvePath;

export default function resolveLocalScripts(dirs) {
  return function resolveLocalPath(sourcePath, currentFile, opts) {
    const splitedPath = sourcePath.split(path.sep);
    const firstDir = splitedPath.shift();
    let startDir = path.dirname(sourcePath);
    if (~dirs.indexOf(firstDir)) {
      while (true) {
        const targetFolder = searchFolderInParentDirs(startDir);
        if (!targetFolder) {
          break;
        } else {
          const targetSource = path.join(targetFolder, splitedPath.join(path.sep));
          try {
            return require.resolve(targetSource);
          } catch (e) {
            const parentFromSource = path.resolve(targetFolder, '..');
            const nextStartDir = startDir === parentFromSource
              ? path.resolve(parentFromSource, '..')
              : parentFromSource;
            if (nextStartDir === startDir) {
              break;
            }
            startDir = nextStartDir;
            continue;
          }
        }
      }
    }
    const resolvedPath = resolvePath(sourcePath, currentFile, opts);
    return resolvedPath;
  }
}

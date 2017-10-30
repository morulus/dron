const fs = require('fs');
const path = require('path');
const resolveModuleLocation = require('erector-node-utils/resolveModuleLocation');
const searchLocalErectorDisposition = require('erector-node-utils/searchLocalErectorDisposition');
const findParentDir = require('find-parent-dir');
const mv = require('mv');
const log = require('../log.js');

module.exports = function climb(args) {
  const moduleName = args._[1];
  const state = {};
  if (!moduleName) {
    log('Module name must be specified');
    process.exit(0);
  }
  resolveModuleLocation(moduleName, process.cwd())
  .then(function(filename) {

    const locationDir = path.dirname(filename);
    if (path.basename(locationDir) !== '__erector__') {
      // We are inside package, search for __erector__
      let lastDir = false;
      let currentDir = locationDir;
      while (
        path.basename(path.dirname(currentDir)) !== '__erector__'
        || lastDir === currentDir
      ) {
        lastDir = currentDir;
        currentDir = path.basename(currentDir);
      }
      if (lastDir === currentDir) {
        log('Source file is not in erector disposition');
        process.exit(1);
      }
      state.source = currentDir;
    } else {
      state.source = filename;
    }
    return searchLocalErectorDisposition(path.dirname(state.source));
  })
  .then(function(parentDispositions) {
    if (parentDispositions.length < 2) {
      log('Cannot elevate script, because there is no upper erector disposition');
      process.exit(1);
    }
    const targetDir = parentDispositions[1];
    // Check for same file/folder existen
    const targetFilename = path.join(targetDir, path.basename(state.source));
    if (fs.existsSync(path.join(targetDir, targetFilename))) {
      log('Cannot elevate script, because the file '+targetFilename+' same name already exists');
      process.exit(1);
    }
    mv(state.source, targetFilename, {
      mkdirp: true
    }, function(err) {
      if (err) {
        log('Error did happen: '+err.message);
        process.exit(1);
      }
      log('Moved to '+targetFilename);
    });
  });
}

const path = require('path');
const fs = require('fs');
const os = require('os');
const uuid4 = require('uuid4');
const cutArgsCommands = require('./cutArgsCommands.js');

const GIST_URL_REGEX = /^^http[s]?:\/\/gist\.github\.com\/[^\/]+\/([^\/]+)[\/]?([^\/]*)$/i;
const DEFAULT_GIST_ERECTFILE = 'index.js';
const GIST_MAIN_FILE_EXTRACT_NAME_REGEXP = /^[\.\/]*(.*)$/i;

function resolveGistFileToExecute(files, fileId) {
  if (!fileId) {
    // Resolve for main in package.json
    if (files['package.json']) {
      try {
        const packageJson = JSON.parse(files['package.json']);
        if (packageJson.main) {
          const extractName = GIST_MAIN_FILE_EXTRACT_NAME_REGEXP.exec(packageJson.main);
          if (extractName) {
            fileId = extractName[1];
            if (files[fileId]) {
              return files[fileId];
            }
          }
        }
      } catch(e) {
        // Skip
      }
    }
  }

  // Resolve single file
  if (!fileId) {
    const executableFiles = values(files).filter(function(file) {
      return file.type === 'application/javascript';
    });
    if (executableFiles.length === 1) {
      return executableFiles[0];
    }
  }

  // Resolve index.js
  if (!fileId) {
    if (files[DEFAULT_GIST_ERECTFILE]) {
      return files[DEFAULT_GIST_ERECTFILE];
    }
  }

  // Resolve custom
  return fileId ? files[fileId] : false;
}

module.exports = function(app) {
  return function(state) {
    const command = state.command;
    const args = state.args;
    // Check for gist
    if (GIST_URL_REGEX.test(command)) {
      const extract = GIST_URL_REGEX.exec(command);
      const id = extract[1];
      const fileId = extract[2] || DEFAULT_GIST_ERECTFILE;
      const GitHub = require('github-base');
      const github = new GitHub();
      return new Promise(function(resolve) {
        github.get('/gists/:id', {
          id
        }, function(err, res) {
          if (err) {
            throw err;
          }
          const file = resolveGistFileToExecute(res.files, fileId)
          if (!file) {
            throw new Error('Gist contains no executable javascript file')
          }
          resolve([res, fileId]);
        });
      }).then(function(data) {
        const resource = data[0];
        const fileToExecute = data[1];
        const erectorTmp = path.join(os.tmpdir(), 'erector.tmp');
        // Localize and execute
        if (!fs.existsSync(erectorTmp)) {
          fs.mkdirSync(erectorTmp);
        }
        let temoraryDir = path.join(os.tmpdir(), 'erector.tmp', 'erect__Gist'+id);
        while (fs.existsSync(temoraryDir)){
          temoraryDir = path.join(os.tmpdir(), 'erector.tmp', 'erect__Gist'+id+'___'+uuid4());
        }
        fs.mkdirSync(temoraryDir);
        for (let prop in resource.files) {
          const file = resource.files[prop];
          if (!file.truncated) {
            fs.writeFileSync(path.join(temoraryDir, file.filename), file.content);
          } else {
            throw new Error('Truncated files are not supported yet');
          }
        }
        return {
          temoraryDir: temoraryDir,
          filename: path.join(temoraryDir, fileToExecute),
        };
      }).then(function(options) {
        const filename = options.filename;
        const temoraryDir = options.temoraryDir;
        return app.run(filename, cutArgsCommands(state.args), {
          autoinstall: false
        }).then(function(payload) {
          // Clean up tmp
          require('rimraf')(temoraryDir, function() {

          });
          return payload;
        }).catch(function(e) {
          // Clean up tmp
          require('rimraf')(temoraryDir, function() {

          });
          throw e;
        });
      });
    }
    return false;
  };
}


// exec('curl "'+zipGistUrl+'" | tar zx --strip-components 1', {
//   cwd: temoraryDir,
// }, function(error, stdout, stderr) {
//   if (error) {
//     console.log(error);
//     throw new Error('Unreachable gist resource');
//   }
//   // Search user file
//   if (fileId) {
//     try {
//       let stats = fs.lstatSync(filepath);
//       if (!stats.isDirectory()) {
//         resolve([filepath].concat(state.slice(1)));
//         return;
//       }
//     } catch (e) {
//       // Ignore
//     }
//   }
//   // Resolve package file
//   const dirFiles = fs.readdirSync(temoraryDir);
//   const packageJsonName = dirFiles.find(name => name.toLowerCase() === 'package.json');
//   if (packageJsonName) {
//     const indexFile = require.resolve(temoraryDir);
//     resolve([indexFile].concat(state.slice(1)));
//     return;
//   }
//   throw new Error('Unexpected error while fetching gist');
// });

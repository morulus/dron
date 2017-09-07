import { __CONFIG__ } from '../../constants';
import { exec } from 'child_process';
/**
 * Execute shell command and get the output as the result.
 * ```js
 * const npmVersion = yield exec('npm -v');
 * ```
 * You can specify `cwd`:
 * ```js
 * const ls = yield exec('ls', {
 *  cwd: '/path/to/folder',
 * });
 * ```
 * It decorates the function `exec` of the package [child_process](https://www.npmjs.com/package/child_process), thus it uses all the same options.
 * @param {string} com Command
 * @param {object} opt Options
 */
function execHelper(com, opt = {}) {
  return function shellExec(state) {
    const defOpt = {
      cwd: state[__CONFIG__].pwd,
    };
    return new Promise((resolve, reject) => {
      try {
        const child = exec(com, {
          ...defOpt,
          ...opt,
        }, function(error, stdout, stderr) {
          if (!error) {
            resolve(stdout);
          } else {
            reject(error);
          }
        });
        // child.stderr.on('data', (error) => {
        //   reject(error);
        // });
      } catch(e) {
        reject(e);
      }
    });
  }
}

execHelper.prepare = function(constOpt) {
  return function customExec(com, opt) {
    return execHelper(com, {
      ...constOpt,
      ...opt,
    });
  }
}

export default execHelper;

import { __CONFIG__ } from 'erector/constants';
import { exec } from 'child_process';

export default function shellExecHOC(com, opt = {}) {
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
          if (error) {
            reject(error);
          }
          resolve(stdout);
        });
        child.stderr.on('data', (str) => {
          console.log(str);
        });
      } catch(e) {
        reject(e);
      }
    });
  }
}

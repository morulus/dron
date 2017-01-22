import childProcess from 'child_process';

export default function shell(com, args, std={}) {
  return function() {
    return new Promise((resolve, reject) => {
      const command = childProcess.spawn(com, args, Object.assign({
        stdin: 'inherit'
      }, std));
      let result = '';
      command.stdout.on('data', function(data) {
           result += data.toString();
      });
      command.on('close', function(code) {
          resolve(result);
      });
    });
  }
}

import { ncp } from 'ncp';
ncp.limit = 128;

export default function copy(source, destination, opt = {}) {
  return function() {
    return new Promise(function(resolve, reject) {
      ncp(source, destination, {
        ...opt
      }, function (err) {
       if (err) {
         reject(err);
       } else {
         reject();
       }
      });
    });
  }
}

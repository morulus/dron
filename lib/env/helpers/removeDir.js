import fs from 'fs';

function unsafeRemoveDirectory(path) {
  if( fs.existsSync(path) ) {
    fs.readdirSync(path).forEach(function(file, index){
      const curPath = path + "/" + file;
      if(fs.lstatSync(curPath).isDirectory()) {
        unsafeRemoveDirectory(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
}

export default function(dirname, forceDeleteNotEmpty = false) {
  return function() {
    if (forceDeleteNotEmpty) {
      unsafeRemoveDirectory(dirname);
    } else {
      if (fs.readdirSync(dirname).length) {
        throw new Error(`Directory ${dirname} is not empty`);
      }
      fs.rmdirSync(dirname);
    }
    return true;
  }
}

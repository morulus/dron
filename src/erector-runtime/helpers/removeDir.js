import digest from './digest';
import fs from 'fs';
import path from 'path';
import { __CONFIG__ } from '../../constants';

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
  return function* (state) {
    const resolvedDirname = yield digest(dirname);
    const absoluteDirname = path.resolve(state[__CONFIG__].pwd, resolvedDirname);
    if (forceDeleteNotEmpty) {
      unsafeRemoveDirectory(absoluteDirname);
    } else {
      if (fs.readdirSync(absoluteDirname).length) {
        throw new Error(`Directory ${dirname} is not empty`);
      }
      fs.rmdirSync(absoluteDirname);
    }
    yield true;
  }
}

import fs from 'fs';

export default function(file) {
  return function() {
    fs.unlinkSync(file);

    return true;
  }
}

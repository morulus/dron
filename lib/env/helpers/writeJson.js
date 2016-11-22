import writeFile from 'writeFile';
export default function writeJson(filename, content, encode = 'utf-8', replacer = null, space = 2) {
  return writeFile(filename, JSON.stringify(content, replacer, space), encode);
}

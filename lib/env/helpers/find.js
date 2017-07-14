import { getState, createChannel } from 'erector';
import vfs from 'vinyl-fs';
import map from 'map-stream';
import { __CONFIG__ } from 'erector/constants';
import path from 'path';


/**
 * Find files by mask and get result as the channel.
 * This helper reproduce functionality of [vinyl-fs](https://www.npmjs.com/package/vinyl-fs)
 * package. Each channel result is array of [file, cb].
 *
 * File contains two base properties: path, contents.
 * - `path` {string} is a abslute path to target file
 * - `contents` {Buffer} File contents in Buffer format
 *
 * In moust usual cases you may to use this tool to find some files and
 * do somthing with each of it.
 *
 * First, you should to create channel
 * ```js
 * const files = yield find(['*.js'], {});
 *
 * ```
 *
 * @param  {type} globs        description
 * @param  {type} options = {} description
 * @return {type}              description
 */
export default function find(globs, options = {}) {
  return (state) => {
    const filesStream = vfs.src(globs, {
      ...options,
      cwd: path.resolve(state[__CONFIG__].pwd, options.cwd || '.'),
    });
    const filesChannel = createChannel(function(next, done) {
      filesStream.on('end', function() {
        done();
      });

      filesStream.pipe(map(function(file, cb) {
        next([file, cb]);
      }));
    });
    filesChannel.dest = function(...args) {
      filesStream.pipe(vfs.dest(...args));
      return filesChannel;
    };
    filesChannel.stream = filesStream;
    return filesChannel;
  }
}

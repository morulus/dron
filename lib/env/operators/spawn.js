import crossSpawn from 'cross-spawn';

export default function spawn(command, args, std={}) {
  return function() {
    return crossSpawn.sync(command, args, Object.assign({
	      stdio: [std.stdin||process.stdin, std.stdout||process.stdout, std.stderr||"inherit"]
	    }, std||{}));
  }
}

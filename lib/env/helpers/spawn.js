return default function spawn(command, args, std={}) {
  return function() {
    return spawn.sync(command, args, Object.assign({
	      stdio: [std.stdin||process.stdin, std.stdout||process.stdout, std.stderr||"inherit"]
	    }, options||{}));
  }
}

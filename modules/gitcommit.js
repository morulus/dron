var spawn = require('cross-spawn');
var util = require('util');
var _ = require('lodash');
module.exports = function(options) {
	return function() {
		var argsPairs = _.toPairs(options.args||{}).map(function(v, key) {
			return key+("string"===typeof v ? (' '+v) : '');
		}).join(' ');
    spawn.sync("git", ["add", "-A"], {
      stdio: ["ignore", "inherit", "inherit"]
    });
		spawn.sync("git", (["commit", "-m", ''+options.message.replace('"', '\\"')+'']).concat(argsPairs), {
      stdio: ["ignore", "inherit", "inherit"]
    });
    this.log('Commit: '+options.message);
		return true;
	}
}

var spawn = require('cross-spawn');
var util = require('util');
var _ = require('lodash');
module.exports = function(options) {
	return function() {
		var argsPairs = _.toPairs(options.args||{}).map(function(v, key) {
			return key+("string"===typeof v ? (' '+v) : '');
		}).join(' ');
		output = spawn.sync("npm", (["install"]).concat(options.dependencies).concat(argsPairs), {
	      stdio: ["ignore", "pipe", "inherit"]
	    });
		return true;
	}
}

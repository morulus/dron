'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var spawn = require('cross-spawn');
var stream = require('stream');

module.exports = function preInstallPackage(packageName) {
	var writable = new stream.Writable({
		write: function write(chunk, encoding, next) {
			next();
		}
	});
	var result = spawn.sync('npm', ['install', packageName, '-g'], _extends({
		stdio: ['inherit', 'inherit', "inherit"]
	}, {}));
	var response = result.stderr.toString('utf8');

	if (~response.indexOf('Registry returned 404')) {
		console.log(chalk.red('Package `' + packageName + '` is not found or corrupt'));
		return false;
	} else {
		console.log(response);
		return true;
	}
};
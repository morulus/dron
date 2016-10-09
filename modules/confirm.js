var inquirer = require('inquirer');

module.exports = function(config) {
	return function() {
		return inquirer.prompt([{
			name: 'question',
			type: 'confirm',
			message: config.question,
			default: config.default || true
		}]).then(function (answers) {
			return answers.question;
		});
	}
}

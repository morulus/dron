import inquirer from 'inquirer';
/**
 * prompt - Return a loopback function that invoke prompt dialog and returns answers
 *
 * @param  {array<object>|object} questions If questions is object, then answer will be single value
 * @return {type}
 */
export default function dialog(questions) {
  let single = false;
  return function* payloadedPrompt(defaults) {
    if ("object"===typeof questions) {
      single = true;
      questions = [Object.assign({}, questions, {
        name: 'question'
      })];
    }
    if ("object"===typeof defaults) {
      questions = yield map(questions, (value, key) => {
        if (defaults.hasOwnProperty(key)) {
          questions[key].default = value;
        }
      });
    }
		yield inquirer.prompt(questions).then(function (answers) {
			return single ? answers.question : answers;
		});
	}
}

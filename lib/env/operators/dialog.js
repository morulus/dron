import map from './map';
import digest from './digest';
import inquirer from 'inquirer';
import { ENV } from 'dron-constants';

function validateQuestion(q) {
  return q.hasOwnProperty("message")&&q.hasOwnProperty("type");
}

/**
 * prompt - Return a loopback function that invoke prompt dialog and returns answers
 *
 * @param  {array<object>|object} questions If questions is object, then answer will be single value
 * @return {type}
 */
export default function dialog(questions) {
  let single = false;
  return function* payloadedPrompt(defaults, store) {
    /**
     * Datafy questions
     */
     questions = yield digest(questions);
    /**
     * Validate question in DEV mode
     */
    if (store.getState()[ENV].DEV) {
      if (questions instanceof Array) {
        if (!~questions.filter((q) => !validateQuestion(q)).length) {
          yield new Error("Invalid dialog question format");
        }
      } else if ("object"===typeof questions) {
        if (!validateQuestion(questions)) {
          console.log(questions);
          yield new Error("Invalid dialog question format");
        }
      } else {
          yield new Error("Invalid dialog question type");
      }
    }
    if ("object"===typeof questions && !(questions instanceof Array)) {
      single = true;
      questions = [Object.assign({}, questions, {
        name: 'question'
      })];
    }
    if ("object"===typeof defaults) {
      questions = yield map(questions, (value) => {
        if (defaults.hasOwnProperty(value.name)) {
          value.default = defaults[value.name];
        }
        return value;
      });
    }
		yield inquirer.prompt(questions).then(function (answers) {
			return single ? answers.question : answers;
		});
	}
}

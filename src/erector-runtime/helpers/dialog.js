import map from './map';
import digest from './digest';
import inquirer from 'inquirer';
import { __CONFIG__ } from '../../constants';

function validateQuestion(q) {
  return q.hasOwnProperty("message")&&q.hasOwnProperty("type");
}

/**
 * Starts CLI dialog (powered by inquirer).
 * If `questions` will be object, then an answer will be the only one (instead of array)
 *
 * See [Inquirer](https://www.npmjs.com/package/inquirer) for the ditails.
 * @example
 * const price = yield dialog({
 *  message: 'How much is the fish?',
 *  type: 'string',
 * });
 * yield echo(`The fish is ${price} coins`);
 *
 * @param  {array<object>|object|helper} questions Question(s)
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
    if (store.getState()[__CONFIG__].devMode) {
      if (questions instanceof Array) {
        if (!~questions.filter((q) => !validateQuestion(q)).length) {
          yield new Error("Invalid dialog question format");
        }
      } else if ("object"===typeof questions) {
        if (!validateQuestion(questions)) {
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

import dialog from './dialog';
/**
 * Ask the simple question and get the simple answer: Yes or no.
 * @example
 * const confirmed = yield confirm('Create a file?');
 * @param {string} message
 * @param {def} [def = true] Default answer
 */
export default function confirm(message, def = true) {
  return dialog({
    type: 'confirm',
    message: message,
    default: def
  });
}

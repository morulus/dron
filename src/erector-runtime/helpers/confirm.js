import dialog from './dialog';
/**
 * Get a confirmation of the user.
 * @example
 * if (yield confirm('Create a file?')) {
 *  // Create file
 * }
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

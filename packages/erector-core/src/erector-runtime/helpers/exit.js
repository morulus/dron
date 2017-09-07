/**
 * Immediately exit
 * @example
 * yield exit('Game over');
 * @param  {string} message Last message
 */
export default function exit(message) {
  console.log(message);
  process.exit(0);
}

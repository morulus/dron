/**
 * Clear terminal
 */
export default function() {
  return function() {
    process.stdout.write('\x1B[2J\x1B[0f');
  }
}

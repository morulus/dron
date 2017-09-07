
/**
 * First argument must equals true, or flow will be rejected
 */
export default function warning(statement, warningMessage) {
  if (!Boolean(statement)) {
    throw new Error(warningMessage);
  }
  return true;
}

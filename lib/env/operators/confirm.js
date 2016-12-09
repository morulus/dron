import dialog from './dialog';
export function confirm(message, def = true) {
  return dialog({
    type: 'confirm',
    message: message,
    default: def
  });
}

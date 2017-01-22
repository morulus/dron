import dialog from './dialog';
export default function confirm(message, def = true) {
  return dialog({
    type: 'confirm',
    message: message,
    default: def
  });
}

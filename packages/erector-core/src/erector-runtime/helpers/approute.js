import { getState, warning, echo } from 'erector';

const DEFAULT_COMMAND = 'default';

function showHelp(help, api, name) {
  if (typeof help === 'string') {
    return echo(help);
  } else if (typeof help === 'function') {
    return help;
  } else {
    return echo(`${name || 'app'} <command>
  where <command> in ${Object.keys(api).join('|')}`);
  }
}

function extractArgsCommand(args = {}) {
  let command, payload;
  let _ = args._ instanceof Array ? args._.slice() : [DEFAULT_COMMAND];
  command = _.shift();
  payload = {
    ...args,
    _,
  };
  return { command, payload };
}

export default function approute({ getApi, description, help, name }) {
  warning(name || help, 'You must specify name or help property');
  if (help) {
    const helpType = typeof help;
    warning(
      helpType === 'function' || helpType === 'string' || helpType === 'undefined',
      `Application help narration can not be of type ${helpType}`,
    );
  }
  if (name) {
    warning(typeof name === 'string', 'Appclication name must be a string');
  }
  warning(typeof getApi === 'function', 'Application must have api factory. Please specify `getApi` function');
  warning(typeof description === 'string', 'Application must have description');
  const routerapp = function* routerapp(args) {
    const { command, payload } = extractArgsCommand(args);
    const state = yield getState();
    const api = getApi(state);
    if (typeof api[command] === 'function') {
      return api[command](payload);
    } else {
      yield showHelp(help, api, name);
    }
  }
  routerapp.description = description;
  routerapp.help = help;
  return routerapp;
}

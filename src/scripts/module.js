import { echo, readJson, assignState } from 'erector';

const DEFAULT_SRC = './src/index.js';
const DEFAULT_OUTPUT = './index.js';

function mapArgsToState(args) {
  return {
    entry: args.entry || false,
    output: args.output || false,
  }
}

export function* build(state) {
  try {
    const packageJson = yield readJson('./package.json');
  } catch (e) {
    yield echo.error('No package.json found');
  }
  if (!state.entry) {
    yield assignState({
      entry: typeof packageJson.src === 'string' ? packageJson.src : DEFAULT_SRC
    });
  }

  if (!state.output) {
    yield assignState({
      output: typeof packageJson.main === 'string' ? packageJson.main : DEFAULT_OUTPUT
    });
  }
}

function* help() {
  yield echo.note('Usage: erect module <command>');
  yield echo.note('Commands:');
  yield echo.note(' - build');
}

export default function* entry(args) {
  yield assignState(mapArgsToState(args));
  if (args._ && args._[1]) {
    switch (args._[1]) {
      case 'build':
        yield build;
      break;
      default:
        yield help;
      break;
    }
  } else {
    yield help;
  }
}

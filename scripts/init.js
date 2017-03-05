import {
  echo,
  assignState,
  writeFileSafe,
  dialog,
  createDir,
  map,
  pathExists,
  resolve,
  spawn,
} from 'erector';

import {
  engineVersion,
} from 'erector/selectors';

import path from 'path';

function isFalse(value) {
  return value === false;
}

const SCRIPT = 'SCRIPT';
const PROJECT_SCRIPT = 'PROJECT_SCRIPT';
const PROJECT_PACKAGE = 'PROJECT_PACKAGE';
const PACKAGE = 'PACKAGE';

const JS_FILE_REGEXP = /\.js$/;
const PROJECT_TOOL_PACKAGE_REGEXP = /[a-z0-9\-_]+/i;

const SCRIPT_SCAFFOLDING =
`import { echo } from 'erector';

function mapArgsToState(args) {
  return {};
}

export default function* (args) {
  yield assignState(mapArgsToState(args));
  yield echo('OK');
}
`;

const PACKAGEJSON_SCAFFOLDING = state => JSON.stringify({
  "name": `erector-${state.name}`,
  "version": "0.1.0",
  "engines": {
    "erector": '^'+engineVersion(state),
  },
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "erect index.js"
  },
  "keywords": [
    "Erector",
    "module"
  ],
  "author": "",
  "license": "ISC"
}, null, 2);

function nameToJsFilename(name) {
  return JS_FILE_REGEXP.test(name) ? name : `${name}.js`;
}

function* deployScript({ moduleName }) {
  let filename = nameToJsFilename(moduleName);
  while (true) {
    if (!filename) {
      filename = yield dialog({
        message: 'Enter file name',
        type: 'input',
        required: true,
        validate: filename => JS_FILE_REGEXP.test(filename)
          ? true : 'Filename must have .js extension'
      });
    }
    if (yield writeFileSafe(filename, SCRIPT_SCAFFOLDING)) {
      yield echo.success(`${filename} created`);
      filename = false;
      break;
    }
  }
}

function* deployProjectScript({ moduleName }) {
  let filename = nameToJsFilename(moduleName);
  while (true) {
    if (!filename) {
      filename = yield dialog({
        message: 'Enter file name',
        type: 'input',
        required: true,
        validate: filename => JS_FILE_REGEXP.test(filename)
          ? true : 'Filename must have .js extension'
      });
    }
    yield createDir('./__erector__');
    const filepath = path.join('./__erector__', filename);
    if (yield writeFileSafe(filepath, SCRIPT_SCAFFOLDING)) {
      yield echo.success(`${filepath} created`);
      filename = false;
      break;
    }
  }
}

const packageFs = {
  ['index.js']: SCRIPT_SCAFFOLDING,
  ['package.json']: PACKAGEJSON_SCAFFOLDING,
};

function* deployPackage(name, packagePath) {
  if (!name) {
    name = yield dialog({
      message: 'Enter package name',
      type: 'input',
      required: true,
      validate: filename => PROJECT_TOOL_PACKAGE_REGEXP.test(filename)
        ? true : 'Invalid package name'
    });
  }
  const state = yield assignState({
    name,
  });
  const log = yield map(packageFs, function* (scaffolding, filename) {
    const content = "function" === typeof scaffolding
      ? scaffolding(state) : scaffolding;
    const filepath = path.join(packagePath, filename);
    if (yield writeFileSafe(filepath, content)) {
        yield echo.success(`${filepath} created`);
        yield true;
    } else {
        yield false;
    }
  });
  if (Object.values(log).filter(isFalse).length === 0) {
    if (!state.noNpmInit) {
      const absolutePackagePath = yield resolve(packagePath);
      yield spawn('npm', ['init'], {
        cwd: absolutePackagePath,
      });
    }
    yield true;
  } else {
    yield echo.warn('Package is not created');
    yield false;
  }
}

function* deployProjectPackage({ moduleName }) {
  let packageName = moduleName;
  while (true) {
    if (!packageName) {
      packageName = yield dialog({
        message: 'Enter package name',
        type: 'input',
        required: true,
        validate: filename => PROJECT_TOOL_PACKAGE_REGEXP.test(filename)
          ? true : 'Invalid package name'
      });
    }
    const packagePath = path.join('./__erector__', packageName);
    if (yield pathExists(packagePath)) {
      yield echo.warn(`${packagePath} already exists`);
      packageName = false;
      continue;
    }
    yield createDir(packagePath);
    if (yield deployPackage(packageName, packagePath)) {
      break;
    }
  }
}

function* getModuleType (state) {
  yield assignState(dialog({
    message: 'Select module type:',
    type: 'list',
    choices: [
      {
        name: 'Script',
        value: SCRIPT,
      },
      {
        name: 'Project helper',
        value: PROJECT_SCRIPT,
      },
      {
        name: 'Project helper package',
        value: PROJECT_PACKAGE,
      },
      {
        name: 'Package',
        value: PACKAGE,
      }
    ]
  }), moduleType => ({
    moduleType,
  }));
}

function* create(state) {
  switch (state.moduleType) {
    case SCRIPT:
      yield deployScript;
    break;
    case PROJECT_SCRIPT:
      yield deployProjectScript;
    break;
    case PROJECT_PACKAGE:
      yield deployProjectPackage;
    break;
    case PACKAGE:
      yield deployPackage(state.moduleName, './');
    break;
    default:
      yield echo.error(`Unknown module type ${state.moduleType}`);
    break;
  }
}

function mapArgsToState(args) {
  let moduleType;
  if (args.hasOwnProperty('e')) {
    if (args.hasOwnProperty('p')) {
      moduleType = PROJECT_PACKAGE;
    } else {
      moduleType = PROJECT_SCRIPT;
    }
  } else {
    if (args.hasOwnProperty('p')) {
      moduleType = PACKAGE;
    } else {
      moduleType = SCRIPT;
    }
  }
  return {
    moduleType,
    noNpmInit: args.hasOwnProperty('npm-init'),
    moduleName: args._ && args._[1] || false,
  };
}

export default function* (args) {
  yield assignState(mapArgsToState(args));
  yield create;
}

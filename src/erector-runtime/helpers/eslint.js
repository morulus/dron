import echo from './echo';
import writeFile from './writeFile';
import each from './each';
import map from './map';
import getState from './getState';
import { CLIEngine } from 'eslint';
import { __CONFIG__ } from '../../constants';
import chalk from 'chalk';
import uuid4 from 'uuid4';
import { displayEsLintErrorMessage } from './eslint/helpers';
import * as selectors from './eslint/selectors';
import path from 'path';

function* fromPlugin(name, plugin, parserOptions) {
  const state = yield getState();
  const cwd = state[__CONFIG__].pwd;
  const rules = {};
  Object.keys(plugin.rules).forEach((ruleName) => {
    rules[`${name}/${ruleName}`] = 2;
  });
  const cli = new CLIEngine({
    parser: "babel-eslint",
    baseConfig: {
      parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        ...parserOptions,
      }
    },
    fix: false,
    useEslintrc: false,
    cwd,
    rules,
  });
  /**
   *
   rules: {
     [`${pluginUuin}/rule`]: 2
   },
   */
  cli.addPlugin(name, plugin);
  yield Object.create(cli, {
    lint: {
      value: function* (files, autoFix) {
        yield echo.clear();
        cli.options.fix = autoFix;
        if (typeof files === 'string' || (typeof files === 'object' && files instanceof Array)) {
          let filenames = typeof files === 'string' ? [files] : files;
          const report = cli.executeOnFiles(filenames);
          const success = yield map(report.results, function* (result, index) {
            if (result.warningCount || result.errorCount) {
              yield echo.log(path.relative(cwd, result.filePath));
              if (result.warningCount) {
                yield echo(`  **Warnings**: ${result.warningCount}${result.fixableWarningCount ? ` (${result.fixableWarningCount} fixable)` : ''}`);
              }
              if (result.errorCount) {
                yield echo(`  **Errors**: ${result.errorCount}${result.fixableErrorCount ? ` (${result.fixableErrorCount} fixable)` : ''}`);
              }
              yield each(result.messages, displayEsLintErrorMessage(result.filePath));
            }
            if (autoFix && result.output) {
              try {
                yield writeFile(result.filePath, result.output);
                yield echo.ok(`Updated`);
                yield true;
              } catch (e) {
                yield echo.error(e.message);
                yield false;
              }
            }
          });
          if (!success.some(value => value === false)) {
            yield echo.ok('Linted');
            yield true;
          } else {
            yield false;
          }
        } else if (isChannel(files)) {
          while(data = yield files) {
            const [file, cb] = data;
            const filename = file.path;
            if (file.contents) {
              const report = cli.executeOnText(file.contents.toString(), filename);
              if (report.results.length) {
                yield each(report.results[0].messages, displayEsLintErrorMessage(filename));
                if (autoFix && report.results[0].output) {
                  file.contents = new Buffer(result.output, 'utf-8');
                }
              }
              cb(null, file);
            }
          }
        } else {
          yield echo.warn(`eslint::fix expects string, or array, or channel. ${typeof files} given`);
        }
      },
    },
    fix: {
      value: function* (files) {
        return this.lint(files, true);
      },
    }
  });
}

function* fromRule(rule, parserOptions) {
  const pluginUuin = uuid4();
  const cli = yield fromPlugin(pluginUuin, {
    fix: true,
    rules: {
      "rule": rule,
    }
  });
}


/**
while(data = yield files) {
    const [file, cb] = data;
    if (file.contents) {
      file.contents = new Buffer(file.contents.toString()+"\n#ok", 'utf-8');
      cb(null, file);
    }
  }
**/
function* eslint() {
  yield echo.error('Use eslint.fromRule instead eslint');
}

eslint.fromPlugin = fromPlugin;
eslint.fromRule = fromRule;
eslint.selectors = selectors;

export default eslint;

import chalk from 'chalk';
import echo from '../echo';

export const displayEsLintErrorMessage = filename => function* reDisplayEsLintErrorMessage(message) {
  const output = `  ${message.fatal ? chalk.bold.red('Fatal: ') : ''}${chalk.red(message.message)}
  ${chalk.bold('at')}: ${message.line}:${message.column}`;
  yield echo(output);
}

import { readFile, map, echo } from 'erector';
var linter = require("eslint").linter;


export default function* () {
  const programa = yield readFile('./__tests__/helpers/applyDispatcher.js');
  var messages = linter.verify(programa, {
      parser: require.resolve("babel-eslint"),
      rules: [
        123
      ],
      parserOptions: {
        sourceType: "module",
        allowImportExportEverywhere: false,
        codeFrame: false
      },
      rules: {
          semi: 2
      }
  }, { filename: "foo.js" });
  yield echo('ok');
  console.log(messages);
  // yield map(messages, node => console.log(node));
}

"use strict";

module.exports = {
  meta: {
    docs: {}
  },
  create: function(context) {
    let describeCount = 0;
    return {
      "CallExpression": function (node) {
        if (node.callee.name === 'describe') {
          if (
            node.arguments[0].type === 'Literal' &&
            (
              node.arguments[1].type === 'ArrowFunctionExpression' ||
              node.arguments[1].type === 'FunctionExpression'
            )
          ) {
            describeCount++;
          } else {
            context.report({
                node: node,
                message: "Invalid describe arguments "+node.arguments[1].type
            });
          }
        }
      },
      "Program:exit": function (node) {
        if (describeCount === 0){
          context.report({
              node,
              message: "Code must contains at least one describe call"
          });
        }
      }
    };
  }
};

module.exports.schema = [];

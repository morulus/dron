"use strict";

var rule = require("./rules/structure.js"),
RuleTester = require("eslint").RuleTester;

var ruleTester = new RuleTester();
const result = ruleTester.run("erector-helper", rule, {
    valid: [
        "describe('abc', function() { });"
    ],
    invalid: [
        {
            code: "puper('hello');\n",
            errors: [{
                message: "Code must contains at least one describe call",
                type: "Program"
            }]
        }
    ]
});

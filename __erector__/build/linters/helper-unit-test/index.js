'use strict';

module.exports = {
  configs: {
    recommended: {
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 6,
        ecmaFeatures: { experimentalObjectRestSpread: true }
      },
      rules: {
        "helper-unit-test/structure": 2
      },
    }
  },
  rules: {
    "structure": require('./rules/structure.js')
  }
};

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var __CONFIG__ = require('./constants.js').__CONFIG__;

exports.engineVersion = function engineVersion(state) {
  return state[__CONFIG__].engineVersion;
};

exports.cwdSelector = function cwdSelector(state) {
  return state[__CONFIG__].pwd;
};

exports.engineSelector = function engineSelector(state) {
  return state[__CONFIG__].env ? state[__CONFIG__].env.engine || {} : {};
};
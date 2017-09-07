"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * ImportDeclarationSpecifierLocalName - select const name of import
 *
 *        |..|
 * import abra from 'cadabra';
 */
var ImportDeclarationSpecifierLocalName = exports.ImportDeclarationSpecifierLocalName = function ImportDeclarationSpecifierLocalName(node) {
  var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  return node.specifiers[index] ? node.specifiers[index].local.name : false;
};

/**
 * ImportDeclarationSourceValue - Select source value
 *                   |.....|
 * import abra from 'cadabra';
 */
var ImportDeclarationSourceValue = exports.ImportDeclarationSourceValue = function ImportDeclarationSourceValue(node) {
  return node.source.value;
};

var ImportDeclarationSpecifierLocalNames = exports.ImportDeclarationSpecifierLocalNames = function ImportDeclarationSpecifierLocalNames(node) {
  var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  return node.specifiers.map(function (specifier) {
    return specifier.local.name;
  }).slice(from);
};
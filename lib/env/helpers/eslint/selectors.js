/**
 * ImportDeclarationSpecifierLocalName - select const name of import
 *
 *        |..|
 * import abra from 'cadabra';
 */
export const ImportDeclarationSpecifierLocalName = function ImportDeclarationSpecifierLocalName(node, index = 0) {
  return node.specifiers[index] ? node.specifiers[index].local.name : false;
}


/**
 * ImportDeclarationSourceValue - Select source value
 *                   |.....|
 * import abra from 'cadabra';
 */
export const ImportDeclarationSourceValue = function ImportDeclarationSourceValue(node) {
  return node.source.value;
}


export const ImportDeclarationSpecifierLocalNames = function ImportDeclarationSpecifierLocalNames(node, from = 0) {
  return node.specifiers.map(specifier => specifier.local.name).slice(from);
}

<%= name %>
==

<%- jsdoc.description %>
<% if (jsdoc.params) { %>
| Param  | Type                | Description  | Default   |
| ------ | ------------------- | ------------ | --------- |<% for (var q = 0; q < jsdoc.params.length; q++) { %>
| <%= jsdoc.params[q].name %> | `<%- jsdoc.params[q].type.names.join('|') %>` | <%= jsdoc.params[q].description||'' %> | <%= jsdoc.params[q].defaultValue %><% } %>
<% } %>
<% if (jsdoc.returns) { %>
__Returns:__ `<%- jsdoc.returns[0].type.names.join('|') %>` <%= jsdoc.returns[0].description %>
<% } %>
<% if (jsdoc.examples) { %>
<% for (var e = 0; e < jsdoc.examples.length; e++) { %>
```js
<%- jsdoc.examples[e] %>
```<% } %>
<% } %>

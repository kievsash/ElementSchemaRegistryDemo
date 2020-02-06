const {DomElementSchemaRegistry} = require('@angular/compiler');

const MY_DOM_ELEMENT_SCHEMA = [
  'foo-comp'
];

const MY_CUSTOM_PROPERTIES_SCHEMA = {
  div: {
    bar: 'string'
  }
};

const originalHasElement = DomElementSchemaRegistry.prototype.hasElement;
const originalHasProperty = DomElementSchemaRegistry.prototype.hasProperty;

DomElementSchemaRegistry.prototype.hasElement = function(tagName, schemaMetas) {
  return MY_DOM_ELEMENT_SCHEMA.indexOf(tagName) > -1 || originalHasElement.apply(this, arguments);
};

DomElementSchemaRegistry.prototype.hasProperty = function(tagName, propName, schemaMetas) {
  const elementProperties = MY_CUSTOM_PROPERTIES_SCHEMA[tagName.toLowerCase()];
  console.log('hasProperty ', tagName, propName, !!(elementProperties && elementProperties[propName]));
  return !!(elementProperties && elementProperties[propName]) || originalHasProperty.apply(this, arguments);
};

require('./node_modules/@angular/cli/bin/ng');

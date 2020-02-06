import {enableProdMode, SchemaMetadata} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import {DomElementSchemaRegistry, ElementSchemaRegistry} from '@angular/compiler';

if (environment.production) {
  enableProdMode();
}

const MY_DOM_ELEMENT_SCHEMA = [
  'foo-comp'
];

const MY_CUSTOM_PROPERTIES_SCHEMA = {
  div: {
    bar: 'string'
  }
};

export class CustomDomElementSchemaRegistry extends DomElementSchemaRegistry {
  constructor() {
    super();
  }

  hasElement(tagName: string, schemaMetas: SchemaMetadata[]): boolean {
    return MY_DOM_ELEMENT_SCHEMA.indexOf(tagName) > -1 || super.hasElement(tagName, schemaMetas);
  }

  hasProperty(tagName: string, propName: string, schemaMetas: SchemaMetadata[]): boolean {
    const elementProperties = MY_CUSTOM_PROPERTIES_SCHEMA[tagName.toLowerCase()];
    console.log('hasProperty ', tagName, propName, !!(elementProperties && elementProperties[propName]))
    return !!(elementProperties && elementProperties[propName]) || super.hasProperty(tagName, propName, schemaMetas);
  }
}

platformBrowserDynamic().bootstrapModule(AppModule, {
  providers: [
    {provide: ElementSchemaRegistry, useClass: CustomDomElementSchemaRegistry, deps: []}
  ]
})
  .catch(err => console.error(err));

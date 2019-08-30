import { Pipe, PipeTransform } from '@angular/core';

const capitalize = require('lodash/capitalize');
const kebabCase = require('lodash/kebabCase');

@Pipe({
  name: 'textCase',
})
export class TextCasePipe implements PipeTransform {
  transform(value: string, type?: 'pascal' | 'upper' | 'lower' | 'kebab'): any {
    if (value && typeof value === 'string') {
      switch (type) {
        case 'pascal':
          return capitalize(value);
        case 'upper':
          return value.toUpperCase();
        case 'lower':
          return value.toLowerCase();
        case 'kebab':
          return kebabCase(value);
        default:
          return capitalize(value);
      }
    }

    return null;
  }
}

import { Pipe, PipeTransform } from '@angular/core';

const capitalize = require('lodash/capitalize');

@Pipe({
  name: 'textCase',
})
export class TextCasePipe implements PipeTransform {
  transform(value: string, type?: 'pascal' | 'upper' | 'lower'): any {
    if (value && typeof value === 'string') {
      switch (type) {
        case 'pascal':
          return capitalize(value);
        case 'upper':
          return value.toUpperCase();
        case 'lower':
          return value.toLowerCase();
        default:
          return capitalize(value);
      }
    }

    return null;
  }
}

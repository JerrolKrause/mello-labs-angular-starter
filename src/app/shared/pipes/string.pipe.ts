import { Pipe, PipeTransform } from '@angular/core';
/**
 * Convert the input to a string. Will convert objects to json and everything else to string.
 */
@Pipe({
  name: 'string',
})
export class StringPipe implements PipeTransform {
  transform(value: any): any {
    // Is object
    if (!Array.isArray(value) && typeof value === 'object') {
      return JSON.stringify(value);
    } else {
      // Everything else
      return String(value);
    }
  }
}

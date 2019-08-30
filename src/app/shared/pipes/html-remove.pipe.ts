import { Pipe, PipeTransform } from '@angular/core';

/** Strips out and removes any html tags from within a string
 * USAGE: someString | htmlRemove
 */
@Pipe({
  name: 'htmlRemove',
})
export class HtmlRemovePipe implements PipeTransform {
  transform(value: any): any {
    if (value && typeof value === 'string') {
      return value.replace(/<\/?[^>]+>/gi, '');
    }
    return value;
  }
}

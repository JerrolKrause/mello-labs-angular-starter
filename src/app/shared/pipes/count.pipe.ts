import { Pipe, PipeTransform } from '@angular/core';

// Usage: {{ value | count }}
@Pipe({
  name: 'count',
})
export class CountPipe implements PipeTransform {
  transform(value: any): number {
    if (value) {
      // If array
      if (Array.isArray(value) && typeof value === 'object') {
        return value.length;
        // If object
      } else if (!Array.isArray(value) && typeof value === 'object') {
        return Object.keys(value).length;
        // If string
      } else if (typeof value === 'string') {
        return value.length;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  }
}

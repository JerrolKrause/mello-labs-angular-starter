import { Pipe, PipeTransform } from '@angular/core';

/**
 * USAGE: {{ val | sort: 'asc' : 'name' }}
 */

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  transform(arr: any[], sortDir: 'asc' | 'desc' = 'asc', objProp: string): any {
    let arrayNew = arr;
    // Make sure not null and has elements to sort
    if (arrayNew && arrayNew.length) {
      const sortAsc = (a: any, b: any) => a[objProp] - b[objProp];
      const sortDesc = (a: any, b: any) => b[objProp] - a[objProp];

      if (objProp) {
        arrayNew = sortDir === 'asc' ? arrayNew.sort(sortAsc) : arrayNew.sort(sortDesc);
      } else {
        arrayNew = sortDir === 'asc' ? arrayNew.sort() : arrayNew.reverse();
      }
    }
    return arrayNew;
  }
}

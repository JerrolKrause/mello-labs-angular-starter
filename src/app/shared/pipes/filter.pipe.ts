import { Pipe, PipeTransform } from '@angular/core';
/**
 * Filters an array of strings or an array of objects
 * USAGE: {{ val | filter: 'John' }} // Look for John in string array
 * USAGE: {{ val | filter: 'John' : 'fullName' }} // Look for John in property of fullName in array of objects
 * USAGE: {{ val | filter: '*' : 'fullName' : true }} // Return all objects with proprety of fullName regardless of value
 */
@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(arr: any[], searchValue: string | boolean, objProp?: string, hasProp?: boolean) {
    // If no string value, return whole array
    if (!searchValue && searchValue !== false) {
      return arr;
    }
    // Clean up the string to make matching easier
    const simplifyString = (str: string | boolean) => {
      return str
        .toString()
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]/gi, '');
    };

    return arr.filter(elem => {
      // If hasProp is specified, return or exclude items based on whether or not that property exists
      if (hasProp === true) {
        return elem.hasOwnProperty(objProp) ? true : false;
      } else if (hasProp === false) {
        return elem.hasOwnProperty(objProp) ? false : true;
      } else {
        // If objProp was supplied, search the prop within the object, otherwise its a string array and search that
        const stringSearch = objProp ? simplifyString(elem[objProp]) : simplifyString(elem);
        // If includes, return value
        return stringSearch.includes(simplifyString(searchValue)) ? true : false;
      }
    });
  }
}

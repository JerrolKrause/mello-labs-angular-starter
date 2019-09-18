import { Pipe, PipeTransform } from '@angular/core';

/**
 * Formats a number to the phone number format: (555) 555-5555
 * The second argument is to determine whether or not this is a clickable link
 * Usage: {{ value | phoneNumber: true }}
 */
@Pipe({
  name: 'phoneNumber',
})
export class PhoneNumberPipe implements PipeTransform {
  transform(val: string, makeClickable = false) {
    // If no value supplied or val is a blank value, return same value
    if (!val || val === '') {
      return val;
    }

    let viewVal = val.trim().replace(/^\+/, '');
    viewVal = viewVal.replace(/[^0-9]/g, '').slice(0, 10);

    // If this is a clickable link, return the phone number with no spaces or special characters
    if (makeClickable) {
      return viewVal;
    }

    let area, number;

    switch (viewVal.length) {
      case 1:
      case 2:
      case 3:
        area = viewVal;
        break;

      default:
        area = viewVal.slice(0, 3);
        number = viewVal.slice(3);
    }

    if (number) {
      if (number.length > 3) {
        number = number.slice(0, 3) + '-' + number.slice(3, 7);
      } else {
        number = number;
      }
      return ('(' + area + ') ' + number).trim().slice(0, 14);
    } else if (area && area.length === 3) {
      return '(' + area + ') ';
    } else {
      return '(' + area;
    }
  }
}

import { Pipe, PipeTransform } from '@angular/core';

// Usage: {{ value | phoneNumber: true }}
@Pipe({
  name: 'phoneNumber',
})
export class PhoneNumberPipe implements PipeTransform {
  transform(val: string | undefined | null, makeClickable = false) {
    // If no value supplied or val is a blank value, return same value
    if (!val || val === '') {
      return val;
    }
    // Whitelist numbers only
    let viewVal = val.replace(/[^0-9]/g, '');
    // Keep track of leading ones
    let hasLeadingOne = false;
    // Check for leading one
    if (viewVal.charAt(0) === '1' && viewVal.length === 11) {
      hasLeadingOne = true;
      viewVal = viewVal.slice(1);
    }

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

    let result: string;
    if (number) {
      if (number.length > 3) {
        number = number.slice(0, 3) + '-' + number.slice(3, 7);
      } else {
        number = number;
      }
      result = ('(' + area + ') ' + number).trim().slice(0, 14);
    } else {
      result = '(' + area;
    }
    // Return result, add back in leading one
    return hasLeadingOne ? '1 ' + result : result;
  }
}

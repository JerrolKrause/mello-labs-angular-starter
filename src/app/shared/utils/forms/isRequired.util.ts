import { AbstractControl, NgControl } from '@angular/forms';

/**
 * Check if a field is required
 * @param abstractControl
 */
export const isRequired = (abstractControl: AbstractControl | NgControl): boolean => {
  if (abstractControl.validator) {
    const validator = abstractControl.validator({} as AbstractControl);
    if (validator && validator.required) {
      return true;
    }
  }
  if ((<any>abstractControl)['controls']) {
    for (const controlName in (<any>abstractControl)['controls']) {
      if ((<any>abstractControl)['controls'][controlName]) {
        if (isRequired((<any>abstractControl)['controls'][controlName])) {
          return true;
        }
      }
    }
  }
  return false;
};

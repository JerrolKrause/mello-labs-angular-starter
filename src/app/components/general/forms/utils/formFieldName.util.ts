import { FormControl } from '@angular/forms';

/**
 * Get the name of the field associated with this form control
 * @param formControl
 */
export const formControlGetFieldName = (formControl: FormControl) => {
  if (formControl.parent) {
    const formGroup = formControl.parent.controls;
    // Get name of field
    return Object.keys(formGroup).find(name => formControl === (<any>formGroup)[name]) || '';
  }
  return '';
};

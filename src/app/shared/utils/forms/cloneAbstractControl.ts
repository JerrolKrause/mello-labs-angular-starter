import {
  AbstractControl,
  FormGroup,
  FormArray,
  FormControl,
} from '@angular/forms';

/**
 * Create a new instance of an abstract control or form group by cloning an existing one
 * @param control - The formgroup or abstract control to clone
 * @param reset - Should the new control be clean or have it's data copied as well
 */
export const cloneAbstractControl = (
  control: AbstractControl,
  reset = true,
) => {
  let controlNew: AbstractControl;

  if (control instanceof FormGroup) {
    const formGroup = new FormGroup(
      {},
      control.validator,
      control.asyncValidator,
    );
    const controls = control.controls;

    Object.keys(controls).forEach(key => {
      formGroup.addControl(key, cloneAbstractControl(controls[key]));
    });

    controlNew = formGroup;
  } else if (control instanceof FormArray) {
    const formArray = new FormArray(
      [],
      control.validator,
      control.asyncValidator,
    );

    control.controls.forEach(formControl =>
      formArray.push(cloneAbstractControl(formControl)),
    );

    controlNew = formArray;
  } else if (control instanceof FormControl) {
    controlNew = new FormControl(
      control.value,
      control.validator,
      control.asyncValidator,
    );
  } else {
    console.error(
      'Unknown type when cloning abstract control, defaulting to form control',
    );
    controlNew = new FormControl(
      control.value,
      control.validator,
      control.asyncValidator,
    );
  }

  if (controlNew.disabled) {
    controlNew.disable({ emitEvent: false });
  }

  if (reset) {
    controlNew.reset();
  }

  return controlNew;
};

import { FormBuilder } from '@angular/forms';
const fb = new FormBuilder();

/**
 * Convert a javascript object or JSON to an Angular reactive form via form builder
 * This method eliminates the need to manaully create a formgroup
 * @param model - An object or JSON of the model. Can contain nested objects and arrays
 */
export const objToFormGroup = (model: any) => {
  // console.log('formGroupCreate', model);
  const formModel: any = {};
  // Loop through all props in the model
  Object.keys(model).forEach(key => {
    // If this is a nested object, recurse to create form group
    if (model[key] && typeof model[key] === 'object' && !Array.isArray(model[key])) {
      formModel[key] = objToFormGroup(model[key]);
    } else if (model[key] && typeof model[key] === 'object' && Array.isArray(model[key])) {
      // If this is an array, recurse to create a form array
      const formArray: any[] = [];
      model[key].forEach((item: any) => formArray.push(objToFormGroup(item)));
      formModel[key] = fb.array(formArray);
    } else {
      // Standard value
      formModel[key] = [null, []];
    }
  });

  // If iterating inside an array of primitives, return a form control for the primitive
  if (typeof model === 'string' || typeof model === 'number' || typeof model === 'boolean') {
    return fb.control(null);
  }

  return fb.group(formModel);
};

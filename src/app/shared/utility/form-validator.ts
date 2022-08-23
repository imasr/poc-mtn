import { AbstractControl } from '@angular/forms';

export const numberValidator = (
  control: AbstractControl
): { [key: string]: boolean } | null => {
  const numberRegex = new RegExp(/^-?(0|[1-9]\d*)?$/);

  if (control.value && !numberRegex.test(control.value)) {
    return { numberOnly: true };
  }
  return null;
};

export const emailValidator = (
  control: AbstractControl
): { [key: string]: boolean } | null => {
  const numberRegex = new RegExp(
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  );

  if (control.value && !numberRegex.test(control.value)) {
    return { emailOnly: true };
  }
  return null;
};

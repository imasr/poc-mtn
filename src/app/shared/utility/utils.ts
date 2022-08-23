import { FormGroup } from '@angular/forms';

export const toSentenceCase = (text: string) => {
  const result = text.replace(/([A-Z])/g, ' $1');
  return result.charAt(0).toUpperCase() + result.slice(1);
};

export const resetForm = (form: FormGroup) => {
  if (!form) return;
  form.reset();
  Object.keys(form.controls).forEach((key) => {
    const control = form.controls[key];
    control.setErrors(null);
  });
};

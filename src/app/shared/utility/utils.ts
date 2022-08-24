import { FormGroup } from '@angular/forms';

export const resetForm = (form: FormGroup) => {
  if (!form) return;
  form.reset();
  Object.keys(form.controls).forEach((key) => {
    const control = form.controls[key];
    control.setErrors(null);
  });
};

export const downloadFile = (jsonObject: object) => {
  const blob = new Blob([JSON.stringify(jsonObject)], {
    type: 'application/json',
  });
  const downloadURL = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = downloadURL;
  link.download = 'User.json';
  link.click();
};

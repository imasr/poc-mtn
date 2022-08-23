import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { FormGroup, NgControl } from '@angular/forms';

function getValidationMsg(
  validationId: string,
  field: string,
  param: any = null
): string {
  return errorMessages[validationId](field, param);
}

const errorMessages: any = {
  required: (field: string) => `${field} field is a required`,
  maxlength: (field: string, param: any = null) =>
    `Maximum ${param.requiredLength} characters are allowed`,
  maxLength: (field: string, param: any = null) =>
    `Maximum ${param.requiredLength} characters are allowed`,
  minlength: (field: string, param: any = null) =>
    `Minimum ${param.requiredLength} characters are required`,
  minLength: (field: string, param: any = null) =>
    `Minimum ${param.requiredLength} characters are required`,
  invalid: (field: string) => `${field} field is invalid`,
  pattern: (field: string) => `${field} field is invalid`,
  numberOnly: (field: string) => `Only numeric values are allowed`,
  emailOnly: (field: string) => `Invalid email format`,
  invalidDate: (field: string) => `Invalid date format`,
  zipFormat: (field: string) =>
    `ZIP must be in the valid format (xxxxx or xxxxx-xxxx)`,
  dateFormat: (field: string) => `Invalid date format`,
};

@Directive({
  selector: '[formsError]',
})
export class FormsErrorDirective {
  constructor(private elRef: ElementRef, private control: NgControl) {}

  @Input('formsError') formsError: string = '';
  errorSpanId: string = '';
  statusChangeSubscription: any;

  ngOnInit(): void {
    this.errorSpanId = this.formsError;
    this.statusChangeSubscription = this.control.statusChanges?.subscribe(
      (status) => {
        if (status == 'INVALID') {
          this.showError();
        } else {
          this.removeError();
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.statusChangeSubscription.unsubscribe();
  }

  @HostListener('blur', ['$event'])
  handleBlurEvent() {
    //This is needed to handle the case of clicking a required field and moving out.
    //Rest all are handled by status change subscription
    if (this.control.value == null || this.control.value == '') {
      if (this.control.errors) this.showError();
      else this.removeError();
    }
  }

  private showError() {
    this.removeError();
    const allErrors: any = this.control.errors;
    const firstKey = Object.keys(allErrors)[0];
    const errorMsg = getValidationMsg(
      firstKey,
      this.formsError,
      allErrors[firstKey]
    );
    const errHtml =
      '<span class="text-danger" id="' +
      this.errorSpanId +
      '">' +
      errorMsg +
      '</span>';
    this.elRef.nativeElement.parentElement.insertAdjacentHTML(
      'beforeend',
      errHtml
    );
  }

  private removeError(): void {
    const errorElement = document.getElementById(this.errorSpanId);
    if (errorElement) errorElement.remove();
  }
}

@Directive({
  selector: '[validationControl]',
})
export class FormSubmitValidationDirective {
  @Input() validationControl: any;

  @HostListener('click', ['$event'])
  handleClickEvent() {
    this.markAsTouched(this.validationControl);
  }

  private markAsTouched(formGroup: FormGroup): void {
    formGroup.markAsTouched();
    formGroup.updateValueAndValidity();
    (<any>Object).values(formGroup.controls).forEach((control: FormGroup) => {
      control.markAsTouched();
      control.updateValueAndValidity({ onlySelf: false, emitEvent: true });
      if (control.controls) {
        this.markAsTouched(control);
      }
    });
  }
}

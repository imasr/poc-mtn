import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsErrorDirective, FormSubmitValidationDirective } from './forms-error.directive';

@NgModule({
  declarations: [
    FormsErrorDirective,
    FormSubmitValidationDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    FormsErrorDirective,
    FormSubmitValidationDirective,
  ],
})
export class DirectivesModule { }

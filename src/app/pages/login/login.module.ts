import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from 'src/app/shared/directives/directives.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DirectivesModule,
    RouterModule.forChild([
      {
        path: '',
        component: LoginComponent,
      },
    ]),
  ],
  exports: [LoginComponent],
})
export class LoginModule {}

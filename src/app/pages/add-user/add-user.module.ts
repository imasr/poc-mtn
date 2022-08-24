import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddUserComponent } from './add-user.component';
import { CommonTableModule } from 'src/app/shared/components/common-table/common-table.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from 'src/app/shared/directives/directives.module';
import { NavbarModule } from 'src/app/shared/components/navbar/navbar.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AddUserComponent],
  imports: [
    CommonModule,
    DirectivesModule,
    ReactiveFormsModule,
    CommonTableModule,
    NavbarModule,
    HttpClientModule,
    RouterModule.forChild([
      {
        path: '',
        component: AddUserComponent,
      },
    ]),
  ],
  exports: [AddUserComponent],
})
export class AddUserModule {}

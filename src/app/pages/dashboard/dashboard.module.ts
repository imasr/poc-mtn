import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { Router, RouterModule } from '@angular/router';
import { CommonTableModule } from 'src/app/shared/components/common-table/common-table.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    CommonTableModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
      },
    ]),
  ],
  exports: [DashboardComponent],
})
export class DashboardModule {}

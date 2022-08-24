import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { Router, RouterModule } from '@angular/router';
import { CommonTableModule } from 'src/app/shared/components/common-table/common-table.module';
import { CardModule } from 'src/app/shared/components/card/card.module';
import { NavbarModule } from 'src/app/shared/components/navbar/navbar.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    NavbarModule,
    CardModule,
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

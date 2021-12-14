import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModEmployeePage } from './mod-employee.page';

const routes: Routes = [
  {
    path: '',
    component: ModEmployeePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModEmployeePageRoutingModule {}

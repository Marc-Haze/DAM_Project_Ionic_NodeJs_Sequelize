import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullemployeePage } from './fullemployee.page';

const routes: Routes = [
  {
    path: '',
    component: FullemployeePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FullemployeePageRoutingModule {}

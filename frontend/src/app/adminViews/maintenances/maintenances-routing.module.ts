import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaintenancesPage } from './maintenances.page';

const routes: Routes = [
  {
    path: '',
    component: MaintenancesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaintenancesPageRoutingModule {}

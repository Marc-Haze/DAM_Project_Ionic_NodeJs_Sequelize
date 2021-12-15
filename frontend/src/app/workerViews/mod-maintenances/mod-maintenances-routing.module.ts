import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModMaintenancesPage } from './mod-maintenances.page';

const routes: Routes = [
  {
    path: '',
    component: ModMaintenancesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModMaintenancesPageRoutingModule {}

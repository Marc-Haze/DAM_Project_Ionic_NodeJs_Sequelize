import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModMaintenancePage } from './mod-maintenance.page';

const routes: Routes = [
  {
    path: '',
    component: ModMaintenancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModMaintenancePageRoutingModule {}

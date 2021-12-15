import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkerMaintenancesPage } from './worker-maintenances.page';

const routes: Routes = [
  {
    path: '',
    component: WorkerMaintenancesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkerMaintenancesPageRoutingModule {}

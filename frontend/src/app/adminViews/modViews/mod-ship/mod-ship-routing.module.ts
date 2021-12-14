import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModShipPage } from './mod-ship.page';

const routes: Routes = [
  {
    path: '',
    component: ModShipPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModShipPageRoutingModule {}

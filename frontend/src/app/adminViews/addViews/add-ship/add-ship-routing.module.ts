import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddShipPage } from './add-ship.page';

const routes: Routes = [
  {
    path: '',
    component: AddShipPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddShipPageRoutingModule {}

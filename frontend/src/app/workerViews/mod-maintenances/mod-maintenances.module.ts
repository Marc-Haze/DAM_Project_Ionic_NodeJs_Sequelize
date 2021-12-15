import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModMaintenancesPageRoutingModule } from './mod-maintenances-routing.module';

import { ModMaintenancesPage } from './mod-maintenances.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModMaintenancesPageRoutingModule
  ],
  declarations: [ModMaintenancesPage]
})
export class ModMaintenancesPageModule {}

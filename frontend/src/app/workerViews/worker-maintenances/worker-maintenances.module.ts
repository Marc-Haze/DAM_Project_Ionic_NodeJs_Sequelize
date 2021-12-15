import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkerMaintenancesPageRoutingModule } from './worker-maintenances-routing.module';

import { WorkerMaintenancesPage } from './worker-maintenances.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkerMaintenancesPageRoutingModule,
    ComponentsModule
  ],
  declarations: [WorkerMaintenancesPage]
})
export class WorkerMaintenancesPageModule {}

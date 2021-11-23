import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaintenancesPageRoutingModule } from './maintenances-routing.module';

import { MaintenancesPage } from './maintenances.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaintenancesPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [MaintenancesPage]
})
export class MaintenancesPageModule {}

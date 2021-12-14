import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModMaintenancePageRoutingModule } from './mod-maintenance-routing.module';

import { ModMaintenancePage } from './mod-maintenance.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModMaintenancePageRoutingModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule, 
  ],
  declarations: [ModMaintenancePage]
})
export class ModMaintenancePageModule {}

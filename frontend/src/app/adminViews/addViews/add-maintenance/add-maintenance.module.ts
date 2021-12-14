import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddMaintenancePageRoutingModule } from './add-maintenance-routing.module';

import { AddMaintenancePage } from './add-maintenance.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddMaintenancePageRoutingModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule, 
  ],
  declarations: [AddMaintenancePage]
})
export class AddMaintenancePageModule {}

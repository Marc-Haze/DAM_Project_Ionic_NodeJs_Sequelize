import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModEmployeePageRoutingModule } from './mod-employee-routing.module';

import { ModEmployeePage } from './mod-employee.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModEmployeePageRoutingModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule, 
  ],
  declarations: [ModEmployeePage]
})
export class ModEmployeePageModule {}

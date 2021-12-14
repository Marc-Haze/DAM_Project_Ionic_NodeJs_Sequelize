import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FullemployeePageRoutingModule } from './fullemployee-routing.module';

import { FullemployeePage } from './fullemployee.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FullemployeePageRoutingModule,
    ComponentsModule,
  ],
  declarations: [FullemployeePage]
})
export class FullemployeePageModule {}

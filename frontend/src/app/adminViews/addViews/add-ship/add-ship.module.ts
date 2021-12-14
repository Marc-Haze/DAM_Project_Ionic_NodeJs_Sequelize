import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddShipPageRoutingModule } from './add-ship-routing.module';

import { AddShipPage } from './add-ship.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddShipPageRoutingModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule, 
  ],
  declarations: [AddShipPage]
})
export class AddShipPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModShipPageRoutingModule } from './mod-ship-routing.module';

import { ModShipPage } from './mod-ship.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModShipPageRoutingModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule, 
  ],
  declarations: [ModShipPage]
})
export class ModShipPageModule {}

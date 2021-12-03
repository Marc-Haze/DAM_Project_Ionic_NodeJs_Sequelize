import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddShipPageRoutingModule } from './add-ship-routing.module';

import { AddShipPage } from './add-ship.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddShipPageRoutingModule
  ],
  declarations: [AddShipPage]
})
export class AddShipPageModule {}

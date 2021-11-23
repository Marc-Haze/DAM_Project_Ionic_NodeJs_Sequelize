import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShipsPageRoutingModule } from './ships-routing.module';

import { ShipsPage } from './ships.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShipsPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [ShipsPage]
})
export class ShipsPageModule {}

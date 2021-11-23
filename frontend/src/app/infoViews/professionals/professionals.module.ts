import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfessionalsPageRoutingModule } from './professionals-routing.module';

import { ProfessionalsPage } from './professionals.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfessionalsPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [ProfessionalsPage]
})
export class ProfessionalsPageModule {}

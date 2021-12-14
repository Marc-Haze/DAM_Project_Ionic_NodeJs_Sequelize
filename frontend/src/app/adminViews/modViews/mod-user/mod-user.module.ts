import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModUserPageRoutingModule } from './mod-user-routing.module';

import { ModUserPage } from './mod-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModUserPageRoutingModule,
    FormsModule,
    ReactiveFormsModule, 
  ],
  declarations: [ModUserPage]
})
export class ModUserPageModule {}

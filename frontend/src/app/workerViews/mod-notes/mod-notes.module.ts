import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModNotesPageRoutingModule } from './mod-notes-routing.module';

import { ModNotesPage } from './mod-notes.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModNotesPageRoutingModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [ModNotesPage]
})
export class ModNotesPageModule {}

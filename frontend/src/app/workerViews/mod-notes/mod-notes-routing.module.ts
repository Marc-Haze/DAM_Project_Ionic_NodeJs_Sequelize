import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModNotesPage } from './mod-notes.page';

const routes: Routes = [
  {
    path: '',
    component: ModNotesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModNotesPageRoutingModule {}

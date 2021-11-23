import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { InfoFooterComponent } from './info-footer/info-footer.component';

@NgModule({
  declarations: [
    MainMenuComponent,
    InfoFooterComponent,
  ],
  imports: [
    CommonModule
  ],
  exports:[
    MainMenuComponent,
    InfoFooterComponent,
  ]

})
export class ComponentsModule { }

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreatelistPage } from './createlist';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  declarations: [
    CreatelistPage,
  ],
  imports: [
    IonicPageModule.forChild(CreatelistPage),
    IonicSelectableModule
  ],
})
export class CreatelistPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchcateringPage } from './searchcatering';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  declarations: [
    SearchcateringPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchcateringPage),
    IonicSelectableModule
  ],
})
export class SearchcateringPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchMealsPage } from './search-meals';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  declarations: [
    SearchMealsPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchMealsPage),
    IonicSelectableModule
  ],
})
export class SearchMealsPageModule {}

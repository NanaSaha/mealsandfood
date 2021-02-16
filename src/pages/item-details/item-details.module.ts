import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemDetailsPage } from './item-details';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  declarations: [
    ItemDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemDetailsPage),
    IonicSelectableModule
  ],
})
export class ItemDetailsPageModule {}
